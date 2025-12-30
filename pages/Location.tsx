import React from 'react';
import { MapPin, Compass, Car, Trees, Info, Download, History } from 'lucide-react';
import accessMap from '../src/assets/images/access-map.png';
import parkFeaturesMap from '../src/assets/images/park-features-map.jpg';
import historical1980s from '../src/assets/images/historical-1980s.jpg';
import historical1950s from '../src/assets/images/historical-1950s.jpg';
import historical1938 from '../src/assets/images/historical-1938.jpg';
import titheMap1838 from '../src/assets/images/tithe-map-1838.jpg';

const Location: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24">
      {/* Header Section */}
      <section className="text-center">
        <div className="inline-block bg-emerald-50 px-4 py-2 rounded-full text-emerald-800 text-sm font-bold uppercase tracking-wider mb-4">
          Find Us
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-stone-900 mb-6">Location & Access</h1>
        <p className="text-xl text-stone-600 max-w-3xl mx-auto leading-relaxed">
          Parkinson's Park is situated between Netherfield Road and Kelcliffe Lane, positioned behind the former Crompton Parkinsons site, now Edison Fields.
        </p>
      </section>

      {/* Access Map Section */}
      <section>
        <h2 className="text-3xl font-bold text-stone-900 mb-8 flex items-center gap-3">
          <MapPin className="w-8 h-8 text-emerald-600" />
          Parking & Access Map
        </h2>
        <div className="bg-white p-8 rounded-3xl border border-stone-200 shadow-lg">
          <img
            src={accessMap}
            alt="Parking and access map showing routes to Parkinson's Park"
            className="w-full rounded-2xl"
          />
          <p className="text-sm text-stone-500 mt-4 text-center">
            Map showing parking locations and access routes to Parkinson's Park
          </p>
        </div>
      </section>

      {/* Access Routes Section */}
      <section>
        <h2 className="text-3xl font-bold text-stone-900 mb-8 flex items-center gap-3">
          <Compass className="w-8 h-8 text-emerald-600" />
          Access Routes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              title: "Via Netherfield Road Car Park",
              description: "Walkers can access the park by taking the footpath up by the side of Greenshaw Terrace, turning left just uphill from the houses through a ginnell which continues to Oxford Avenue.",
              icon: <Car className="w-6 h-6 text-emerald-600" />
            },
            {
              title: "Through the Estate",
              description: "Visitors may walk through the residential area and proceed either directly through public green space or via a kissing gate at Edison Way's end.",
              icon: <MapPin className="w-6 h-6 text-emerald-600" />
            },
            {
              title: "Nethercliffe Road Entrance",
              description: "An alternative access point exists here, providing convenient entry to the park.",
              icon: <MapPin className="w-6 h-6 text-emerald-600" />
            },
            {
              title: "Historic Kelcliffe Lane Route",
              description: "The traditional approach begins at the junction with West Villa Road or from the Nursery Road/Hillside direction.",
              icon: <Trees className="w-6 h-6 text-emerald-600" />
            }
          ].map((route, i) => (
            <div key={i} className="bg-white p-8 rounded-3xl border border-stone-200 shadow-sm hover:shadow-md transition-all">
              <div className="bg-emerald-50 w-14 h-14 rounded-2xl flex items-center justify-center mb-6">
                {route.icon}
              </div>
              <h3 className="text-xl font-bold text-stone-900 mb-4">{route.title}</h3>
              <p className="text-stone-600 leading-relaxed">{route.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Accessible Entrance Section */}
      <section className="bg-emerald-50 rounded-[3rem] p-12 border border-emerald-100">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-start gap-4 mb-6">
            <div className="bg-emerald-600 p-3 rounded-2xl flex-shrink-0">
              <Info className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-stone-900 mb-4">Accessible Entrance</h2>
              <p className="text-lg text-stone-700 leading-relaxed">
                The most accessible entrance for those with less mobility is to park at the top of Oxford Avenue and use a small unmade road behind some houses with a gate at the end.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Park Features Map Section */}
      <section>
        <h2 className="text-3xl font-bold text-stone-900 mb-8 flex items-center gap-3">
          <Trees className="w-8 h-8 text-emerald-600" />
          Park Features Map
        </h2>
        <div className="bg-white p-8 rounded-3xl border border-stone-200 shadow-lg">
          <img
            src={parkFeaturesMap}
            alt="Detailed park map highlighting features and facilities"
            className="w-full rounded-2xl"
          />
          <div className="flex justify-between items-center mt-6">
            <p className="text-sm text-stone-500">
              Detailed map showing park features, trails, and facilities
            </p>
            <a
              href="/Parkinsons-Park-Web-Site/documents/park-features-map-2021.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-emerald-700 text-white px-6 py-3 rounded-xl font-bold hover:bg-emerald-800 transition-all shadow-md"
            >
              <Download className="w-5 h-5" />
              Download PDF
            </a>
          </div>
        </div>
      </section>

      {/* Walking Connections */}
      <section>
        <h2 className="text-3xl font-bold text-stone-900 mb-8 flex items-center gap-3">
          <Compass className="w-8 h-8 text-emerald-600" />
          Walking Connections
        </h2>
        <div className="bg-white p-10 rounded-[3rem] border border-stone-200 shadow-sm">
          <p className="text-lg text-stone-600 leading-relaxed mb-6">
            A walking path connects Parkinson's Park to the Chevin through Bracken End Farm and Fairy Dell, marked on Ordnance Survey maps.
          </p>
          <p className="text-stone-500 text-sm">
            This route provides a beautiful connection to the wider Yorkshire countryside and offers extended walking opportunities for those wishing to explore the area.
          </p>
        </div>
      </section>

      {/* Historical Photographs Section */}
      <section>
        <h2 className="text-3xl font-bold text-stone-900 mb-8 flex items-center gap-3">
          <History className="w-8 h-8 text-emerald-600" />
          Historical Journey
        </h2>
        <p className="text-stone-600 mb-8 text-lg">
          Explore the transformation of Parkinson's Park through the decades, from historical maps to modern development.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            { year: "1838", title: "Tithe Map", image: titheMap1838, description: "Historic tithe map showing the original landscape" },
            { year: "1938", title: "Early Park Years", image: historical1938, description: "The park in its formative years" },
            { year: "1950s", title: "Mid-Century View", image: historical1950s, description: "The park during the 1950s era" },
            { year: "1980s", title: "Modern Development", image: historical1980s, description: "View of the site during the 1980s" }
          ].map((photo, i) => (
            <div key={i} className="bg-white rounded-3xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-lg transition-all group">
              <div className="relative h-80 overflow-hidden">
                <img
                  src={photo.image}
                  alt={`${photo.title} - ${photo.year}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur px-4 py-2 rounded-full">
                  <span className="font-bold text-emerald-800">{photo.year}</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-stone-900 mb-2">{photo.title}</h3>
                <p className="text-stone-600 text-sm">{photo.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Location;
