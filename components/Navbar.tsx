
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X as CloseIcon, Search, ChevronDown } from 'lucide-react';
import logo from '../src/assets/images/logo.jpg';
import SearchModal from './SearchModal';

// Dropdown menu component
const NavDropdown: React.FC<{
  label: string;
  items: { label: string; to: string }[];
  mainLink?: string;
  isActive?: boolean;
}> = ({ label, items, mainLink, isActive }) => {
  const navigate = useNavigate();

  const handleMainClick = () => {
    if (mainLink) {
      navigate(mainLink);
    }
  };

  return (
    <div className="relative group">
      <button
        onClick={handleMainClick}
        className={`flex items-center gap-1 font-medium transition-colors cursor-pointer text-sm whitespace-nowrap ${
          isActive ? 'text-emerald-700 font-semibold' : 'text-stone-600 hover:text-emerald-700'
        }`}
      >
        {label}
        <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:rotate-180" />
      </button>
      <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
        <div className="bg-white rounded-xl shadow-xl border border-stone-200 py-2 min-w-[200px]">
          {items.map((item, i) => (
            <Link
              key={i}
              to={item.to}
              className="block px-4 py-2 text-sm text-stone-600 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

// Mobile dropdown component
const MobileDropdown: React.FC<{
  label: string;
  items: { label: string; to: string }[];
  mainLink?: string;
  onNavigate: () => void;
  isActive?: boolean;
}> = ({ label, items, mainLink, onNavigate, isActive }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div>
      <div className="flex items-center justify-between">
        {mainLink ? (
          <Link to={mainLink} className={`font-medium ${isActive ? 'text-emerald-700' : 'text-stone-600'}`} onClick={onNavigate}>
            {label}
          </Link>
        ) : (
          <span className={`font-medium ${isActive ? 'text-emerald-700' : 'text-stone-600'}`}>{label}</span>
        )}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-1 text-stone-400"
        >
          <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
        </button>
      </div>
      {isExpanded && (
        <div className="ml-4 mt-2 space-y-2 border-l-2 border-emerald-200 pl-4">
          {items.map((item, i) => (
            <Link
              key={i}
              to={item.to}
              className="block text-sm text-stone-500 hover:text-emerald-700"
              onClick={onNavigate}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showDonateDialog, setShowDonateDialog] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const location = useLocation();

  const isActive = (item: { mainLink?: string; items: { label: string; to: string }[] }) => {
    const routes = [item.mainLink, ...item.items.map(i => i.to.split('#')[0])].filter(Boolean) as string[];
    return routes.some(r => r === '/' ? location.pathname === '/' : location.pathname === r);
  };

  // Navigation structure with dropdowns
  const navItems = {
    home: {
      label: 'Home',
      mainLink: '/',
      items: [
        { label: 'History', to: '/history' },
        { label: 'Ecology', to: '/ecology' },
        { label: 'Geology', to: '/geology' },
        { label: 'Find Us', to: '/location' },
        { label: 'Your Stories', to: '/your-stories' },
        { label: 'Celebration Tree', to: '/#celebration-tree' },
      ]
    },
    events: {
      label: 'Events',
      mainLink: '/events',
      items: [
        { label: 'All Events', to: '/events' },
        { label: 'Family Events', to: '/events#family' },
        { label: 'Walks', to: '/events#walk' },
        { label: 'Workshops', to: '/events#workshop' },
      ]
    },
    getInvolved: {
      label: 'Get Involved',
      mainLink: '/volunteer',
      items: [
        { label: 'Volunteer Opportunities', to: '/volunteer' },
        { label: 'Available Roles', to: '/volunteer#roles' },
        { label: 'Application Form', to: '/volunteer#apply' },
      ]
    },
    findUs: {
      label: 'Find Us',
      mainLink: '/location',
      items: [
        { label: 'Access Routes', to: '/location#access' },
        { label: 'Park Features Map', to: '/location#features' },
        { label: 'Walking Connections', to: '/location#walking' },
      ]
    },
    stories: {
      label: 'Your Stories',
      mainLink: '/your-stories',
      items: [
        { label: 'Community Memories', to: '/your-stories#stories' },
        { label: 'Share Your Story', to: '/your-stories#share' },
      ]
    },
    about: {
      label: 'About Us',
      mainLink: '/about',
      items: [
        { label: 'Our Mission', to: '/about#mission' },
        { label: 'Directors & Officers', to: '/about#directors' },
      ]
    },
    governance: {
      label: 'Governance',
      mainLink: '/governance',
      items: [
        { label: 'CIC Reports', to: '/governance#reports' },
        { label: 'AGM/EGM Minutes', to: '/governance#minutes' },
        { label: 'Governance', to: '/governance#governance' },
        { label: 'Park Bylaws', to: '/governance#bylaws' },
      ]
    },
  };

  return (
    <>
      {/* Search Modal */}
      <SearchModal isOpen={showSearchModal} onClose={() => setShowSearchModal(false)} />
      {/* Donate Coming Soon Dialog */}
      {showDonateDialog && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] flex items-center justify-center p-4" onClick={() => setShowDonateDialog(false)}>
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
      <nav className="bg-white/90 backdrop-blur-md border-b border-stone-200 sticky top-0 z-50">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <Link to="/" className="flex items-center space-x-2 shrink-0">
              <img src={logo} alt="Parkinson's Park Logo" className="h-14 w-auto p-1.5 bg-white rounded-xl border-2 border-emerald-600 shadow-md hover:shadow-lg transition-shadow" />
              <span className="text-lg font-bold text-stone-800 tracking-tight hidden sm:inline">Parkinson's Park <span className="text-emerald-700 font-normal italic">Guiseley</span></span>
            </Link>

            <div className="hidden xl:flex space-x-3 items-center">
              <NavDropdown {...navItems.home} isActive={isActive(navItems.home)} />
              <NavDropdown {...navItems.events} isActive={isActive(navItems.events)} />
              <NavDropdown {...navItems.getInvolved} isActive={isActive(navItems.getInvolved)} />
              <NavDropdown {...navItems.findUs} isActive={isActive(navItems.findUs)} />
              <NavDropdown {...navItems.stories} isActive={isActive(navItems.stories)} />
              <NavDropdown {...navItems.governance} isActive={isActive(navItems.governance)} />
              <Link
                to="/archive"
                className={`text-sm font-medium transition-colors whitespace-nowrap ${location.pathname === '/archive' ? 'text-emerald-700 font-semibold' : 'text-stone-600 hover:text-emerald-700'}`}
              >
                Archive
              </Link>
              <NavDropdown {...navItems.about} isActive={isActive(navItems.about)} />
              <button
                onClick={() => setShowSearchModal(true)}
                className="text-stone-600 hover:text-emerald-700 transition-colors p-1.5"
                aria-label="Search site"
              >
                <Search className="w-5 h-5" />
              </button>
              <button
                onClick={() => setShowDonateDialog(true)}
                className="bg-emerald-700 text-white px-4 py-2 rounded-full font-semibold text-sm hover:bg-emerald-800 transition-all shadow-sm whitespace-nowrap"
              >
                Donate
              </button>
            </div>

            <div className="xl:hidden">
              <button onClick={() => setIsOpen(!isOpen)} className="text-stone-600">
                {isOpen ? <CloseIcon className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="xl:hidden bg-white border-b border-stone-200 py-4 px-4 space-y-4 shadow-lg max-h-[80vh] overflow-y-auto">
            <MobileDropdown {...navItems.home} onNavigate={() => setIsOpen(false)} isActive={isActive(navItems.home)} />
            <MobileDropdown {...navItems.events} onNavigate={() => setIsOpen(false)} isActive={isActive(navItems.events)} />
            <MobileDropdown {...navItems.getInvolved} onNavigate={() => setIsOpen(false)} isActive={isActive(navItems.getInvolved)} />
            <MobileDropdown {...navItems.findUs} onNavigate={() => setIsOpen(false)} isActive={isActive(navItems.findUs)} />
            <MobileDropdown {...navItems.stories} onNavigate={() => setIsOpen(false)} isActive={isActive(navItems.stories)} />
            <MobileDropdown {...navItems.governance} onNavigate={() => setIsOpen(false)} isActive={isActive(navItems.governance)} />
            <Link
              to="/archive"
              className={`font-medium ${location.pathname === '/archive' ? 'text-emerald-700' : 'text-stone-600'}`}
              onClick={() => setIsOpen(false)}
            >
              Archive
            </Link>
            <MobileDropdown {...navItems.about} onNavigate={() => setIsOpen(false)} isActive={isActive(navItems.about)} />
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
    </>
  );
};

export default Navbar;
