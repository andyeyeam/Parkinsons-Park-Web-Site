import React from 'react';
import { Link } from 'react-router-dom';
import { Mountain, Globe, Snowflake, Layers, ArrowLeft, Clock } from 'lucide-react';

const Geology: React.FC = () => {
  const rockFormations = [
    {
      name: "Guiseley Grit",
      type: "Sandstone",
      thickness: "25 meters (82 feet)",
      features: "Ancient seabed ripple marks",
      description: "The primary geological feature of the park, displaying distinctive ripple patterns formed in ancient tropical seas."
    },
    {
      name: "Mudstone Shale",
      type: "Shale",
      thickness: "Beneath Great Brow",
      features: "Fossilized Goniatites",
      description: "Contains fossils of Goniatites, an ancient squid-like creature with a coiled shell, providing evidence of marine life from 300 million years ago."
    },
    {
      name: "Coal Deposits",
      type: "Coal seams",
      thickness: "Thin bands",
      features: "Compressed vegetation",
      description: "Formed from ancient tropical forest vegetation that accumulated in the swampy delta environment."
    }
  ];

  const geologicalEras = [
    {
      icon: <Globe className="w-6 h-6 text-emerald-600" />,
      era: "300 Million Years Ago",
      title: "Tropical River Delta",
      description: "When Pangaea existed as one supercontinent, massive rivers transported sediment from granite mountains through tropical forests to a swampy delta emptying into warm seas. Marine life, vegetation, and minerals accumulated and compressed into rock over millions of years."
    },
    {
      icon: <Layers className="w-6 h-6 text-emerald-600" />,
      era: "Continental Drift",
      title: "Formation of the Pennines",
      description: "Pangaea fragmented into modern continents, elevating the ancient delta's rock bands to form the Pennine Hills and The Chevin. Differential erosion rates created the distinctive stepped terrain visible today."
    },
    {
      icon: <Snowflake className="w-6 h-6 text-emerald-600" />,
      era: "30,000 - 13,000 Years Ago",
      title: "Ice Age Glaciation",
      description: "A glacial ice sheet 250 meters thick covered northern England. The Wharfedale and Airedale glaciers carved the Guiseley Gap, depositing glacial till that contributes to the park's characteristic muddy conditions."
    }
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
            <Mountain className="w-8 h-8 text-emerald-400" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Geology</h1>
          <p className="text-xl text-emerald-100 max-w-3xl font-light leading-relaxed">
            Parkinson's Park sits on the west flank of The Chevin escarpment, above a hanging valley between Wharfedale and Airedale, known as the Guiseley Gap. Discover the ancient forces that shaped this remarkable landscape.
          </p>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <div className="inline-block bg-emerald-50 px-4 py-2 rounded-full text-emerald-800 text-sm font-bold uppercase tracking-wider mb-4">
            300 Million Years in the Making
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4">A Journey Through Deep Time</h2>
          <p className="text-stone-600 max-w-2xl mx-auto">
            The park's landscape is the result of three major geological influences spanning hundreds of millions of years.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {geologicalEras.map((era, i) => (
            <div key={i} className="bg-white p-8 rounded-3xl border border-stone-200 shadow-sm hover:shadow-lg transition-all">
              <div className="bg-emerald-50 w-12 h-12 rounded-2xl flex items-center justify-center mb-4">
                {era.icon}
              </div>
              <div className="text-xs font-bold text-emerald-700 uppercase tracking-wider mb-2">{era.era}</div>
              <h3 className="text-xl font-bold mb-3 text-stone-900">{era.title}</h3>
              <p className="text-stone-600 leading-relaxed text-sm">{era.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pangaea Section */}
      <section className="bg-stone-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-stone-900">Before the Dinosaurs</h2>
              <p className="text-lg text-stone-600 leading-relaxed">
                100 million years before the dinosaurs roamed the Earth, all continents were joined in a single supercontinent called Pangaea. This was a time of vast tropical forests and shallow warm seas.
              </p>
              <p className="text-lg text-stone-600 leading-relaxed">
                Massive rivers carved through granite mountains, carrying sediment through dense tropical vegetation to a huge swampy delta. Here, the sediment mixed with marine life and minerals, slowly accumulating over millions of years.
              </p>
              <p className="text-lg text-stone-600 leading-relaxed">
                Under immense pressure and over vast periods of time, these layers were compressed and transformed into the hardened rock bands we see today as the Pennine Millstone Grit.
              </p>
            </div>
            <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-stone-200">
              <div className="flex items-center gap-3 mb-6">
                <Clock className="w-8 h-8 text-emerald-700" />
                <h3 className="text-2xl font-bold text-stone-900">Timeline</h3>
              </div>
              <div className="space-y-6">
                <div className="border-l-4 border-emerald-600 pl-6 py-2">
                  <div className="text-sm font-bold text-emerald-700 mb-1">~400 Million Years Ago</div>
                  <div className="text-stone-600">Pangaea forms as a supercontinent</div>
                </div>
                <div className="border-l-4 border-emerald-600 pl-6 py-2">
                  <div className="text-sm font-bold text-emerald-700 mb-1">~300 Million Years Ago</div>
                  <div className="text-stone-600">Sediment accumulates in tropical delta</div>
                </div>
                <div className="border-l-4 border-emerald-600 pl-6 py-2">
                  <div className="text-sm font-bold text-emerald-700 mb-1">~200 Million Years Ago</div>
                  <div className="text-stone-600">Pangaea begins to break apart</div>
                </div>
                <div className="border-l-4 border-emerald-600 pl-6 py-2">
                  <div className="text-sm font-bold text-emerald-700 mb-1">~30,000 Years Ago</div>
                  <div className="text-stone-600">Ice age glaciers shape the landscape</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rock Formations Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4">Pennine Millstone Grit</h2>
          <p className="text-lg text-stone-600 max-w-3xl">
            The park sits on distinctive bands of Pennine Millstone Grit, comprising sandstone, mudstone shale, and coal deposits. Each layer tells a story of ancient environments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {rockFormations.map((rock, i) => (
            <div key={i} className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden">
              <div className="bg-emerald-900 text-white p-6">
                <h3 className="text-2xl font-bold mb-2">{rock.name}</h3>
                <div className="text-emerald-200 text-sm font-semibold">{rock.type}</div>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <div className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-1">Thickness</div>
                  <div className="text-stone-900 font-semibold">{rock.thickness}</div>
                </div>
                <div>
                  <div className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-1">Key Features</div>
                  <div className="text-stone-900 font-semibold">{rock.features}</div>
                </div>
                <div>
                  <p className="text-sm text-stone-600 leading-relaxed">{rock.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* The Chevin & Guiseley Gap Section */}
      <section className="bg-emerald-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">The Guiseley Gap</h2>
              <p className="text-emerald-100 text-lg leading-relaxed mb-6">
                As Pangaea broke apart, the ancient delta rocks were elevated and tilted, forming the Pennine Hills and The Chevin escarpment. Different rock types eroded at varying rates, creating the distinctive stepped hillside terrain.
              </p>
              <p className="text-emerald-100 text-lg leading-relaxed">
                During the last ice age, massive glaciers 250 meters thick flowed down Wharfedale and Airedale. These ice rivers carved the hanging valley known as the Guiseley Gap, where Parkinson's Park now sits. The glaciers deposited thick layers of clay and rock debris (glacial till), which is why the park experiences such muddy conditions today.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold mb-6">Geological Features Today</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <Mountain className="w-6 h-6 text-emerald-400 shrink-0 mt-1" />
                  <div>
                    <div className="font-bold mb-1">The Chevin Escarpment</div>
                    <div className="text-emerald-200 text-sm">Stepped hillside formed by differential erosion</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Layers className="w-6 h-6 text-emerald-400 shrink-0 mt-1" />
                  <div>
                    <div className="font-bold mb-1">Visible Rock Bands</div>
                    <div className="text-emerald-200 text-sm">Ancient delta sediments now hardened into gritstone</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Snowflake className="w-6 h-6 text-emerald-400 shrink-0 mt-1" />
                  <div>
                    <div className="font-bold mb-1">Glacial Till Deposits</div>
                    <div className="text-emerald-200 text-sm">Clay-rich soil creating muddy conditions</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fossils Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-white rounded-[3rem] p-12 border border-stone-200 shadow-sm text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-stone-900">Ancient Life Preserved in Stone</h2>
          <p className="text-xl text-stone-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            The mudstone shale beneath Great Brow contains fossilized <strong>Goniatites</strong> — ancient squid-like creatures with beautifully coiled shells that lived in the warm tropical seas 300 million years ago.
          </p>
          <div className="inline-block bg-emerald-50 px-8 py-4 rounded-2xl">
            <div className="text-sm font-bold text-emerald-800 uppercase tracking-wider mb-2">Evidence of Ancient Seas</div>
            <div className="text-2xl font-bold text-stone-900">Fossilized Marine Life</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Geology;
