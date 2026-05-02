import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, TreePine, Map, Heart, X, Info, Sparkles, MapPin, Calendar, BookOpen } from 'lucide-react';
import { FEATURES, MOCK_EVENTS } from '../constants';
import { useDownload } from '../hooks/useDownload';
import DownloadDialog from '../components/DownloadDialog';
import heroImage from '../src/assets/images/PPHeroV3.jpg';
import celebrationTreeImage from '/images/celebration-tree.jpg';
import nlhfStampImg from '../src/assets/images/nlhf-acknowledgement-stamp.png';

const Home: React.FC = () => {
  const [showDonateDialog, setShowDonateDialog] = useState(false);
  const [showJoinFriendsDialog, setShowJoinFriendsDialog] = useState(false);
  const { downloadState, initiateDownload, closeDialog } = useDownload();

  return (
    <div className="space-y-24 pb-24">
      {/* Donate Coming Soon Dialog */}
      {showDonateDialog && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowDonateDialog(false)}>
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-2xl font-bold text-stone-900">Donate</h3>
              <button onClick={() => setShowDonateDialog(false)} className="text-stone-400 hover:text-stone-600 transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            <p className="text-stone-600 mb-8 leading-relaxed">
              Our donation system will be available soon. Check back later to support the park.
            </p>
            <button
              onClick={() => setShowDonateDialog(false)}
              className="w-full bg-emerald-700 hover:bg-emerald-800 text-white px-6 py-3 rounded-full font-bold transition-all"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Join the Friends Coming Soon Dialog */}
      {showJoinFriendsDialog && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowJoinFriendsDialog(false)}>
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-2xl font-bold text-stone-900">Join the Friends</h3>
              <button onClick={() => setShowJoinFriendsDialog(false)} className="text-stone-400 hover:text-stone-600 transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            <p className="text-stone-600 mb-8 leading-relaxed">
              Our membership system will be available soon. Check back later to join the Friends of Parkinson's Park.
            </p>
            <button
              onClick={() => setShowJoinFriendsDialog(false)}
              className="w-full bg-emerald-700 hover:bg-emerald-800 text-white px-6 py-3 rounded-full font-bold transition-all"
            >
              Close
            </button>
          </div>
        </div>
      )}
      {/* Hero Section */}
      <section className="relative h-[456px] md:h-[528px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Parkinson's Park Landscape"
            className="w-full h-full object-cover object-[center_62.5%] brightness-75 saturate-125 contrast-105"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
              Parkinson's Park <span className="text-emerald-400">Guiseley</span>
            </h1>
            <p className="text-xl md:text-2xl text-emerald-50 mb-8 font-light">
              A treasured Landscape Park for everyone to enjoy wildlife, woodland walks, and the peaceful beauty of the Yorkshire countryside.
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
          <p className="text-stone-600 max-w-2xl mx-auto"><strong>Parkinson's Park</strong> was gifted to the people of Guiseley in 1936 by F & A Parkinson Ltd. Today, a Friends Group continues that mission, working to maintain and improve the park for all of Aireborough's residents.</p>

          <div className="mt-8 max-w-2xl mx-auto bg-stone-50 border border-stone-200 rounded-2xl p-4 flex items-start gap-4 text-left">
            <Info className="w-5 h-5 text-stone-400 shrink-0 mt-0.5" />
            <div className="text-sm text-stone-600">
              <p><strong>Note:</strong> This website replaces our previous site. You can still access the <a href="https://friendsofparkinsonspark.wordpress.com" target="_blank" rel="noopener noreferrer" className="text-emerald-700 font-semibold hover:underline">legacy WordPress archive here</a>.</p>
            </div>
          </div>
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

        {/* ── Read the Full History banner ── */}
        <div className="mt-12 bg-gradient-to-r from-emerald-950 to-stone-800 rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-center gap-8">
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
              <button
                onClick={() => initiateDownload(
                  `${import.meta.env.BASE_URL}documents/Management-Plan-2026.docx`,
                  'Management-Plan-2026.docx'
                )}
                className="flex items-center space-x-2 text-emerald-400 font-bold hover:text-emerald-300 transition-colors"
              >
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

      {/* Celebration Tree Section */}
      <section id="celebration-tree" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <img
              src={celebrationTreeImage}
              alt="The Celebration Tree decorated for Christmas"
              className="rounded-3xl shadow-xl w-full object-cover"
            />
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-bold text-emerald-800 flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Community Tradition
            </div>
          </div>
          <div className="space-y-6">
            <div className="inline-block bg-emerald-50 px-4 py-2 rounded-full text-emerald-800 text-sm font-bold uppercase tracking-wider">
              Park Feature
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-stone-900">The Celebration Tree</h2>
            <p className="text-lg text-stone-600 leading-relaxed">
              A beloved community tradition, our Celebration Tree marks the seasons and special occasions throughout the year.
              Visitors will find this special tree adorned with decorations that change with the calendar.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {[
                { season: 'Easter', decoration: 'Spring flowers & eggs' },
                { season: 'Remembrance', decoration: 'Poppies & tributes' },
                { season: 'Christmas', decoration: 'Festive ornaments & lights' },
                { season: 'Special Events', decoration: 'Community celebrations' }
              ].map((item, i) => (
                <div key={i} className="bg-stone-50 p-4 rounded-2xl border border-stone-100">
                  <div className="font-bold text-stone-900">{item.season}</div>
                  <div className="text-sm text-stone-500">{item.decoration}</div>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-6 pt-4">
              <div className="flex items-center gap-2 text-stone-600">
                <MapPin className="w-5 h-5 text-emerald-600" />
                <span className="text-sm">Flat area near the bridle way path</span>
              </div>
            </div>
            <Link
              to="/events"
              className="inline-flex items-center gap-2 text-emerald-700 font-bold hover:underline"
            >
              See upcoming seasonal events <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Events Sneak Peek */}
      <section id="activities" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
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
                  className={`w-full h-full transition-transform duration-500 ${event.id === '2'
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
              <button
                onClick={() => setShowDonateDialog(true)}
                className="bg-white text-stone-900 px-10 py-4 rounded-full font-bold text-lg hover:bg-stone-100 transition-all flex items-center justify-center space-x-2"
              >
                <Heart className="w-5 h-5 text-rose-500" />
                <span>Make a Donation</span>
              </button>
              <button onClick={() => setShowJoinFriendsDialog(true)} className="bg-stone-800 text-white border border-stone-700 px-10 py-4 rounded-full font-bold text-lg hover:bg-stone-700 transition-all">
                Join the Friends
              </button>
            </div>
          </div>
        </div>
      </section>

      <DownloadDialog
        isOpen={downloadState.isOpen}
        onClose={closeDialog}
        fileName={downloadState.fileName}
        fileUrl={downloadState.fileUrl}
      />
    </div>
  );
};

export default Home;