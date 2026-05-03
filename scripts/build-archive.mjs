/**
 * build-archive.mjs
 *
 * Parses the WordPress XML export, downloads all images at 800px width,
 * and outputs public/archive-data.json for the Archive page.
 *
 * Usage: node scripts/build-archive.mjs <path-to-xml>
 * Example: node scripts/build-archive.mjs "C:/Users/andre/Downloads/wp-export.xml"
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync, createWriteStream } from 'fs';
import { join, basename, extname } from 'path';
import https from 'https';
import http from 'http';
import { XMLParser } from 'fast-xml-parser';

const XML_PATH = process.argv[2] || 'C:/Users/andre/Downloads/wp-export.xml';
const IMAGE_DIR = join(process.cwd(), 'public', 'archive-images');
const OUTPUT_JSON = join(process.cwd(), 'public', 'archive-data.json');
const WP_BASE = 'https://friendsofparkinsonspark.wordpress.com';
const IMG_WIDTH = 800;
const CONCURRENCY = 5; // parallel downloads at a time

// ── Helpers ───────────────────────────────────────────────────────────────────

function decodeHtmlEntities(str) {
  if (!str || typeof str !== 'string') return str;
  return str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(parseInt(code, 10)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, code) => String.fromCharCode(parseInt(code, 16)))
    .replace(/&nbsp;/g, ' ')
    .replace(/&rsquo;/g, '’')
    .replace(/&lsquo;/g, '‘')
    .replace(/&rdquo;/g, '”')
    .replace(/&ldquo;/g, '“')
    .replace(/&ndash;/g, '–')
    .replace(/&mdash;/g, '—')
    .replace(/&hellip;/g, '…');
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

function downloadFile(url, destPath) {
  return new Promise((resolve, reject) => {
    const file = createWriteStream(destPath);
    const get = url.startsWith('https') ? https : http;
    const req = get.get(url, { timeout: 20000, headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        file.close();
        return downloadFile(res.headers.location, destPath).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        file.close();
        return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
      }
      res.pipe(file);
      file.on('finish', () => file.close(resolve));
    });
    req.on('error', err => { file.close(); reject(err); });
    req.on('timeout', () => { req.destroy(); reject(new Error(`Timeout: ${url}`)); });
  });
}

async function runWithConcurrency(tasks, limit) {
  const results = [];
  let i = 0;
  async function next() {
    while (i < tasks.length) {
      const idx = i++;
      results[idx] = await tasks[idx]().catch(e => ({ error: e.message }));
    }
  }
  await Promise.all(Array.from({ length: limit }, next));
  return results;
}

function safeFilename(url) {
  try {
    const u = new URL(url);
    const ext = extname(u.pathname) || '.jpg';
    const name = basename(u.pathname, ext)
      .replace(/[^a-zA-Z0-9-_]/g, '-')
      .substring(0, 80);
    return `${name}${ext}`;
  } catch {
    return `image-${Date.now()}.jpg`;
  }
}

function resizeUrl(url) {
  if (!url) return url;
  // WordPress CDN resize parameter
  const u = url.replace(/\?.*$/, '');
  return `${u}?w=${IMG_WIDTH}&q=82`;
}

function extractImagesFromHtml(html) {
  const urls = new Set();
  const re = /src="(https?:\/\/(?:friendsofparkinsonspark\.files\.wordpress\.com|friendsofparkinsonspark\.wordpress\.com)[^"]+)"/g;
  let m;
  while ((m = re.exec(html)) !== null) {
    urls.add(m[1].replace(/\?.*$/, ''));
  }
  return [...urls];
}

function processShortcodes(html) {
  if (!html) return html;

  // [caption id="" align="..." width="..." caption="text"]<img/>[/caption]
  // Convert to <figure><img/><figcaption>text</figcaption></figure>
  html = html.replace(
    /\[caption([^\]]*)\]([\s\S]*?)\[\/caption\]/gi,
    (_, attrs, inner) => {
      const captionAttr = attrs.match(/caption="([^"]*)"/i);
      const caption = captionAttr ? decodeHtmlEntities(captionAttr[1]) : '';
      const content = inner.trim();
      return caption
        ? `<figure class="wp-caption">${content}<figcaption class="wp-caption-text">${caption}</figcaption></figure>`
        : `<figure class="wp-caption">${content}</figure>`;
    }
  );

  // [gallery ...] — remove, images already embedded in content
  html = html.replace(/\[gallery[^\]]*\]/gi, '');

  // [embed]url[/embed] — remove the tags, leave the URL as plain text
  html = html.replace(/\[embed\]([\s\S]*?)\[\/embed\]/gi, '$1');

  // [video ...] [audio ...] — strip
  html = html.replace(/\[\/?(?:video|audio)[^\]]*\]/gi, '');

  // Strip any remaining unrecognised shortcodes [tag ...] and [/tag]
  html = html.replace(/\[\/?\w[\w-]*[^\]]*\]/g, '');

  return html;
}

function makeExcerpt(html, maxLen = 200) {
  const text = html
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return text.length > maxLen ? text.substring(0, maxLen).replace(/\s+\S*$/, '') + '…' : text;
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  console.log('📖 Reading XML…');
  const xmlContent = readFileSync(XML_PATH, 'utf8');

  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: '@_',
    cdataPropName: '__cdata',
    isArray: (name) => ['item', 'category', 'tag', 'postmeta'].includes(name),
    parseTagValue: false,
  });

  const parsed = parser.parse(xmlContent);
  const items = parsed?.rss?.channel?.item ?? [];

  console.log(`📦 Found ${items.length} total items`);

  // Separate posts and attachments (all fields use wp: / dc: / content: namespace prefixes)
  const posts = items.filter(i => i['wp:post_type'] === 'post' && i['wp:status'] === 'publish');
  const attachments = items.filter(i => i['wp:post_type'] === 'attachment');

  console.log(`📝 Published posts: ${posts.length}`);
  console.log(`🖼️  Attachments: ${attachments.length}`);

  // Build attachment URL map (post_id → url)
  const attachmentMap = {};
  for (const att of attachments) {
    const url = att['wp:attachment_url']?.__cdata || att['wp:attachment_url'] || '';
    if (url) attachmentMap[att['wp:post_id']] = url;
  }

  // Collect all unique image URLs from attachments + post content
  const allImageUrls = new Set();
  for (const url of Object.values(attachmentMap)) {
    allImageUrls.add(url.replace(/\?.*$/, ''));
  }
  for (const post of posts) {
    const html = post['content:encoded']?.__cdata || post['content:encoded'] || '';
    for (const url of extractImagesFromHtml(html)) {
      allImageUrls.add(url);
    }
  }

  console.log(`\n🖼️  Unique images to download: ${allImageUrls.size}`);

  // Prepare image directory
  mkdirSync(IMAGE_DIR, { recursive: true });

  // Build a map of original URL → local filename
  const urlToLocal = {};
  for (const url of allImageUrls) {
    const filename = safeFilename(url);
    urlToLocal[url] = filename;
  }

  // Download images
  console.log(`\n⬇️  Downloading images at ${IMG_WIDTH}px (${CONCURRENCY} at a time)…\n`);
  const urlList = [...allImageUrls];
  let done = 0;
  let skipped = 0;
  let failed = 0;

  const tasks = urlList.map(url => async () => {
    const filename = urlToLocal[url];
    const destPath = join(IMAGE_DIR, filename);

    if (existsSync(destPath)) {
      skipped++;
      done++;
      if (done % 50 === 0) process.stdout.write(`  ${done}/${urlList.length} (${skipped} skipped)\n`);
      return { ok: true, skipped: true };
    }

    try {
      await downloadFile(resizeUrl(url), destPath);
      done++;
      if (done % 10 === 0) process.stdout.write(`  ${done}/${urlList.length}\n`);
      await sleep(50); // small throttle
      return { ok: true };
    } catch (e) {
      failed++;
      done++;
      return { error: e.message };
    }
  });

  await runWithConcurrency(tasks, CONCURRENCY);
  console.log(`\n✅ Images done — ${done - failed} ok, ${skipped} skipped, ${failed} failed\n`);

  // Process posts into clean JSON
  console.log('🔧 Processing posts…');

  const MAIN_CATEGORIES = new Set([
    'Events', 'Friends', 'Ecology', 'Regeneration',
    'Facilities', 'History', 'All Our Stories', 'Bird Watch',
    'Interesting Features', 'Uncategorized'
  ]);

  const archivePosts = posts.map(post => {
    const rawEncoded = post['content:encoded'];
    const rawHtml = String(rawEncoded?.__cdata ?? (typeof rawEncoded === 'string' ? rawEncoded : '') ?? '');
    const html = processShortcodes(rawHtml);

    // Rewrite image URLs in content to local paths
    let content = html.replace(
      /(src=")(https?:\/\/(?:friendsofparkinsonspark\.files\.wordpress\.com|friendsofparkinsonspark\.wordpress\.com)([^"?]*)(?:\?[^"]*)?")(\s*(?:srcset="[^"]*")?)/g,
      (match, prefix, fullUrl, path) => {
        const baseUrl = fullUrl.replace(/\?.*$/, '').replace(/^.*?(?=https?:\/\/)/, '');
        const cleanUrl = baseUrl.replace(/\?.*$/, '');
        const filename = urlToLocal[cleanUrl];
        return filename
          ? `${prefix}/archive-images/${filename}" data-original-src="${cleanUrl}"`
          : `${prefix}${fullUrl}"`;
      }
    );
    // Remove srcset attributes (they reference WP CDN sizes we haven't downloaded)
    content = content.replace(/\s*srcset="[^"]*"/g, '');

    // Extract categories and tags
    const rawCats = Array.isArray(post.category) ? post.category : (post.category ? [post.category] : []);
    const categories = [];
    const tags = [];
    for (const cat of rawCats) {
      const domain = cat['@_domain'] || '';
      const text = cat.__cdata || cat['#text'] || (typeof cat === 'string' ? cat : '');
      if (!text) continue;
      if (domain === 'post_tag') tags.push(decodeHtmlEntities(text));
      else categories.push(decodeHtmlEntities(text));
    }

    // Main category for filtering (first recognised main category, or first category)
    const mainCategory = categories.find(c => MAIN_CATEGORIES.has(c)) || categories[0] || 'Uncategorized';

    // Images used in this post
    const postImages = extractImagesFromHtml(html)
      .map(url => urlToLocal[url] ? `/archive-images/${urlToLocal[url]}` : null)
      .filter(Boolean);

    const date = (post['wp:post_date'] || '').replace(' ', 'T');
    const rawTitle = post.title;
    const titleRaw = typeof rawTitle === 'string' ? rawTitle
      : rawTitle?.__cdata != null ? (rawTitle.__cdata || '(Untitled)')
      : rawTitle?.['#text'] || '(Untitled)';
    const title = decodeHtmlEntities(titleRaw);
    const link = post.link || '';

    return {
      id: parseInt(post['wp:post_id']) || 0,
      title,
      date,
      year: date ? new Date(date).getFullYear() : 0,
      slug: post['wp:post_name'] || '',
      link,
      author: post['dc:creator'] || '',
      categories,
      tags,
      mainCategory,
      excerpt: decodeHtmlEntities(makeExcerpt(html)),
      content,
      images: postImages,
    };
  });

  // Sort newest first
  archivePosts.sort((a, b) => new Date(b.date) - new Date(a.date));

  // Build category list with counts
  const catCounts = {};
  for (const post of archivePosts) {
    for (const cat of post.categories) {
      catCounts[cat] = (catCounts[cat] || 0) + 1;
    }
  }
  const categoryList = Object.entries(catCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([name, count]) => ({ name, count }));

  // Year list
  const yearCounts = {};
  for (const post of archivePosts) {
    if (post.year) yearCounts[post.year] = (yearCounts[post.year] || 0) + 1;
  }
  const yearList = Object.entries(yearCounts)
    .sort((a, b) => b[0] - a[0])
    .map(([year, count]) => ({ year: parseInt(year), count }));

  const output = {
    generated: new Date().toISOString(),
    totalPosts: archivePosts.length,
    categories: categoryList,
    years: yearList,
    posts: archivePosts,
  };

  writeFileSync(OUTPUT_JSON, JSON.stringify(output, null, 2), 'utf8');
  const jsonSize = (readFileSync(OUTPUT_JSON).length / 1024 / 1024).toFixed(1);
  console.log(`\n🎉 Done!`);
  console.log(`   Posts: ${archivePosts.length}`);
  console.log(`   JSON size: ${jsonSize} MB`);
  console.log(`   Output: ${OUTPUT_JSON}`);
}

main().catch(e => { console.error('❌ Fatal error:', e); process.exit(1); });
