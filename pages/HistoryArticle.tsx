import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ExternalLink, BookOpen, Download } from 'lucide-react';
import { useDownload } from '../hooks/useDownload';
import DownloadDialog from '../components/DownloadDialog';

// Local image imports
import lynchetImg from '../src/assets/images/lynchet-crooked-lands.jpg';
import clapperBrowImg from '../src/assets/images/clapper-brow.jpg';
import greatBrowImg from '../src/assets/images/great-brow.jpg';
import tithemapImg from '../src/assets/images/tithe-map-1838-detail.jpg';
import peateOaksImg from '../src/assets/images/peate-oak-trees.jpg';
import frankParkinsonImg from '../src/assets/images/frank-parkinson.jpg';
import parkinsonBuildingImg from '../src/assets/images/parkinson-building-leeds.jpg';
import snowSledgingImg from '../src/assets/images/snow-sledging.gif';
import wakefieldResearchersImg from '../src/assets/images/wakefield-deeds-researchers.jpg';
import geophysicsTeamImg from '../src/assets/images/geophysics-team-2013.jpg';
import driverGravestoneImg from '../src/assets/images/driver-gravestone.jpg';
import haymakingImg from '../src/assets/images/haymaking-eragny.jpg';
import newDykesGateImg from '../src/assets/images/new-dykes-gate.jpg';
import oldMansCornerImg from '../src/assets/images/old-mans-corner.jpg';

// ── Shared layout helpers ──────────────────────────────────────────────────────

const P: React.FC<{ intro?: boolean; children: React.ReactNode }> = ({ intro, children }) => (
  <p className={`leading-relaxed mb-5 ${intro ? 'text-xl font-light text-stone-800 border-l-4 border-emerald-500 pl-5 py-1' : 'text-base text-stone-700'}`}>
    {children}
  </p>
);

const H2: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 className="text-2xl font-bold text-stone-900 mt-12 mb-5 pb-2 border-b-2 border-emerald-300">{children}</h2>
);

const H3: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h3 className="text-xl font-bold text-stone-900 mt-10 mb-4 pb-2 border-b border-emerald-200">{children}</h3>
);

const Quote: React.FC<{ children: React.ReactNode; attribution?: string }> = ({ children, attribution }) => (
  <blockquote className="my-10 py-6 px-8 bg-emerald-50 border-l-4 border-emerald-600 rounded-r-2xl">
    <p className="text-xl md:text-2xl italic text-emerald-900 leading-relaxed font-light">&ldquo;{children}&rdquo;</p>
    {attribution && <p className="text-sm text-emerald-700 mt-3 font-semibold not-italic">{attribution}</p>}
  </blockquote>
);

const Img: React.FC<{ src: string; alt: string; caption: string }> = ({ src, alt, caption }) => (
  <figure className="my-8">
    <img src={src} alt={alt} className="w-full rounded-2xl shadow-lg border border-stone-200" loading="lazy" />
    <figcaption className="mt-3 text-sm text-stone-500 italic text-center leading-relaxed px-4">{caption}</figcaption>
  </figure>
);

const ImgPair: React.FC<{
  left: { src: string; alt: string; caption: string };
  right: { src: string; alt: string; caption: string };
}> = ({ left, right }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
    <figure>
      <img src={left.src} alt={left.alt} className="w-full h-56 object-cover rounded-2xl shadow-md border border-stone-200" loading="lazy" />
      <figcaption className="mt-2 text-sm text-stone-500 italic text-center px-2">{left.caption}</figcaption>
    </figure>
    <figure>
      <img src={right.src} alt={right.alt} className="w-full h-56 object-cover rounded-2xl shadow-md border border-stone-200" loading="lazy" />
      <figcaption className="mt-2 text-sm text-stone-500 italic text-center px-2">{right.caption}</figcaption>
    </figure>
  </div>
);

const ExtLink: React.FC<{ href: string; label: string; description: string }> = ({ href, label, description }) => (
  <div className="my-5 p-4 bg-stone-50 border border-stone-200 rounded-xl flex items-start gap-3">
    <ExternalLink className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
    <div>
      <a href={href} target="_blank" rel="noopener noreferrer" className="text-emerald-700 font-bold hover:underline text-sm">{label}</a>
      <p className="text-sm text-stone-600 mt-0.5">{description}</p>
    </div>
  </div>
);

// ── Chapter content ────────────────────────────────────────────────────────────

const Chapter1: React.FC = () => (
  <>
    <P intro>
      In 2012 the FOPP were given a grant from the Heritage Lottery Fund to research the history of Parkinson&apos;s Park as part of the Great British Story. A heritage project designed to celebrate the Diamond Jubilee of Queen Elizabeth ll by telling All Our Stories, the history of &lsquo;ordinary&rsquo; people. Little did we know what an interesting story we would find. The research and interpretation were done by local historians Jennifer Kirkby and Barbara Winfield, two of the founder members of FOPP.
    </P>

    <Img src={tithemapImg} alt="1838 Tithe Map detail" caption="Outline of Parkinson's Park on the 1838 Tithe Map" />

    <H2>Where to start?</H2>

    <P>
      On the Leeds tithe map of 1838 the fields that now make up Parkinson&apos;s Park are shown as meadow and pasture. They sit on the side of the Chevin below Whale Jaws Hill, between Kelcliffe Lane and the flatter valley floor of Greenshaw Close and Kelcliffe Dole. Guiseley at that time was still, just about, a rural pastoral farming and weaving community, but the industrial revolution was gathering pace. The land of the now Park belonged to local farmers, Marshall Grimshaw of Kelcliffe House, Benjamin Popplewell from Upper End Farm, as well as Betty Pawson from Guiseley, and Mrs Frances Foss who lived in Scarborough but came from a longstanding local Quaker family. This time of change from the old world to the modern was the starting point for research on the Park&apos;s story.
    </P>

    <H2>Names are a window on the past</H2>

    <P>
      The tithe map gave us the field names; these then were our first window on the past; who gave the name, why, and when, and has it changed. In old documents field names are like maps, and always recorded. Different eras have different naming conventions and use of language, but names do change with time so noting acres, rods and perches is important.
    </P>
    <P>
      The area around the park has been known for centuries as Kelcliffe (spelt in a variety of ways). The name is Old Norse for a steep area where there are springs &ndash; an apt description for the local geology. This tells us that the name has been in use since the viking era when Guiseley was part of Jorvik (AD 866-950) and people with names such as Ivan the Boneless and Eric Bloodaxe rode across the Chevin between York and Dublin. The local area has many Old Norse names.
    </P>
    <P>
      The steep part at the north-west end was called Great Brow in 1838, but research on old deeds quickly revealed that Marshall Grimshaw had brought the land in 1837 and renamed a lot of the fields. Great Brow had been called Potterton Brow. This, we eventually found, was the name of a local family &ndash; John Potterton was &lsquo;buried by the Parish&rsquo; in 1713, and a Potterton is listed as a manor tenant in 1675.
    </P>
    <P>
      During the 17th century the medieval common field system gave way to &lsquo;enclosure by agreement&rsquo;. That is to say, the manor tenants agreed amongst themselves to divide up the common fields and then swap portions so that they each had a bigger area in one place. They then walled off their plot. There is a 1639 enclosure agreement in the Guiseley Parish Records, doaling out the Common Close to 13 families. This was also a time when land was being reclaimed from the common &ndash; a practice called intaking recalled in places such as Intake Farm. These new walled areas, often called a close, were then named after the family that occupied them. But what was often lost was the &lsquo;medieval name&rsquo; &ndash; where now is Raven&apos;s Toft?
    </P>
    <P>
      But why had Marshall Grimshaw renamed the fields? Further digging revealed that the Kelcliffe House area and its tenements had been a tannery since at least the 17th century eg Tanhouse Brow had been the name for the area behind Hillside Avenue. Further work on owners, including the Driver family, and past sales confirmed this.
    </P>

    <Img src={driverGravestoneImg} alt="Driver family gravestone in Guiseley Churchyard" caption="Richard Driver's gravestone at Guiseley Churchyard — the Driver family was involved with the historic tannery at Kelcliffe House" />

    <P>
      The tanning of leather was very important in rural communities, not only for clothes, but for buckets, harnesses, and the belts that ran the looms and farm machinery. Tanning was a smelly business often kept away from a village, it needed oak bark for tannin, urine and running water, as well as a good supply of cows and sheep. Kelcliffe had been a perfect place where large tan pits had been dug and skins hung to dry in the wind. But in 1837 tanning was being industrialised and Mr Grimshaw was building a new dairy farm for a new market!!
    </P>
    <P>
      The name Clapper Brow, the very steep part where the wood now is, hinted that there might have been a medieval rabbit warren there; Clapper is middle-English for &lsquo;rabbit hole&rsquo;. Rabbits were farmed at various times during the past &ndash; a good source of food, fur and leather. After the Black Death in 1348, when there were fewer people to cultivate land, was one such time. The Odda at Hawksworth was also an old rabbit warren and there is an Iron Age hill fort in Bedfordshire known as Sharpenhoe Clappers later used as a medieval warren. Warrens need sandy soil and slopes. However, we have not found conclusive dating evidence yet, only the name, which goes back to at least the 16th century.
    </P>

    <Img src={clapperBrowImg} alt="Clapper Brow woodland" caption="The wooded area of Clapper Brow — site of the possible medieval rabbit warren" />

    <P>
      One of the most interesting field names in the park is Crooked Lands, the area to the South East, between the farm gate and Greenshaw Terrace. The meaning of this name became clearer during a geophysics exploration (which was done with the same team used on the television series Time Team) that we commissioned in 2013 as part of the project. This revealed that the banks were early medieval lynchets and headlands &ndash; highly likely to be pre 1066 &ndash; or Anglo Saxon. That took the Park&apos;s history back to perhaps the 8th century.
    </P>
    <P>
      Crooked Lands refers to the banks and their slight backward S shape, which was caused by the way the land was ploughed with teams of Oxen. Early court rolls of the Manor show that local farmers were forever being fined for taking their carts over Crooked Lands to the West Field. The West Field was one of a three field, open field, system &ndash; and was around the top of Kelcliffe Avenue/Lane, and the fields and houses behind the school. It is also the reason for Crooklands house being so-called.
    </P>

    <Img src={lynchetImg} alt="Lynchet on Crooked Lands" caption="Lynchet (early medieval terraced field boundary) on Crooked Lands — highly likely to be pre-1066, or Anglo Saxon" />

    <P>
      Names of the fields, and an analysis of stone wall construction around the Park, indicated that the whole area has been in use from very early times, certainly well before 1066. Flatts, which gives its name to local houses Flatfield and Top&apos;o&apos;t&apos;Flatts is the area of The Sycamores. A flatt was a bundle of furlong long farming strips which were each farmed by different tenants of the Lord of the Manor. New Dykes, means an early extension of cultivated farming land on to the Common. The geophysics survey took the potential archaeological remains back to Romano-British times (AD 43 &ndash; 410). All of which was a lot more than we had thought we would find when we began the All Our Stories project!!
    </P>

    <Img src={geophysicsTeamImg} alt="Geophysics survey team" caption="The geophysics survey team at work in Parkinson's Park — using the same methods as the television series Time Team" />

    <ExtLink
      href="https://www.heritagefund.org.uk"
      label="National Lottery Heritage Fund"
      description="The Heritage Fund's 'All Our Stories' scheme supported community groups researching and sharing local heritage as part of the Diamond Jubilee celebrations."
    />
  </>
);

const Chapter2: React.FC = () => (
  <>
    <P intro>
      Field names, old land deeds, parish records and manor court rolls are one source of historic research; another is the ups and downs of family fortunes. Both Jennifer and Barbara are experienced in family history research and this too was a rich seam for revealing the Park&apos;s past. A particularly interesting century was the 18th &ndash; when the agricultural revolution took off and social mobility became much more fluid.
    </P>

    <Img src={wakefieldResearchersImg} alt="Jennifer Kirkby and Barbara Winfield at Wakefield Deeds Office" caption="Jennifer Kirkby and Barbara Winfield at the Wakefield Deeds Office" />

    <P>
      The Manor of Guiseley and Esholt was sold to its tenants in 1719. It then became possible for local farmers like Quaker John Blessard, Stephen and Martha Overend and socially mobile widow Susannah Walker to harness new technology such as iron-plate ploughs and try new crops such as potatoes.
    </P>
    <P>
      As the 18th century rolled on the fields were brought and sold, some becoming part of the accumulated &lsquo;estates&rsquo; of emerging &lsquo;Gentlemen&rsquo; such as John Burton of Wakefield. Mr Burton rented out land to be farmed by reliable local tenants who would look after its fertility &ndash; people such as Churchwarden James Leadbetter, who was the occupier of the top field of the Park called <strong><em>Little Kelcliffe</em></strong>. <strong><em>Little Kelcliffe</em></strong> we found was frequently used for meadow and hay making a practice confirmed by both a metal detecting survey and stories from older Guiseley people who took time of school to help.
    </P>

    <ImgPair
      left={{ src: haymakingImg, alt: 'Haymaking at Éragny', caption: 'Hay-making — the use of Little Kelcliffe field, confirmed by metal detecting surveys and local oral histories' }}
      right={{ src: newDykesGateImg, alt: 'New Dykes Gate', caption: 'New Dykes gate — marking an early extension of cultivated farming land on to the Common' }}
    />

    <P>
      As the 18th century turned into the 19th, the great Georgian house building period began, as people grew wealthier, became clothiers, and wanted bigger and better houses: it is during this time that some of the older houses around the Park along Kelcliffe Lane were built &ndash; including Flatfield House, New Dykes, and Crooklands followed by Kelcliffe Mount. The lane itself had only been made up around 1709 to go to the tannery, previously it had been a simple riding way and footpath.
    </P>

    <H3>The Jonathan Peate connection</H3>

    <P>
      Around 1900, as Guiseley became a thriving manufacturing township, complete with public buildings and modern transport such as trams and railways, the land around the park was bought by local woollen cloth manufacturer and philanthropist Jonathan Peate. Jonathan was well-known for buying land and helping the local working men to acquire allotments and houses on favourable term. He also presented land to the urban district councils of Yeadon and Guiseley to use for public buildings eg Yeadon Town Hall or as public open space eg Nunroyd Park. We found in the deeds that he had purchased Clapper Brow and it is likely that around 1909, the time of the coronation of George V, he planted the oak trees that still line the boundary in what is now a small wood.
    </P>

    <Img src={peateOaksImg} alt="Peate's Oak Trees" caption="Peate's oak trees — planted around 1909 at the time of the coronation of George V" />
  </>
);

const Chapter3: React.FC = () => (
  <>
    <P intro>
      Around this time, down in a shed at Eldon Mount, young Frank Parkinson was starting his electrical motor agency business with &pound;21 from his post office savings.
    </P>
    <P>
      The son of a local quarry owner on Moor Lane, Frank was an astute and forward thinking young man, and his business grew.
    </P>
    <P>
      In 1913 his brother Albert joined the firm and the brothers turned to manufacturing motors.
    </P>
    <P>
      So, during the First World War they moved their works on to Jonathan Peate&apos;s land (Greenshaw Close) in Netherfield Road.
    </P>
    <P>
      In hindsight this move was akin to the handing over of the local philanthropy baton from Jonathan to Frank &ndash; Jonathan died in 1924.
    </P>

    <Img src={frankParkinsonImg} alt="Frank Parkinson" caption="Frank Parkinson — co-founder of F & A Parkinson Ltd" />

    <Quote attribution="From Frank Parkinson's 1946 obituary">
      he regarded himself as the trustee for whatever worldly possessions he had, and whatever use he made of them should be for the good of the country and in particular of this county
    </Quote>

    <P>
      In 1918 F &amp; A Parkinson Ltd bought the Netherfield land from Jonathan, and a field called Kelcliffe Dole from the church, and expanded their factory.
    </P>
    <P>
      Jonathan also acted as their mortgagee. Thus, the first field of the park, Clapper Brow, came into the company&apos;s ownership.
    </P>
    <P>
      The company continued to thrive, even through the Great Depression, building their success on the ethos of &lsquo;practical idealism&rsquo; (high wages for loyal staff and low productions costs for quality good)
    </P>
    <P>
      In 1927, they joined forces with Crompton&apos;s, a lighting firm from Chelmsford.
    </P>
    <P>
      The firm thus became Crompton Parkinson Ltd, greatly increasing the share value of the many small Guiseley and Wharfedale shareholders who had invested in F &amp; A Parkinsons.
    </P>
    <P>
      In 1932, the Netherfield Road site was again extended with the building of a lamp works for manufacturing Crompton light bulbs.
    </P>

    <H3>Parkinson&apos;s Park replaces Guiseley Recreation Ground</H3>

    <P>
      In 1936/37 they bought the remaining fields of the Park and set about laying the footpaths from the old stone walls, putting in gates at the entrances, and seats along the ridge.
    </P>
    <P>
      In the early 1950&apos;s the two copses were planted to celebrate the national events of the Queen&apos;s Coronation and the Festival of Britain.
    </P>
    <P>
      During research on personal stories people told us that they were specifically designed in a certain shape &ndash; but no-one could remember what, and no paperwork existed to tell us.
    </P>
    <P>
      It was only during other research that we realized that the top copse is in the shape of Yeadon (the Parkinson&apos;s mother had been a member of the old Yeadon family) whilst the lower copse, which stood directly above the drive into the factory, is the outline of Guiseley.
    </P>
    <P>
      Nearer the factory the Parkinsons carved out a bowling and putting green together with a rose garden, tennis courts and a pavilion.
    </P>
    <P>
      Part of the motivation for setting up the Park and giving it to the People of Guiseley, may have come from the loss of Guiseley Recreation Ground, on Kelcliffe Lane to council housing in the early 1920&apos;s.
    </P>
    <P>
      In recompense, Jonathan Peate gave land at Nethermoor for a Park with an outline of how it should be turned into a Pleasure Park and cricket ground.
    </P>
    <P>
      However, Jonathan died before this had all taken place; so it could well have been that F &amp; A Parkinson decided that the area behind their factory could serve as both a place of rest and recreation for their staff and the people of the area.
    </P>
    <P>
      A description of the old Kelcliffe Lane Recreation Ground at the time, is very similar to that of Parkinson&apos;s Park.
    </P>

    <H3>Frank Parkinson&apos;s legacy to Yorkshire and Guiseley</H3>

    <P>
      In 1946 Frank Parkinson, like his father before, suddenly died of a heart attack &ndash; amongst his legacies was the magnificent front of Leeds University (the Parkinson Building) which cost &pound;200,000
    </P>
    <P>
      He had moved to Berkshire in the 1930&apos;s to be close to London and transport to the many company outlets across the Empire.
    </P>
    <P>
      He left &pound;1.5 million pounds in his will: not bad going for a boy born in South View, Guiseley 59 years before.
    </P>
    <P>
      A very large proportion of this went to forming the Frank Parkinson Yorkshire Trust, which was to be used to help the poor, sick and elderly of Guiseley, and educate and support young people in electrical engineering.
    </P>
    <P>
      In addition, his will gave &pound;1,000 a year to be used for the benefit of the Crompton Parkinson staff.
    </P>

    <Img src={parkinsonBuildingImg} alt="Parkinson Building at Leeds University" caption="The Parkinson Building at the University of Leeds — part of Frank Parkinson's £1.5 million legacy" />

    <H3>Annual events start in the Park</H3>

    <P>
      In 1949 the Crompton sports and social club launched their first summer Children&apos;s Gala in the park, which became an annual and much enjoyed event.
    </P>
    <P>
      This was followed in 1951 by the first September Flower and Produce Show, and, at some point, the October bonfire started, complete with firework display, and vans selling parkin and hotdogs.
    </P>
  </>
);

const Chapter4: React.FC = () => (
  <>
    <H3>Best Friends</H3>

    <P intro>
      As we moved into more recent times personal stories became an important part of the All Our Stories research. People remembered that at the entrance to the park were put notices for all to know that the Park, whilst belonging to Parkinson&apos;s, was for the use and recreation of the people Guiseley. Thus, it became a place for the local children to have adventures, play hide and seek, fly kites, and, best of all, sledge down the hills in winter on the snow, and in summer on the grass. The &lsquo;Snowdrop&rsquo; was the sledging run down the steep slope of Great Brow, and the &lsquo;Bluebell Run,&rsquo; was on the more gentle slopes of Crooked Lands. Since then children have added the &lsquo;Suicide Run&rsquo; down the steep area above the old car park, near the woods.
    </P>

    <ImgPair
      left={{ src: snowSledgingImg, alt: 'Children sledging in snow', caption: "The 'Snowdrop' sledging run down the steep slope of Great Brow — a beloved winter tradition" }}
      right={{ src: oldMansCornerImg, alt: "Old man's corner near Kelcliffe Lane", caption: "'Old man's corner' — the triangular walled area near the churn stands on Kelcliffe Lane" }}
    />

    <P>
      For the older folk, the seats, the fabulous view, and the spirit of the land gave rest and inspiration &ndash; a deep link, to different, more rural times. The corner of the Park, near the churn stands on Kelcliffe Lane, had a triangular walled area, known as &lsquo;old man&apos;s corner&rsquo; &ndash; where people came to sit to watch the sun setting in the West of a summer&apos;s evening.
    </P>
    <P>
      It was a place where grandfathers took their grandsons to reminisce and learn country ways, and for mothers to take the little ones on nature walks: the park was a boon to dog walkers and factory workers alike. In the Netherfield corner they had their own annual bonfire party, where all the children spent weeks chumping for wood, and on the slopes of Clapper Brow the huge, stately trees were used for rope swings and collecting conkers.
    </P>

    <H3>Sleeping Beauty</H3>

    <P>
      But, in 1968 Cromptons was taken over by Hawker Siddeley Aerospace, and many trace the company&apos;s demise from that date. Albert Parkinson died in 1971, and the family friendliness of the firm slowly dwindled. The following decades saw uncertainty grow with various buyouts and takeovers, until a final sale was made in 1999 to Cooper Industries. Cooper&apos;s asset stripped Cromptons, and the factories were eventually closed.
    </P>
    <P>
      In 2002, the land was sold to St Modwen Properties PLC, by Brook Crompton&apos;s of Huddersfield. Not being locals, neither company knew anything of the Park&apos;s history or use, and the unmanaged land began to rewild. The copses grew and filled up with rubbish and drug takers, the grass became a &lsquo;dogs toilet&rsquo;. The handmade heavy wooden gates fell into disrepair, or went missing, whilst a &lsquo;Sleeping Beauty&rsquo; thicket grew up around Jonathan&apos;s oak trees hiding their grandeur, and the ancient stone walls began to crumble. In 2006 Bellway dismantled the Crompton Parkinson factory, pulled up the bowling and putting greens and erected fences that blocked off the ancient track along the bottom of the park.
    </P>

    <Img src={greatBrowImg} alt="Great Brow" caption="Great Brow — the 'Snowdrop' sledging slope, and the wider park landscape during the years of neglect" />
  </>
);

const Chapter5: React.FC = () => (
  <>
    <P intro>
      As local people, we watched this sad deterioration with heavy hearts and tears in our eyes, not knowing what the future had in store. It doesn&apos;t really help, but we found out later that a firm from Leeds had wanted to buy the factory to expand, but unfortunately it didn&apos;t happen! To make improvements, some residents took it upon themselves to try to reinstate the blocked public footpaths that crossed the Park, whilst others such as Christine Parapia organized a group in 2010 to clear litter; a task aided by a grant from Morrisons. Meanwhile, Bellway Homes insisted the land was a &lsquo;wild area, and would stay that way&rsquo;.
    </P>

    <H3>2011 The park is regenerated</H3>

    <P>
      In August 2011 Jennifer Kirkby initiated discussions with MP Stuart Andrew and Cllr Graham Latty about restoring the land to a useable condition, following research on it&apos;s past use as a Park given to the people of Guiseley. She and Christine Parapia met on 31 August and decided to set up the Friends as a constituted group. With the help of Cllr Latty, they opened discussions with developers Bellway.
    </P>
    <P>
      On 13 September 2011 a variety of concerned local people with a variety of skills came together to form the Friends of Parkinson&apos;s Park (FOPP) &ndash; Chris Parapia (Chair), Barbara Winfield, Jennifer Kirkby, Andy Cheetham, Joanna Brooks and Colin Alexander. Barbara and Jennifer had done some initial historic research which led to the Friend&apos;s name and the intention to restore the legacy of the Guiseley philanthropists, Frank and Albert Parkinson and Jonathan Peate. In addition it was decided to enhance the natural landscape of the Park in keeping with the Chevin Forest Park. This purpose for FOPP was written into the first constitution.
    </P>
    <P>
      Once constituted, FOPP&apos;s first task was to set up a website to keep residents informed via a blog to record progress and find out what people used the Park for and what it meant to them &ndash; so a call went out for stories and pictures from local people. The second, was to do an ecological and environmental audit for a landscape plan which was undertaken by Joanna and Peter Brooks with help from the Wharfedale Naturalists. Darren Shepherd shared his deep knowledge of the Park&apos;s bird life.
    </P>
    <P>
      In November 2011 the Friends together with Bellway, started to regenerate the Park, based on the landscape plan the Friend&apos;s had produced. Pudsey Landscapes were contracted to do a lot of the phase 1 regeneration work, Colin Alexander and Martyn Hornsby-Smith organized colleagues from Otley &amp; Wharfedale Dry Stone Wallers in the restoration of some of the crumbling stonework, whilst Andy Cheetham took on the task of organizing the fitting of new benches and working groups.
    </P>
    <P>
      There are many people to be thanked for their part in launching the regeneration of the Park, including people who simply continued on their own initiative to do small things such as litter picking and trying to stop anti-social behaviour and drug taking. The blog on this site follows the{' '}
      <a href="https://friendsofparkinsonspark.wordpress.com" target="_blank" rel="noopener noreferrer" className="text-emerald-700 font-semibold hover:underline">step by step progress starting here</a>.
    </P>

    <Img
      src="https://friendsofparkinsonspark.wordpress.com/wp-content/uploads/2011/11/site-meeting-parkinsons-park-nov-2011.jpg"
      alt="Site meeting at Parkinson's Park November 2011"
      caption="Site meeting at Parkinson's Park, November 2011 — the start of the regeneration"
    />

    <H3>2012 Gave a real boost to the Park</H3>

    <P>
      The first open meeting for the Friends was held on 21 February 2012 as the opportunity to develop the Park was opened up to everyone who wanted to be involved. 2012 could not have been a better year to start getting people involved in the Park, as it was the year of both the Queen&apos;s Diamond Jubilee and the Olympics coming to the UK. Both events, gave rise to grants for landscape improvements helped by experienced fund-raiser Nicola Denson joining the team.
    </P>
    <P>
      Jubilee Walk at the top of Great Brow was planted with shrubs from the Woodland Trust, and an oak from the Queen&apos;s estate at Sandringham was planted as a commemorative tree &ndash; and stolen. After hearing the story on this blog the Sandringham team sent the Park a new tree.
    </P>
    <P>
      Grants also gave the Friends the means to relaunch the Children&apos;s Gala in June 2012 with a Jubilee Picnic and Games &ndash; a successful event which is growing each year, as more local groups join in.
    </P>
    <P>
      Finally in November 2012 FOPP was awarded an All Our Stories grant as part of The Great British Story programme organized by the Heritage Lottery Fund. This allowed for historical research, a geophysical survey, a study of the Park habitats and insect life, and research by David Leather from the West Yorkshire Geology Trust to unravel the geology and geomorphological events that made the Guiseley Gap &ndash; the area where the Park lies.
    </P>
    <P>
      A film of the Park&apos;s regeneration and the events of 2012 were also filmed by ex Crompton Parkinson employee and local film maker David Myers &ldquo;
      <a href="https://friendsofparkinsonspark.wordpress.com/2013/04/16/all-our-stories-film-premier-of-parkinsons-park-a-new-chapter/" target="_blank" rel="noopener noreferrer" className="text-emerald-700 font-semibold hover:underline">Parkinson&apos;s Park &ndash; A New Chapter</a>
      &rdquo;.
    </P>

    <Img
      src="https://friendsofparkinsonspark.wordpress.com/wp-content/uploads/2012/06/dsc01628-1024x727.jpg"
      alt="Jubilee Picnic 2012"
      caption="The Jubilee Picnic and Children's Gala relaunch, June 2012"
    />

    <H3>2013 and beyond</H3>

    <P>
      The blogs on this site trace the evolution of FOPP and the Park Improvements. Just a taste of some mile stones include:
    </P>
    <P>
      In 2013, the Friends launched the first Lantern Parade, to replace the old Autumn Bonfire; an event which was joined by the local churches and community choir in 2014.
    </P>

    <Img
      src="https://friendsofparkinsonspark.wordpress.com/wp-content/uploads/2016/06/park-2.jpeg"
      alt="Lantern Parade"
      caption="The annual Lantern Parade — launched in 2013 to replace the old Autumn Bonfire"
    />

    <P>
      In 2015, the community orchard was planted using a Leeds City Council horticultural grant. Bellway left the site after seeding the wildflower meadow and Meadfleet took over basic maintenance.
    </P>
    <P>
      4th March 2016, the Friends of Parkinson&apos;s Park became a Community Interest Company, in order to better raise funds and look after the evolving Park on behalf of the community. You can find annual reports on FOPP CIC on our{' '}
      <Link to="/about" className="text-emerald-700 font-semibold hover:underline">About Page</Link>.
    </P>
    <P>
      In summer the first Codswallop Tales Told Lantern Parade and Firework Display was held. In August a bog garden was installed with the help of Open Country. And in October FOPP held the first Apple Day to celebrate the Community Orchard.
    </P>
    <P>
      2017, saw a rise in vandalism at the start of the year and a number of fires started; in response Park Watch was started. At the other end of the scale Forests Schools came to the Park for the newly formed Little Friends of Parkinson&apos;s Park.
    </P>
    <P>
      In 2018, the Park information boards were installed and Trail brochures printed. As the year ended the Park commemorated the 100th anniversary of the end of WWI with a Coffee Morning fund raiser and Home for Heroes Exhibition as one of a number of community events.
    </P>
    <P>
      2019 saw the running of a year long programme of all the events started previously including the long running Children&apos;s Gala. Other habitat enhancement work included the bog garden and the wildflower meadow.
    </P>

    <Img
      src="https://friendsofparkinsonspark.wordpress.com/wp-content/uploads/2019/09/childrens-gala-2019-1.jpg"
      alt="Children's Gala 2019"
      caption="The Children's Gala 2019 — part of the year-long programme of annual events"
    />

    <P>
      In 2020 a short film was made of the development of FOPP by ITV Calendar for their Park Life set of programmes. It showed how the development of the Park had greatly helped and supported the local residents through the Covid Pandemic of Spring 2020.
    </P>
    <P>
      During the Government imposed covid lockdown from Nov 2020 to Spring 2022, the Park proved its community importance for health and wellbeing. In spite of ever changing regulations for the size and make up of &lsquo;gathering&rsquo; FOPP ran events that could be done by families, which also gave a feeling of social connection and community spirit. This included encouraging people to leave art around the Park including what came to be known as &lsquo;yarn bombing&rsquo;, contributing items to public displays for national events such as the annual Royal British Legion Remembrance and the passing of the Duke of Edinburgh, and a Christmas Elf and Easter Bunny trail. The Park was also a venue for small groups who were not allowed to meet indoors eg Guiseley Brass Band practice.
    </P>
    <P>
      On 24 February 2022 all Covid restrictions in England were thankfully lifted. Given two years of social containment, it was important in the 2022 event programme to bring people back together to rebuild social connection and mental health. It was fortunate that the Queen&apos;s Platinum Jubilee presented an excellent opportunity to achieve this. June 2022 saw FOPP hold a Jubilee picnic which encouraged people to join together in sharing food, art, and fancy dress. The centrepiece was the dedication of the Jubilee Tree, which was registered as part of The Queen&apos;s Green Canopy, and for which a professional story teller was engaged and a commemoration plaque installed.
    </P>
    <P>
      In August 2022 Parkinson&apos;s Park achieved &lsquo;Local Favourite&rsquo; status in Yorkshire, in the Fields In Trust&apos;s national vote to find the favourite Parks and Green Spaces in the UK.
    </P>

    <Img
      src="https://friendsofparkinsonspark.wordpress.com/wp-content/uploads/2022/07/copy-of-uks-favourite-parks-2022.jpg"
      alt="UK's Favourite Parks 2022"
      caption="Parkinson's Park named Yorkshire 'Local Favourite' in the Fields In Trust national vote, 2022"
    />

    <P>
      On 8 September 2022 Her Majesty Queen Elizabeth II died. FOPP subsequently published the Jubilee Story in a commemoration booklet for The Queen and her Green Canopy legacy. Written by Bradford author Irene Lofthouse, it also contained a hand-drawn illustration donated by Yorkshire artist Eleanor Tomlinson. Copies of the booklet have been lodged in local libraries, schools and heritage centres.
    </P>

    <H3>So are we now history?</H3>

    <P>
      Slowly over the years the history of the Park and Kelcliffe area has re-emerged, pushing back the timeline. Features in the landscape indicate that the area has been in continuous use since at least the Bronze Age (BC 2,300 &ndash; 801) probably earlier. It is also fascinating to see the timeline move forward and to realize that as we&apos;ve been capturing the history we ourselves have all been making it. But that is what the Great British Story project was all about &ndash; to show the march of time and the role we all play in it. <strong>We thank the Heritage Lottery Fund for making this possible.</strong>
    </P>
    <P>
      <em>We now have a short leaflet available &lsquo;The Story Trail&rsquo; with the key stories we found. Digital and paper versions are available at our events or on request email{' '}
      <a href="mailto:parkinsonspark@gmail.com" className="text-emerald-700 font-semibold hover:underline">parkinsonspark@gmail.com</a>.</em>
    </P>

    <ExtLink
      href="https://www.heritagefund.org.uk"
      label="National Lottery Heritage Fund"
      description="The Heritage Fund's 'All Our Stories' grant funded the research that uncovered the park's history."
    />
    <ExtLink
      href="https://www.fieldsintrust.org"
      label="Fields In Trust"
      description="Fields In Trust protects parks and green spaces across the UK in perpetuity."
    />
  </>
);

// ── Chapter metadata ───────────────────────────────────────────────────────────
const chapters = [
  { title: 'History – All Our Stories', subtitle: 'Where to start? Names are a window on the past', source: 'https://friendsofparkinsonspark.wordpress.com/history/', content: <Chapter1 /> },
  { title: 'History – People', subtitle: 'Looking at the personal stories', source: 'https://friendsofparkinsonspark.wordpress.com/history/history-people/', content: <Chapter2 /> },
  { title: 'History – F & A Parkinson', subtitle: "Frank and Albert Parkinson's journey begins", source: 'https://friendsofparkinsonspark.wordpress.com/history/history-f-a-parkinson/', content: <Chapter3 /> },
  { title: 'History – Recent Times', subtitle: 'A timeless place to inspire the people of Guiseley', source: 'https://friendsofparkinsonspark.wordpress.com/history/history-recent/', content: <Chapter4 /> },
  { title: "History – Friends of Parkinson's Park", subtitle: 'The regeneration of a community treasure', source: 'https://friendsofparkinsonspark.wordpress.com/history/history-friends-of-parkinsons-park/', content: <Chapter5 /> },
];

// ── Main component ─────────────────────────────────────────────────────────────
const HistoryArticle: React.FC = () => {
  const [currentChapter, setCurrentChapter] = useState(0);
  const chapter = chapters[currentChapter];
  const { downloadState, initiateDownload, closeDialog } = useDownload();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentChapter]);

  const goTo = (n: number) => setCurrentChapter(n);

  return (
    <div className="bg-stone-50 min-h-screen">
      {/* ── Header ──────────────────────────────────────────────────────────── */}
      <header className="bg-emerald-900 text-white pt-16 pb-20 rounded-b-[3rem]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">

          <Link to="/history" className="inline-flex items-center gap-2 text-emerald-200 hover:text-white mb-8 transition-colors text-sm">
            <ArrowLeft className="w-4 h-4" /> Back to History
          </Link>

          <div className="flex items-center gap-2 mb-6">
            <BookOpen className="w-5 h-5 text-emerald-400" />
            <span className="text-emerald-300 text-sm font-bold uppercase tracking-widest">All Our Stories — Illustrated History</span>
          </div>

          {/* Chapter tabs */}
          <div className="flex flex-wrap gap-2 mb-10">
            {chapters.map((ch, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`text-xs px-3 py-1.5 rounded-full font-semibold transition-all ${
                  i === currentChapter ? 'bg-white text-emerald-900' : 'bg-emerald-800/60 text-emerald-100 hover:bg-emerald-700'
                }`}
              >
                {i + 1}. {ch.title.replace('History – ', '')}
              </button>
            ))}
          </div>

          <div className="text-emerald-400 text-xs font-bold uppercase tracking-widest mb-3">
            Chapter {currentChapter + 1} of {chapters.length}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-3 leading-tight">{chapter.title}</h1>
          <p className="text-xl text-emerald-100 font-light italic">{chapter.subtitle}</p>

          <div className="mt-8">
            <button
              onClick={() => initiateDownload(
                `${import.meta.env.BASE_URL}documents/Parkinsons-Park-Full-History.pdf`,
                'Parkinsons-Park-Full-History.pdf'
              )}
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all"
            >
              <Download className="w-4 h-4" /> Download Full History (PDF)
            </button>
          </div>
        </div>
      </header>

      {/* ── Article body ────────────────────────────────────────────────────── */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-14">
        {chapter.content}

        {/* Source attribution */}
        <div className="mt-14 pt-6 border-t border-stone-200 text-sm text-stone-400 space-y-1">
          <p>
            Original source:{' '}
            <a href={chapter.source} target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline inline-flex items-center gap-1">
              Friends of Parkinson&apos;s Park Archive <ExternalLink className="w-3 h-3" />
            </a>
          </p>
          <p>Research by Jennifer Kirkby and Barbara Winfield, funded by the Heritage Lottery Fund &ldquo;All Our Stories&rdquo; grant (2012).</p>
        </div>
      </main>

      {/* ── Chapter navigation ──────────────────────────────────────────────── */}
      <nav className="max-w-3xl mx-auto px-4 sm:px-6 pb-20">
        <div className="bg-white border border-stone-200 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">

          {currentChapter > 0 ? (
            <button onClick={() => goTo(currentChapter - 1)} className="flex items-center gap-3 text-stone-700 hover:text-emerald-700 transition-colors">
              <ArrowLeft className="w-4 h-4 shrink-0" />
              <div className="text-left">
                <div className="text-xs text-stone-400 uppercase tracking-wider mb-0.5">Previous</div>
                <div className="font-semibold text-sm">{chapters[currentChapter - 1].title}</div>
              </div>
            </button>
          ) : <div />}

          {/* Progress dots */}
          <div className="flex gap-2 items-center">
            {chapters.map((_, i) => (
              <button key={i} onClick={() => goTo(i)} aria-label={`Chapter ${i + 1}`}
                className={`h-2.5 rounded-full transition-all ${i === currentChapter ? 'w-6 bg-emerald-600' : 'w-2.5 bg-stone-300 hover:bg-stone-400'}`}
              />
            ))}
          </div>

          {currentChapter < chapters.length - 1 ? (
            <button onClick={() => goTo(currentChapter + 1)} className="flex items-center gap-3 text-stone-700 hover:text-emerald-700 transition-colors">
              <div className="text-right">
                <div className="text-xs text-stone-400 uppercase tracking-wider mb-0.5">Next</div>
                <div className="font-semibold text-sm">{chapters[currentChapter + 1].title}</div>
              </div>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </button>
          ) : (
            <Link to="/history" className="flex items-center gap-3 text-emerald-700 hover:text-emerald-800 transition-colors">
              <div className="text-right">
                <div className="text-xs text-stone-400 uppercase tracking-wider mb-0.5">Explore</div>
                <div className="font-semibold text-sm">Interactive Timeline</div>
              </div>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </Link>
          )}
        </div>
      </nav>

      <DownloadDialog
        isOpen={downloadState.isOpen}
        onClose={closeDialog}
        fileName={downloadState.fileName}
        fileUrl={downloadState.fileUrl}
      />
    </div>
  );
};

export default HistoryArticle;
