// ─────────────────────────────────────────────────────────────────────────────
// Generate a Park Post newsletter PDF from an issue content file.
//
//   node scripts/generate-newsletter-pdf.js 2026-07
//
// Reads:   newsletters/issues/<issue>.mjs   (the variable content)
// Uses:    newsletters/template.mjs          (the fixed design)
// Writes:  <Downloads>/FOPP Newsletter - <dateLabel>.pdf   (override with OUT=…)
//
// Debug:   HTML_OUT=out.html node scripts/... 2026-07   also dumps the HTML.
// ─────────────────────────────────────────────────────────────────────────────
import puppeteer from 'puppeteer';
import { pathToFileURL } from 'url';
import { dirname, join, resolve } from 'path';
import { fileURLToPath } from 'url';
import { existsSync, writeFileSync } from 'fs';
import os from 'os';
import { buildHtml } from '../newsletters/template.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const issue = process.argv[2];
if (!issue) {
  console.error('Usage: node scripts/generate-newsletter-pdf.js <issue>   e.g. 2026-07');
  process.exit(1);
}

const issuePath = join(ROOT, 'newsletters', 'issues', `${issue}.mjs`);
if (!existsSync(issuePath)) {
  console.error(`✗ Issue file not found: ${issuePath}`);
  process.exit(1);
}

const content = (await import(pathToFileURL(issuePath).href)).default;
const html = buildHtml(content);

if (process.env.HTML_OUT) writeFileSync(process.env.HTML_OUT, html);

const downloads = join(os.homedir(), 'Downloads');
const outPath = process.env.OUT || join(downloads, `FOPP Newsletter - ${content.dateLabel}.pdf`);

console.log('Launching Puppeteer...');
const browser = await puppeteer.launch({ headless: 'new' });
try {
  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(60000);
  await page.setContent(html, { waitUntil: 'networkidle0', timeout: 60000 });

  // Distribute the continuous content into fixed A4 "sheets". Sheets after the
  // first get a running header; page 1 keeps just its masthead. This gives full
  // per-page control that Chrome's native header can't (it can't skip page 1).
  const sheetCount = await page.evaluate((cfg) => {
    const MM = 96 / 25.4;
    const SHEET_H = 297 * MM;
    const RESERVE = 15 * MM;               // room for the page-number line
    const usable = SHEET_H - RESERVE;

    const masthead = document.querySelector('.masthead');
    const hero = document.querySelector('.hero');
    const wrap = document.querySelector('.wrap');
    const footer = document.querySelector('.footer');
    const blocks = [masthead, hero, ...Array.from(wrap.children), footer].filter(Boolean);
    blocks.forEach(b => b.remove());
    wrap.remove();
    document.body.innerHTML = '';

    const pages = document.createElement('div');
    document.body.appendChild(pages);
    const sheets = [];

    function addSheet() {
      const sheet = document.createElement('div');
      sheet.className = 'sheet';
      const body = document.createElement('div');
      body.className = 'sheet-body';
      if (sheets.length > 0) {
        sheet.classList.add('cont');
        const head = document.createElement('div');
        head.className = 'rhead';
        head.innerHTML = `<span class="l">The Park Post &middot; Issue No.&nbsp;${cfg.issueNo}</span><span class="r"></span>`;
        sheet.appendChild(head);
      }
      sheet.appendChild(body);
      pages.appendChild(sheet);
      sheets.push({ sheet, body });
      return sheets[sheets.length - 1];
    }

    let cur = addSheet();
    const isHeading = (el) => el.tagName === 'H2';
    for (const block of blocks) {
      cur.body.appendChild(block);
      if (cur.body.scrollHeight > usable && cur.body.children.length > 1) {
        cur.body.removeChild(block);
        // keep a heading with the block that follows it
        const prev = cur.body.lastElementChild;
        cur = addSheet();
        if (prev && isHeading(prev)) { cur.body.appendChild(prev); }
        cur.body.appendChild(block);
      }
    }

    // Pin the sign-off footer to the bottom of the final sheet.
    if (footer.isConnected) footer.remove();
    footer.classList.add('pinned');
    sheets[sheets.length - 1].sheet.appendChild(footer);

    // Page breaks + running-header page numbers (page 1 is the cover, no number).
    const N = sheets.length;
    sheets.forEach((s, i) => {
      if (i < N - 1) s.sheet.classList.add('brk');
      const r = s.sheet.querySelector('.rhead .r');
      if (r) r.innerHTML = `${cfg.dateLabel} &middot; Page ${i + 1} of ${N}`;
    });
    return N;
  }, { dateLabel: content.dateLabel, issueNo: content.issueNo });

  console.log(`Paginated into ${sheetCount} sheet(s). Generating PDF...`);
  await page.pdf({ path: outPath, printBackground: true, preferCSSPageSize: true });
  console.log(`\n✓ PDF saved to: ${outPath}`);
} finally {
  await browser.close();
}
