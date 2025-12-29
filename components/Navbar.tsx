
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Leaf } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white/90 backdrop-blur-md border-b border-stone-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center space-x-2">
            <Leaf className="w-8 h-8 text-emerald-700" />
            <span className="text-xl font-bold text-stone-800 tracking-tight">Parkinson's Park <span className="text-emerald-700 font-normal italic">Guiseley</span></span>
          </Link>
          
          <div className="hidden md:flex space-x-8 items-center">
            <Link to="/" className="text-stone-600 hover:text-emerald-700 font-medium transition-colors">Home</Link>
            <Link to="/events" className="text-stone-600 hover:text-emerald-700 font-medium transition-colors">Events</Link>
            <Link to="/volunteer" className="text-stone-600 hover:text-emerald-700 font-medium transition-colors">Get Involved</Link>
            <Link to="/about" className="text-stone-600 hover:text-emerald-700 font-medium transition-colors">About Us</Link>
            <button className="bg-emerald-700 text-white px-5 py-2 rounded-full font-semibold hover:bg-emerald-800 transition-all shadow-sm">
              Donate
            </button>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-stone-600">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
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
          <Link to="/about" className="block text-stone-600 font-medium" onClick={() => setIsOpen(false)}>About Us</Link>
          <button className="w-full bg-emerald-700 text-white px-5 py-3 rounded-xl font-semibold">Donate</button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
