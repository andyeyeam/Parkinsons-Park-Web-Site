import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ExternalLink, BookOpen } from 'lucide-react';

// Local images
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

// ── Block types (discriminated union) ──────────────────────────────────────────
type Block =
  | { type: 'paragraph'; text: string; intro?: boolean }
  | { type: 'heading'; text: string }
  | { type: 'quote'; text: string }
  | { type: 'image'; src: string; alt: string; caption: string }
  | { type: 'image-pair'; left: { src: string; alt: string; caption: string }; right: { src: string; alt: string; caption: string } }
  | { type: 'link-box'; href: string; label: string; description: string };

interface Chapter {
  title: string;
  subtitle: string;
  source: string;
  blocks: Block[];
}

// ── Chapter content ────────────────────────────────────────────────────────────
const chapters: Chapter[] = [
  // ── CHAPTER 1 ────────────────────────────────────────────────────────────────
  {
    title: 'Where to Start?',
    subtitle: 'Names are a Window on the Past',
    source: 'https://friendsofparkinsonspark.wordpress.com/history/',
    blocks: [
      {
        type: 'paragraph', intro: true,
        text: "In 2012, the Heritage Lottery Fund awarded Friends of Parkinson's Park a Diamond Jubilee 'All Our Stories' grant. Local historians Jennifer Kirkby and Barbara Winfield spent the next two years piecing together the park's history through field names, old land deeds, parish records, and manor court rolls — uncovering a story stretching back more than a thousand years.",
      },
      {
        type: 'image',
        src: tithemapImg,
        alt: '1838 Tithe Map detail',
        caption: "The outline of Parkinson's Park on the 1838 Leeds Tithe Map. The field names recorded here became gateways to uncovering over a thousand years of local history.",
      },
      {
        type: 'paragraph',
        text: "The starting point was the 1838 Leeds Tithe Map, which shows the fields now making up Parkinson's Park as meadow and pasture, owned by Marshall Grimshaw, Benjamin Popplewell, Betty Pawson, and Frances Foss. But it was the field names themselves — not the owners — that opened the deepest windows on the past.",
      },
      { type: 'heading', text: 'A Viking Name That Endures' },
      {
        type: 'paragraph',
        text: "The name Kelcliffe derives from Old Norse: 'kel' referring to a steep cliff area, and 'cliffe' to the springs or water source. This places the park squarely within the Viking era (AD 866–950), when Guiseley was part of the Scandinavian kingdom of Jorvik. The springs the Vikings named are still active today — water emerging from the same hillside for over a thousand years.",
      },
      {
        type: 'quote',
        text: "The name Kelcliffe tells us that Viking settlers valued this land for its springs — and those springs have flowed continuously ever since.",
      },
      { type: 'heading', text: 'Anglo-Saxon Farming in Crooked Lands' },
      {
        type: 'paragraph',
        text: "A geophysics survey conducted in July 2013, using Time Team methodology, revealed Anglo-Saxon lynchets and headlands in the field known as 'Crooked Lands.' Lynchets are terraced boundaries created by ploughing across a slope over generations; headlands are the turning spaces at the end of plough strips. The 'crooked' quality of the field comes from the characteristic backward S-shape of strips ploughed by teams of oxen — a technique that pre-dates the Norman Conquest of 1066.",
      },
      {
        type: 'image',
        src: lynchetImg,
        alt: 'Lynchet on Crooked Lands',
        caption: "An Anglo-Saxon lynchet (terraced field boundary) still visible in the Crooked Lands field — physical evidence of farming before the Norman Conquest.",
      },
      { type: 'heading', text: 'A Medieval Rabbit Warren' },
      {
        type: 'paragraph',
        text: "'Clapper Brow' takes its name from the Middle English word for a rabbit burrow. Medieval rabbit warrens were commercial enterprises — providing meat and fur — and ownership was a privilege restricted to landowners. The wooded area of Clapper Brow still exists in the park today, its ancient name serving as a reminder of that medieval enterprise.",
      },
      {
        type: 'image',
        src: clapperBrowImg,
        alt: 'Clapper Brow woodland',
        caption: "The wooded area of Clapper Brow, where a medieval commercial rabbit warren once operated. The name itself, from Middle English for 'rabbit hole', is the only clue remaining.",
      },
      { type: 'heading', text: 'The Tanning Industry' },
      {
        type: 'paragraph',
        text: "'Tanhouse Brow' commemorates the tanning operations at Kelcliffe House, documented from at least the 17th century. The tanning process required clean running water — precisely what the Kelcliffe springs provided. It was a vital local industry, turning animal hides into leather for agricultural communities across the district. The Driver family, whose gravestone can be seen in Guiseley churchyard, were among those associated with the historic tannery.",
      },
      {
        type: 'image',
        src: driverGravestoneImg,
        alt: 'Driver family gravestone',
        caption: "The gravestone of Richard Driver in Guiseley churchyard. The Driver family was connected to the historic tannery at Kelcliffe House, which operated from at least the 17th century.",
      },
      { type: 'heading', text: 'The Geophysics Survey' },
      {
        type: 'paragraph',
        text: "The geophysics team — Barbara Winfield, Jimmy Adcock, and Finn Pope-Carter — used ground-penetrating radar and resistivity surveys in 2013 to reveal features invisible to the naked eye. Their findings pushed the park's documented history further back still, revealing evidence of Romano-British activity (AD 43–410) beneath the soil.",
      },
      {
        type: 'image',
        src: geophysicsTeamImg,
        alt: 'Geophysics survey team 2013',
        caption: "Barbara Winfield with geophysics team members Jimmy Adcock and Finn Pope-Carter conducting the 2013 archaeological survey using Time Team methodology.",
      },
      {
        type: 'link-box',
        href: 'https://www.heritagefund.org.uk',
        label: 'National Lottery Heritage Fund',
        description: "The Heritage Fund's 'All Our Stories' scheme, part of the Diamond Jubilee celebrations, supported community groups researching and sharing local heritage across the UK.",
      },
    ],
  },

  // ── CHAPTER 2 ────────────────────────────────────────────────────────────────
  {
    title: 'The Personal Stories',
    subtitle: 'Family Historians Uncover a Hidden Past',
    source: 'https://friendsofparkinsonspark.wordpress.com/history/history-people/',
    blocks: [
      {
        type: 'paragraph', intro: true,
        text: "Family historians Jennifer Kirkby and Barbara Winfield brought individual lives out of the archives and into the story of Parkinson's Park. Through field names, old land deeds, parish records, and manor court rolls held at the Wakefield Deeds Office, they reconstructed the human landscape of the fields across five centuries.",
      },
      {
        type: 'image',
        src: wakefieldResearchersImg,
        alt: 'Jennifer Kirkby and Barbara Winfield at Wakefield Deeds Office',
        caption: "Jennifer Kirkby and Barbara Winfield at the Wakefield Deeds Office, where centuries of local land records are preserved. Their painstaking research formed the foundation of the Heritage Lottery Fund project.",
      },
      { type: 'heading', text: 'The Manor Sold to Its Tenants' },
      {
        type: 'paragraph',
        text: "The Manor of Guiseley and Esholt was sold to its tenants in 1719, ending centuries of feudal land management and enabling social mobility for local farming families. It was this change that freed the entrepreneurial farmers of the 18th century to innovate and invest in their land.",
      },
      { type: 'heading', text: 'Agricultural Pioneers' },
      {
        type: 'paragraph',
        text: "The 18th century brought agricultural revolution to the fields around Kelcliffe. John Blessard (a Quaker) experimented with new crop rotations and fertilisation methods. Stephen and Martha Overend introduced iron-plate ploughs to replace wooden ones, and were among the first in the area to cultivate potatoes commercially. Widow Susannah Walker managed farmland with unusual success for a woman of the time. James Leadbetter, the local churchwarden, occupied the Little Kelcliffe meadow for hay-making.",
      },
      {
        type: 'image-pair',
        left: {
          src: haymakingImg,
          alt: 'Haymaking at Éragny',
          caption: "Hay-making scene illustrating life in Little Kelcliffe field during the 18th century, when James Leadbetter occupied the meadow for this purpose.",
        },
        right: {
          src: newDykesGateImg,
          alt: 'New Dykes Gate',
          caption: "The New Dykes gate, marking the extension of cultivated farmland onto former common land in the 18th century.",
        },
      },
      { type: 'heading', text: 'Georgian Houses on Kelcliffe Lane' },
      {
        type: 'paragraph',
        text: "As the 18th century turned to the 19th, wealthy clothiers built substantial houses along Kelcliffe Lane: Flatfield House, New Dykes, Crooklands, and Kelcliffe Mount. The lane itself had been formalised around 1709 to provide access to the tannery at Kelcliffe House — now it became a fashionable address for the prosperous merchant class.",
      },
      { type: 'heading', text: "Jonathan Peate: A Trustee of His Possessions" },
      {
        type: 'paragraph',
        text: "Around 1900, Jonathan Peate — a successful woollen cloth manufacturer in Guiseley — began purchasing land in the area, including Clapper Brow. Peate was known for his commitment to using his wealth for the public good, providing land for working men's allotments and housing, donating land and money for Yeadon Town Hall, and establishing Nunroyd Park as a public green space.",
      },
      {
        type: 'quote',
        text: "Peate saw himself as a 'trustee of his possessions' — a philosophy that would be carried forward with remarkable fidelity by Frank and Albert Parkinson a generation later.",
      },
      {
        type: 'paragraph',
        text: "Around 1909, probably to celebrate King George V's coronation, Jonathan Peate planted oak trees on his Clapper Brow land. Several of these trees still stand in the park today, their canopies having spread for over a century above the very ground where medieval rabbits once burrowed.",
      },
      {
        type: 'image',
        src: peateOaksImg,
        alt: "Peate's Oak Trees",
        caption: "Peate's oak trees, planted around 1909, with a seedling growing in their shade. These trees connect the park's Victorian philanthropic heritage to its living landscape.",
      },
    ],
  },

  // ── CHAPTER 3 ────────────────────────────────────────────────────────────────
  {
    title: 'Frank & Albert Parkinson',
    subtitle: 'A Journey That Changed Guiseley Forever',
    source: 'https://friendsofparkinsonspark.wordpress.com/history/history-f-a-parkinson/',
    blocks: [
      {
        type: 'paragraph', intro: true,
        text: "Frank Parkinson started an electrical motor agency from a garden shed at Eldon Mount, Guiseley, with just £21 from his postal savings account. His brother Albert joined him in 1913, and together they built a business that would transform the town — and eventually give it one of its most cherished green spaces.",
      },
      {
        type: 'image',
        src: frankParkinsonImg,
        alt: 'Frank Parkinson',
        caption: "Frank Parkinson (1887–1946). He co-founded F & A Parkinson Ltd with his brother Albert, and his 1946 legacy includes the park, the Parkinson Building at Leeds University, and trusts for the people of Guiseley that persist to this day.",
      },
      { type: 'heading', text: 'Practical Idealism' },
      {
        type: 'paragraph',
        text: "The Parkinson brothers operated on a philosophy they called 'practical idealism': paying high wages and producing quality products at competitive costs. This approach, they noted, was aligned with the principles Gandhi was espousing at the same time. They thrived through the First World War — relocating to Jonathan Peate's land at Greenshaw Close on Netherfield Road — and in 1918 purchased that land along with the Kelcliffe Dole field from the church.",
      },
      { type: 'heading', text: 'Crompton Parkinson' },
      {
        type: 'paragraph',
        text: "In 1927, F & A Parkinson Ltd merged with Crompton & Company of Chelmsford, creating Crompton Parkinson Ltd — an electrical engineering powerhouse. A lamp works was added to the Guiseley site in 1932. Where other businesses faltered during the Great Depression, Crompton Parkinson thrived: their practical idealism was not just a philosophy but a sound business model.",
      },
      {
        type: 'quote',
        text: "They paid their workers well, kept their costs low, and built products people trusted. Through the Depression, when others were closing, Crompton Parkinson was growing.",
      },
      { type: 'heading', text: 'The Park Is Created' },
      {
        type: 'paragraph',
        text: "Between 1936 and 1937, Frank and Albert Parkinson acquired the remaining fields and set about developing them for public use. They laid footpaths, installed gates, placed benches at viewpoints, and opened the grounds for walking. The park may have been intended in part to compensate for the loss of Guiseley Recreation Ground to council housing in the early 1920s.",
      },
      {
        type: 'paragraph',
        text: "Facilities grew through the following decade: bowling greens, a putting green, a rose garden, tennis courts, and a pavilion near the factory were all added. Like Jonathan Peate before them, the Parkinsons saw themselves as trustees of their land for the public good.",
      },
      { type: 'heading', text: 'The Coronation Copses' },
      {
        type: 'paragraph',
        text: "In the early 1950s, two copses were planted with a remarkable geographical imagination: one in the shape of the outline of Yeadon, the other in the shape of Guiseley. They commemorated both the Festival of Britain and Queen Elizabeth II's Coronation in 1953 — a creative act of civic pride linking the park's landscape to the geography of its community. Both copses survive today, though their shapes have grown and blurred with the decades.",
      },
      { type: 'heading', text: "Frank's Legacy" },
      {
        type: 'paragraph',
        text: "Frank Parkinson died in 1946, leaving an estate valued at £1.5 million. His bequests reflected precisely the practical idealism he had always espoused: £200,000 for the Parkinson Building at Leeds University (completed 1951), bursaries for Yorkshire engineering students, the Frank Parkinson Agricultural Trust, the Frank Parkinson Yorkshire Trust for the poor, sick, and elderly of Guiseley, and £1,000 annually for staff welfare and community events in the park.",
      },
      {
        type: 'image',
        src: parkinsonBuildingImg,
        alt: 'Parkinson Building at Leeds University',
        caption: "The Parkinson Building at the University of Leeds, funded by Frank Parkinson's bequest of £200,000. Its clock tower is one of the most recognisable landmarks in Leeds.",
      },
      {
        type: 'link-box',
        href: 'https://www.leeds.ac.uk/parkinson-building',
        label: 'The Parkinson Building, University of Leeds',
        description: "Completed in 1951, the Parkinson Building is the iconic centrepiece of the University of Leeds campus and a lasting monument to Frank Parkinson's generosity.",
      },
      { type: 'heading', text: 'A Park Full of Life' },
      {
        type: 'paragraph',
        text: "The first Children's Gala was launched in 1949, organised by the Crompton Parkinson sports and social club and funded by Frank's endowment. The Annual Flower and Produce Show followed in 1951. October bonfires were another beloved tradition. These events made the park the beating heart of community life in Guiseley for a generation.",
      },
    ],
  },

  // ── CHAPTER 4 ────────────────────────────────────────────────────────────────
  {
    title: 'A Timeless Place',
    subtitle: 'Community Memories and Corporate Decline',
    source: 'https://friendsofparkinsonspark.wordpress.com/history/history-recent/',
    blocks: [
      {
        type: 'paragraph', intro: true,
        text: "For the families of Guiseley, Parkinson's Park was simply woven into the fabric of life. Children grew up there. Elderly residents gathered there. The park carried generations of memory — names for every slope, stories attached to every corner.",
      },
      {
        type: 'image-pair',
        left: {
          src: snowSledgingImg,
          alt: 'Children sledging in snow',
          caption: "Winter at Parkinson's Park meant sledging — down the 'Snowdrop' on Great Brow or the gentler 'Bluebell Run' on Crooked Lands.",
        },
        right: {
          src: oldMansCornerImg,
          alt: "Old man's corner near Kelcliffe Lane",
          caption: "'Old man's corner' near Kelcliffe Lane: where elderly residents gathered to watch sunsets and share their country knowledge.",
        },
      },
      { type: 'heading', text: 'The Names People Gave It' },
      {
        type: 'paragraph',
        text: "Children named the sledging runs: 'Snowdrop' ran steeply down the Great Brow slope, fast and exhilarating. The 'Bluebell Run' on the gentler Crooked Lands slopes was for younger children and less adventurous adults. 'Old man's corner,' near Kelcliffe Lane, was where elderly residents sat on fine afternoons, watching the sun set over the Wharfe valley and passing on country knowledge to anyone who would listen.",
      },
      {
        type: 'quote',
        text: "These were not official names — they were the language communities use to own the places they love.",
      },
      { type: 'heading', text: 'The End of an Era' },
      {
        type: 'paragraph',
        text: "Albert Parkinson died in 1971, aged 88 — the last direct family connection to Crompton Parkinson. By that time the company had already been absorbed into Hawker Siddeley Aerospace in 1968. The 'practical idealism' that had made the company exceptional and the park possible began to fade under corporate management, as decisions were made by people with no connection to Guiseley.",
      },
      { type: 'heading', text: 'Corporate Ownership and Decline' },
      {
        type: 'paragraph',
        text: "In 1999, Cooper Industries purchased the company primarily for asset value. Manufacturing wound down. Jobs were lost. The park maintenance budget was eliminated. In 2002, St Modwen Properties PLC acquired the land for redevelopment. Minimal maintenance was provided. Antisocial behaviour and vandalism increased. Gates disappeared. Stone walls crumbled. The copses — those remarkable geographical tree-shapes — filled with refuse.",
      },
      {
        type: 'image',
        src: greatBrowImg,
        alt: 'Great Brow during period of neglect',
        caption: "Great Brow — once the beloved 'Snowdrop' sledging slope — during the long years of neglect, when unmanaged vegetation covered paths and historic features alike.",
      },
      { type: 'heading', text: 'The Low Point: 2006' },
      {
        type: 'paragraph',
        text: "When Bellway Homes took over the site, they demolished the Crompton Parkinson factory buildings and removed all park facilities that had served the community since the 1940s and 1950s. The bowling greens, putting green, rose garden, tennis courts, and pavilion were all destroyed. Ancient trackways and footpaths were blocked. Dense vegetation obscured the historic Peate oak trees.",
      },
      {
        type: 'quote',
        text: "It was the low point in the park's 4,000-year history — the moment when the community felt the park was lost forever.",
      },
    ],
  },

  // ── CHAPTER 5 ────────────────────────────────────────────────────────────────
  {
    title: "Friends of Parkinson's Park",
    subtitle: 'A Community-Led Renaissance',
    source: 'https://friendsofparkinsonspark.wordpress.com/history/history-friends-of-parkinsons-park/',
    blocks: [
      {
        type: 'paragraph', intro: true,
        text: "In August 2011, Jennifer Kirkby initiated discussions with MP Stuart Andrew and Councillor Graham Latty about the state of the land. On 13 September 2011, six local residents formally constituted Friends of Parkinson's Park. What followed was one of the most remarkable stories of community-led restoration in West Yorkshire.",
      },
      {
        type: 'paragraph',
        text: "The founding members were Chris Parapia (Chair), Barbara Winfield, Jennifer Kirkby, Andy Cheetham, Joanna Brooks, and Colin Alexander. Their mission: to restore the park and honour the philanthropic vision of Frank and Albert Parkinson, who had created it as a gift to the community three-quarters of a century earlier.",
      },
      {
        type: 'image',
        src: 'https://friendsofparkinsonspark.wordpress.com/wp-content/uploads/2011/11/site-meeting-parkinsons-park-nov-2011.jpg',
        alt: "Site meeting at Parkinson's Park November 2011",
        caption: "The site meeting in November 2011, when FOPP and Bellway Homes agreed the terms of the first phase of park restoration. Volunteers and contractors worked together from the outset.",
      },
      { type: 'heading', text: 'Phase One: Getting to Work (2011–2012)' },
      {
        type: 'paragraph',
        text: "In November 2011, FOPP partnered with developer Bellway to begin the first phase of regeneration. Pudsey Landscapes were contracted for major earthworks. Volunteers rebuilt dry stone walls, installed new benches, and carried out ecological surveys to understand what wildlife still inhabited the neglected land. It was hard, unglamorous work — but it was the beginning of something extraordinary.",
      },
      { type: 'heading', text: 'The Heritage Lottery Fund Grant (2012)' },
      {
        type: 'paragraph',
        text: "2012 was, in the words of the original FOPP newsletter, 'a year of real boost.' The Heritage Lottery Fund awarded the 'All Our Stories' Diamond Jubilee grant, funding the historical research project that would uncover 4,000 years of the park's past. The Jubilee Walk was planted with shrubs donated by the Woodland Trust, and a commemorative oak sapling from the Sandringham estate was planted to mark the Queen's Diamond Jubilee.",
      },
      {
        type: 'image',
        src: 'https://friendsofparkinsonspark.wordpress.com/wp-content/uploads/2012/06/dsc01628-1024x727.jpg',
        alt: 'Jubilee Picnic opening ceremony 2012',
        caption: "The Jubilee Picnic of 2012, which relaunched the historic Children's Gala tradition. Hundreds of families attended, reclaiming the park as a community space for the first time in years.",
      },
      { type: 'heading', text: 'The Lantern Parade (2013–present)' },
      {
        type: 'paragraph',
        text: "In winter 2013, FOPP launched its first Lantern Parade — families making handmade lanterns in workshops, then processing through the park in the winter darkness with music. What might have been a one-off event became the park's most beloved annual tradition, drawing hundreds of participants each December.",
      },
      {
        type: 'image',
        src: 'https://friendsofparkinsonspark.wordpress.com/wp-content/uploads/2016/06/park-2.jpeg',
        alt: 'Lantern Parade in the park',
        caption: "The annual Lantern Parade brings hundreds of families into the park on winter evenings, creating a magical community tradition that connects Guiseley to its park in the darkest months of the year.",
      },
      { type: 'heading', text: 'Growing the Park (2015–2018)' },
      {
        type: 'paragraph',
        text: "A horticultural grant funded the Community Orchard in 2015, planting heritage Yorkshire apple varieties on a previously neglected slope. On 4 March 2016, FOPP registered as a Community Interest Company (CIC Registration Number 10044868). That same year, a bog garden was created by channelling the park's natural springs — echoing the Viking name Kelcliffe in living water — and the first Apple Day celebration was held in autumn.",
      },
      {
        type: 'paragraph',
        text: "The Park Watch initiative, launched in 2017 in partnership with West Yorkshire Police, brought a Neighbourhood Watch model to the park, significantly reducing vandalism and antisocial behaviour. In 2018, interpretation boards and a 'Story Trail' leaflet were installed, allowing visitors to discover the park's layered history as they walked.",
      },
      { type: 'heading', text: 'A Lifeline Through COVID-19 (2020)' },
      {
        type: 'paragraph',
        text: "During the lockdowns of 2020, Parkinson's Park proved its value beyond all doubt. As one of the few accessible green spaces in the area, it became a vital resource for physical and mental health. Usage increased dramatically. ITV Calendar's 'Park Life' strand featured the park's story, bringing regional recognition to FOPP's decade of work.",
      },
      {
        type: 'image',
        src: 'https://friendsofparkinsonspark.wordpress.com/wp-content/uploads/2019/09/childrens-gala-2019-1.jpg',
        alt: "Children's Gala 2019",
        caption: "The Children's Gala 2019 — part of a tradition revived by FOPP in 2012, itself honouring the annual gala first established under Frank Parkinson's 1946 bequest.",
      },
      { type: 'heading', text: 'Recognition and Protection (2022)' },
      {
        type: 'paragraph',
        text: "In 2022, a Platinum Jubilee commemorative tree was planted, continuing a tradition of jubilee tree planting connecting the park to national celebrations stretching back to Jonathan Peate's coronation oaks of 1909. Fields In Trust then named Parkinson's Park as Yorkshire's 'Local Favourite' through a national public vote — the most meaningful possible endorsement of FOPP's decade of restoration.",
      },
      {
        type: 'image',
        src: 'https://friendsofparkinsonspark.wordpress.com/wp-content/uploads/2022/07/copy-of-uks-favourite-parks-2022.jpg',
        alt: "UK's Favourite Parks 2022",
        caption: "Parkinson's Park named as Yorkshire's 'Local Favourite' by Fields In Trust in 2022 through a national public vote — recognition of the park's community value and FOPP's decade of restoration work.",
      },
      {
        type: 'quote',
        text: "From neglected wasteland to Yorkshire's Local Favourite in just over a decade — this is what communities can achieve when they refuse to give up.",
      },
      {
        type: 'link-box',
        href: 'https://www.fieldsintrust.org',
        label: 'Fields In Trust',
        description: "Fields In Trust protects parks and green spaces across the UK in perpetuity, ensuring they remain accessible for communities for generations to come.",
      },
      {
        type: 'link-box',
        href: 'https://www.heritagefund.org.uk',
        label: 'National Lottery Heritage Fund',
        description: "The Heritage Lottery Fund's 'All Our Stories' grant funded the research that uncovered 4,000 years of the park's history.",
      },
    ],
  },
];

// ── Main component ─────────────────────────────────────────────────────────────
const HistoryArticle: React.FC = () => {
  const [currentChapter, setCurrentChapter] = useState(0);
  const chapter = chapters[currentChapter];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentChapter]);

  const goTo = (n: number) => setCurrentChapter(n);

  // ── Block renderer ───────────────────────────────────────────────────────────
  const renderBlock = (block: Block, index: number) => {
    switch (block.type) {
      case 'paragraph':
        return (
          <p
            key={index}
            className={`leading-relaxed mb-5 ${
              block.intro
                ? 'text-xl font-light text-stone-800 border-l-4 border-emerald-500 pl-5 py-1'
                : 'text-base text-stone-700'
            }`}
          >
            {block.text}
          </p>
        );

      case 'heading':
        return (
          <h3 key={index} className="text-xl font-bold text-stone-900 mt-10 mb-4 pb-2 border-b border-emerald-200">
            {block.text}
          </h3>
        );

      case 'quote':
        return (
          <blockquote key={index} className="my-10 py-6 px-8 bg-emerald-50 border-l-4 border-emerald-600 rounded-r-2xl">
            <p className="text-xl md:text-2xl italic text-emerald-900 leading-relaxed font-light">
              &ldquo;{block.text}&rdquo;
            </p>
          </blockquote>
        );

      case 'image':
        return (
          <figure key={index} className="my-8">
            <img
              src={block.src}
              alt={block.alt}
              className="w-full rounded-2xl shadow-lg border border-stone-200"
              loading="lazy"
            />
            <figcaption className="mt-3 text-sm text-stone-500 italic text-center leading-relaxed px-4">
              {block.caption}
            </figcaption>
          </figure>
        );

      case 'image-pair':
        return (
          <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
            <figure>
              <img
                src={block.left.src}
                alt={block.left.alt}
                className="w-full h-56 object-cover rounded-2xl shadow-md border border-stone-200"
                loading="lazy"
              />
              <figcaption className="mt-2 text-sm text-stone-500 italic text-center px-2">
                {block.left.caption}
              </figcaption>
            </figure>
            <figure>
              <img
                src={block.right.src}
                alt={block.right.alt}
                className="w-full h-56 object-cover rounded-2xl shadow-md border border-stone-200"
                loading="lazy"
              />
              <figcaption className="mt-2 text-sm text-stone-500 italic text-center px-2">
                {block.right.caption}
              </figcaption>
            </figure>
          </div>
        );

      case 'link-box':
        return (
          <div key={index} className="my-5 p-4 bg-stone-50 border border-stone-200 rounded-xl flex items-start gap-3">
            <ExternalLink className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <a
                href={block.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-700 font-bold hover:underline text-sm"
              >
                {block.label}
              </a>
              <p className="text-sm text-stone-600 mt-0.5">{block.description}</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="bg-stone-50 min-h-screen">
      {/* ── Dark header ─────────────────────────────────────────────────────── */}
      <header className="bg-emerald-900 text-white pt-16 pb-20 rounded-b-[3rem]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">

          {/* Back link */}
          <Link
            to="/history"
            className="inline-flex items-center gap-2 text-emerald-200 hover:text-white mb-8 transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to History
          </Link>

          {/* Series label */}
          <div className="flex items-center gap-2 mb-6">
            <BookOpen className="w-5 h-5 text-emerald-400" />
            <span className="text-emerald-300 text-sm font-bold uppercase tracking-widest">
              All Our Stories — Illustrated History
            </span>
          </div>

          {/* Chapter tabs */}
          <div className="flex flex-wrap gap-2 mb-10">
            {chapters.map((ch, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`text-xs px-3 py-1.5 rounded-full font-semibold transition-all ${
                  i === currentChapter
                    ? 'bg-white text-emerald-900'
                    : 'bg-emerald-800/60 text-emerald-100 hover:bg-emerald-700'
                }`}
              >
                {i + 1}. {ch.title}
              </button>
            ))}
          </div>

          {/* Chapter title */}
          <div className="text-emerald-400 text-xs font-bold uppercase tracking-widest mb-3">
            Chapter {currentChapter + 1} of {chapters.length}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-3 leading-tight">{chapter.title}</h1>
          <p className="text-xl text-emerald-100 font-light">{chapter.subtitle}</p>
        </div>
      </header>

      {/* ── Article body ────────────────────────────────────────────────────── */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-14">
        {chapter.blocks.map((block, index) => renderBlock(block, index))}

        {/* Source attribution */}
        <div className="mt-14 pt-6 border-t border-stone-200 text-sm text-stone-400 space-y-1">
          <p>
            Original source:{' '}
            <a
              href={chapter.source}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-600 hover:underline inline-flex items-center gap-1"
            >
              Friends of Parkinson&apos;s Park Archive <ExternalLink className="w-3 h-3" />
            </a>
          </p>
          <p>Research by Jennifer Kirkby and Barbara Winfield, funded by the Heritage Lottery Fund &ldquo;All Our Stories&rdquo; grant (2012).</p>
        </div>
      </main>

      {/* ── Chapter navigation ──────────────────────────────────────────────── */}
      <nav className="max-w-3xl mx-auto px-4 sm:px-6 pb-20">
        <div className="bg-white border border-stone-200 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">

          {/* Previous */}
          {currentChapter > 0 ? (
            <button
              onClick={() => goTo(currentChapter - 1)}
              className="flex items-center gap-3 text-stone-700 hover:text-emerald-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 shrink-0" />
              <div className="text-left">
                <div className="text-xs text-stone-400 uppercase tracking-wider mb-0.5">Previous</div>
                <div className="font-semibold text-sm">{chapters[currentChapter - 1].title}</div>
              </div>
            </button>
          ) : (
            <div />
          )}

          {/* Progress dots */}
          <div className="flex gap-2 items-center">
            {chapters.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Chapter ${i + 1}`}
                className={`h-2.5 rounded-full transition-all ${
                  i === currentChapter ? 'w-6 bg-emerald-600' : 'w-2.5 bg-stone-300 hover:bg-stone-400'
                }`}
              />
            ))}
          </div>

          {/* Next */}
          {currentChapter < chapters.length - 1 ? (
            <button
              onClick={() => goTo(currentChapter + 1)}
              className="flex items-center gap-3 text-stone-700 hover:text-emerald-700 transition-colors"
            >
              <div className="text-right">
                <div className="text-xs text-stone-400 uppercase tracking-wider mb-0.5">Next</div>
                <div className="font-semibold text-sm">{chapters[currentChapter + 1].title}</div>
              </div>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </button>
          ) : (
            <Link
              to="/history"
              className="flex items-center gap-3 text-emerald-700 hover:text-emerald-800 transition-colors"
            >
              <div className="text-right">
                <div className="text-xs text-stone-400 uppercase tracking-wider mb-0.5">Explore</div>
                <div className="font-semibold text-sm">Interactive Timeline</div>
              </div>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
};

export default HistoryArticle;
