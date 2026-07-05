// ─────────────────────────────────────────────────────────────────────────────
// THE PARK POST — fixed newsletter template
//
// This file owns the PERMANENT design & structure of the newsletter: the
// masthead, colours, fonts, section layout, and the standing adverts (Willow,
// the website) and footer. It should rarely change — changing it changes every
// future issue.
//
// The VARIABLE content of each issue lives in newsletters/issues/<YYYY-MM>.mjs
// and is passed in here as `content`. See that folder for the shape.
//
// Rendering is done by scripts/generate-newsletter-pdf.js.
// ─────────────────────────────────────────────────────────────────────────────
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync, existsSync } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

// ── Image library — reference these keys from an issue's content ──────────────
const IMAGE_FILES = {
  logo:       'src/assets/images/logo.jpg',
  hero:       'src/assets/images/PPHeroV3.jpg',
  bluebells:  'src/assets/images/ecology-bluebells.jpg',
  gala:       'src/assets/images/childrens-gala.jpg',
  carnival:   'src/assets/images/guiseley-carnival.jpg',
  lantern:    'src/assets/images/lantern-parade.jpg',
  volunteers: 'src/assets/images/PPVolunteers.jpg',
  oaks:       'src/assets/images/peate-oak-trees.jpg',
  frank:      'src/assets/images/frank-parkinson.jpg',
  titheMap:   'src/assets/images/tithe-map-1838-detail.jpg',
  remembrance:'src/assets/images/remembrance.jpg',
  heritage:   'src/assets/images/heritage-open-days.jpg',
};

export const AVAILABLE_IMAGE_KEYS = Object.keys(IMAGE_FILES);

function img64(relativePath) {
  const fullPath = join(ROOT, relativePath);
  if (!existsSync(fullPath)) {
    console.warn(`  ⚠ Image not found: ${relativePath}`);
    return '';
  }
  const buf = readFileSync(fullPath);
  const ext = relativePath.split('.').pop().toLowerCase();
  const mime = ext === 'gif' ? 'image/gif' : ext === 'png' ? 'image/png' : 'image/jpeg';
  return `data:${mime};base64,${buf.toString('base64')}`;
}

function image(key) {
  if (!IMAGE_FILES[key]) {
    console.warn(`  ⚠ Unknown image key: "${key}". Available: ${AVAILABLE_IMAGE_KEYS.join(', ')}`);
    return '';
  }
  return img64(IMAGE_FILES[key]);
}

// ── HTML builder ──────────────────────────────────────────────────────────────
export function buildHtml(content) {
  const {
    issueNo, dateLabel, heroCaption, lede,
    chair, aroundPark = [], didYouKnow, events = [], eventImages = [], faqs = [],
  } = content;

  const aroundParkHtml = aroundPark.map(c => `
      <div>
        <h3 class="sub">${c.title}</h3>
        <p class="tight">${c.body}</p>
      </div>`).join('');

  const dykParagraphs = (didYouKnow.paragraphs || []).map(p => `<p>${p}</p>`).join('');

  const eventsHtml = events.map(e => `
        <div class="event"><div class="when">${e.when}</div><div class="what"><b>${e.title}</b> &mdash; ${e.body}</div></div>`).join('');

  const eventImagesHtml = eventImages.map((im, i) => `
        <img src="${image(im.key)}" alt="${im.caption || ''}" />
        <div class="fc">${im.caption || ''}</div>${i < eventImages.length - 1 ? '<div style="height:10px"></div>' : ''}`).join('');

  const faqsHtml = faqs.map(f => `
      <div>
        <p><span class="q">${f.q}</span><br />${f.a}</p>
      </div>`).join('');

  return /* html */ `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<style>
  @page { size: A4; }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --green: #064e3b;
    --green-mid: #047857;
    --green-light: #ecfdf5;
    --gold: #b45309;
    --ink: #1c1917;
    --stone: #57534e;
    --line: #e7e5e4;
    --cream: #faf9f7;
  }
  html { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  body { font-family: Georgia, 'Times New Roman', serif; color: var(--ink); background: #fff; font-size: 10.5pt; line-height: 1.5; }
  .sans { font-family: 'Segoe UI', system-ui, sans-serif; }

  /* ── Masthead ─────────────────────────────── */
  .masthead { display: flex; align-items: center; gap: 18px; padding: 22px 34px 16px; border-bottom: 3px solid var(--green); }
  .masthead img.logo { width: 70px; height: 70px; border-radius: 50%; object-fit: cover; border: 2px solid var(--green); }
  .masthead .title { flex: 1; }
  .masthead .kicker { font-family: 'Segoe UI', system-ui, sans-serif; text-transform: uppercase; letter-spacing: 3px; font-size: 8pt; color: var(--green-mid); font-weight: 700; }
  .masthead h1 { font-size: 26pt; color: var(--green); line-height: 1.05; margin: 2px 0; letter-spacing: -0.5px; }
  .masthead .issue { text-align: right; font-family: 'Segoe UI', system-ui, sans-serif; font-size: 8.5pt; color: var(--stone); line-height: 1.5; }
  .masthead .issue strong { color: var(--green); display: block; font-size: 10pt; }

  /* ── Hero band ────────────────────────────── */
  .hero { position: relative; height: 190px; overflow: hidden; }
  .hero img { width: 100%; height: 100%; object-fit: cover; object-position: center 55%; }
  .hero .cap { position: absolute; bottom: 0; left: 0; right: 0; background: linear-gradient(transparent, rgba(6,78,59,0.82)); color: #fff; font-family: 'Segoe UI', system-ui, sans-serif; font-size: 8.5pt; padding: 26px 34px 8px; text-align: right; font-style: italic; }

  /* ── Layout ───────────────────────────────── */
  .wrap { padding: 20px 34px 8px; }
  .lede { font-size: 11.5pt; color: var(--stone); line-height: 1.6; border-left: 3px solid var(--green-mid); padding-left: 14px; margin-bottom: 20px; }
  .lede b { color: var(--green); }

  /* Section heading sits tight to the box/content beneath it */
  h2.sect { font-family: 'Segoe UI', system-ui, sans-serif; font-size: 13pt; color: var(--green); font-weight: 800; margin: 20px 0 7px; padding-bottom: 5px; border-bottom: 1.5px solid var(--line); display: flex; align-items: center; gap: 8px; letter-spacing: -0.2px; }
  h2.sect .dot { width: 9px; height: 9px; border-radius: 50%; background: var(--gold); flex: none; }
  h3.sub { font-family: 'Segoe UI', system-ui, sans-serif; font-size: 10.5pt; color: var(--ink); font-weight: 700; margin: 6px 0 3px; }
  p { margin-bottom: 9px; }
  p.tight { margin-bottom: 4px; }

  .cols { display: flex; gap: 22px; }
  .cols > div { flex: 1; }

  .figure img { width: 100%; height: 130px; object-fit: cover; border-radius: 6px; border: 1px solid var(--line); }
  .figure .fc { font-family: 'Segoe UI', system-ui, sans-serif; font-size: 7.8pt; color: var(--stone); font-style: italic; margin-top: 4px; }

  /* ── Feature / Did You Know box (tight to heading) ─ */
  .feature { break-inside: avoid; display: flex; gap: 0; border: 1.5px solid var(--green); border-radius: 10px; overflow: hidden; margin: 0 0 6px; background: var(--green-light); }
  .feature .txt { padding: 15px 18px; flex: 1.35; }
  .feature .pic { flex: 1; }
  .feature .pic img { width: 100%; height: 100%; object-fit: cover; }
  .feature .badge { display: inline-block; font-family: 'Segoe UI', system-ui, sans-serif; background: var(--gold); color: #fff; font-size: 7.5pt; font-weight: 800; text-transform: uppercase; letter-spacing: 1.5px; padding: 3px 9px; border-radius: 20px; margin-bottom: 7px; }
  .feature h3 { font-size: 14pt; color: var(--green); margin-bottom: 6px; line-height: 1.15; }
  .feature p { font-size: 10pt; margin-bottom: 7px; }
  .feature p:last-child { margin-bottom: 0; }

  /* ── Callout boxes (tight to heading) ─────── */
  .box { break-inside: avoid; border: 1px solid var(--line); border-radius: 10px; padding: 15px 18px; margin: 0 0 6px; background: var(--cream); }
  .box.green { background: var(--green); color: #fff; border: none; }
  .box.green h3, .box.green a { color: #fff; }
  .box.green .badge { background: rgba(255,255,255,0.2); color: #fff; }
  .willow { display: flex; gap: 16px; align-items: flex-start; }
  .willow .leaf { font-size: 30pt; line-height: 1; flex: none; }
  .box h3 { font-family: 'Segoe UI', system-ui, sans-serif; font-size: 11.5pt; margin-bottom: 5px; }
  .box .badge { display: inline-block; font-family: 'Segoe UI', system-ui, sans-serif; font-size: 7.5pt; font-weight: 800; text-transform: uppercase; letter-spacing: 1.5px; padding: 3px 9px; border-radius: 20px; margin-bottom: 7px; background: var(--green-light); color: var(--green); }
  a { color: var(--green-mid); text-decoration: none; font-weight: 700; }
  .url { font-family: 'Segoe UI', system-ui, sans-serif; font-size: 9.5pt; }

  ul.clean { list-style: none; margin: 4px 0 6px; }
  ul.clean li { padding: 3px 0 3px 18px; position: relative; font-size: 10pt; }
  ul.clean li::before { content: '\\203A'; position: absolute; left: 2px; color: var(--gold); font-weight: 800; }

  /* ── Events (wide date column so labels never collide) ─ */
  .event { display: flex; gap: 10px; align-items: baseline; padding: 7px 0; border-bottom: 1px dotted var(--line); break-inside: avoid; }
  .event:last-child { border-bottom: none; }
  .event .when { font-family: 'Segoe UI', system-ui, sans-serif; font-weight: 800; color: var(--gold); font-size: 8pt; width: 108px; flex: none; text-transform: uppercase; letter-spacing: 0.3px; padding-right: 6px; line-height: 1.35; }
  .event .what b { font-family: 'Segoe UI', system-ui, sans-serif; }

  /* ── FAQ ──────────────────────────────────── */
  .faq { break-inside: avoid; }
  .faq p { margin-bottom: 6px; }
  .faq .q { font-family: 'Segoe UI', system-ui, sans-serif; font-weight: 700; color: var(--green); }

  /* ── Footer ───────────────────────────────── */
  .footer { margin-top: 20px; background: var(--green); color: #fff; padding: 16px 34px; font-family: 'Segoe UI', system-ui, sans-serif; font-size: 8.8pt; display: flex; justify-content: space-between; align-items: center; gap: 20px; }
  .footer a { color: #a7f3d0; }
  .footer .r { text-align: right; line-height: 1.6; }
  .divider-note { text-align: center; font-family: 'Segoe UI', system-ui, sans-serif; font-size: 8pt; color: var(--stone); margin: 12px 0 2px; }
</style>
</head>
<body>

  <!-- Masthead -->
  <div class="masthead">
    <img class="logo" src="${image('logo')}" alt="FOPP logo" />
    <div class="title">
      <div class="kicker">Friends of Parkinson&rsquo;s Park &middot; Guiseley</div>
      <h1>The Park Post</h1>
    </div>
    <div class="issue">
      <strong>Issue No.&nbsp;${issueNo}</strong>
      ${dateLabel}<br />Community Newsletter
    </div>
  </div>

  <!-- Hero -->
  <div class="hero">
    <img src="${image('hero')}" alt="Parkinson's Park" />
    <div class="cap">${heroCaption}</div>
  </div>

  <div class="wrap">

    <p class="lede">${lede}</p>

    <!-- Note from the Chair -->
    <h2 class="sect"><span class="dot"></span>Note from the Chair &mdash; ${chair.name}</h2>
    <p>${chair.body}</p>

    <!-- Around the Park -->
    <h2 class="sect"><span class="dot"></span>Around the Park</h2>
    <div class="cols">${aroundParkHtml}
    </div>

    <!-- Did You Know feature -->
    <h2 class="sect"><span class="dot"></span>Did You Know?</h2>
    <div class="feature">
      <div class="txt">
        <span class="badge">Fact from the Park &mdash; No.&nbsp;${didYouKnow.number}</span>
        <h3>${didYouKnow.title}</h3>
        ${dykParagraphs}
      </div>
      <div class="pic"><img src="${image(didYouKnow.image)}" alt="${didYouKnow.title}" /></div>
    </div>

    <!-- Volunteer or Member (standing section) -->
    <h2 class="sect"><span class="dot"></span>Volunteer or Member &mdash; what&rsquo;s the difference?</h2>
    <div class="cols">
      <div>
        <ul class="clean">
          <li><b>Volunteer</b> &mdash; lends a hand at specific events, such as working parties, the gala, or lighting the Christmas entrances.</li>
          <li><b>Member</b> &mdash; receives news and updates, and keeps a general, friendly eye on the park.</li>
        </ul>
      </div>
      <div>
        <p class="tight">Either way, your help and support is hugely appreciated. This park is part of our community, and all of us enjoy it. If you&rsquo;d like to get involved, we&rsquo;d love to hear from you:</p>
        <p class="url"><a href="mailto:parkinsonspark@gmail.com">parkinsonspark@gmail.com</a></p>
      </div>
    </div>

    <!-- What's coming up -->
    <h2 class="sect"><span class="dot"></span>What&rsquo;s Coming Up</h2>
    <div class="cols">
      <div style="flex:1.5">${eventsHtml}
      </div>
      <div class="figure">${eventImagesHtml}
      </div>
    </div>

    <!-- Meet Willow (standing advert) -->
    <h2 class="sect"><span class="dot"></span>Meet Willow &mdash; Ask Our Chatbot Anything</h2>
    <div class="box green">
      <div class="willow">
        <div class="leaf">&#127807;</div>
        <div>
          <span class="badge">On the website</span>
          <h3>Willow, your friendly park guide</h3>
          <p style="margin-bottom:7px">Willow is our friendly chatbot, right there on the website. Ask her anything about Parkinson&rsquo;s Park &mdash; its history, wildlife, geology, events and volunteering &mdash; or about the wider Aireborough area, from Guiseley and Yeadon to Rawdon, Hawksworth and Esholt. She replies in plain, patient English, any time of day.</p>
          <p style="margin-bottom:0" class="url">Try her now at <a href="https://parkinsonspark.co.uk">parkinsonspark.co.uk</a> &mdash; look for the chat button.</p>
        </div>
      </div>
    </div>

    <!-- Explore the website (standing advert) -->
    <h2 class="sect"><span class="dot"></span>Explore the Website</h2>
    <div class="box">
      <span class="badge">parkinsonspark.co.uk</span>
      <p class="tight">Our website is packed with things to discover. Have a wander through:</p>
      <div class="cols">
        <div>
          <ul class="clean">
            <li>An interactive <b>4,000-year history</b> timeline &mdash; from Bronze Age settlers to Viking farmers to the Parkinson brothers</li>
            <li><b>Ecology &amp; geology</b> of the park, including its birds, wildflowers and the Guiseley Gap</li>
          </ul>
        </div>
        <div>
          <ul class="clean">
            <li>A growing <b>photo archive</b> of the park through the years</li>
            <li><b>Events, volunteering</b> and how to get involved</li>
          </ul>
        </div>
      </div>
      <p style="margin-bottom:0" class="url">Visit <a href="https://parkinsonspark.co.uk">parkinsonspark.co.uk</a>
      &nbsp;&bull;&nbsp; Join us on Facebook: <a href="https://www.facebook.com/groups/parkinsonspark/">facebook.com/groups/parkinsonspark</a></p>
    </div>

    <!-- FAQ -->
    <h2 class="sect"><span class="dot"></span>Frequently Asked Questions</h2>
    <div class="faq cols">${faqsHtml}
    </div>
    <p class="divider-note"><b>Have a burning question?</b> Please ask &mdash; email <a href="mailto:parkinsonspark@gmail.com">parkinsonspark@gmail.com</a> and we may answer it in the next issue.</p>

  </div>

  <!-- Footer -->
  <div class="footer">
    <div>
      <b>Friends of Parkinson&rsquo;s Park</b> (FOPP)<br />
      A Community Interest Company &middot; Guiseley, West Yorkshire<br />
      The Park Post &middot; Issue No. ${issueNo} &middot; ${dateLabel}
    </div>
    <div class="r">
      <a href="mailto:parkinsonspark@gmail.com">parkinsonspark@gmail.com</a><br />
      <a href="https://parkinsonspark.co.uk">parkinsonspark.co.uk</a><br />
      <a href="https://www.facebook.com/groups/parkinsonspark/">facebook.com/groups/parkinsonspark</a>
    </div>
  </div>

</body>
</html>`;
}
