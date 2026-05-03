import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Users, Factory, Heart, Sparkles, ArrowLeft, ArrowRight, Award, ChevronDown, X, MapPin, Trees, Calendar, Camera } from 'lucide-react';

// Import historical images
import lynchetCrookedLands from '../src/assets/images/lynchet-crooked-lands.jpg';
import clapperBrow from '../src/assets/images/clapper-brow.jpg';
import greatBrow from '../src/assets/images/great-brow.jpg';
import titheMapDetail from '../src/assets/images/tithe-map-1838-detail.jpg';
import peateOakTrees from '../src/assets/images/peate-oak-trees.jpg';
import frankParkinson from '../src/assets/images/frank-parkinson.jpg';
import parkinsonBuilding from '../src/assets/images/parkinson-building-leeds.jpg';
import snowSledging from '../src/assets/images/snow-sledging.gif';
import wakefieldResearchers from '../src/assets/images/wakefield-deeds-researchers.jpg';
import geophysicsTeam from '../src/assets/images/geophysics-team-2013.jpg';
import driverGravestone from '../src/assets/images/driver-gravestone.jpg';
import haymaking from '../src/assets/images/haymaking-eragny.jpg';
import newDykesGate from '../src/assets/images/new-dykes-gate.jpg';
import oldMansCorner from '../src/assets/images/old-mans-corner.jpg';
import nlhfStampImg from '../src/assets/images/nlhf-acknowledgement-stamp.png';

// Timeline Event Interface
interface TimelineImage {
  src: string;
  alt: string;
  caption?: string;
}

interface TimelineEvent {
  id: string;
  era: string;
  title: string;
  description: string;
  category: 'ancient' | 'medieval' | 'georgian' | 'industrial' | 'modern' | 'fopp';
  details?: {
    expandedContent: string[];
    images?: TimelineImage[];
    relatedPeople?: string[];
  };
}

const History: React.FC = () => {
  // State for expandable timeline
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string; caption?: string } | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const isExpanded = (id: string) => expandedItems.has(id);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const getCategoryColor = (category: string): string => {
    const colors = {
      ancient: 'bg-amber-600',
      medieval: 'bg-orange-600',
      georgian: 'bg-blue-600',
      industrial: 'bg-purple-600',
      modern: 'bg-red-600',
      fopp: 'bg-emerald-600'
    };
    return colors[category as keyof typeof colors] || 'bg-emerald-600';
  };

  // Comprehensive Timeline Data
  const timeline: TimelineEvent[] = [
    {
      id: 'bronze-age',
      era: '2300-801 BC',
      title: 'Bronze Age Settlement',
      description: 'Archaeological evidence suggests continuous human activity in the area dating back to the Bronze Age.',
      category: 'ancient',
      details: {
        expandedContent: [
          'Geophysical surveys and historical research funded by the Heritage Lottery Fund in 2012 uncovered evidence of human presence dating back over 4,000 years',
          'The area\'s springs and elevated position made it attractive for early settlement',
          'This makes Parkinson\'s Park one of the oldest continuously used landscapes in the region'
        ]
      }
    },
    {
      id: 'romano-british',
      era: 'AD 43-410',
      title: 'Romano-British Period',
      description: 'Geophysical surveys revealed evidence of Romano-British activity in the park area.',
      category: 'ancient',
      details: {
        expandedContent: [
          'Time Team methodology was used in 2013 to conduct geophysical surveys',
          'Evidence found suggests the area was part of a rural Romano-British farming landscape',
          'The strategic position near springs would have been valuable during Roman occupation'
        ]
      }
    },
    {
      id: 'viking-settlement',
      era: 'AD 866-950',
      title: 'Viking Settlement - Kelcliffe Origins',
      description: 'Kelcliffe name derives from Old Norse meaning "steep area where springs are," suggesting settlement during the Viking era when Guiseley was part of Jorvik.',
      category: 'ancient',
      details: {
        expandedContent: [
          'Etymology: "Kel" (Old Norse) = steep/cliff area + "cliffe" = springs/water source',
          'The name indicates Viking settlers recognized and valued the natural springs in the area',
          'During this period, Guiseley was part of the Scandinavian kingdom of Jorvik (York)',
          'Field name analysis confirmed by Heritage Lottery Fund research in 2012',
          'Evidence of continuous spring activity for over 1,000 years'
        ]
      }
    },
    {
      id: 'anglo-saxon',
      era: 'Pre-1066',
      title: 'Anglo-Saxon Farming',
      description: 'Geophysics surveys revealed early medieval lynchets and headlands in Crooked Lands, extending the park\'s documented history into Anglo-Saxon times.',
      category: 'ancient',
      details: {
        expandedContent: [
          'Lynchets (terraced field boundaries) and headlands (strip farming edges) discovered in Crooked Lands field',
          'These features are characteristic of Anglo-Saxon agricultural practices',
          'The field name "Crooked Lands" itself refers to these pre-1066 farming structures',
          'Evidence shows organized agriculture before the Norman Conquest'
        ],
        images: [
          {
            src: lynchetCrookedLands,
            alt: 'Lynchet on Crooked Lands',
            caption: 'Anglo-Saxon lynchet (terraced field boundary) still visible in Crooked Lands field'
          }
        ]
      }
    },
    {
      id: 'medieval-warren',
      era: '1066-1500',
      title: 'Medieval Rabbit Warren',
      description: 'Clapper Brow field name derives from Middle English for "rabbit hole," suggesting a medieval rabbit warren.',
      category: 'medieval',
      details: {
        expandedContent: [
          '"Clapper" comes from Middle English meaning rabbit burrow or hole',
          'Medieval rabbit warrens were commercial enterprises providing meat and fur',
          'Ownership of warrens was a privilege restricted to landowners',
          'The wooded area of Clapper Brow still exists in the park today'
        ],
        images: [
          {
            src: clapperBrow,
            alt: 'Clapper Brow woodland',
            caption: 'The wooded area of Clapper Brow, site of the medieval rabbit warren'
          }
        ]
      }
    },
    {
      id: 'common-field',
      era: '1639',
      title: 'Common Field Division',
      description: 'Parish records document the Common Close\'s division among thirteen families, replacing medieval common field systems.',
      category: 'medieval',
      details: {
        expandedContent: [
          'An enclosure agreement divided the Common Close among 13 local families',
          'This marked the transition from medieval communal farming to private ownership',
          'Each family received designated strips of land for cultivation',
          'The agreement is preserved in parish records at Wakefield Deeds Office'
        ]
      }
    },
    {
      id: 'tanning-industry',
      era: '17th Century',
      title: 'Tanning Industry at Kelcliffe',
      description: 'Tanhouse Brow named after tanning operations at Kelcliffe House dating to the 17th century.',
      category: 'georgian',
      details: {
        expandedContent: [
          'Kelcliffe House operated as a tannery from the 17th century',
          'The tanning industry required clean water from springs - explaining the location',
          'Tanhouse Brow field name commemorates this industrial heritage',
          'Tanning was a vital industry providing leather for local communities'
        ],
        images: [
          {
            src: driverGravestone,
            alt: 'Driver family gravestone in Guiseley Churchyard',
            caption: 'Richard Driver\'s gravestone at Guiseley Churchyard - the Driver family was involved with the historic tannery at Kelcliffe House'
          }
        ]
      }
    },
    {
      id: 'kelcliffe-lane',
      era: 'circa 1709',
      title: 'Kelcliffe Lane Formalized',
      description: 'The lane was formalized around 1709 to provide access to the tannery operations.',
      category: 'georgian',
      details: {
        expandedContent: [
          'Previously an informal track, the lane was upgraded to support tannery traffic',
          'Became a main route connecting the rural area to Guiseley center',
          'Georgian-era houses were later built along the lane: Flatfield House, New Dykes, Crooklands, Kelcliffe Mount'
        ]
      }
    },
    {
      id: 'manor-sale',
      era: '1719',
      title: 'Manor Sale to Tenants',
      description: 'Manor of Guiseley and Esholt sold to tenants, enabling social mobility for farming families.',
      category: 'georgian',
      details: {
        expandedContent: [
          'The traditional manor system ended when land was sold to sitting tenants',
          'This enabled entrepreneurial farmers to own and improve their land',
          'Triggered the agricultural revolution in the area with new farming methods',
          'Socially mobile farmers like Quaker John Blessard and the Overends emerged'
        ]
      }
    },
    {
      id: 'agricultural-revolution',
      era: '18th Century',
      title: 'Agricultural Revolution',
      description: 'Progressive farmers including Quaker John Blessard, Stephen & Martha Overend, and widow Susannah Walker adopted new technologies.',
      category: 'georgian',
      details: {
        expandedContent: [
          'John Blessard (Quaker) experimented with new crop rotations and fertilization methods',
          'Stephen & Martha Overend introduced iron-plate ploughs replacing wooden implements',
          'The Overends were among the first to cultivate potatoes commercially in the area',
          'Widow Susannah Walker successfully managed farmland, unusual for women at the time',
          'James Leadbetter (Churchwarden) occupied Little Kelcliffe meadow for haymaking'
        ],
        images: [
          {
            src: haymaking,
            alt: 'Haymaking at Éragny painting',
            caption: 'Haymaking scene illustrating agricultural practices in Little Kelcliffe field during the 18th century'
          },
          {
            src: newDykesGate,
            alt: 'New Dykes Gate',
            caption: 'New Dykes gate marking the extension of cultivated farmland onto common land'
          }
        ],
        relatedPeople: ['John Blessard', 'Stephen & Martha Overend', 'Susannah Walker', 'James Leadbetter']
      }
    },
    {
      id: 'grimshaw-conversion',
      era: '1837',
      title: 'Grimshaw\'s Dairy Farm',
      description: 'Marshall Grimshaw converted Kelcliffe House from tannery to dairy farming, renaming Great Brow as Potterton Brow.',
      category: 'georgian',
      details: {
        expandedContent: [
          'Marshall Grimshaw purchased Kelcliffe House and ended centuries of tanning operations',
          'Established a modern dairy farm serving growing urban populations',
          'Renamed Great Brow field to Potterton Brow after his mother\'s family',
          'Invested in new farming buildings and improved pastures'
        ],
        images: [
          {
            src: greatBrow,
            alt: 'Great Brow (Potterton Brow)',
            caption: 'Great Brow, renamed Potterton Brow by Marshall Grimshaw in 1837'
          }
        ]
      }
    },
    {
      id: 'tithe-map',
      era: '1838',
      title: 'Leeds Tithe Map',
      description: 'The 1838 Tithe Map documented fields as meadow and pasture, providing the starting point for historical research.',
      category: 'georgian',
      details: {
        expandedContent: [
          'Fields identified as meadow and pasture owned by Marshall Grimshaw, Benjamin Popplewell, Betty Pawson, and Frances Foss',
          'The map recorded field names that became "windows into the past" for historians',
          'Showed rural farming/weaving community during industrial revolution',
          'This map became the foundation for the 2012 Heritage Lottery Fund research project',
          'Original map available at Wakefield Deeds Office'
        ],
        images: [
          {
            src: titheMapDetail,
            alt: '1838 Tithe Map',
            caption: 'Outline of Parkinson\'s Park on the 1838 Tithe Map showing field boundaries and names'
          }
        ]
      }
    },
    {
      id: 'peate-purchase',
      era: 'circa 1900',
      title: 'Jonathan Peate Purchases Land',
      description: 'Local woollen cloth manufacturer and philanthropist Jonathan Peate purchased surrounding land.',
      category: 'industrial',
      details: {
        expandedContent: [
          'Peate was a successful woollen cloth manufacturer in Guiseley',
          'Believed in using wealth for public good and worker welfare',
          'Purchased fields that would later become part of Parkinson\'s Park',
          'Provided land for working men\'s allotments and housing'
        ],
        relatedPeople: ['Jonathan Peate']
      }
    },
    {
      id: 'peate-philanthropy',
      era: '1900-1913',
      title: 'Peate\'s Civic Contributions',
      description: 'Jonathan Peate donated land and funding for Yeadon Town Hall and Nunroyd Park, establishing a legacy of community service.',
      category: 'industrial',
      details: {
        expandedContent: [
          'Donated land and funds for Yeadon Town Hall construction',
          'Established Nunroyd Park as a public green space',
          'Provided allotments and housing for working men',
          'Set an example of industrial philanthropy that inspired the Parkinsons',
          'Saw himself as a "trustee" of possessions for public benefit'
        ],
        relatedPeople: ['Jonathan Peate']
      }
    },
    {
      id: 'peate-oaks',
      era: 'circa 1909',
      title: 'Peate\'s Oaks Planted',
      description: 'Jonathan Peate planted oak trees to celebrate King George V\'s coronation.',
      category: 'industrial',
      details: {
        expandedContent: [
          'Oak trees planted around 1909 during George V\'s coronation',
          'Several of these trees still stand in the park today',
          'Represented the Victorian/Edwardian tradition of commemorative tree planting',
          'The oaks became landmark features helping preserve the park\'s character'
        ],
        images: [
          {
            src: peateOakTrees,
            alt: 'Peate\'s Oak Trees',
            caption: 'Peate\'s oak trees planted circa 1909 for King George V\'s coronation, with seedling'
          }
        ]
      }
    },
    {
      id: 'fa-parkinson-founded',
      era: '1913',
      title: 'F & A Parkinson Founded',
      description: 'Frank Parkinson started an electrical motor business from a shed at Eldon Mount with just £21 from postal savings.',
      category: 'industrial',
      details: {
        expandedContent: [
          'Frank started with £21 saved from his postal account',
          'Worked from a small shed at Eldon Mount, Guiseley',
          'Brother Albert joined the business in 1913',
          'Initially an agency for electrical motors before manufacturing their own',
          'The brothers\' "practical idealism" philosophy aligned with Gandhi\'s principles'
        ],
        images: [
          {
            src: frankParkinson,
            alt: 'Frank Parkinson',
            caption: 'Frank Parkinson (1887-1946), co-founder of F & A Parkinson Ltd'
          }
        ],
        relatedPeople: ['Frank Parkinson', 'Albert Parkinson']
      }
    },
    {
      id: 'wwi-relocation',
      era: '1914-1918',
      title: 'Wartime Expansion',
      description: 'During WWI, F & A Parkinson relocated to Jonathan Peate\'s land at Greenshaw Close on Netherfield Road.',
      category: 'industrial',
      details: {
        expandedContent: [
          'War demand for electrical equipment drove business expansion',
          'Moved from shed to proper factory buildings on Peate\'s land',
          'This connection to Peate\'s legacy influenced the Parkinsons\' later philanthropy',
          'Employed local workers, supporting the community through wartime'
        ]
      }
    },
    {
      id: 'netherfield-purchase',
      era: '1918',
      title: 'Netherfield Land Purchase',
      description: 'F & A Parkinson Ltd purchased Netherfield land and Kelcliffe Dole field from the church.',
      category: 'industrial',
      details: {
        expandedContent: [
          'Secured ownership of factory site for long-term growth',
          'Kelcliffe Dole field purchased from church holdings',
          'This acquisition laid groundwork for future park development',
          'Demonstrated business success and community investment'
        ]
      }
    },
    {
      id: 'crompton-merger',
      era: '1927',
      title: 'Crompton Merger',
      description: 'F & A Parkinson merged with Crompton\'s lighting firm from Chelmsford, becoming Crompton Parkinson Ltd.',
      category: 'industrial',
      details: {
        expandedContent: [
          'Merger with Crompton & Company (Chelmsford) created electrical engineering powerhouse',
          'Company became Crompton Parkinson Ltd',
          'Combined motor manufacturing with lighting expertise',
          'Thrived through Great Depression by maintaining "practical idealism" - paying workers well while keeping costs low',
          'Grew to become major employer in Guiseley area'
        ]
      }
    },
    {
      id: 'lamp-works',
      era: '1932',
      title: 'Lamp Works Added',
      description: 'Crompton Parkinson added lamp manufacturing facilities, expanding their industrial operations.',
      category: 'industrial',
      details: {
        expandedContent: [
          'Built lamp works adjacent to motor factory',
          'Diversified product range during economic depression',
          'Created additional employment in Guiseley',
          'Integrated production from components to finished products'
        ]
      }
    },
    {
      id: 'park-creation',
      era: '1936-37',
      title: 'Park Creation',
      description: 'The Parkinsons acquired remaining park fields and developed them with footpaths, gates, benches, and facilities.',
      category: 'industrial',
      details: {
        expandedContent: [
          'Purchased remaining fields to create comprehensive park',
          'Installed network of footpaths connecting different areas',
          'Built gates and stiles for public access',
          'Placed benches at viewpoints for rest and contemplation',
          'May have compensated for loss of Guiseley Recreation Ground to housing in early 1920s',
          'Saw themselves as "trustees" of the land for public benefit - echoing Peate\'s philosophy'
        ]
      }
    },
    {
      id: 'park-facilities',
      era: '1936-1950s',
      title: 'Park Facilities Development',
      description: 'Bowling greens, putting green, rose garden, tennis courts, and pavilion built near the factory.',
      category: 'industrial',
      details: {
        expandedContent: [
          'Bowling green and putting green for recreational use',
          'Rose garden created as ornamental feature',
          'Tennis courts for employees and community',
          'Pavilion provided changing rooms and shelter',
          'Facilities primarily for Crompton Parkinson employees but open to public',
          'Represented enlightened employer providing recreation for workers'
        ]
      }
    },
    {
      id: 'coronation-copses',
      era: 'Early 1950s',
      title: 'Coronation Copses',
      description: 'Two copses planted in shapes of Yeadon and Guiseley to celebrate Queen\'s Coronation and Festival of Britain.',
      category: 'industrial',
      details: {
        expandedContent: [
          'Trees planted to commemorate Queen Elizabeth II\'s Coronation (1953)',
          'Also marked the Festival of Britain',
          'One copse shaped like outline of Yeadon',
          'Second copse shaped like outline of Guiseley',
          'Creative commemoration linking park to local geography',
          'These copses still exist though have grown naturally over time'
        ]
      }
    },
    {
      id: 'frank-legacy',
      era: '1946',
      title: 'Frank\'s £1.5 Million Legacy',
      description: 'Frank Parkinson died, leaving £1.5 million including funds for Leeds University\'s Parkinson Building and community support.',
      category: 'industrial',
      details: {
        expandedContent: [
          '£200,000 for the Parkinson Building at Leeds University (completed 1951)',
          'Bursaries for Yorkshire engineering students',
          'Frank Parkinson Agricultural Trust established',
          'Frank Parkinson Yorkshire Trust for Guiseley\'s poor, sick, and elderly',
          '£1,000 annually for staff benefits and welfare',
          'Funded annual Children\'s Gala, Flower & Produce Show, and October bonfire',
          'One of the largest philanthropic bequests in Yorkshire history'
        ],
        images: [
          {
            src: parkinsonBuilding,
            alt: 'Parkinson Building, Leeds University',
            caption: 'The Parkinson Building at Leeds University, funded by Frank Parkinson\'s £200,000 bequest (completed 1951)'
          }
        ],
        relatedPeople: ['Frank Parkinson']
      }
    },
    {
      id: 'childrens-gala',
      era: '1949',
      title: 'First Children\'s Gala',
      description: 'Crompton Parkinson sports club launched the first annual Children\'s Gala in the park.',
      category: 'industrial',
      details: {
        expandedContent: [
          'Started in 1949 as annual tradition',
          'Organized by Crompton Parkinson sports and social club',
          'Featured games, races, entertainment for local children',
          'Funded by Frank Parkinson\'s will (£1,000 annually for events)',
          'Became beloved community tradition',
          'Later revived by FOPP in 2012 after years of absence'
        ]
      }
    },
    {
      id: 'flower-show',
      era: '1951',
      title: 'First Flower & Produce Show',
      description: 'Annual Flower and Produce Show established, celebrating gardening and agriculture.',
      category: 'industrial',
      details: {
        expandedContent: [
          'Launched in 1951 as companion to Children\'s Gala',
          'Showcased local gardening and agricultural skills',
          'Competitive categories for vegetables, flowers, preserves',
          'Brought community together celebrating horticultural heritage',
          'Reflected the area\'s agricultural history',
          'Also funded by Frank Parkinson\'s endowment'
        ]
      }
    },
    {
      id: 'hawker-takeover',
      era: '1968',
      title: 'Hawker Siddeley Acquisition',
      description: 'Hawker Siddeley Aerospace acquired Crompton Parkinson, beginning corporate ownership era.',
      category: 'modern',
      details: {
        expandedContent: [
          'End of independent Crompton Parkinson company',
          'Became part of large aerospace conglomerate',
          'Local management reduced, decisions made remotely',
          'Beginning of disconnection from community roots',
          'Park maintenance continued but with less local investment'
        ]
      }
    },
    {
      id: 'albert-death',
      era: '1971',
      title: 'Albert\'s Death - End of Family Era',
      description: 'After Albert Parkinson\'s death, the company lost its family character through buyouts and takeovers.',
      category: 'modern',
      details: {
        expandedContent: [
          'Albert Parkinson died aged 88, last family connection to company',
          'The "practical idealism" philosophy faded under corporate ownership',
          'Family-oriented workplace culture gradually disappeared',
          'Park became less central to company identity',
          'Local knowledge of park\'s history and purpose diminished'
        ],
        relatedPeople: ['Albert Parkinson']
      }
    },
    {
      id: 'community-memories',
      era: '1950s-1990s',
      title: 'Community Memories',
      description: 'The park became cherished by locals for sledging on named runs and as a social gathering place.',
      category: 'modern',
      details: {
        expandedContent: [
          'Sledging runs had names: "Snowdrop" (steep Great Brow) and "Bluebell Run" (gentle Crooked Lands)',
          '"Old man\'s corner" near Kelcliffe Lane served as gathering spot',
          'Elderly residents shared country knowledge and stories',
          'Families picnicked and walked dogs',
          'Children played freely in natural environment',
          'Strong sense of community ownership despite private ownership'
        ],
        images: [
          {
            src: snowSledging,
            alt: 'Children sledging in snow',
            caption: 'Winter sledging on the famous "Snowdrop" and "Bluebell Run" slopes'
          },
          {
            src: oldMansCorner,
            alt: 'Residents at old man\'s corner',
            caption: 'The beloved "old man\'s corner" near Kelcliffe Lane where elderly residents gathered to watch sunsets and share country knowledge'
          }
        ]
      }
    },
    {
      id: 'cooper-sale',
      era: '1999',
      title: 'Cooper Industries Sale',
      description: 'Sale to Cooper Industries led to asset stripping and factory closures.',
      category: 'modern',
      details: {
        expandedContent: [
          'Cooper Industries purchased company primarily for asset value',
          'Manufacturing operations wound down',
          'Jobs lost, community impact severe',
          'Park maintenance budget eliminated',
          'No connection to local area or park\'s heritage',
          'Beginning of serious neglect'
        ]
      }
    },
    {
      id: 'modwen-acquisition',
      era: '2002',
      title: 'St Modwen Properties Acquisition',
      description: 'Property developer St Modwen PLC acquired the land for redevelopment.',
      category: 'modern',
      details: {
        expandedContent: [
          'St Modwen purchased site as development opportunity',
          'No interest in park\'s historical or community value',
          'Minimal security or maintenance',
          'Antisocial behavior and vandalism increased',
          'Local residents deeply concerned about park\'s future'
        ]
      }
    },
    {
      id: 'factory-demolition',
      era: '2006',
      title: 'Factory Demolition',
      description: 'Bellway Homes dismantled the factory, removed park facilities, and blocked ancient trackways.',
      category: 'modern',
      details: {
        expandedContent: [
          'Bellway demolished Crompton Parkinson factory buildings',
          'Bowling greens and putting greens removed',
          'Tennis courts and pavilion dismantled',
          'Ancient trackways and footpaths blocked',
          'Rose garden destroyed',
          'Marked the low point in park\'s history',
          'Local community powerless to prevent destruction'
        ]
      }
    },
    {
      id: 'period-decline',
      era: '2002-2011',
      title: 'Period of Neglect',
      description: 'Multiple ownership changes led to neglect, illegal activity, and deterioration of facilities.',
      category: 'modern',
      details: {
        expandedContent: [
          'Copses filled with refuse and became sites for illegal activity',
          'Gates deteriorated or disappeared completely',
          'Wooden structures (benches, signs) decayed beyond repair',
          'Stone walls crumbled from lack of maintenance',
          'Dense vegetation obscured historic Peate oak trees',
          'Neither Cooper nor St Modwen possessed local knowledge',
          'Unmanaged rewilding created dangerous areas',
          'Community felt park was lost forever'
        ]
      }
    },
    {
      id: 'fopp-formation',
      era: '13 September 2011',
      title: 'Friends of Parkinson\'s Park Founded',
      description: 'Concerned residents formed FOPP to restore and preserve the neglected site, honoring the Parkinsons\' legacy.',
      category: 'fopp',
      details: {
        expandedContent: [
          'Founded 13 September 2011 by six local residents',
          'Founding members: Chris Parapia (Chair), Barbara Winfield, Jennifer Kirkby, Andy Cheetham, Joanna Brooks, Colin Alexander',
          'Mission: restore park and honor Frank & Albert Parkinson\'s philanthropic vision',
          'Committed to enhancing natural landscape',
          'Grassroots community organization',
          'Partnered with developer Bellway to begin regeneration'
        ],
        relatedPeople: ['Chris Parapia', 'Barbara Winfield', 'Jennifer Kirkby', 'Andy Cheetham', 'Joanna Brooks', 'Colin Alexander']
      }
    },
    {
      id: 'ecological-audits',
      era: '2011',
      title: 'Ecological & Environmental Audits',
      description: 'FOPP commissioned professional audits to understand the park\'s ecological value.',
      category: 'fopp',
      details: {
        expandedContent: [
          'Professional ecological surveys conducted',
          'Environmental audits identified biodiversity',
          'Habitat assessments revealed wildlife populations',
          'Geological studies of Guiseley Gap formation',
          'Information used to plan restoration work',
          'Established baseline for future conservation efforts'
        ]
      }
    },
    {
      id: 'first-meeting',
      era: '21 February 2012',
      title: 'First Public Open Meeting',
      description: 'FOPP held first major public meeting, marking "year of real boost" for the organization.',
      category: 'fopp',
      details: {
        expandedContent: [
          'Well-attended public meeting at local venue',
          'Community showed strong support for restoration',
          '2012 became "year of real boost" for FOPP',
          'Volunteers signed up for various projects',
          'Momentum built for major initiatives'
        ]
      }
    },
    {
      id: 'hlf-grant',
      era: '2012',
      title: 'Heritage Lottery Fund Grant',
      description: 'FOPP awarded "All Our Stories" grant for Diamond Jubilee historical research project.',
      category: 'fopp',
      details: {
        expandedContent: [
          'Heritage Lottery Fund "All Our Stories" grant secured',
          'Funded comprehensive historical research',
          'Diamond Jubilee project documented 1,000+ years of history',
          'Jennifer Kirkby and Barbara Winfield led research',
          'Used parish records, tithe maps, deeds, family genealogy',
          'Geophysical surveys using Time Team methodology',
          'Discovered continuous usage since Bronze Age (2300-801 BC)',
          'Results shared through exhibitions and publications'
        ],
        images: [
          {
            src: wakefieldResearchers,
            alt: 'Jennifer Kirkby and Barbara Winfield at Wakefield Deeds Office',
            caption: 'Researchers Jennifer Kirkby and Barbara Winfield at the Wakefield Deeds Office during the Heritage Lottery Fund project'
          }
        ]
      }
    },
    {
      id: 'jubilee-walk',
      era: '2012',
      title: 'Jubilee Walk Planted',
      description: 'Woodland Trust provided shrubs for Jubilee Walk, and an oak from Sandringham estate was planted.',
      category: 'fopp',
      details: {
        expandedContent: [
          'Partnership with Woodland Trust for native species',
          'Jubilee Walk created with new plantings',
          'Commemorative oak from Sandringham royal estate',
          'Linked to Queen\'s Diamond Jubilee celebrations',
          'Continued tradition started by Jonathan Peate',
          'Community planting event engaged volunteers'
        ]
      }
    },
    {
      id: 'gala-relaunch',
      era: '2012',
      title: 'Children\'s Gala Relaunched',
      description: 'FOPP revived the historic Children\'s Gala with a Jubilee Picnic, restoring community tradition.',
      category: 'fopp',
      details: {
        expandedContent: [
          'First Children\'s Gala since factory closure',
          'Combined with Jubilee Picnic celebration',
          'Games, races, entertainment for children',
          'Honored Frank Parkinson\'s original vision',
          'Hundreds of families attended',
          'Became annual event again',
          'Symbol of park\'s renaissance'
        ]
      }
    },
    {
      id: 'geophysics-survey',
      era: '2013',
      title: 'Geophysical Survey',
      description: 'Professional geophysics team used Time Team methodology to uncover archaeological evidence.',
      category: 'fopp',
      details: {
        expandedContent: [
          'Survey team included Barbara Winfield, Jimmy Adcock, Finn Pope-Carter',
          'Time Team archaeological methods employed',
          'Revealed Romano-British period evidence (AD 43-410)',
          'Confirmed Anglo-Saxon lynchets in Crooked Lands',
          'Ground-penetrating radar and resistivity survey',
          'Results added depth to historical understanding',
          'Evidence of continuous usage for over 2,000 years'
        ],
        images: [
          {
            src: geophysicsTeam,
            alt: 'Geophysics survey team 2013',
            caption: 'Barbara Winfield with geophysics team members Jimmy Adcock and Finn Pope-Carter conducting archaeological survey in 2013'
          }
        ]
      }
    },
    {
      id: 'lantern-parade',
      era: '2013-2015',
      title: 'Lantern Parade Launched',
      description: 'FOPP created magical winter Lantern Parade, becoming a beloved annual tradition.',
      category: 'fopp',
      details: {
        expandedContent: [
          'Winter evening event with handmade lanterns',
          'Children and families create lanterns in workshops',
          'Procession through park with music',
          'Community bonding in winter darkness',
          'Celebrates park as year-round community space',
          'Hundreds attend annually',
          'Creates magical atmosphere in historic landscape'
        ]
      }
    },
    {
      id: 'community-orchard',
      era: '2015',
      title: 'Community Orchard Planted',
      description: 'Horticultural grant funded establishment of community orchard with heritage apple varieties.',
      category: 'fopp',
      details: {
        expandedContent: [
          'Horticultural grant secured for orchard creation',
          'Heritage Yorkshire apple varieties planted',
          'Community involvement in tree planting',
          'Educational resource for schools',
          'Provides fruit for community events',
          'Links to agricultural heritage',
          'Managed through volunteer work parties'
        ]
      }
    },
    {
      id: 'cic-status',
      era: '4 March 2016',
      title: 'Community Interest Company Status',
      description: 'FOPP registered as CIC to improve fundraising capacity and formalize community stewardship.',
      category: 'fopp',
      details: {
        expandedContent: [
          'Registered as Community Interest Company on 4 March 2016',
          'CIC Registration Number: 10044868',
          'Regulated by Community Interest Company Regulator',
          'Asset lock protects park for community benefit',
          'Improved ability to apply for grants and contracts',
          'Board of six registered Directors',
          'Annual CIC34 reports required to Companies House',
          'Transparent governance structure'
        ]
      }
    },
    {
      id: 'bog-garden',
      era: '2016',
      title: 'Bog Garden Created',
      description: 'Wetland habitat created, enhancing biodiversity and educational opportunities.',
      category: 'fopp',
      details: {
        expandedContent: [
          'Natural springs channeled to create bog garden',
          'Native wetland plants introduced',
          'Habitat for amphibians, invertebrates',
          'Educational signage about wetland ecosystems',
          'Links to Viking-era "springs" in Kelcliffe name',
          'Demonstrates sustainable drainage',
          'Popular with school groups'
        ]
      }
    },
    {
      id: 'apple-day',
      era: '2016',
      title: 'First Apple Day',
      description: 'Annual Apple Day celebration launched, connecting community to orchard and food heritage.',
      category: 'fopp',
      details: {
        expandedContent: [
          'Autumn celebration of apple harvest',
          'Apple identification and tasting',
          'Juice pressing demonstrations',
          'Children\'s activities and crafts',
          'Local food and craft stalls',
          'Celebrates orchard maturity',
          'Educational about heritage varieties'
        ]
      }
    },
    {
      id: 'park-watch',
      era: '2017',
      title: 'Park Watch Initiative',
      description: 'Community monitoring program launched to address vandalism with West Yorkshire Police support.',
      category: 'fopp',
      details: {
        expandedContent: [
          'Response to continued vandalism issues',
          'Partnership with West Yorkshire Police',
          'Parkwatch scheme modeled on Neighbourhood Watch',
          'Community members report issues',
          'Regular police patrols increased',
          'Visible signage deters antisocial behavior',
          'Reduced incidents significantly'
        ]
      }
    },
    {
      id: 'little-friends',
      era: '2017',
      title: 'Little Friends Forest School',
      description: 'Educational program for young children launched, providing nature-based learning experiences.',
      category: 'fopp',
      details: {
        expandedContent: [
          'Forest School program for pre-school children',
          'Qualified leaders provide outdoor education',
          'Weekly sessions in all weathers',
          'Child-led learning in natural environment',
          'Builds confidence, resilience, environmental awareness',
          'Popular with local families',
          'Aligns with Frank Parkinson\'s vision of education and personal growth'
        ]
      }
    },
    {
      id: 'interpretation',
      era: '2018',
      title: 'Information Boards & Trails',
      description: 'Interpretation boards and trail brochures installed, sharing park history with visitors.',
      category: 'fopp',
      details: {
        expandedContent: [
          'Professional interpretation boards at key locations',
          '"Story Trail" leaflet created for self-guided walks',
          'Children\'s I-Spy guide for families',
          'QR codes linking to additional information',
          'Historical photographs and timeline',
          'Geological, ecological, and historical themes',
          'Available at events or via parkinsonspark@gmail.com'
        ]
      }
    },
    {
      id: 'wwi-centenary',
      era: '2018',
      title: 'WWI Centenary Commemoration',
      description: 'FOPP marked the WWI centenary, honoring local soldiers and the Parkinsons\' wartime contributions.',
      category: 'fopp',
      details: {
        expandedContent: [
          'Commemorative events marking 100 years since WWI ended',
          'Researched local soldiers\' stories',
          'Honored F & A Parkinson\'s WWI production efforts',
          'Community remembrance service',
          'Educational displays',
          'Linked park\'s history to national events'
        ]
      }
    },
    {
      id: 'itv-feature',
      era: '2020',
      title: 'ITV Calendar Feature',
      description: 'ITV Calendar featured the park\'s transformation and community importance during COVID.',
      category: 'fopp',
      details: {
        expandedContent: [
          'Regional television coverage of park\'s success',
          'Highlighted community-led restoration',
          'Showcased importance during COVID-19 lockdowns',
          'Raised profile regionally',
          'Attracted new volunteers and supporters',
          'Demonstrated CIC model success'
        ]
      }
    },
    {
      id: 'covid-support',
      era: '2020',
      title: 'COVID-19 Community Support',
      description: 'During lockdowns, the park provided vital green space for mental health and wellbeing.',
      category: 'fopp',
      details: {
        expandedContent: [
          'Essential green space during lockdowns',
          'Safe outdoor environment for exercise',
          'Mental health and wellbeing resource',
          'Community art projects on trees',
          'Socially-distanced volunteer work continued',
          'Demonstrated park\'s vital community role',
          'Usage increased dramatically',
          'Affirmed founders\' vision of park benefiting health'
        ]
      }
    },
    {
      id: 'platinum-jubilee',
      era: '2022',
      title: 'Platinum Jubilee Celebration',
      description: 'FOPP celebrated Queen\'s Platinum Jubilee with tree dedication and community events.',
      category: 'fopp',
      details: {
        expandedContent: [
          'Commemorative tree planting for Queen\'s Platinum Jubilee',
          'Community celebration event',
          'Continued tradition of jubilee tree planting (1953, 2012, 2022)',
          'Linked park to national celebrations',
          'Multi-generational participation'
        ]
      }
    },
    {
      id: 'local-favourite',
      era: '2022',
      title: 'Fields In Trust "Local Favourite"',
      description: 'Parkinson\'s Park achieved "Local Favourite" status in Yorkshire through national vote.',
      category: 'fopp',
      details: {
        expandedContent: [
          'Fields In Trust national "Local Favourite" award',
          'Public vote determined Yorkshire winner',
          'Recognition of community value and restoration success',
          'Protected status for future generations',
          'Validation of FOPP\'s decade of work',
          'Honored Frank & Albert Parkinson\'s original vision',
          'Ensures park remains accessible public space'
        ]
      }
    }
  ];

  const keyPeople = [
    {
      name: 'Jonathan Peate',
      era: 'circa 1900-1913',
      role: 'Philanthropist & Woollen Manufacturer',
      contribution: 'Purchased surrounding land, planted oak trees during George V\'s coronation (1909), and donated land for public buildings including Yeadon Town Hall and Nunroyd Park. Provided allotments and housing for working men, setting an example of using wealth for public good.',
    },
    {
      name: 'Frank Parkinson',
      era: '1913-1946',
      role: 'Co-founder & Industrialist',
      contribution: 'Started electrical motor business with £21 postal savings, merged with Crompton\'s to create major employer, developed the park (1936-37) with paths, facilities and commemorative copses. Left £1.5 million legacy including the Parkinson Building at Leeds University, trusts for the poor and elderly, and annual funding for community events.',
    },
    {
      name: 'Albert Parkinson',
      era: '1913-1971',
      role: 'Co-founder & Industrialist',
      contribution: 'Joined brother Frank in 1913, helped grow Crompton Parkinson Ltd through Great Depression by maintaining "practical idealism" philosophy - paying workers well while keeping costs low. Preserved family-oriented character and community focus until his death.',
    },
  ];

  const foAchievements = [
    {
      icon: <Sparkles className="w-5 h-5 text-white" />,
      title: 'Restored Stonework',
      description: 'Crumbling dry stone walls rebuilt by skilled wallers, preserving historic boundaries',
    },
    {
      icon: <Trees className="w-5 h-5 text-white" />,
      title: 'Community Orchard',
      description: 'Heritage apple varieties planted in 2015 using horticultural grants',
    },
    {
      icon: <Heart className="w-5 h-5 text-white" />,
      title: 'Wildflower Meadows',
      description: 'Created habitats and planted Jubilee Walk shrubs from Woodland Trust',
    },
    {
      icon: <Award className="w-5 h-5 text-white" />,
      title: 'Heritage Research',
      description: '2012 Heritage Lottery Fund grant uncovered 1,000+ years of history',
    },
  ];

  const fieldNames = [
    {
      name: 'Kelcliffe',
      origin: 'Old Norse (AD 866-950)',
      meaning: 'Steep area where springs are',
      description: 'Evidence of Viking settlement, with springs still active after 1,000 years',
    },
    {
      name: 'Great Brow / Potterton Brow',
      origin: 'Renamed 1837',
      meaning: 'Steep slope / Potterton family name',
      description: 'Marshall Grimshaw renamed after his mother\'s family when converting to dairy farm',
    },
    {
      name: 'Clapper Brow',
      origin: 'Middle English',
      meaning: 'Rabbit hole',
      description: 'Medieval rabbit warren - commercial enterprise providing meat and fur',
    },
    {
      name: 'Crooked Lands',
      origin: 'Pre-1066',
      meaning: 'Irregular medieval fields',
      description: 'Anglo-Saxon lynchets (terraces) and headlands from strip farming',
    },
    {
      name: 'The Flatts',
      origin: 'Medieval',
      meaning: 'Flat farming strips',
      description: 'Bundles of flat agricultural strips in common field system',
    },
    {
      name: 'New Dykes',
      origin: 'Early medieval',
      meaning: 'New ditches/boundaries',
      description: 'Extension of cultivated land with new boundary ditches',
    },
    {
      name: 'Tanhouse Brow',
      origin: '17th century',
      meaning: 'Tannery slope',
      description: 'Named after tanning industry at Kelcliffe House, ended 1837',
    },
  ];

  return (
    <div className="bg-stone-50 pb-24">
      {/* Header Section */}
      <section className="bg-emerald-900 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-emerald-200 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <div className="inline-flex items-center justify-center p-3 bg-emerald-800/50 rounded-2xl mb-6 backdrop-blur-sm border border-emerald-700">
            <BookOpen className="w-8 h-8 text-emerald-400" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">A journey through time</h1>
          <p className="text-xl text-emerald-100 max-w-3xl font-light leading-relaxed">
            From Bronze Age settlements through Viking era to Victorian industrialists, from decline to
            community-led renaissance — discover over 4,000 years of Parkinson's Park history.
          </p>
        </div>
      </section>

      {/* ── Read the Full History banner ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-gradient-to-r from-emerald-950 to-stone-800 rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-center gap-8">
          <div className="flex items-center justify-center w-16 h-16 bg-emerald-700/40 rounded-2xl shrink-0 border border-emerald-600/40">
            <BookOpen className="w-8 h-8 text-emerald-300" />
          </div>
          <div className="flex-1 text-white text-center md:text-left">
            <div className="text-emerald-300 text-xs font-bold uppercase tracking-widest mb-2">
              Illustrated History &mdash; Five Chapters
            </div>
            <h3 className="text-2xl font-bold mb-2">Read the Full Story of Parkinson&apos;s Park</h3>
            <p className="text-stone-300 text-sm leading-relaxed max-w-xl">
              From Viking settlers naming our springs, through Georgian farmers and Victorian philanthropists,
              to the community-led renaissance that saved the park — told in full with photographs and original
              research from the Heritage Lottery Fund project.
            </p>
            <div className="flex items-center gap-3 mt-4 pt-4 border-t border-emerald-800/60">
              <img
                src={nlhfStampImg}
                alt="Made possible with National Lottery Heritage Fund"
                className="w-10 h-10 shrink-0 object-contain"
              />
              <p className="text-xs text-emerald-300 leading-snug">
                <span className="font-semibold text-white">Thanks to National Lottery players</span><br />
                Funded by The National Lottery Heritage Fund &ldquo;All Our Stories&rdquo; grant (2012).
              </p>
            </div>
          </div>
          <Link
            to="/history-article"
            className="shrink-0 bg-white text-emerald-900 px-7 py-3 rounded-full font-bold text-sm hover:bg-emerald-50 transition-all flex items-center gap-2 whitespace-nowrap shadow-lg"
          >
            Read Now <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Interactive Timeline Section */}
      <section id="timeline" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-white rounded-[3rem]">
        <div className="text-center mb-16">
          {/* Subtle Navigation Index */}
          <nav className="mb-8">
            <div className="flex flex-wrap items-center justify-center gap-2 text-sm">
              <button onClick={() => scrollToSection('timeline')} className="text-stone-500 hover:text-emerald-700 transition-colors px-2 py-1 cursor-pointer">Timeline</button>
              <span className="text-stone-300">•</span>
              <button onClick={() => scrollToSection('field-names')} className="text-stone-500 hover:text-emerald-700 transition-colors px-2 py-1 cursor-pointer">Field Names</button>
              <span className="text-stone-300">•</span>
              <button onClick={() => scrollToSection('visionaries')} className="text-stone-500 hover:text-emerald-700 transition-colors px-2 py-1 cursor-pointer">Visionaries</button>
              <span className="text-stone-300">•</span>
              <button onClick={() => scrollToSection('parkinson-era')} className="text-stone-500 hover:text-emerald-700 transition-colors px-2 py-1 cursor-pointer">Parkinson Era</button>
              <span className="text-stone-300">•</span>
              <button onClick={() => scrollToSection('decline')} className="text-stone-500 hover:text-emerald-700 transition-colors px-2 py-1 cursor-pointer">Recent Times</button>
              <span className="text-stone-300">•</span>
              <button onClick={() => scrollToSection('renaissance')} className="text-stone-500 hover:text-emerald-700 transition-colors px-2 py-1 cursor-pointer">Renaissance</button>
              <span className="text-stone-300">•</span>
              <button onClick={() => scrollToSection('programs')} className="text-stone-500 hover:text-emerald-700 transition-colors px-2 py-1 cursor-pointer">Programs</button>
            </div>
          </nav>

          <div className="inline-block bg-emerald-50 px-4 py-2 rounded-full text-emerald-800 text-sm font-bold uppercase tracking-wider mb-4">
            4,000 Years of Heritage
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4">Interactive Historical Timeline</h2>
          <p className="text-stone-600 max-w-2xl mx-auto mb-6">
            In 2012, Heritage Lottery Fund supported FOPP's research into the park's background as part of the Diamond
            Jubilee "All Our Stories" project. Click any event to explore more details.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap text-xs">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-amber-600"></div>
              <span className="text-stone-600">Ancient (Pre-1066)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-orange-600"></div>
              <span className="text-stone-600">Medieval</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-blue-600"></div>
              <span className="text-stone-600">Georgian</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-purple-600"></div>
              <span className="text-stone-600">Industrial</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-red-600"></div>
              <span className="text-stone-600">Modern</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-emerald-600"></div>
              <span className="text-stone-600">FOPP Era</span>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-emerald-200"></div>
          <div className="space-y-6">
            {timeline.map((event, i) => (
              <div key={i} className="relative pl-20">
                <div
                  className={`absolute left-4 top-2 w-8 h-8 rounded-full border-4 border-white shadow-lg flex items-center justify-center ${getCategoryColor(
                    event.category
                  )}`}
                >
                  <div className="w-2 h-2 rounded-full bg-white"></div>
                </div>
                <div
                  onClick={() => toggleExpand(event.id)}
                  className="bg-stone-50 p-6 rounded-2xl border border-stone-200 shadow-sm hover:shadow-md transition-all cursor-pointer"
                  role="button"
                  tabIndex={0}
                  aria-expanded={isExpanded(event.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      toggleExpand(event.id);
                    }
                  }}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                          {event.era}
                        </div>
                        {event.details?.images && event.details.images.length > 0 && (
                          <div className="flex items-center gap-1 text-xs text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                            <Camera className="w-3 h-3" />
                            <span>{event.details.images.length}</span>
                          </div>
                        )}
                      </div>
                      <h3 className="text-lg font-bold text-stone-900 mb-2">{event.title}</h3>
                      <p className="text-stone-600 text-sm leading-relaxed">{event.description}</p>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 text-stone-400 transition-transform ml-4 shrink-0 ${
                        isExpanded(event.id) ? 'rotate-180' : ''
                      }`}
                    />
                  </div>

                  {/* Expandable Content */}
                  {isExpanded(event.id) && event.details && (
                    <div className="mt-6 pt-6 border-t border-stone-200 animate-in fade-in duration-300">
                      {event.details.expandedContent && event.details.expandedContent.length > 0 && (
                        <div className="space-y-3 mb-4">
                          {event.details.expandedContent.map((text, idx) => (
                            <p key={idx} className="text-sm text-stone-700 leading-relaxed flex gap-2">
                              <span className="text-emerald-600 shrink-0">•</span>
                              <span>{text}</span>
                            </p>
                          ))}
                        </div>
                      )}

                      {event.details.images && event.details.images.length > 0 && (
                        <div className="mt-4 pt-4 border-t border-stone-100">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {event.details.images.map((image, idx) => (
                              <div
                                key={idx}
                                className="cursor-pointer group"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedImage(image);
                                }}
                              >
                                <img
                                  src={image.src}
                                  alt={image.alt}
                                  className="w-full h-48 object-cover rounded-lg border border-stone-200 group-hover:border-emerald-500 transition-all"
                                />
                                {image.caption && (
                                  <p className="text-xs text-stone-600 mt-2 italic">{image.caption}</p>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {event.details.relatedPeople && event.details.relatedPeople.length > 0 && (
                        <div className="mt-4 pt-4 border-t border-stone-100">
                          <div className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">
                            Related People
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {event.details.relatedPeople.map((person, idx) => (
                              <span
                                key={idx}
                                className="text-xs px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full font-semibold"
                              >
                                {person}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Field Names Section */}
      <section id="field-names" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <div className="inline-block bg-emerald-50 px-4 py-2 rounded-full text-emerald-800 text-sm font-bold uppercase tracking-wider mb-4">
            Windows Into The Past
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4">Field Names Tell Stories</h2>
          <p className="text-stone-600 max-w-2xl mx-auto">
            The 1838 Tithe Map recorded field names that became gateways to understanding 1,000+ years of history,
            from Viking settlements to Victorian industry.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {fieldNames.map((field, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm hover:shadow-md transition-all">
              <div className="mb-4">
                <h3 className="text-xl font-bold text-stone-900 mb-1">{field.name}</h3>
                <div className="text-xs font-bold text-emerald-700 uppercase tracking-wider">{field.origin}</div>
              </div>
              <div className="mb-3">
                <div className="text-sm font-semibold text-stone-700 mb-1">Meaning:</div>
                <div className="text-sm text-stone-600 italic">{field.meaning}</div>
              </div>
              <p className="text-sm text-stone-600 leading-relaxed">{field.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Key People Section */}
      <section id="visionaries" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4">Visionary Philanthropists</h2>
          <p className="text-lg text-stone-600 max-w-3xl">
            Three extraordinary individuals shaped Parkinson's Park into a community treasure through their vision,
            generosity, and practical idealism - seeing themselves as "trustees" of their possessions for the public
            good.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {keyPeople.map((person, i) => (
            <div
              key={i}
              className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden hover:shadow-xl transition-all"
            >
              <div className="bg-gradient-to-br from-emerald-900 to-emerald-800 text-white p-8">
                <div className="text-3xl font-bold mb-2">{person.name}</div>
                <div className="text-emerald-200 text-sm font-semibold mb-1">{person.era}</div>
                <div className="text-emerald-100 text-xs uppercase tracking-wider">{person.role}</div>
              </div>
              <div className="p-6">
                <p className="text-sm text-stone-600 leading-relaxed">{person.contribution}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* F & A Parkinson Section */}
      <section id="parkinson-era" className="bg-emerald-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <Factory className="w-10 h-10 text-emerald-400" />
                <h2 className="text-4xl font-bold">F & A Parkinson Era</h2>
              </div>
              <p className="text-emerald-100 text-lg leading-relaxed">
                Frank Parkinson started an electrical motor agency from a shed at Eldon Mount with just £21 from his
                post office savings. His brother Albert joined in 1913, and during WWI they relocated to Jonathan
                Peate's land at Greenshaw Close.
              </p>
              <p className="text-emerald-100 text-lg leading-relaxed">
                In 1918, they purchased the Netherfield land and thrived through the Great Depression by embracing{' '}
                <strong>"practical idealism"</strong> — paying workers well while maintaining quality production at low
                costs, principles aligned with Gandhi's philosophy. In 1927, they merged with Crompton's, becoming
                Crompton Parkinson Ltd.
              </p>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <h3 className="text-xl font-bold mb-4">Frank's £1.5 Million Legacy (1946)</h3>
                <ul className="space-y-2 text-emerald-100">
                  <li className="flex gap-2">
                    <span className="text-emerald-400">•</span> Parkinson Building at Leeds University (£200,000)
                  </li>
                  <li className="flex gap-2">
                    <span className="text-emerald-400">•</span> Bursaries for Yorkshire engineering students
                  </li>
                  <li className="flex gap-2">
                    <span className="text-emerald-400">•</span> Frank Parkinson Agricultural Trust
                  </li>
                  <li className="flex gap-2">
                    <span className="text-emerald-400">•</span> Yorkshire Trust for Guiseley's poor, sick, and elderly
                  </li>
                  <li className="flex gap-2">
                    <span className="text-emerald-400">•</span> £1,000 annually for staff welfare and community events
                  </li>
                </ul>
              </div>
            </div>
            <div className="space-y-6">
              <div className="bg-white text-stone-900 p-8 rounded-3xl shadow-2xl">
                <h3 className="text-2xl font-bold mb-6">Park Development Timeline</h3>
                <div className="space-y-4">
                  <div>
                    <div className="font-bold text-emerald-700 mb-1">1936-37</div>
                    <div className="text-sm text-stone-600">
                      Acquired remaining fields, laid footpaths, installed gates and benches
                    </div>
                  </div>
                  <div>
                    <div className="font-bold text-emerald-700 mb-1">Early 1950s</div>
                    <div className="text-sm text-stone-600">
                      Planted two copses shaped like Yeadon and Guiseley to celebrate Queen's Coronation and Festival of
                      Britain
                    </div>
                  </div>
                  <div>
                    <div className="font-bold text-emerald-700 mb-1">Facilities Added</div>
                    <div className="text-sm text-stone-600">
                      Bowling and putting greens, rose garden, tennis courts, and pavilion
                    </div>
                  </div>
                  <div>
                    <div className="font-bold text-emerald-700 mb-1">1949-1951</div>
                    <div className="text-sm text-stone-600">
                      First Children's Gala (1949), Flower & Produce Show (1951), and October bonfire celebrations
                      launched
                    </div>
                  </div>
                  <div className="mt-6 p-4 bg-emerald-50 rounded-xl">
                    <p className="text-xs text-stone-600 italic">
                      The park may have compensated for the loss of Guiseley Recreation Ground to council housing in the
                      early 1920s.
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <h3 className="text-lg font-bold mb-3">Community Memories</h3>
                <p className="text-emerald-100 text-sm mb-3">
                  The park became cherished for sledging on named runs: "Snowdrop" (steep Great Brow) and "Bluebell Run"
                  (gentle Crooked Lands slopes).
                </p>
                <p className="text-emerald-100 text-sm">
                  An "old man's corner" near Kelcliffe Lane served as gathering spot for elderly residents sharing
                  country knowledge.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Times & Decline Section */}
      <section id="decline" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-stone-100 rounded-[3rem] p-12">
          <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-6">Recent Times: Decline & Neglect</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <p className="text-lg text-stone-600 leading-relaxed">
                After Albert Parkinson's death in 1971, corporate takeovers gradually disconnected the company from its
                community roots. Neither Cooper Industries (1999) nor St Modwen (2002) possessed local knowledge,
                allowing the landscape to deteriorate significantly.
              </p>
              <div className="bg-red-50 border-l-4 border-red-600 p-6 rounded-r-xl">
                <h3 className="text-xl font-bold text-red-900 mb-3">Corporate Ownership Timeline</h3>
                <div className="space-y-3 text-sm text-red-800">
                  <div>
                    <strong>1968:</strong> Hawker Siddeley Aerospace acquired Crompton Parkinson
                  </div>
                  <div>
                    <strong>1971:</strong> Albert Parkinson's death — company lost family character
                  </div>
                  <div>
                    <strong>1999:</strong> Cooper Industries sale — asset stripping and closures
                  </div>
                  <div>
                    <strong>2002:</strong> St Modwen Properties PLC acquired land for redevelopment
                  </div>
                  <div>
                    <strong>2006:</strong> Bellway dismantled factory, removed all park facilities, blocked ancient
                    trackways
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="bg-white p-8 rounded-2xl border border-stone-200 shadow-sm">
                <h3 className="text-xl font-bold text-stone-900 mb-4">Signs of Deterioration (2002-2011)</h3>
                <ul className="space-y-3 text-stone-600">
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">✗</span>
                    <span>Copses filled with refuse and illegal activity</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">✗</span>
                    <span>Gates deteriorated or disappeared completely</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">✗</span>
                    <span>Wooden structures decayed beyond repair</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">✗</span>
                    <span>Stone walls crumbled from neglect</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">✗</span>
                    <span>Dense vegetation obscured historic Peate oak trees</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">✗</span>
                    <span>Bowling greens, putting greens, tennis courts, rose garden all removed</span>
                  </li>
                </ul>
              </div>
              <p className="text-stone-600 text-sm italic">
                The community felt powerless as the park descended into neglect, with unmanaged rewilding creating
                dangerous areas and antisocial behavior becoming common.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOPP Renaissance Section */}
      <section id="renaissance" className="bg-emerald-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Heart className="w-12 h-12 text-emerald-400 mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Community-Led Renaissance</h2>
            <p className="text-xl text-emerald-100 max-w-3xl mx-auto leading-relaxed">
              On 13 September 2011, concerned residents formed Friends of Parkinson's Park to restore the neglected site
              and honor Frank and Albert Parkinson's philanthropic legacy, proving that communities can reclaim and
              restore forgotten spaces.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
            <div className="space-y-6">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold mb-6">Founding Members (2011)</h3>
                <div className="grid grid-cols-2 gap-4 text-emerald-100">
                  <div className="text-sm">Chris Parapia (Chair)</div>
                  <div className="text-sm">Barbara Winfield</div>
                  <div className="text-sm">Jennifer Kirkby</div>
                  <div className="text-sm">Andy Cheetham</div>
                  <div className="text-sm">Joanna Brooks</div>
                  <div className="text-sm">Colin Alexander</div>
                </div>
              </div>
              <p className="text-emerald-100 leading-relaxed">
                In November 2011, FOPP partnered with developer Bellway to begin regenerating the site. Through
                community work parties, grant applications, and persistent advocacy, the organization successfully
                transformed a forgotten industrial landscape into a thriving community asset.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {foAchievements.map((achievement, i) => (
                <div key={i} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                  <div className="bg-emerald-600 w-10 h-10 rounded-xl flex items-center justify-center mb-4">
                    {achievement.icon}
                  </div>
                  <h4 className="font-bold mb-2">{achievement.title}</h4>
                  <p className="text-sm text-emerald-100">{achievement.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white text-stone-900 rounded-[3rem] p-12">
            <h3 className="text-2xl font-bold mb-8 text-center">Major Milestones & Recognition</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-emerald-700 mb-2">2012</div>
                <div className="font-semibold mb-2">Heritage Lottery Fund</div>
                <div className="text-sm text-stone-600">
                  "All Our Stories" grant for Diamond Jubilee research, geophysical surveys, and historical documentation
                </div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-emerald-700 mb-2">2016</div>
                <div className="font-semibold mb-2">CIC Registration</div>
                <div className="text-sm text-stone-600">
                  Became Community Interest Company (10044868) for improved fundraising and governance
                </div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-emerald-700 mb-2">2020</div>
                <div className="font-semibold mb-2">COVID Lifeline</div>
                <div className="text-sm text-stone-600">
                  Vital green space for community wellbeing during lockdowns, featured on ITV Calendar
                </div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-emerald-700 mb-2">2022</div>
                <div className="font-semibold mb-2">Local Favourite</div>
                <div className="text-sm text-stone-600">
                  Yorkshire recognition through Fields In Trust national vote, ensuring protected status
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Programs Section */}
      <section id="programs" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-white rounded-[3rem] p-12 border border-stone-200 shadow-sm text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-stone-900">Continuing the Legacy</h2>
          <p className="text-xl text-stone-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            FOPP continues Frank and Albert Parkinson's vision through annual community events, ecological restoration,
            Forest Schools, and programs that bring people together in this cherished green space.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-emerald-50 p-6 rounded-2xl">
              <div className="font-bold text-stone-900 mb-1">Children's Gala</div>
              <div className="text-xs text-emerald-700 uppercase tracking-wider">Annual Tradition Since 2012</div>
            </div>
            <div className="bg-emerald-50 p-6 rounded-2xl">
              <div className="font-bold text-stone-900 mb-1">Lantern Parade</div>
              <div className="text-xs text-emerald-700 uppercase tracking-wider">Winter Magic Since 2013</div>
            </div>
            <div className="bg-emerald-50 p-6 rounded-2xl">
              <div className="font-bold text-stone-900 mb-1">Apple Day</div>
              <div className="text-xs text-emerald-700 uppercase tracking-wider">Orchard Celebration Since 2016</div>
            </div>
            <div className="bg-emerald-50 p-6 rounded-2xl">
              <div className="font-bold text-stone-900 mb-1">Little Friends</div>
              <div className="text-xs text-emerald-700 uppercase tracking-wider">Forest School Since 2017</div>
            </div>
          </div>
          <div className="mt-10 p-6 bg-emerald-50 rounded-2xl">
            <p className="text-sm text-stone-700 leading-relaxed">
              <strong>More Information:</strong> Story Trail leaflets, children's I-Spy guides, and historical research
              available at events or via{' '}
              <a href="mailto:parkinsonspark@gmail.com" className="text-emerald-700 font-semibold hover:underline">
                parkinsonspark@gmail.com
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* Image Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-5xl max-h-[90vh]">
            <button
              className="absolute -top-12 right-0 text-white hover:text-emerald-400 transition-colors"
              onClick={() => setSelectedImage(null)}
              aria-label="Close image"
            >
              <X className="w-8 h-8" />
            </button>
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="max-w-full max-h-[85vh] rounded-2xl"
            />
            {selectedImage.caption && (
              <div className="mt-4 text-white text-center text-sm">{selectedImage.caption}</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default History;
