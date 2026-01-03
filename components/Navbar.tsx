
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X as CloseIcon, Search } from 'lucide-react';
import logo from '../src/assets/images/logo.jpg';
import SearchModal from './SearchModal';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showDonateDialog, setShowDonateDialog] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);

  return (
    <nav className="bg-white/90 backdrop-blur-md border-b border-stone-200 sticky top-0 z-50">
      {/* Search Modal */}
      <SearchModal isOpen={showSearchModal} onClose={() => setShowSearchModal(false)} />
      {/* Donate Coming Soon Dialog */}
      {showDonateDialog && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowDonateDialog(false)}>
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-2xl font-bold text-stone-900">Donate</h3>
              <button onClick={() => setShowDonateDialog(false)} className="text-stone-400 hover:text-stone-600 transition-colors">
                <CloseIcon className="w-6 h-6" />
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <Link to="/" className="flex items-center space-x-3">
            <img src={logo} alt="Parkinson's Park Logo" className="h-16 w-auto p-2 bg-white rounded-xl border-2 border-emerald-600 shadow-md hover:shadow-lg transition-shadow" />
            <span className="text-xl font-bold text-stone-800 tracking-tight">Parkinson's Park <span className="text-emerald-700 font-normal italic">Guiseley</span></span>
          </Link>
          
          <div className="hidden md:flex space-x-8 items-center">
            <Link to="/" className="text-stone-600 hover:text-emerald-700 font-medium transition-colors">Home</Link>
            <Link to="/events" className="text-stone-600 hover:text-emerald-700 font-medium transition-colors">Events</Link>
            <Link to="/volunteer" className="text-stone-600 hover:text-emerald-700 font-medium transition-colors">Get Involved</Link>
            <Link to="/location" className="text-stone-600 hover:text-emerald-700 font-medium transition-colors">Find Us</Link>
            <Link to="/your-stories" className="text-stone-600 hover:text-emerald-700 font-medium transition-colors">Your Stories</Link>
            <Link to="/about" className="text-stone-600 hover:text-emerald-700 font-medium transition-colors">About Us</Link>
            <button
              onClick={() => setShowSearchModal(true)}
              className="text-stone-600 hover:text-emerald-700 transition-colors p-2"
              aria-label="Search site"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => setShowDonateDialog(true)}
              className="bg-emerald-700 text-white px-5 py-2 rounded-full font-semibold hover:bg-emerald-800 transition-all shadow-sm"
            >
              Donate
            </button>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-stone-600">
              {isOpen ? <CloseIcon className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-stone-200 py-4 px-4 space-y-4 shadow-lg">
          <Link to="/" className="block text-stone-600 font-medium" onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/events" className="block text-stone-600 font-medium" onClick={() => setIsOpen(false)}>Events</Link>
          <Link to="/volunteer" className="block text-stone-600 font-medium" onClick={() => setIsOpen(false)}>Get Involved</Link>
          <Link to="/location" className="block text-stone-600 font-medium" onClick={() => setIsOpen(false)}>Find Us</Link>
          <Link to="/your-stories" className="block text-stone-600 font-medium" onClick={() => setIsOpen(false)}>Your Stories</Link>
          <Link to="/about" className="block text-stone-600 font-medium" onClick={() => setIsOpen(false)}>About Us</Link>
          <button
            onClick={() => { setShowSearchModal(true); setIsOpen(false); }}
            className="flex items-center gap-2 text-stone-600 font-medium"
          >
            <Search className="w-5 h-5" />
            <span>Search Site</span>
          </button>
          <button
            onClick={() => { setShowDonateDialog(true); setIsOpen(false); }}
            className="block text-center w-full bg-emerald-700 text-white px-5 py-3 rounded-xl font-semibold hover:bg-emerald-800 transition-all"
          >
            Donate
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
