import React from 'react';
import { MapPin, Compass, Car, Trees, Info } from 'lucide-react';

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

      {/* Additional Information */}
      <section>
        <h2 className="text-3xl font-bold text-stone-900 mb-8 flex items-center gap-3">
          <Trees className="w-8 h-8 text-emerald-600" />
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

      {/* Map Section Placeholder */}
      <section className="bg-stone-50 rounded-[3rem] p-12">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-stone-900 mb-6">Find Parkinson's Park</h2>
          <div className="bg-stone-200 h-96 rounded-3xl flex items-center justify-center border border-stone-300">
            <div className="text-center">
              <MapPin className="w-16 h-16 text-stone-400 mx-auto mb-4" />
              <p className="text-stone-600 font-semibold">Map Coming Soon</p>
              <p className="text-stone-500 text-sm mt-2">Interactive park map will be available here</p>
            </div>
          </div>
          <p className="text-stone-600 mt-8">
            <strong>Address:</strong> Between Netherfield Road and Kelcliffe Lane, Guiseley, West Yorkshire
          </p>
        </div>
      </section>
    </div>
  );
};

export default Location;
