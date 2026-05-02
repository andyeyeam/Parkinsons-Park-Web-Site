import puppeteer from 'puppeteer';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync, existsSync } from 'fs';
import https from 'https';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ── Embed local images as base64 ──────────────────────────────────────────────
function img64(relativePath) {
  const fullPath = join(__dirname, relativePath);
  if (!existsSync(fullPath)) {
    console.warn(`  ⚠ Image not found: ${relativePath}`);
    return '';
  }
  const buf = readFileSync(fullPath);
  const ext = relativePath.split('.').pop().toLowerCase();
  const mime = ext === 'gif' ? 'image/gif' : ext === 'png' ? 'image/png' : 'image/jpeg';
  return `data:${mime};base64,${buf.toString('base64')}`;
}

const images = {
  tithemap:      img64('src/assets/images/tithe-map-1838-detail.jpg'),
  driver:        img64('src/assets/images/driver-gravestone.jpg'),
  clapperBrow:   img64('src/assets/images/clapper-brow.jpg'),
  lynchet:       img64('src/assets/images/lynchet-crooked-lands.jpg'),
  geophysics:    img64('src/assets/images/geophysics-team-2013.jpg'),
  wakefield:     img64('src/assets/images/wakefield-deeds-researchers.jpg'),
  haymaking:     img64('src/assets/images/haymaking-eragny.jpg'),
  newDykes:      img64('src/assets/images/new-dykes-gate.jpg'),
  peateOaks:     img64('src/assets/images/peate-oak-trees.jpg'),
  frank:         img64('src/assets/images/frank-parkinson.jpg'),
  parkinsonBldg: img64('src/assets/images/parkinson-building-leeds.jpg'),
  sledging:      img64('src/assets/images/snow-sledging.gif'),
  oldMansCorner: img64('src/assets/images/old-mans-corner.jpg'),
  greatBrow:     img64('src/assets/images/great-brow.jpg'),
};

// WordPress-hosted images — fetched as base64 before PDF generation
const wp = 'https://friendsofparkinsonspark.wordpress.com/wp-content/uploads';
const wpImageUrls = {
  siteMeeting:   `${wp}/2011/11/site-meeting-parkinsons-park-nov-2011.jpg`,
  jubileePicnic: `${wp}/2012/06/dsc01628-1024x727.jpg`,
  lanternParade: `${wp}/2016/06/park-2.jpeg`,
  gala2019:      `${wp}/2019/09/childrens-gala-2019-1.jpg`,
  fitAward:      `${wp}/2022/07/copy-of-uks-favourite-parks-2022.jpg`,
};

async function fetchBase64(url) {
  return new Promise((resolve) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if (res.statusCode !== 200) {
        console.warn(`  ⚠ Could not fetch ${url} (status ${res.statusCode}), skipping`);
        resolve('');
        return;
      }
      const chunks = [];
      res.on('data', (c) => chunks.push(c));
      res.on('end', () => {
        const buf = Buffer.concat(chunks);
        const ext = url.split('.').pop().toLowerCase().replace(/\?.*/, '');
        const mime = ext === 'png' ? 'image/png' : ext === 'gif' ? 'image/gif' : 'image/jpeg';
        resolve(`data:${mime};base64,${buf.toString('base64')}`);
      });
    }).on('error', (err) => {
      console.warn(`  ⚠ Failed to fetch ${url}: ${err.message}`);
      resolve('');
    });
  });
}

// ── HTML helpers ──────────────────────────────────────────────────────────────
const fig = (src, caption) =>
  `<figure><img src="${src}" alt="${caption}"><figcaption>${caption}</figcaption></figure>`;

const figPair = (l, r) =>
  `<div class="img-pair">
    <figure><img src="${l.src}" alt="${l.cap}"><figcaption>${l.cap}</figcaption></figure>
    <figure><img src="${r.src}" alt="${r.cap}"><figcaption>${r.cap}</figcaption></figure>
  </div>`;

const quote = (text, attr = '') =>
  `<blockquote><p>${text}</p>${attr ? `<p class="attr">${attr}</p>` : ''}</blockquote>`;

const h2 = t => `<h2>${t}</h2>`;
const h3 = t => `<h3>${t}</h3>`;
const p  = (t, cls = '') => `<p${cls ? ` class="${cls}"` : ''}>${t}</p>`;
const extLink = (href, label, desc) =>
  `<div class="ext-link"><a href="${href}" target="_blank">${label}</a><br><span>${desc}</span></div>`;

// ── Chapter headers ───────────────────────────────────────────────────────────
const chapterHeader = (num, title, subtitle) =>
  `<div class="chapter-header">
    <div class="chapter-num">Chapter ${num} of 5 — All Our Stories</div>
    <div class="chapter-title">${title}</div>
    <div class="chapter-subtitle">${subtitle}</div>
  </div>`;

// ── Chapter content ───────────────────────────────────────────────────────────
const chapter1 = `
  ${chapterHeader(1, 'History &ndash; All Our Stories', 'Where to start? Names are a window on the past')}

  ${p(`In 2012 the FOPP were given a grant from the Heritage Lottery Fund to research the history of Parkinson&rsquo;s Park as part of the Great British Story. A heritage project designed to celebrate the Diamond Jubilee of Queen Elizabeth ll by telling All Our Stories, the history of &lsquo;ordinary&rsquo; people. Little did we know what an interesting story we would find. The research and interpretation were done by local historians Jennifer Kirkby and Barbara Winfield, two of the founder members of FOPP.`, 'intro')}

  ${fig(images.tithemap, "Outline of Parkinson's Park on the 1838 Leeds Tithe Map")}

  ${h2('Where to start?')}

  ${p(`On the Leeds tithe map of 1838 the fields that now make up Parkinson&rsquo;s Park are shown as meadow and pasture. They sit on the side of the Chevin below Whale Jaws Hill, between Kelcliffe Lane and the flatter valley floor of Greenshaw Close and Kelcliffe Dole. Guiseley at that time was still, just about, a rural pastoral farming and weaving community, but the industrial revolution was gathering pace. The land of the now Park belonged to local farmers, Marshall Grimshaw of Kelcliffe House, Benjamin Popplewell from Upper End Farm, as well as Betty Pawson from Guiseley, and Mrs Frances Foss who lived in Scarborough but came from a longstanding local Quaker family. This time of change from the old world to the modern was the starting point for research on the Park&rsquo;s story.`)}

  ${h2('Names are a window on the past')}

  ${p(`The tithe map gave us the field names; these then were our first window on the past; who gave the name, why, and when, and has it changed. In old documents field names are like maps, and always recorded. Different eras have different naming conventions and use of language, but names do change with time so noting acres, rods and perches is important.`)}

  ${p(`The area around the park has been known for centuries as Kelcliffe (spelt in a variety of ways). The name is Old Norse for a steep area where there are springs &ndash; an apt description for the local geology. This tells us that the name has been in use since the viking era when Guiseley was part of Jorvik (AD 866-950) and people with names such as Ivan the Boneless and Eric Bloodaxe rode across the Chevin between York and Dublin. The local area has many Old Norse names.`)}

  ${p(`The steep part at the north-west end was called Great Brow in 1838, but research on old deeds quickly revealed that Marshall Grimshaw had brought the land in 1837 and renamed a lot of the fields. Great Brow had been called Potterton Brow. This, we eventually found, was the name of a local family &ndash; John Potterton was &lsquo;buried by the Parish&rsquo; in 1713, and a Potterton is listed as a manor tenant in 1675.`)}

  ${p(`During the 17th century the medieval common field system gave way to &lsquo;enclosure by agreement&rsquo;. That is to say, the manor tenants agreed amongst themselves to divide up the common fields and then swap portions so that they each had a bigger area in one place. They then walled off their plot. There is a 1639 enclosure agreement in the Guiseley Parish Records, doaling out the Common Close to 13 families. This was also a time when land was being reclaimed from the common &ndash; a practice called intaking recalled in places such as Intake Farm. These new walled areas, often called a close, were then named after the family that occupied them. But what was often lost was the &lsquo;medieval name&rsquo; &ndash; where now is Raven&rsquo;s Toft?`)}

  ${p(`But why had Marshall Grimshaw renamed the fields? Further digging revealed that the Kelcliffe House area and its tenements had been a tannery since at least the 17th century eg Tanhouse Brow had been the name for the area behind Hillside Avenue. Further work on owners, including the Driver family, and past sales confirmed this.`)}

  ${fig(images.driver, "Richard Driver's gravestone at Guiseley Churchyard — the Driver family was involved with the historic tannery at Kelcliffe House")}

  ${p(`The tanning of leather was very important in rural communities, not only for clothes, but for buckets, harnesses, and the belts that ran the looms and farm machinery. Tanning was a smelly business often kept away from a village, it needed oak bark for tannin, urine and running water, as well as a good supply of cows and sheep. Kelcliffe had been a perfect place where large tan pits had been dug and skins hung to dry in the wind. But in 1837 tanning was being industrialised and Mr Grimshaw was building a new dairy farm for a new market!!`)}

  ${p(`The name Clapper Brow, the very steep part where the wood now is, hinted that there might have been a medieval rabbit warren there; Clapper is middle-English for &lsquo;rabbit hole&rsquo;. Rabbits were farmed at various times during the past &ndash; a good source of food, fur and leather. After the Black Death in 1348, when there were fewer people to cultivate land, was one such time. The Odda at Hawksworth was also an old rabbit warren and there is an Iron Age hill fort in Bedfordshire known as Sharpenhoe Clappers later used as a medieval warren. Warrens need sandy soil and slopes. However, we have not found conclusive dating evidence yet, only the name, which goes back to at least the 16th century.`)}

  ${fig(images.clapperBrow, "The wooded area of Clapper Brow — site of the possible medieval rabbit warren")}

  ${p(`One of the most interesting field names in the park is Crooked Lands, the area to the South East, between the farm gate and Greenshaw Terrace. The meaning of this name became clearer during a geophysics exploration (which was done with the same team used on the television series Time Team) that we commissioned in 2013 as part of the project. This revealed that the banks were early medieval lynchets and headlands &ndash; highly likely to be pre 1066 &ndash; or Anglo Saxon. That took the Park&rsquo;s history back to perhaps the 8th century.`)}

  ${p(`Crooked Lands refers to the banks and their slight backward S shape, which was caused by the way the land was ploughed with teams of Oxen. Early court rolls of the Manor show that local farmers were forever being fined for taking their carts over Crooked Lands to the West Field. The West Field was one of a three field, open field, system &ndash; and was around the top of Kelcliffe Avenue/Lane, and the fields and houses behind the school. It is also the reason for Crooklands house being so-called.`)}

  ${fig(images.lynchet, "Lynchet (early medieval terraced field boundary) on Crooked Lands — highly likely to be pre-1066, or Anglo Saxon")}

  ${p(`Names of the fields, and an analysis of stone wall construction around the Park, indicated that the whole area has been in use from very early times, certainly well before 1066. Flatts, which gives its name to local houses Flatfield and Top&rsquo;o&rsquo;t&rsquo;Flatts is the area of The Sycamores. A flatt was a bundle of furlong long farming strips which were each farmed by different tenants of the Lord of the Manor. New Dykes, means an early extension of cultivated farming land on to the Common. The geophysics survey took the potential archaeological remains back to Romano-British times (AD 43 &ndash; 410). All of which was a lot more than we had thought we would find when we began the All Our Stories project!!`)}

  ${fig(images.geophysics, "The geophysics survey team at work in Parkinson's Park — using the same methods as the television series Time Team")}
`;

const chapter2 = `
  ${chapterHeader(2, 'History &ndash; People', 'Looking at the personal stories')}

  ${p(`Field names, old land deeds, parish records and manor court rolls are one source of historic research; another is the ups and downs of family fortunes. Both Jennifer and Barbara are experienced in family history research and this too was a rich seam for revealing the Park&rsquo;s past. A particularly interesting century was the 18th &ndash; when the agricultural revolution took off and social mobility became much more fluid.`, 'intro')}

  ${fig(images.wakefield, "Jennifer Kirkby and Barbara Winfield at the Wakefield Deeds Office")}

  ${p(`The Manor of Guiseley and Esholt was sold to its tenants in 1719. It then became possible for local farmers like Quaker John Blessard, Stephen and Martha Overend and socially mobile widow Susannah Walker to harness new technology such as iron-plate ploughs and try new crops such as potatoes.`)}

  ${p(`As the 18th century rolled on the fields were brought and sold, some becoming part of the accumulated &lsquo;estates&rsquo; of emerging &lsquo;Gentlemen&rsquo; such as John Burton of Wakefield. Mr Burton rented out land to be farmed by reliable local tenants who would look after its fertility &ndash; people such as Churchwarden James Leadbetter, who was the occupier of the top field of the Park called <strong><em>Little Kelcliffe</em></strong>. <strong><em>Little Kelcliffe</em></strong> we found was frequently used for meadow and hay making a practice confirmed by both a metal detecting survey and stories from older Guiseley people who took time of school to help.`)}

  ${figPair(
    { src: images.haymaking, cap: "Hay-making — the use of Little Kelcliffe field, confirmed by metal detecting surveys and local oral histories" },
    { src: images.newDykes,  cap: "New Dykes gate — marking an early extension of cultivated farming land on to the Common" }
  )}

  ${p(`As the 18th century turned into the 19th, the great Georgian house building period began, as people grew wealthier, became clothiers, and wanted bigger and better houses: it is during this time that some of the older houses around the Park along Kelcliffe Lane were built &ndash; including Flatfield House, New Dykes, and Crooklands followed by Kelcliffe Mount. The lane itself had only been made up around 1709 to go to the tannery, previously it had been a simple riding way and footpath.`)}

  ${h3('The Jonathan Peate connection')}

  ${p(`Around 1900, as Guiseley became a thriving manufacturing township, complete with public buildings and modern transport such as trams and railways, the land around the park was bought by local woollen cloth manufacturer and philanthropist Jonathan Peate. Jonathan was well-known for buying land and helping the local working men to acquire allotments and houses on favourable term. He also presented land to the urban district councils of Yeadon and Guiseley to use for public buildings eg Yeadon Town Hall or as public open space eg Nunroyd Park. We found in the deeds that he had purchased Clapper Brow and it is likely that around 1909, the time of the coronation of George V, he planted the oak trees that still line the boundary in what is now a small wood.`)}

  ${fig(images.peateOaks, "Peate's oak trees — planted around 1909 at the time of the coronation of George V")}
`;

const chapter3 = `
  ${chapterHeader(3, 'History &ndash; F &amp; A Parkinson', "Frank and Albert Parkinson's journey begins")}

  ${p(`Around this time, down in a shed at Eldon Mount, young Frank Parkinson was starting his electrical motor agency business with &pound;21 from his post office savings.`, 'intro')}

  ${p(`The son of a local quarry owner on Moor Lane, Frank was an astute and forward thinking young man, and his business grew.`)}

  ${p(`In 1913 his brother Albert joined the firm and the brothers turned to manufacturing motors.`)}

  ${p(`So, during the First World War they moved their works on to Jonathan Peate&rsquo;s land (Greenshaw Close) in Netherfield Road.`)}

  ${p(`In hindsight this move was akin to the handing over of the local philanthropy baton from Jonathan to Frank &ndash; Jonathan died in 1924.`)}

  ${fig(images.frank, "Frank Parkinson — co-founder of F & A Parkinson Ltd")}

  ${quote('he regarded himself as the trustee for whatever worldly possessions he had, and whatever use he made of them should be for the good of the country and in particular of this county', 'From Frank Parkinson&rsquo;s 1946 obituary')}

  ${p(`In 1918 F &amp; A Parkinson Ltd bought the Netherfield land from Jonathan, and a field called Kelcliffe Dole from the church, and expanded their factory.`)}

  ${p(`Jonathan also acted as their mortgagee. Thus, the first field of the park, Clapper Brow, came into the company&rsquo;s ownership.`)}

  ${p(`The company continued to thrive, even through the Great Depression, building their success on the ethos of &lsquo;practical idealism&rsquo; (high wages for loyal staff and low productions costs for quality good)`)}

  ${p(`In 1927, they joined forces with Crompton&rsquo;s, a lighting firm from Chelmsford.`)}

  ${p(`The firm thus became Crompton Parkinson Ltd, greatly increasing the share value of the many small Guiseley and Wharfedale shareholders who had invested in F &amp; A Parkinsons.`)}

  ${p(`In 1932, the Netherfield Road site was again extended with the building of a lamp works for manufacturing Crompton light bulbs.`)}

  ${h3("Parkinson&rsquo;s Park replaces Guiseley Recreation Ground")}

  ${p(`In 1936/37 they bought the remaining fields of the Park and set about laying the footpaths from the old stone walls, putting in gates at the entrances, and seats along the ridge.`)}

  ${p(`In the early 1950&rsquo;s the two copses were planted to celebrate the national events of the Queen&rsquo;s Coronation and the Festival of Britain.`)}

  ${p(`During research on personal stories people told us that they were specifically designed in a certain shape &ndash; but no-one could remember what, and no paperwork existed to tell us.`)}

  ${p(`It was only during other research that we realized that the top copse is in the shape of Yeadon (the Parkinson&rsquo;s mother had been a member of the old Yeadon family) whilst the lower copse, which stood directly above the drive into the factory, is the outline of Guiseley.`)}

  ${p(`Nearer the factory the Parkinsons carved out a bowling and putting green together with a rose garden, tennis courts and a pavilion.`)}

  ${p(`Part of the motivation for setting up the Park and giving it to the People of Guiseley, may have come from the loss of Guiseley Recreation Ground, on Kelcliffe Lane to council housing in the early 1920&rsquo;s.`)}

  ${p(`In recompense, Jonathan Peate gave land at Nethermoor for a Park with an outline of how it should be turned into a Pleasure Park and cricket ground.`)}

  ${p(`However, Jonathan died before this had all taken place; so it could well have been that F &amp; A Parkinson decided that the area behind their factory could serve as both a place of rest and recreation for their staff and the people of the area.`)}

  ${p(`A description of the old Kelcliffe Lane Recreation Ground at the time, is very similar to that of Parkinson&rsquo;s Park.`)}

  ${h3("Frank Parkinson&rsquo;s legacy to Yorkshire and Guiseley")}

  ${p(`In 1946 Frank Parkinson, like his father before, suddenly died of a heart attack &ndash; amongst his legacies was the magnificent front of Leeds University (the Parkinson Building) which cost &pound;200,000`)}

  ${p(`He had moved to Berkshire in the 1930&rsquo;s to be close to London and transport to the many company outlets across the Empire.`)}

  ${p(`He left &pound;1.5 million pounds in his will: not bad going for a boy born in South View, Guiseley 59 years before.`)}

  ${p(`A very large proportion of this went to forming the Frank Parkinson Yorkshire Trust, which was to be used to help the poor, sick and elderly of Guiseley, and educate and support young people in electrical engineering.`)}

  ${p(`In addition, his will gave &pound;1,000 a year to be used for the benefit of the Crompton Parkinson staff.`)}

  ${fig(images.parkinsonBldg, "The Parkinson Building at the University of Leeds — part of Frank Parkinson's £1.5 million legacy")}

  ${h3("Annual events start in the Park")}

  ${p(`In 1949 the Crompton sports and social club launched their first summer Children&rsquo;s Gala in the park, which became an annual and much enjoyed event.`)}

  ${p(`This was followed in 1951 by the first September Flower and Produce Show, and, at some point, the October bonfire started, complete with firework display, and vans selling parkin and hotdogs.`)}
`;

const chapter4 = `
  ${chapterHeader(4, 'History &ndash; Recent Times', 'A timeless place to inspire the people of Guiseley')}

  ${h3('Best Friends')}

  ${p(`As we moved into more recent times personal stories became an important part of the All Our Stories research. People remembered that at the entrance to the park were put notices for all to know that the Park, whilst belonging to Parkinson&rsquo;s, was for the use and recreation of the people Guiseley. Thus, it became a place for the local children to have adventures, play hide and seek, fly kites, and, best of all, sledge down the hills in winter on the snow, and in summer on the grass. The &lsquo;Snowdrop&rsquo; was the sledging run down the steep slope of Great Brow, and the &lsquo;Bluebell Run,&rsquo; was on the more gentle slopes of Crooked Lands. Since then children have added the &lsquo;Suicide Run&rsquo; down the steep area above the old car park, near the woods.`, 'intro')}

  ${figPair(
    { src: images.sledging,      cap: "The 'Snowdrop' sledging run down the steep slope of Great Brow — a beloved winter tradition" },
    { src: images.oldMansCorner, cap: "'Old man's corner' — the triangular walled area near the churn stands on Kelcliffe Lane" }
  )}

  ${p(`For the older folk, the seats, the fabulous view, and the spirit of the land gave rest and inspiration &ndash; a deep link, to different, more rural times. The corner of the Park, near the churn stands on Kelcliffe Lane, had a triangular walled area, known as &lsquo;old man&rsquo;s corner&rsquo; &ndash; where people came to sit to watch the sun setting in the West of a summer&rsquo;s evening.`)}

  ${p(`It was a place where grandfathers took their grandsons to reminisce and learn country ways, and for mothers to take the little ones on nature walks: the park was a boon to dog walkers and factory workers alike. In the Netherfield corner they had their own annual bonfire party, where all the children spent weeks chumping for wood, and on the slopes of Clapper Brow the huge, stately trees were used for rope swings and collecting conkers.`)}

  ${h3('Sleeping Beauty')}

  ${p(`But, in 1968 Cromptons was taken over by Hawker Siddeley Aerospace, and many trace the company&rsquo;s demise from that date. Albert Parkinson died in 1971, and the family friendliness of the firm slowly dwindled. The following decades saw uncertainty grow with various buyouts and takeovers, until a final sale was made in 1999 to Cooper Industries. Cooper&rsquo;s asset stripped Cromptons, and the factories were eventually closed.`)}

  ${p(`In 2002, the land was sold to St Modwen Properties PLC, by Brook Crompton&rsquo;s of Huddersfield. Not being locals, neither company knew anything of the Park&rsquo;s history or use, and the unmanaged land began to rewild. The copses grew and filled up with rubbish and drug takers, the grass became a &lsquo;dogs toilet&rsquo;. The handmade heavy wooden gates fell into disrepair, or went missing, whilst a &lsquo;Sleeping Beauty&rsquo; thicket grew up around Jonathan&rsquo;s oak trees hiding their grandeur, and the ancient stone walls began to crumble. In 2006 Bellway dismantled the Crompton Parkinson factory, pulled up the bowling and putting greens and erected fences that blocked off the ancient track along the bottom of the park.`)}

  ${fig(images.greatBrow, "Great Brow — the 'Snowdrop' sledging slope, and the wider park landscape during the years of neglect")}
`;

const chapter5 = `
  ${chapterHeader(5, "History &ndash; Friends of Parkinson&rsquo;s Park", 'The regeneration of a community treasure')}

  ${p(`As local people, we watched this sad deterioration with heavy hearts and tears in our eyes, not knowing what the future had in store. It doesn&rsquo;t really help, but we found out later that a firm from Leeds had wanted to buy the factory to expand, but unfortunately it didn&rsquo;t happen! To make improvements, some residents took it upon themselves to try to reinstate the blocked public footpaths that crossed the Park, whilst others such as Christine Parapia organized a group in 2010 to clear litter; a task aided by a grant from Morrisons. Meanwhile, Bellway Homes insisted the land was a &lsquo;wild area, and would stay that way&rsquo;.`, 'intro')}

  ${h3('2011 The park is regenerated')}

  ${p(`In August 2011 Jennifer Kirkby initiated discussions with MP Stuart Andrew and Cllr Graham Latty about restoring the land to a useable condition, following research on it&rsquo;s past use as a Park given to the people of Guiseley. She and Christine Parapia met on 31 August and decided to set up the Friends as a constituted group. With the help of Cllr Latty, they opened discussions with developers Bellway.`)}

  ${p(`On 13 September 2011 a variety of concerned local people with a variety of skills came together to form the Friends of Parkinson&rsquo;s Park (FOPP) &ndash; Chris Parapia (Chair), Barbara Winfield, Jennifer Kirkby, Andy Cheetham, Joanna Brooks and Colin Alexander. Barbara and Jennifer had done some initial historic research which led to the Friend&rsquo;s name and the intention to restore the legacy of the Guiseley philanthropists, Frank and Albert Parkinson and Jonathan Peate. In addition it was decided to enhance the natural landscape of the Park in keeping with the Chevin Forest Park. This purpose for FOPP was written into the first constitution.`)}

  ${p(`Once constituted, FOPP&rsquo;s first task was to set up a website to keep residents informed via a blog to record progress and find out what people used the Park for and what it meant to them &ndash; so a call went out for stories and pictures from local people. The second, was to do an ecological and environmental audit for a landscape plan which was undertaken by Joanna and Peter Brooks with help from the Wharfedale Naturalists. Darren Shepherd shared his deep knowledge of the Park&rsquo;s bird life.`)}

  ${p(`In November 2011 the Friends together with Bellway, started to regenerate the Park, based on the landscape plan the Friend&rsquo;s had produced. Pudsey Landscapes were contracted to do a lot of the phase 1 regeneration work, Colin Alexander and Martyn Hornsby-Smith organized colleagues from Otley &amp; Wharfedale Dry Stone Wallers in the restoration of some of the crumbling stonework, whilst Andy Cheetham took on the task of organizing the fitting of new benches and working groups.`)}

  ${p(`There are many people to be thanked for their part in launching the regeneration of the Park, including people who simply continued on their own initiative to do small things such as litter picking and trying to stop anti-social behaviour and drug taking. The blog on this site follows the step by step progress.`)}

  ${fig('__WP_SITEMEETING__', "Site meeting at Parkinson's Park, November 2011 — the start of the regeneration")}

  ${h3('2012 Gave a real boost to the Park')}

  ${p(`The first open meeting for the Friends was held on 21 February 2012 as the opportunity to develop the Park was opened up to everyone who wanted to be involved. 2012 could not have been a better year to start getting people involved in the Park, as it was the year of both the Queen&rsquo;s Diamond Jubilee and the Olympics coming to the UK. Both events, gave rise to grants for landscape improvements helped by experienced fund-raiser Nicola Denson joining the team.`)}

  ${p(`Jubilee Walk at the top of Great Brow was planted with shrubs from the Woodland Trust, and an oak from the Queen&rsquo;s estate at Sandringham was planted as a commemorative tree &ndash; and stolen. After hearing the story on this blog the Sandringham team sent the Park a new tree.`)}

  ${p(`Grants also gave the Friends the means to relaunch the Children&rsquo;s Gala in June 2012 with a Jubilee Picnic and Games &ndash; a successful event which is growing each year, as more local groups join in.`)}

  ${p(`Finally in November 2012 FOPP was awarded an All Our Stories grant as part of The Great British Story programme organized by the Heritage Lottery Fund. This allowed for historical research, a geophysical survey, a study of the Park habitats and insect life, and research by David Leather from the West Yorkshire Geology Trust to unravel the geology and geomorphological events that made the Guiseley Gap &ndash; the area where the Park lies.`)}

  ${p(`A film of the Park&rsquo;s regeneration and the events of 2012 were also filmed by ex Crompton Parkinson employee and local film maker David Myers &ldquo;Parkinson&rsquo;s Park &ndash; A New Chapter&rdquo;.`)}

  ${fig('__WP_JUBILEEPICNIC__', "The Jubilee Picnic and Children's Gala relaunch, June 2012")}

  ${h3('2013 and beyond')}

  ${p(`The blogs on this site trace the evolution of FOPP and the Park Improvements. Just a taste of some mile stones include:`)}

  ${p(`In 2013, the Friends launched the first Lantern Parade, to replace the old Autumn Bonfire; an event which was joined by the local churches and community choir in 2014.`)}

  ${fig('__WP_LANTERNPARADE__', "The annual Lantern Parade — launched in 2013 to replace the old Autumn Bonfire")}

  ${p(`In 2015, the community orchard was planted using a Leeds City Council horticultural grant. Bellway left the site after seeding the wildflower meadow and Meadfleet took over basic maintenance.`)}

  ${p(`4th March 2016, the Friends of Parkinson&rsquo;s Park became a Community Interest Company, in order to better raise funds and look after the evolving Park on behalf of the community.`)}

  ${p(`In summer the first Codswallop Tales Told Lantern Parade and Firework Display was held. In August a bog garden was installed with the help of Open Country. And in October FOPP held the first Apple Day to celebrate the Community Orchard.`)}

  ${p(`2017, saw a rise in vandalism at the start of the year and a number of fires started; in response Park Watch was started. At the other end of the scale Forests Schools came to the Park for the newly formed Little Friends of Parkinson&rsquo;s Park.`)}

  ${p(`In 2018, the Park information boards were installed and Trail brochures printed. As the year ended the Park commemorated the 100th anniversary of the end of WWI with a Coffee Morning fund raiser and Home for Heroes Exhibition as one of a number of community events.`)}

  ${p(`2019 saw the running of a year long programme of all the events started previously including the long running Children&rsquo;s Gala. Other habitat enhancement work included the bog garden and the wildflower meadow.`)}

  ${fig('__WP_GALA2019__', "The Children's Gala 2019 — part of the year-long programme of annual events")}

  ${p(`In 2020 a short film was made of the development of FOPP by ITV Calendar for their Park Life set of programmes. It showed how the development of the Park had greatly helped and supported the local residents through the Covid Pandemic of Spring 2020.`)}

  ${p(`During the Government imposed covid lockdown from Nov 2020 to Spring 2022, the Park proved its community importance for health and wellbeing. In spite of ever changing regulations for the size and make up of &lsquo;gathering&rsquo; FOPP ran events that could be done by families, which also gave a feeling of social connection and community spirit. This included encouraging people to leave art around the Park including what came to be known as &lsquo;yarn bombing&rsquo;, contributing items to public displays for national events such as the annual Royal British Legion Remembrance and the passing of the Duke of Edinburgh, and a Christmas Elf and Easter Bunny trail. The Park was also a venue for small groups who were not allowed to meet indoors eg Guiseley Brass Band practice.`)}

  ${p(`On 24 February 2022 all Covid restrictions in England were thankfully lifted. Given two years of social containment, it was important in the 2022 event programme to bring people back together to rebuild social connection and mental health. It was fortunate that the Queen&rsquo;s Platinum Jubilee presented an excellent opportunity to achieve this. June 2022 saw FOPP hold a Jubilee picnic which encouraged people to join together in sharing food, art, and fancy dress. The centrepiece was the dedication of the Jubilee Tree, which was registered as part of The Queen&rsquo;s Green Canopy, and for which a professional story teller was engaged and a commemoration plaque installed.`)}

  ${p(`In August 2022 Parkinson&rsquo;s Park achieved &lsquo;Local Favourite&rsquo; status in Yorkshire, in the Fields In Trust&rsquo;s national vote to find the favourite Parks and Green Spaces in the UK.`)}

  ${fig('__WP_FITAWARD__', "Parkinson's Park named Yorkshire 'Local Favourite' in the Fields In Trust national vote, 2022")}

  ${p(`On 8 September 2022 Her Majesty Queen Elizabeth II died. FOPP subsequently published the Jubilee Story in a commemoration booklet for The Queen and her Green Canopy legacy. Written by Bradford author Irene Lofthouse, it also contained a hand-drawn illustration donated by Yorkshire artist Eleanor Tomlinson. Copies of the booklet have been lodged in local libraries, schools and heritage centres.`)}

  ${h3('So are we now history?')}

  ${p(`Slowly over the years the history of the Park and Kelcliffe area has re-emerged, pushing back the timeline. Features in the landscape indicate that the area has been in continuous use since at least the Bronze Age (BC 2,300 &ndash; 801) probably earlier. It is also fascinating to see the timeline move forward and to realize that as we&rsquo;ve been capturing the history we ourselves have all been making it. But that is what the Great British Story project was all about &ndash; to show the march of time and the role we all play in it. <strong>We thank the Heritage Lottery Fund for making this possible.</strong>`)}

  ${p(`<em>We now have a short leaflet available &lsquo;The Story Trail&rsquo; with the key stories we found. Digital and paper versions are available at our events or on request email parkinsonspark@gmail.com.</em>`)}

  ${extLink('https://www.heritagefund.org.uk', 'National Lottery Heritage Fund', "Funded the 'All Our Stories' research project")}
  ${extLink('https://www.fieldsintrust.org', 'Fields In Trust', 'Protecting parks and green spaces for communities')}
`;

// ── Full HTML document ────────────────────────────────────────────────────────
const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: Georgia, 'Times New Roman', serif;
    color: #1c1917;
    font-size: 11pt;
    line-height: 1.75;
  }

  /* ── Cover ── */
  .cover {
    page-break-after: always;
    min-height: 100vh;
    background: #064e3b;
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 60px 48px;
  }
  .cover-eyebrow {
    font-family: system-ui, sans-serif;
    font-size: 9pt;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: #6ee7b7;
    margin-bottom: 20px;
  }
  .cover-title {
    font-size: 36pt;
    font-weight: bold;
    line-height: 1.2;
    margin-bottom: 12px;
  }
  .cover-subtitle {
    font-size: 16pt;
    color: #a7f3d0;
    font-style: italic;
    margin-bottom: 40px;
  }
  .cover-divider {
    width: 60px;
    height: 3px;
    background: #10b981;
    margin: 0 auto 40px;
  }
  .cover-toc {
    background: rgba(255,255,255,0.08);
    border: 1px solid rgba(255,255,255,0.15);
    border-radius: 12px;
    padding: 24px 40px;
    text-align: left;
    width: 80%;
    max-width: 480px;
  }
  .cover-toc h3 {
    font-family: system-ui, sans-serif;
    font-size: 9pt;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: #6ee7b7;
    margin-bottom: 16px;
    font-weight: 600;
  }
  .cover-toc li {
    list-style: none;
    color: #d1fae5;
    font-size: 10.5pt;
    padding: 5px 0;
    border-bottom: 1px solid rgba(255,255,255,0.07);
  }
  .cover-toc li:last-child { border-bottom: none; }
  .cover-toc .ch-num {
    display: inline-block;
    width: 22px;
    font-family: system-ui, sans-serif;
    font-size: 8pt;
    color: #6ee7b7;
    font-weight: bold;
  }
  .cover-footer {
    margin-top: 48px;
    font-family: system-ui, sans-serif;
    font-size: 8.5pt;
    color: #6ee7b7;
    letter-spacing: 1px;
  }

  /* ── Chapter pages ── */
  .chapter { page-break-before: always; padding: 0; }

  .chapter-header {
    background: #064e3b;
    color: white;
    padding: 28px 32px 24px;
    margin-bottom: 28px;
  }
  .chapter-num {
    font-family: system-ui, sans-serif;
    font-size: 8pt;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: #6ee7b7;
    margin-bottom: 8px;
  }
  .chapter-title {
    font-size: 22pt;
    font-weight: bold;
    line-height: 1.2;
    margin-bottom: 6px;
  }
  .chapter-subtitle {
    font-size: 12pt;
    color: #a7f3d0;
    font-style: italic;
  }

  /* ── Typography ── */
  h2 {
    font-size: 14pt;
    color: #064e3b;
    border-bottom: 2px solid #a7f3d0;
    padding-bottom: 5px;
    margin: 28px 32px 14px;
    font-family: system-ui, sans-serif;
  }
  h3 {
    font-size: 12pt;
    color: #065f46;
    border-bottom: 1px solid #d1fae5;
    padding-bottom: 4px;
    margin: 22px 32px 12px;
    font-family: system-ui, sans-serif;
  }
  p {
    margin: 0 32px 13px;
    text-align: justify;
    hyphens: auto;
  }
  p.intro {
    font-size: 12pt;
    font-weight: 300;
    border-left: 4px solid #10b981;
    padding-left: 14px;
    margin-left: 32px;
    line-height: 1.8;
    color: #1c1917;
  }

  /* ── Blockquote ── */
  blockquote {
    background: #ecfdf5;
    border-left: 4px solid #059669;
    margin: 22px 32px;
    padding: 16px 20px;
    border-radius: 0 8px 8px 0;
  }
  blockquote p {
    font-size: 12.5pt;
    font-style: italic;
    color: #064e3b;
    margin: 0;
    text-align: left;
  }
  .attr {
    font-family: system-ui, sans-serif;
    font-size: 8.5pt;
    color: #059669;
    font-weight: 600;
    font-style: normal !important;
    margin-top: 8px !important;
  }

  /* ── Figures ── */
  figure {
    margin: 18px 32px;
    text-align: center;
    page-break-inside: avoid;
  }
  figure img {
    max-width: 100%;
    max-height: 260px;
    object-fit: contain;
    border-radius: 6px;
    border: 1px solid #e7e5e4;
    display: block;
    margin: 0 auto;
  }
  figcaption {
    font-size: 8.5pt;
    color: #78716c;
    font-style: italic;
    margin-top: 7px;
    font-family: system-ui, sans-serif;
  }
  .img-pair {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px;
    margin: 18px 32px;
    page-break-inside: avoid;
  }
  .img-pair figure {
    margin: 0;
  }
  .img-pair figure img {
    max-height: 180px;
    width: 100%;
    object-fit: cover;
  }

  /* ── External links ── */
  .ext-link {
    background: #f5f5f4;
    border: 1px solid #e7e5e4;
    border-radius: 6px;
    padding: 9px 14px;
    margin: 10px 32px;
    font-family: system-ui, sans-serif;
    font-size: 8.5pt;
  }
  .ext-link a { color: #059669; font-weight: 600; text-decoration: none; }
  .ext-link span { color: #78716c; }

  /* ── Attribution footer ── */
  .attrib {
    margin: 28px 32px 0;
    padding-top: 14px;
    border-top: 1px solid #e7e5e4;
    font-family: system-ui, sans-serif;
    font-size: 8pt;
    color: #a8a29e;
  }
</style>
</head>
<body>

<!-- COVER -->
<div class="cover">
  <div class="cover-eyebrow">Friends of Parkinson&rsquo;s Park CIC &bull; Guiseley, West Yorkshire</div>
  <div class="cover-title">All Our Stories</div>
  <div class="cover-subtitle">The Full History of Parkinson&rsquo;s Park</div>
  <div class="cover-divider"></div>
  <div class="cover-toc">
    <h3>Five Chapters</h3>
    <ul>
      <li><span class="ch-num">1.</span> History &ndash; All Our Stories</li>
      <li><span class="ch-num">2.</span> History &ndash; People</li>
      <li><span class="ch-num">3.</span> History &ndash; F &amp; A Parkinson</li>
      <li><span class="ch-num">4.</span> History &ndash; Recent Times</li>
      <li><span class="ch-num">5.</span> History &ndash; Friends of Parkinson&rsquo;s Park</li>
    </ul>
  </div>
  <div class="cover-footer">
    Research by Jennifer Kirkby &amp; Barbara Winfield &bull;
    Heritage Lottery Fund &ldquo;All Our Stories&rdquo; Grant 2012
  </div>
</div>

<!-- CHAPTERS -->
<div class="chapter">${chapter1}</div>
<div class="chapter">${chapter2}</div>
<div class="chapter">${chapter3}</div>
<div class="chapter">${chapter4}</div>
<div class="chapter">${chapter5}</div>

</body>
</html>`;

// ── Generate PDF ──────────────────────────────────────────────────────────────
async function generatePDF() {
  const outPath = join(__dirname, 'public', 'documents', 'Parkinsons-Park-Full-History.pdf');

  // Pre-fetch WordPress images as base64 so Puppeteer makes no external requests
  console.log('Fetching WordPress images...');
  const wpImages = {};
  for (const [key, url] of Object.entries(wpImageUrls)) {
    process.stdout.write(`  • ${key}... `);
    wpImages[key] = await fetchBase64(url);
    console.log(wpImages[key] ? 'ok' : 'skipped');
  }

  // Replace placeholder tokens in HTML with base64 data URLs
  let finalHtml = html;
  for (const [key, dataUrl] of Object.entries(wpImages)) {
    finalHtml = finalHtml.split(`__WP_${key.toUpperCase()}__`).join(dataUrl || '');
  }

  console.log('Launching Puppeteer...');
  const browser = await puppeteer.launch({ headless: 'new' });

  try {
    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(60000);

    console.log('Loading content...');
    await page.setContent(finalHtml, { waitUntil: 'domcontentloaded', timeout: 60000 });

    console.log('Generating PDF...');
    await page.pdf({
      path: outPath,
      format: 'A4',
      printBackground: true,
      margin: { top: '0', right: '0', bottom: '14mm', left: '0' },
      displayHeaderFooter: true,
      headerTemplate: '<span></span>',
      footerTemplate: `
        <div style="width:100%;font-family:system-ui,sans-serif;font-size:8pt;color:#a8a29e;
                    display:flex;justify-content:space-between;padding:0 32px;box-sizing:border-box;">
          <span>Parkinson&rsquo;s Park — All Our Stories</span>
          <span><span class="pageNumber"></span> / <span class="totalPages"></span></span>
        </div>`,
    });

    console.log(`\n✓ PDF saved to: ${outPath}`);
  } finally {
    await browser.close();
  }
}

generatePDF().catch(err => {
  console.error('PDF generation failed:', err);
  process.exit(1);
});
