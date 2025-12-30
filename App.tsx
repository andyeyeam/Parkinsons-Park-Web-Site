
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Events from './pages/Events';
import Volunteer from './pages/Volunteer';
import Ecology from './pages/Ecology';
import Geology from './pages/Geology';
import HistoryPage from './pages/History';
import {
  MapPin, Mail, Phone, Facebook, Instagram, Twitter,
  History, Shield, Users, TreePine, FileText, Gavel,
  Search, Heart, ExternalLink
} from 'lucide-react';

const Footer: React.FC = () => (
  <footer className="bg-stone-900 text-stone-400 py-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        <div className="col-span-1 md:col-span-1">
          <div className="text-white font-bold text-2xl mb-6">Parkinson's Park <span className="text-emerald-500 font-normal">Guiseley</span></div>
          <p className="text-sm leading-relaxed mb-6">
            A community space managed by the Friends of Parkinson's Park. Preserving Guiseley's heritage for all.
          </p>
          <div className="flex space-x-4">
            <a href="https://www.facebook.com/groups/parkinsonspark/" target="_blank" rel="noopener noreferrer">
              <Facebook className="w-5 h-5 hover:text-white cursor-pointer" />
            </a>
            <Instagram className="w-5 h-5 hover:text-white cursor-pointer" />
            <Twitter className="w-5 h-5 hover:text-white cursor-pointer" />
          </div>
        </div>
        <div>
          <h4 className="text-white font-bold mb-6">Quick Links</h4>
          <ul className="space-y-4 text-sm">
            <li><a href="#/history" className="hover:text-white">Our History</a></li>
            <li><a href="#" className="hover:text-white">Management Plan</a></li>
            <li><a href="#" className="hover:text-white">Park Map</a></li>
            <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-6">Get Involved</h4>
          <ul className="space-y-4 text-sm">
            <li><a href="#/volunteer" className="hover:text-white">Volunteer</a></li>
            <li><a href="#" className="hover:text-white">Community Action</a></li>
            <li><a href="#" className="hover:text-white">Join the Friends</a></li>
            <li><a href="#" className="hover:text-white">Donate</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-6">Contact Us</h4>
          <ul className="space-y-4 text-sm">
            <li className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-emerald-500 shrink-0" />
              <span>Kelcliffe Lane, Guiseley, West Yorkshire, LS20</span>
            </li>
            <li className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-emerald-500 shrink-0" />
              <span>Community Enquiries</span>
            </li>
            <li className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-emerald-500 shrink-0" />
              <span>parkinsonspark@gmail.com</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-stone-800 pt-8 text-xs flex flex-col md:flex-row justify-between items-center text-stone-500">
        <p>© 2024 Parkinson's Park Guiseley. Community Managed.</p>
        <p className="mt-4 md:mt-0">Designed for the People of Guiseley.</p>
      </div>
    </div>
  </footer>
);

const AboutPage = () => (
  <div className="bg-stone-50 pb-24">
    {/* Header Section */}
    <section className="bg-emerald-900 text-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center justify-center p-3 bg-emerald-800/50 rounded-2xl mb-6 backdrop-blur-sm border border-emerald-700">
          <Shield className="w-8 h-8 text-emerald-400" />
        </div>
        <h1 className="text-5xl md:text-6xl font-bold mb-6">About Us</h1>
        <p className="text-xl text-emerald-100 max-w-3xl mx-auto font-light leading-relaxed">
          Friends of Parkinson’s Park is a Community Interest Company (CIC), incorporated under the Companies Act 2006 (Registration Number 10044868) and regulated by the Community Interest Company Regulator.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 text-emerald-200">
          <div className="flex items-center gap-2">
            <Mail className="w-5 h-5" />
            <a href="mailto:ParkinsonsPark@gmail.com" className="hover:text-white transition-colors">ParkinsonsPark@gmail.com</a>
          </div>
          <div className="hidden sm:block">|</div>
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            <span>Run by a board of five registered Directors</span>
          </div>
        </div>
      </div>
    </section>

    {/* Purpose Section */}
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <div className="space-y-6">
          <div className="inline-block bg-emerald-50 px-4 py-2 rounded-full text-emerald-800 text-sm font-bold uppercase tracking-wider">
            Our Mission
          </div>
          <h2 className="text-4xl font-bold text-stone-900">Purpose & Heritage</h2>
          <p className="text-lg text-stone-600 leading-relaxed">
            The central purpose of the Friends of Parkinson’s Park is to ensure a well-maintained public landscape park that honours its social, cultural and environmental heritage.
          </p>
          <p className="text-lg text-stone-600 leading-relaxed">
            Frank and Albert Parkinson (F & A Parkinson Ltd) bought this piece of historic landscape in 1936-37 and established a Park both for the employees of Crompton Parkinson and the people of Guiseley. They saw themselves as “trustees of their possessions”, and determined to use them for the public good. This is the inheritance FOPP will continue.
          </p>
          <p className="text-stone-600 italic border-l-4 border-emerald-600 pl-6 py-2 bg-white rounded-r-xl shadow-sm">
            Friends of Parkinson’s Park was formed in October 2011 by a group of local residents to save the Park from degeneration and vandalism. On 4th March 2016, they registered the group as a Community Interest Company.
          </p>
        </div>
        <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-stone-200">
          <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
            <Heart className="w-6 h-6 text-emerald-600" />
            Key Aims
          </h3>
          <p className="text-stone-600 mb-8">
            The key aims of FOPP are to continue the work of Frank and Albert Parkinson to enhance the quality of life for the residents of Aireborough by:
          </p>
          <div className="space-y-6">
            {[
              { title: "Health", desc: "Providing a facility to improve physical and mental health." },
              { title: "Education", desc: "Informing about the Park’s history and ecology." },
              { title: "Growth", desc: "Helping to inspire personal growth." },
              { title: "Community", desc: "Acting as a means for bringing people together." }
            ].map((aim, i) => (
              <div key={i} className="flex gap-4">
                <div className="shrink-0 w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-sm">
                  {i + 1}
                </div>
                <div>
                  <h4 className="font-bold text-stone-900">{aim.title}</h4>
                  <p className="text-stone-500 text-sm">{aim.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 p-6 bg-stone-50 rounded-2xl border border-stone-100 text-sm text-stone-600">
            This is done by conserving the Park’s natural landscapes. Developing facilities in conjunction with Meadfleet. Running an annual event programme.
          </div>
        </div>
      </div>
    </section>

    {/* Governance & Bylaws Section */}
    <section className="bg-stone-100 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Governance */}
          <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-stone-200">
            <h3 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Gavel className="w-8 h-8 text-emerald-700" />
              Governance
            </h3>
            <div className="space-y-4 text-stone-600 leading-relaxed">
              <p>
                The Park is owned by <strong>Bellway Homes</strong>; basic maintenance is done by <strong>Meadfleet</strong> to an annual maintenance plan determined by a management plan agreed with FOPP.
              </p>
              <p>
                Funding for basic maintenance comes out of an annual charge made by Meadfleet to the residents of Edison Fields; other money for Park improvements and events is raised by FOPP.
              </p>
              <div className="flex flex-wrap gap-3 mt-6">
                <a href="#" className="flex items-center gap-2 text-emerald-700 font-bold hover:underline">
                  <FileText className="w-4 h-4" /> CIC Constitution
                </a>
                <a href="#" className="flex items-center gap-2 text-emerald-700 font-bold hover:underline">
                  <FileText className="w-4 h-4" /> Privacy Policy
                </a>
              </div>
            </div>
          </div>

          {/* Bylaws */}
          <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-stone-200">
            <h3 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Search className="w-8 h-8 text-emerald-700" />
              Park Bylaws
            </h3>
            <div className="space-y-4 text-stone-600 leading-relaxed">
              <p>
                FOPP are members of the Leeds Parks Forum. The Park has adopted Leeds Parks Bylaws which include:
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex gap-2"><span>•</span> No horses, cycling, or camping without consent.</li>
                <li className="flex gap-2"><span>•</span> No fires, fireworks or barbeques without consent.</li>
                <li className="flex gap-2"><span>•</span> No missiles likely to cause injury to others.</li>
                <li className="flex gap-2"><span>•</span> No excessive noise unless part of approved entertainment.</li>
                <li className="flex gap-2"><span>•</span> Dog owners must remove all fouling to bins located around the Park edge.</li>
                <li className="flex gap-2"><span>•</span> No events without consent.</li>
              </ul>
              <p className="mt-4 text-xs font-semibold text-stone-400 uppercase tracking-widest">
                Parkwatch scheme supported by West Yorkshire Police.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Key People Section */}
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-stone-900 mb-4">Key People & Contacts</h2>
        <p className="text-stone-500">The dedicated individuals making Parkinson's Park possible.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Land Managers */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-8 rounded-3xl border border-stone-200 shadow-sm">
            <h4 className="font-bold text-lg mb-4 text-emerald-800">Meadfleet Land Managers</h4>
            <p className="text-sm text-stone-600 mb-4">Enquiries should be directed to Meadfleet Customer Services.</p>
            <a href="mailto:customercare@meadfleet.co.uk" className="text-emerald-700 text-sm font-bold flex items-center gap-2 hover:underline">
              <Mail className="w-4 h-4" /> customercare@meadfleet.co.uk
            </a>
          </div>
          
          <div className="bg-emerald-900 text-white p-8 rounded-3xl shadow-xl">
            <h4 className="font-bold text-lg mb-4">Join Us</h4>
            <p className="text-sm text-emerald-100 mb-6">If you would like to become a member of FOPP, please complete a membership form.</p>
            <button className="w-full bg-emerald-600 hover:bg-emerald-500 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2">
              Apply for Membership <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Directors Grid */}
        <div className="lg:col-span-2">
          <div className="bg-white p-10 rounded-[2.5rem] border border-stone-200 shadow-sm">
            <h4 className="font-bold text-xl mb-8 border-b border-stone-100 pb-4">Directors & Officers</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8">
              <div>
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest">Chair of Directors</span>
                <p className="font-bold text-stone-900">Mrs Chris Parapia</p>
                <p className="text-sm text-stone-500">01943 877282</p>
              </div>
              <div>
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest">Technical & Facilities</span>
                <p className="font-bold text-stone-900">Mr Andy Cheetham</p>
                <p className="text-sm text-stone-500">01943 879310</p>
              </div>
              <div>
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest">Ecology</span>
                <p className="font-bold text-stone-900">Mrs Joanna Brooks</p>
              </div>
              <div>
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest">Fund Raising</span>
                <p className="font-bold text-stone-900">Mrs Nicola Denson</p>
              </div>
              <div>
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest">Treasurer & Finance</span>
                <p className="font-bold text-stone-900">Mr Ryan Sample</p>
              </div>
              <div>
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest">Operations</span>
                <p className="font-bold text-stone-900">Mrs Susan Wright</p>
              </div>
            </div>
            <div className="mt-12 pt-8 border-t border-stone-100">
              <h5 className="text-sm font-bold text-stone-400 mb-4 uppercase tracking-widest">Past Directors & Retirees</h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-stone-500">
                <p>Mr Martyn Hornsby Smith (Resigned Oct 2022)</p>
                <p>Mrs Jennifer Kirkby (Retired Apr 2024)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Reports Section */}
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Reports */}
        <div className="space-y-6">
          <h3 className="text-2xl font-bold flex items-center gap-3">
            <FileText className="w-6 h-6 text-emerald-600" />
            CIC Reports (34 Report)
          </h3>
          <p className="text-sm text-stone-600">
            CICs are required to complete an annual return to Companies House detailing how the purpose has been achieved.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {["2016/17", "2017/18", "2018/19", "2019/20", "2020/21", "2021/22", "2022/23"].map((year) => (
              <a key={year} href="#" className="p-3 bg-white border border-stone-200 rounded-xl text-xs font-bold text-stone-700 hover:border-emerald-600 hover:text-emerald-700 transition-all text-center">
                Report {year}
              </a>
            ))}
          </div>
          <p className="text-xs text-stone-400 italic">2023/24 Report: Not yet available</p>
        </div>

        {/* Minutes */}
        <div className="space-y-6">
          <h3 className="text-2xl font-bold flex items-center gap-3">
            <History className="w-6 h-6 text-emerald-600" />
            Archive: AGM/EGM Minutes
          </h3>
          <div className="space-y-3">
            {[
              { date: "May 2012", type: "AGM" },
              { date: "April 2013", type: "AGM" },
              { date: "April 2014", type: "AGM" },
              { date: "November 2015", type: "EGM" }
            ].map((min, i) => (
              <a key={i} href="#" className="flex items-center justify-between p-4 bg-white border border-stone-200 rounded-2xl hover:bg-stone-50 transition-all group">
                <span className="font-bold text-stone-800">{min.type} Minutes - {min.date}</span>
                <ExternalLink className="w-4 h-4 text-stone-300 group-hover:text-emerald-600" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  </div>
);

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<Events />} />
            <Route path="/volunteer" element={<Volunteer />} />
            <Route path="/ecology" element={<Ecology />} />
            <Route path="/geology" element={<Geology />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
