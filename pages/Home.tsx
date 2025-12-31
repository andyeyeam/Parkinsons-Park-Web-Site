import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, TreePine, Map, Heart } from 'lucide-react';
import { FEATURES, MOCK_EVENTS } from '../constants';
import heroImage from '../src/assets/images/PPHeroV3.jpg';

const Home: React.FC = () => {
  return (
    <div className="space-y-24 pb-24">
      {/* Hero Section */}
      <section className="relative h-[456px] md:h-[528px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Parkinson's Park Landscape"
            className="w-full h-full object-cover object-[center_37.5%] brightness-75 saturate-125 contrast-105"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
              Parkinson's Park <span className="text-emerald-400">Guiseley</span>
            </h1>
            <p className="text-xl md:text-2xl text-emerald-50 mb-8 font-light">
              A treasured landscape park where everyone in Guiseley can enjoy wildlife, woodland walks, and the peaceful beauty of the Yorkshire countryside.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/events" className="bg-emerald-700 hover:bg-emerald-800 px-8 py-4 rounded-full font-bold text-lg text-center transition-all flex items-center justify-center space-x-2">
                <span>Explore Events</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/volunteer" className="bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 px-8 py-4 rounded-full font-bold text-lg text-center transition-all">
                Support the Park
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4">A Community Legacy</h2>
          <p className="text-stone-600 max-w-2xl mx-auto">Gifted by the Parkinson family, this park is a vital green lung for Guiseley, maintained by the community for the community.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {FEATURES.map((feature, i) => {
            const FeatureCard = (
              <div className={`bg-white p-8 rounded-3xl border border-stone-100 shadow-sm hover:shadow-md transition-all ${feature.link ? 'cursor-pointer hover:border-emerald-600' : ''}`}>
                <div className="bg-emerald-50 w-14 h-14 rounded-2xl flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-stone-600 leading-relaxed">{feature.description}</p>
                {feature.link && (
                  <div className="mt-4 text-emerald-700 font-semibold text-sm flex items-center gap-2">
                    Learn more <ArrowRight className="w-4 h-4" />
                  </div>
                )}
              </div>
            );

            return feature.link ? (
              <Link key={i} to={feature.link} className="block">
                {FeatureCard}
              </Link>
            ) : (
              <div key={i}>{FeatureCard}</div>
            );
          })}
        </div>
      </section>

      {/* Impact Section */}
      <section className="bg-emerald-900 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl md:text-5xl font-bold leading-tight">Preserving Our Yorkshire Heritage</h2>
              <p className="text-emerald-100 text-lg leading-relaxed">
                Parkinson's Park serves as a gateway to the Yorkshire countryside. Our ongoing work includes wildflower meadow restoration and the protection of local hedgerows that have stood for generations.
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <div className="text-4xl font-bold text-emerald-400">Guiseley</div>
                  <div className="text-emerald-200 mt-2">Location</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-emerald-400">100%</div>
                  <div className="text-emerald-200 mt-2">Volunteer Managed</div>
                </div>
              </div>
              <button className="flex items-center space-x-2 text-emerald-400 font-bold hover:text-emerald-300 transition-colors">
                <span>View our management plan</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=800&auto=format&fit=crop" 
                alt="Views from Parkinson's Park" 
                className="rounded-3xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl hidden md:block">
                <div className="flex items-center space-x-4">
                  <div className="bg-emerald-100 p-3 rounded-xl">
                    <TreePine className="w-8 h-8 text-emerald-700" />
                  </div>
                  <div>
                    <div className="text-stone-900 font-bold">Friends Group</div>
                    <div className="text-stone-500 text-sm">Founded 2011</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Events Sneak Peek */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4">Park Activities</h2>
            <p className="text-stone-600">What's happening in Parkinson's Park this month.</p>
          </div>
          <Link to="/events" className="text-emerald-700 font-bold hover:underline flex items-center space-x-2">
            <span>View all events</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {MOCK_EVENTS.slice(0, 3).map(event => (
            <div key={event.id} className="group cursor-pointer">
              <div className="relative h-64 overflow-hidden rounded-2xl mb-4">
                <img
                  src={event.imageUrl}
                  alt={event.title}
                  className={`w-full h-full transition-transform duration-500 ${
                    event.id === '2'
                      ? 'object-contain scale-90 group-hover:scale-100'
                      : 'object-cover group-hover:scale-105'
                  }`}
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-emerald-800">
                  {event.type}
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-emerald-700 transition-colors">{event.title}</h3>
              <p className="text-stone-500 text-sm mb-4">{new Date(event.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })} • {event.time}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-stone-900 rounded-[3rem] p-12 text-center text-white relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Support the Friends Group</h2>
            <p className="text-xl text-stone-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              Every penny helps us maintain the benches, keep the paths clear, and run our community events in the park.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <a
                href="https://paypal.me/parkinsonspark"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-stone-900 px-10 py-4 rounded-full font-bold text-lg hover:bg-stone-100 transition-all flex items-center justify-center space-x-2"
              >
                <Heart className="w-5 h-5 text-rose-500" />
                <span>Make a Donation</span>
              </a>
              <button className="bg-stone-800 text-white border border-stone-700 px-10 py-4 rounded-full font-bold text-lg hover:bg-stone-700 transition-all">
                Join the Friends
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;