---
name: newsletter
description: Create the next monthly issue of "The Park Post", the Friends of Parkinson's Park community newsletter, as a polished PDF. Use when the user asks to build/produce/draft a newsletter, a new issue, or "the Park Post". Guarantees consistent design and process across months.
---

# The Park Post — monthly newsletter

You produce **The Park Post**, the Friends of Parkinson's Park (FOPP) community
newsletter, as an A4 PDF. The design is fixed; only the content changes each month.
Follow this process exactly so every issue is consistent.

## How the system is structured
- **Fixed design** → `newsletters/template.mjs`. Owns the masthead ("The Park Post"),
  colours, fonts, layout, and the **standing adverts** (Willow chatbot + the website)
  and footer. Rarely edit this — changing it changes every issue.
- **Per-issue content** → `newsletters/issues/<YYYY-MM>.mjs` (one file per issue,
  `export default { … }`). This is the ONLY file you normally create each month.
- **Fact log** → `newsletters/facts-used.md`. Records every "Did You Know?" fact so
  they never repeat, plus a bank of candidate facts.
- **Generator** → `scripts/generate-newsletter-pdf.js`. Run:
  `node scripts/generate-newsletter-pdf.js <YYYY-MM>`. Outputs
  `~/Downloads/FOPP Newsletter - <dateLabel>.pdf`.

## Steps to build a new issue
1. **Read the previous issue** in `newsletters/issues/` (highest date) to copy tone,
   structure, and note the last `issueNo`. Increment it by 1 for the new issue.
2. **Gather this month's content** from the user (chair's note, park news, events,
   dates). If they provide a draft (e.g. a .docx), extract text with:
   `unzip -p "file.docx" word/document.xml | sed 's/<[^>]*>/ /g'`.
   - **Strip every placeholder** — remove `XXX`, "insert …", "picture of Jack", TBC
     dates, etc. Keep only known detail. If a date is unknown, drop the date, keep the item.
   - Fix obvious typos (e.g. "Gusieley" → "Guiseley").
   - For "report antisocial behaviour", use West Yorkshire Police **101** (999 emergency).
3. **Pick a fresh "Did You Know?" fact.** Open `newsletters/facts-used.md`; choose a fact
   NOT already used (use the candidate bank or mine a new one from the repo — the live site
   is a hash-routed SPA that WebFetch can't read, so read source instead:
   `pages/History.tsx`, `pages/Ecology.tsx`, `pages/Geology.tsx`, `willowKnowledge.ts`).
   Number it = previous fact number + 1. After the issue is built, **append it to the
   table in `facts-used.md`**.
4. **Write `newsletters/issues/<YYYY-MM>.mjs`** — copy the previous issue's file as the
   template for the shape. Fill: `issueNo`, `dateLabel`, `heroCaption`, `lede`,
   `chair`, `aroundPark[]`, `didYouKnow`, `events[]`, `eventImages[]`, `faqs[]`.
   - `lede` for issue 1 was a "welcome"; for later issues make it a short seasonal intro.
   - Image keys available are listed at the top of the issue file and in `template.mjs`
     (`AVAILABLE_IMAGE_KEYS`). Only use keys that exist.
5. **Generate**: `node scripts/generate-newsletter-pdf.js <YYYY-MM>`.
6. **Verify visually** (do not skip): dump HTML and screenshot each A4 page, then Read the
   PNGs to check for overflow, collisions, awkward page breaks, and that images loaded:
   ```
   HTML_OUT="scratch_nl.html" node scripts/generate-newsletter-pdf.js <YYYY-MM>
   # then a small puppeteer script: viewport 794px wide, goto file://…/scratch_nl.html,
   # screenshot 794x1123 slices → scratch_p1.png, p2… ; Read them.
   ```
   Clean up `scratch_*` files afterward.
7. **Update `facts-used.md`** with the fact you used.

## Standing requirements for every issue
- Title is always **"The Park Post"** with the FOPP masthead.
- Always include the **Willow chatbot advert** and the **website advert** (both are baked
  into `template.mjs` — don't remove them).
- Always include a numbered **"Did You Know?"** fact, never repeated.
- Contact everywhere is **parkinsonspark@gmail.com** / **parkinsonspark.co.uk** /
  Facebook group `facebook.com/groups/parkinsonspark`.
- Tone: warm, plain, community-friendly; British spelling; no placeholders in the output.

## Tips
- Keep images moderate in size for a reasonable PDF (avoid the multi-MB originals like
  `hero-image.jpg`/`peate-oak-trees.jpg` when a smaller one works).
- If content overflows a page awkwardly, trim body copy rather than shrinking fonts.
