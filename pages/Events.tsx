import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, Clock, MapPin, Search, Filter, X } from 'lucide-react';
import { MOCK_EVENTS } from '../constants';

const Events: React.FC = () => {
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [clickCounts, setClickCounts] = useState<Record<string, number>>({});
  const [showPopup, setShowPopup] = useState(false);
  const [popupData, setPopupData] = useState<{ eventTitle: string; count: number } | null>(null);

  // Load click counts from localStorage on mount
  useEffect(() => {
    const savedCounts = localStorage.getItem('eventClickCounts');
    if (savedCounts) {
      setClickCounts(JSON.parse(savedCounts));
    }
  }, []);

  // Handle Register Interest button click
  const handleRegisterClick = (eventId: string, eventTitle: string) => {
    const newCount = (clickCounts[eventId] || 0) + 1;
    const updatedCounts = { ...clickCounts, [eventId]: newCount };

    setClickCounts(updatedCounts);
    localStorage.setItem('eventClickCounts', JSON.stringify(updatedCounts));

    setPopupData({ eventTitle, count: newCount });
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setTimeout(() => setPopupData(null), 300);
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const isPast = (dateStr: string) => new Date(dateStr) < today;

  const filteredEvents = MOCK_EVENTS.filter(event => {
    const matchesFilter = filter === 'all' || event.type === filter;
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Common fallback for when direct URLs (like Google Photos shares) don't resolve as raw images
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.src = 'https://images.unsplash.com/photo-1533230393619-3fdd70288891?q=80&w=800&auto=format&fit=crop';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-12">
        <div className="inline-block bg-emerald-50 px-4 py-2 rounded-full text-emerald-800 text-sm font-bold uppercase tracking-wider mb-4">
          2026 Calendar
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-stone-900 mb-6">Upcoming Park Events</h1>
        <p className="text-xl text-stone-600 max-w-3xl leading-relaxed">
          Our community event programme for 2026. From the Children's Gala to the Lantern Parade, join us in celebrating the social and cultural heritage of Parkinson's Park.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 mb-12">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search events..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-2xl border border-stone-200 focus:ring-2 focus:ring-emerald-600 outline-none transition-all shadow-sm"
          />
        </div>
        <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
          {['all', 'family', 'walk', 'workshop', 'volunteer'].map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-3 rounded-full font-semibold whitespace-nowrap transition-all ${
                filter === cat 
                  ? 'bg-emerald-700 text-white shadow-lg' 
                  : 'bg-white text-stone-600 border border-stone-200 hover:border-emerald-600'
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {filteredEvents.map(event => {
          const past = isPast(event.date);
          return (
          <div key={event.id} className={`rounded-[2.5rem] border shadow-sm overflow-hidden flex flex-col transition-all group animate-in fade-in slide-in-from-bottom-4 duration-500 ${past ? 'bg-stone-50 border-stone-200 opacity-75' : 'bg-white border-stone-100 hover:shadow-2xl'}`}>
            <div className="relative h-64 overflow-hidden">
              <img
                src={event.imageUrl}
                alt={event.title}
                onError={handleImageError}
                className={`w-full h-full transition-transform duration-1000 ${
                  event.id === '2'
                    ? 'object-contain scale-90 group-hover:scale-100'
                    : 'object-cover group-hover:scale-110'
                } ${past ? 'grayscale' : ''}`}
              />
              {past && (
                <div className="absolute inset-0 bg-stone-900/30 flex items-center justify-center">
                  <span className="bg-white text-stone-600 text-xs font-black tracking-widest uppercase px-4 py-2 rounded-full shadow-lg">
                    Completed
                  </span>
                </div>
              )}
              <div className="absolute top-6 right-6 bg-white/95 backdrop-blur px-5 py-3 rounded-[1.5rem] shadow-xl text-center border border-white/50">
                {/^(TBA|January|February|March|April|May|June|July|August|September|October|November|December)$/i.test(event.time) ? (
                  <div className="text-lg font-black text-stone-900 leading-none">TBA</div>
                ) : (
                  <>
                    <div className={`text-xs font-black uppercase tracking-tighter leading-none mb-1 ${past ? 'text-stone-400' : 'text-emerald-800'}`}>
                      {new Date(event.date).toLocaleDateString('en-GB', { month: 'short' })}
                    </div>
                    <div className="text-2xl font-black text-stone-900 leading-none">
                      {event.date.split('-')[2]}
                    </div>
                  </>
                )}
              </div>
              <div className="absolute bottom-6 left-6">
                <span className={`backdrop-blur-md text-white text-[10px] font-black tracking-widest uppercase px-3 py-1.5 rounded-full border shadow-lg ${past ? 'bg-stone-500/80 border-stone-400/30' : 'bg-emerald-700/90 border-emerald-500/30'}`}>
                  {event.type}
                </span>
              </div>
            </div>
            <div className="p-10 flex-1 flex flex-col">
              <h3 className={`text-2xl font-bold mb-4 leading-tight ${past ? 'text-stone-500' : 'text-stone-900 group-hover:text-emerald-700 transition-colors'}`}>{event.title}</h3>
              <p className="text-stone-500 text-sm leading-relaxed mb-8 flex-1">
                {event.description}
              </p>
              <div className="space-y-4 mb-8 pt-6 border-t border-stone-100">
                <div className="flex items-center space-x-3 text-sm text-stone-400">
                  <div className="p-2 bg-stone-50 rounded-lg">
                    <Clock className={`w-4 h-4 ${past ? 'text-stone-400' : 'text-emerald-600'}`} />
                  </div>
                  <span className="font-medium">{event.time}</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-stone-400">
                  <div className="p-2 bg-stone-50 rounded-lg">
                    <MapPin className={`w-4 h-4 ${past ? 'text-stone-400' : 'text-emerald-600'}`} />
                  </div>
                  <span className="font-medium">Parkinson's Park, Guiseley</span>
                </div>
              </div>
            </div>
          </div>
          );
        })}
      </div>

      {filteredEvents.length === 0 && (
        <div className="text-center py-24 bg-stone-100 rounded-[3rem] border-2 border-dashed border-stone-200">
          <CalendarIcon className="w-12 h-12 text-stone-300 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-stone-400">No events found</h3>
          <p className="text-stone-400 mt-2">Adjust your search or filter to find upcoming park activities.</p>
        </div>
      )}

      {/* Interest Count Popup */}
      {showPopup && popupData && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-200"
          onClick={closePopup}
        >
          <div
            className="bg-white rounded-[2.5rem] p-10 max-w-md mx-4 shadow-2xl border border-stone-100 animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-6">
              <div className="flex-1">
                <div className="inline-block bg-emerald-50 px-4 py-2 rounded-full text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
                  Interest Registered
                </div>
                <h3 className="text-2xl font-bold text-stone-900 leading-tight">
                  {popupData.eventTitle}
                </h3>
              </div>
              <button
                onClick={closePopup}
                className="p-2 hover:bg-stone-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-stone-400" />
              </button>
            </div>

            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl p-8 text-center mb-6 border border-emerald-200">
              <div className="text-5xl font-black text-emerald-700 mb-2">
                {popupData.count}
              </div>
              <div className="text-sm font-bold text-emerald-800 uppercase tracking-wider">
                {popupData.count === 1 ? 'Registration' : 'Registrations'}
              </div>
            </div>

            <p className="text-stone-600 text-sm text-center mb-6">
              Thank you for your interest! This event has received{' '}
              <span className="font-bold text-emerald-700">{popupData.count}</span>{' '}
              {popupData.count === 1 ? 'registration' : 'registrations'}.
            </p>

            <button
              onClick={closePopup}
              className="w-full bg-emerald-700 text-white py-4 rounded-2xl font-bold hover:bg-emerald-800 transition-all shadow-md active:scale-95"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;