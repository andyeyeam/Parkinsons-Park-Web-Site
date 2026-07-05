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
  await page.setContent(html, { waitUntil: 'domcontentloaded', timeout: 60000 });
  console.log('Generating PDF...');
  await page.pdf({
    path: outPath,
    format: 'A4',
    printBackground: true,
    margin: { top: '0', right: '0', bottom: '12mm', left: '0' },
    displayHeaderFooter: true,
    headerTemplate: '<span></span>',
    footerTemplate: `
      <div style="width:100%;font-family:'Segoe UI',system-ui,sans-serif;font-size:7.5pt;color:#a8a29e;
                  display:flex;justify-content:flex-end;padding:0 34px;box-sizing:border-box;">
        <span>Page <span class="pageNumber"></span> of <span class="totalPages"></span></span>
      </div>`,
  });
  console.log(`\n✓ PDF saved to: ${outPath}`);
} finally {
  await browser.close();
}
