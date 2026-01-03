import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowLeft, Sparkles } from 'lucide-react';

interface AnnualSummary {
  year: number;
  summary: string;
  highlights: string[];
  period: 'early' | 'growth' | 'resilience' | 'flourishing';
}

const ParkTimeline: React.FC = () => {
  const annualSummaries: AnnualSummary[] = [
    {
      year: 2025,
      summary: "As spring unfolded, purple crocuses spelled hope across our meadows—a partnership with Aireborough Rotary for Purple4Polio reminded us how local actions bloom into global change. The Great British Spring Clean brought neighbors together with litter pickers in hand, while our Christmas traditions continued to light up winter evenings with community warmth.",
      highlights: ["Purple4Polio crocus planting", "Great British Spring Clean", "Christmas events"],
      period: 'flourishing'
    },
    {
      year: 2024,
      summary: "This year marked transitions and growth. Jennifer Inskip Kirkby's retirement after 13 transformative years saw the park secure its place in Leeds Local Plan—a testament to unwavering dedication. Young Explorers planted bulbs around the Jubilee Oak, their small hands nurturing future springs. Though autumn rains cancelled Apple Day, the community spirit remained undimmed, gathering instead for our beloved Lantern Parade as brass bands and children's voices filled December air.",
      highlights: ["Jennifer Inskip Kirkby retirement", "Explorer Group bulb planting", "Christmas Lantern Parade"],
      period: 'flourishing'
    },
    {
      year: 2023,
      summary: "Through all four seasons, the park hummed with life. Wildflower meadows attracted butterflies and bees, while volunteers maintained paths and planted native species. Community gatherings brought families together for seasonal celebrations, and ecological monitoring continued to document the rich biodiversity thriving in this cherished green space.",
      highlights: ["Seasonal celebrations", "Ecological monitoring", "Wildflower meadows"],
      period: 'flourishing'
    },
    {
      year: 2022,
      summary: "As the world emerged from lockdowns, our park became a sanctuary of reconnection. Families rediscovered the joy of outdoor gatherings, volunteers returned to caring for copses and orchards, and the annual events calendar blossomed once more. The community orchard's apple harvest reminded us that patience and care yield sweet rewards.",
      highlights: ["Post-lockdown renewal", "Community orchard harvest", "Return of events"],
      period: 'resilience'
    },
    {
      year: 2021,
      summary: "Resilience took root in every corner. While restrictions ebbed and flowed, the park remained a constant—a place where socially-distanced walks offered solace and small volunteer groups tended to nature's needs. Birds nested undisturbed, wildflowers spread across hillsides, and children's laughter gradually returned to the slopes.",
      highlights: ["Outdoor sanctuary during restrictions", "Wildlife flourishing", "Small volunteer groups"],
      period: 'resilience'
    },
    {
      year: 2020,
      summary: "When the world paused, our park breathed. During lockdowns, it became a lifeline—families sought its open skies, solo walkers found peace on winding paths, and nature responded with abundant wildflowers and birdsong. The Bog Garden thrived in quiet, and volunteers adapted with determination, maintaining the park's beauty through unprecedented times.",
      highlights: ["Lockdown sanctuary", "Nature thriving", "Adapted volunteering"],
      period: 'resilience'
    },
    {
      year: 2019,
      summary: "The rhythms of community life grew stronger. Lantern Parades lit winter evenings, Apple Days celebrated autumn's bounty, and spring litter picks gathered neighbors in common purpose. Ecological surveys revealed thriving populations of woodland birds and pollinators, while the Top Copse and Bog Garden matured into havens for wildlife.",
      highlights: ["Lantern Parade traditions", "Apple Day celebrations", "Ecological surveys"],
      period: 'growth'
    },
    {
      year: 2018,
      summary: "Projects took shape across the landscape. New interpretation boards helped visitors understand the park's geological and ecological wonders, while volunteer teams expanded habitat management. The community orchard began producing its first significant harvests, and seasonal events drew growing crowds eager to connect with nature and neighbors alike.",
      highlights: ["Interpretation boards installed", "Orchard first harvests", "Growing volunteer teams"],
      period: 'growth'
    },
    {
      year: 2017,
      summary: "A milestone year as Friends of Parkinson's Park formalized its mission to restore this cherished green space. This historic site—gifted to Guiseley in the 1930s by Crompton Parkinson—gained renewed purpose. Volunteers began systematic habitat management, the community orchard was established, and partnerships formed to secure the park's future as an accessible natural haven for all.",
      highlights: ["Friends of Parkinson's Park CIC established", "Community orchard planted", "Habitat management begins"],
      period: 'growth'
    },
    {
      year: 2016,
      summary: "Momentum built as community engagement deepened. Regular volunteer days saw residents of all ages caring for woodland, meadow, and orchard. Plans developed for long-term habitat restoration, and the park's role as an outdoor classroom for local schools expanded. Seasonal events brought families together to celebrate the changing year.",
      highlights: ["Growing volunteer participation", "School partnerships", "Habitat restoration planning"],
      period: 'growth'
    },
    {
      year: 2015,
      summary: "The vision crystallized. Heritage surveys documented the park's rich history while ecological assessments revealed its biodiversity treasures. Community consultations shaped plans for balancing conservation with access, ensuring future generations could enjoy bluebells in spring, blackberries in autumn, and sledging runs in winter—just as generations past had done.",
      highlights: ["Heritage surveys", "Biodiversity assessments", "Community consultations"],
      period: 'early'
    },
    {
      year: 2014,
      summary: "Foundations strengthened as the Friends group navigated planning processes and built relationships with local authorities. Grant applications were prepared to support restoration work, and volunteer networks expanded. The park itself continued its seasonal cycles—bluebells carpeted woodland floors, swifts returned each summer, and autumn leaves painted hillsides gold.",
      highlights: ["Grant applications", "Local authority partnerships", "Volunteer network growth"],
      period: 'early'
    },
    {
      year: 2013,
      summary: "Energy and enthusiasm grew as more residents joined the cause. Working groups formed to tackle different aspects of park management—from ecology to events, from paths to publicity. The community began to reimagine what this green space could become: not just a place of memories, but a living, thriving landscape for today and tomorrow.",
      highlights: ["Working groups formed", "Community reimagining", "Increased engagement"],
      period: 'early'
    },
    {
      year: 2012,
      summary: "Hope sparked into action. Inspired by Heritage Lottery Fund possibilities, the Friends organized community events to reconnect Guiseley with its park. The Children's Gala returned, bringing fairground joy and family picnics back to sun-dappled slopes. Each gathering strengthened bonds between people and place, proving that this green heart still beat strong.",
      highlights: ["Heritage Lottery Fund plans", "Children's Gala relaunched", "Community events restart"],
      period: 'early'
    },
    {
      year: 2011,
      summary: "A new chapter began on September 13th when concerned residents gathered to form Friends of Parkinson's Park. Watching this historic green space—gifted in the 1930s and woven into countless childhood memories—face neglect, they chose action over lament. Those first meetings sowed seeds of transformation, as neighbors committed to restoring the park's beauty and ensuring it would thrive for generations to come.",
      highlights: ["Friends of Parkinson's Park founded (Sept 13)", "First community meetings", "Vision established"],
      period: 'early'
    }
  ];

  const getPeriodColor = (period: AnnualSummary['period']) => {
    switch (period) {
      case 'early':
        return 'bg-emerald-600';
      case 'growth':
        return 'bg-emerald-700';
      case 'resilience':
        return 'bg-emerald-800';
      case 'flourishing':
        return 'bg-emerald-900';
      default:
        return 'bg-emerald-700';
    }
  };

  return (
    <div className="bg-stone-50 pb-24">
      {/* Header Section */}
      <section className="bg-emerald-900 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/" className="inline-flex items-center gap-2 text-emerald-200 hover:text-white mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <div className="inline-flex items-center justify-center p-3 bg-emerald-800/50 rounded-2xl mb-6 backdrop-blur-sm border border-emerald-700">
            <Calendar className="w-8 h-8 text-emerald-400" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Park Events Through the Years</h1>
          <p className="text-xl text-emerald-100 max-w-3xl font-light leading-relaxed mb-6">
            From the founding of Friends of Parkinson's Park in 2011 to today's flourishing community, discover how seasons of dedication have transformed this cherished green space. Each year tells a story of neighbors gathering, nature thriving, and a community united by love for the outdoors.
          </p>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <div className="inline-block bg-emerald-50 px-4 py-2 rounded-full text-emerald-800 text-sm font-bold uppercase tracking-wider mb-4">
            2011 - 2025
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4">Fifteen Years of Growth</h2>
          <p className="text-stone-600 max-w-2xl mx-auto">
            A chronicle of community spirit, ecological restoration, and the joy of bringing people together to celebrate our natural heritage.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {annualSummaries.map((yearData, i) => (
            <div
              key={yearData.year}
              className="bg-white p-8 rounded-2xl border border-stone-200 shadow-sm hover:shadow-md transition-all"
            >
              {/* Year Badge */}
              <div className="flex items-center justify-between mb-4">
                <div className={`${getPeriodColor(yearData.period)} text-white px-6 py-3 rounded-full`}>
                  <span className="text-2xl font-bold">{yearData.year}</span>
                </div>
                <Sparkles className="w-5 h-5 text-emerald-600" />
              </div>

              {/* Summary */}
              <p className="text-stone-700 leading-relaxed mb-6 text-base">
                {yearData.summary}
              </p>

              {/* Highlights */}
              <div className="space-y-2">
                <div className="text-xs font-bold text-emerald-800 uppercase tracking-wider mb-3">
                  Key Moments
                </div>
                <div className="flex flex-wrap gap-2">
                  {yearData.highlights.map((highlight, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-3 py-1.5 bg-emerald-50 text-emerald-800 rounded-full font-medium border border-emerald-100"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Closing Message */}
        <div className="mt-16 text-center bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-3xl p-12 border border-emerald-200">
          <Calendar className="w-12 h-12 text-emerald-700 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-stone-900 mb-4">
            The Story Continues
          </h3>
          <p className="text-stone-700 max-w-2xl mx-auto leading-relaxed mb-6">
            Every year brings new growth, new gatherings, and new reasons to celebrate this special place. Whether you've been part of the journey since 2011 or discovered the park recently, your presence adds to its living story.
          </p>
          <Link
            to="/your-stories"
            className="inline-flex items-center gap-2 bg-emerald-700 text-white px-6 py-3 rounded-full font-bold hover:bg-emerald-800 transition-all"
          >
            Share Your Story
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ParkTimeline;
