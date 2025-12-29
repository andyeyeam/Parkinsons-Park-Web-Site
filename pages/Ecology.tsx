import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Trees, Flower2, Bird, Bug, Mountain, ArrowLeft } from 'lucide-react';

const Ecology: React.FC = () => {
  const habitats = [
    {
      icon: <Flower2 className="w-6 h-6 text-emerald-600" />,
      title: "Wetland",
      location: "Bottom of Park",
      description: "Features tufted hair grass, reed canary grass, hairy sedge, and soft rush. Our Bog Garden, established in 2016, showcases nine native wetland plant species including Devil's-bit Scabious, Lady's Smock, Marsh Marigold, Meadowsweet, Purple Loosestrife, Ragged Robin, Water Avens, Water Forget-Me-Not, and Yellow Flag Iris."
    },
    {
      icon: <Trees className="w-6 h-6 text-emerald-600" />,
      title: "Woodland & Mature Trees",
      location: "Throughout Park",
      description: "Mixed broad-leafed woodland contains both planted species (Norway maple, Horse-chestnut) and self-seeded varieties (Birch, Oak). The oldest trees are approximately 200-year-old Sycamores and 100-year-old Oaks, providing vital habitat for bats and owls."
    },
    {
      icon: <Bird className="w-6 h-6 text-emerald-600" />,
      title: "Hedges & Copses",
      location: "Park Boundaries",
      description: "Hawthorn and Elder hedgerows support birds and small mammals. The park lies on migration routes for species like Curlews and Pink-footed geese, making it an important stopover point."
    },
    {
      icon: <Bug className="w-6 h-6 text-emerald-600" />,
      title: "Wildflower Meadow",
      location: "Central Areas",
      description: "Supports abundant invertebrates including butterflies, moths, beetles, and bees. Notable species include Small Skipper, Ringlets, Meadow brown, and Burnet moths."
    },
    {
      icon: <Leaf className="w-6 h-6 text-emerald-600" />,
      title: "Community Orchard",
      location: "Crooklands Area",
      description: "Contains fruit trees including apple, pear, and plum varieties such as Red Devil, Ribston Pippin, and Yorkshire Greening, celebrating local heritage fruit cultivation."
    },
    {
      icon: <Flower2 className="w-6 h-6 text-emerald-600" />,
      title: "Hay Meadow",
      location: "Mid-level Slopes",
      description: "Semi-improved grassland reflecting neutral soil and historical hay production. Dominant grasses include Cocksfoot and Common bentgrass, with wildflower herbs increasingly present."
    },
    {
      icon: <Mountain className="w-6 h-6 text-emerald-600" />,
      title: "Drystone Walls",
      location: "Historic Boundaries",
      description: "Mostly dating to the 17th and 18th centuries, these walls serve as refuges for common lizards, toads, insects, lichens, and mosses."
    },
    {
      icon: <Mountain className="w-6 h-6 text-emerald-600" />,
      title: "Great Brow – Acid Grassland",
      location: "Steep Upper Slopes",
      description: "Steep slopes with acidic moorland soil supporting Red fescue, Heath bedstraw, Sheep fescue, and Wavy hair-grass, characteristic of Yorkshire upland margins."
    }
  ];

  const birdSpecies = [
    { name: "Starling", status: "red" },
    { name: "Green woodpecker", status: "red" },
    { name: "Mistle thrush", status: "red" },
    { name: "Kestrel", status: "amber" },
    { name: "House sparrow", status: "amber" },
    { name: "Robin", status: "common" },
    { name: "Blue tit", status: "common" },
    { name: "Goldfinch", status: "common" },
    { name: "Greenfinch", status: "common" },
    { name: "Blackbird", status: "common" },
    { name: "Wren", status: "common" }
  ];

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
            <Leaf className="w-8 h-8 text-emerald-400" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Ecology</h1>
          <p className="text-xl text-emerald-100 max-w-3xl font-light leading-relaxed">
            Parkinson's Park comprises a patchwork of grassland, wetland and woodland with both scrub and a scattering of mature trees. Our ecology reflects millstone grit geology, with habitats varying by altitude and soil chemistry.
          </p>
        </div>
      </section>

      {/* Overview Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-6">
            <div className="inline-block bg-emerald-50 px-4 py-2 rounded-full text-emerald-800 text-sm font-bold uppercase tracking-wider">
              Our Landscape
            </div>
            <h2 className="text-4xl font-bold text-stone-900">A Living Heritage</h2>
            <p className="text-lg text-stone-600 leading-relaxed">
              The land has been pasture and meadow for centuries, historically maintained through cattle grazing from local farms. Today, this rich agricultural heritage supports a remarkable diversity of life.
            </p>
            <p className="text-lg text-stone-600 leading-relaxed">
              The park features slowly permeable, seasonally wet, acid loam and clay soil, creating diverse conditions from drier upper slopes to marshy lower areas that support our rich biodiversity.
            </p>
          </div>
          <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-stone-200">
            <h3 className="text-2xl font-bold mb-6">Park Statistics</h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-emerald-100 p-3 rounded-xl shrink-0">
                  <Trees className="w-6 h-6 text-emerald-700" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-stone-900">8</div>
                  <div className="text-stone-500">Distinct Habitat Zones</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-emerald-100 p-3 rounded-xl shrink-0">
                  <Bird className="w-6 h-6 text-emerald-700" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-stone-900">11+</div>
                  <div className="text-stone-500">Bird Species Recorded</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-emerald-100 p-3 rounded-xl shrink-0">
                  <Mountain className="w-6 h-6 text-emerald-700" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-stone-900">200+</div>
                  <div className="text-stone-500">Years - Oldest Sycamore Trees</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Eight Habitat Zones */}
      <section className="bg-stone-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4">Eight Distinct Habitats</h2>
            <p className="text-stone-600 max-w-2xl mx-auto">Each habitat zone supports unique flora and fauna, creating a mosaic of biodiversity across the park.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {habitats.map((habitat, i) => (
              <div key={i} className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm hover:shadow-lg transition-all">
                <div className="bg-emerald-50 w-12 h-12 rounded-2xl flex items-center justify-center mb-4">
                  {habitat.icon}
                </div>
                <h3 className="text-lg font-bold mb-1 text-stone-900">{habitat.title}</h3>
                <p className="text-xs text-emerald-700 font-semibold mb-3 uppercase tracking-wider">{habitat.location}</p>
                <p className="text-sm text-stone-600 leading-relaxed">{habitat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bird Species Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-white rounded-[3rem] p-12 border border-stone-200 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <Bird className="w-8 h-8 text-emerald-700" />
            <h2 className="text-3xl font-bold text-stone-900">Bird Species</h2>
          </div>
          <p className="text-stone-600 mb-8 max-w-3xl">
            The park hosts numerous bird species including those on RSPB red and amber conservation lists, making it an important sanctuary for Yorkshire birdlife.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {birdSpecies.map((bird, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-stone-50 rounded-xl">
                <div className={`w-2 h-2 rounded-full shrink-0 ${
                  bird.status === 'red' ? 'bg-red-500' :
                  bird.status === 'amber' ? 'bg-amber-500' :
                  'bg-emerald-500'
                }`} />
                <span className="text-sm font-medium text-stone-700">{bird.name}</span>
              </div>
            ))}
          </div>
          <div className="mt-8 p-6 bg-stone-50 rounded-2xl border border-stone-100">
            <div className="flex flex-wrap gap-6 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <span className="text-stone-600 font-semibold">Red List - High conservation concern</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-amber-500" />
                <span className="text-stone-600 font-semibold">Amber List - Moderate concern</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="text-stone-600 font-semibold">Common species</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-emerald-900 rounded-[3rem] p-12 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Explore Our Ecology</h2>
          <p className="text-xl text-emerald-100 mb-10 max-w-2xl mx-auto leading-relaxed">
            Discover the park's wildlife with our plant species checklist from our October 2011 survey and our I-Spy Trail leaflet to help identify species during your visit.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-white text-stone-900 px-10 py-4 rounded-full font-bold text-lg hover:bg-stone-100 transition-all">
              Download Species Checklist
            </button>
            <button className="bg-emerald-800 text-white border border-emerald-700 px-10 py-4 rounded-full font-bold text-lg hover:bg-emerald-700 transition-all">
              Get I-Spy Trail Leaflet
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Ecology;
