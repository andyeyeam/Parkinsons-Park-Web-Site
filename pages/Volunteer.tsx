import React from 'react';
import { VOLUNTEER_ROLES } from '../constants';
import { CheckCircle2, Heart, Users, MapPin } from 'lucide-react';
import volunteersImage from '../src/assets/images/PPVolunteers.jpg';

const Volunteer: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24">
      <section className="flex flex-col lg:flex-row gap-16 items-center">
        <div className="lg:w-1/2">
          <h1 className="text-4xl md:text-5xl font-bold text-stone-900 mb-6">Support the Park</h1>
          <p className="text-xl text-stone-600 mb-8 leading-relaxed">
            The park is always looking for extra hands to help out with jobs that need doing. From spreading wood chipping to make the paths to planting bulbs or picking litter there are always things to do.
          </p>
          <p className="text-xl text-stone-600 mb-8 leading-relaxed">
            We're also seeking volunteers to help marshal and drum at the Lantern Parade, and assist with setup, teardown, and staffing at the Children's Gala. These opportunities are especially beneficial for students studying nature and ecology.
          </p>
          <div className="space-y-4">
            {['No prior expertise necessary', 'Supervision provided', 'Connect with like-minded individuals', 'Flexible commitment'].map((item, i) => (
              <div key={i} className="flex items-center space-x-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span className="text-stone-700 font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="lg:w-1/2">
          <img src={volunteersImage} alt="Parkinson's Park Volunteers" className="rounded-3xl shadow-xl" />
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-stone-900 mb-12 text-center">Available Roles</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {VOLUNTEER_ROLES.map((role, i) => (
            <div key={i} className="bg-white border border-stone-200 p-8 rounded-3xl shadow-sm hover:shadow-lg transition-all">
              <h3 className="text-2xl font-bold text-stone-900 mb-4">{role.title}</h3>
              <p className="text-stone-600 mb-6 leading-relaxed">{role.description}</p>
              <div className="flex items-center space-x-2 text-sm font-semibold text-emerald-700 bg-emerald-50 px-4 py-2 rounded-full w-fit">
                <Users className="w-4 h-4" />
                <span>{role.commitment}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-stone-50 rounded-[3rem] p-12">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-stone-900 mb-6">Ready to join us?</h2>
          <p className="text-stone-600 mb-10 text-lg">Community participation sustains the park. If you're interested and able, we'd love to hear from you! Fill out our quick interest form and our volunteer coordinator will get back to you.</p>
          <form className="space-y-6 text-left bg-white p-10 rounded-3xl shadow-xl border border-stone-200" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-stone-700">Full Name</label>
                <input type="text" className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-emerald-600 outline-none" placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-stone-700">Email Address</label>
                <input type="email" className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-emerald-600 outline-none" placeholder="john@example.com" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-stone-700">Which role are you interested in?</label>
              <select className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-emerald-600 outline-none">
                <option>Bog Garden</option>
                <option>Top Copse</option>
                <option>Community Orchard</option>
                <option>General Interest</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-stone-700">Tell us a bit about why you'd like to volunteer</label>
              <textarea rows={4} className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-emerald-600 outline-none" placeholder="I love the outdoors..."></textarea>
            </div>
            <button className="w-full bg-emerald-700 text-white py-4 rounded-xl font-bold text-lg hover:bg-emerald-800 transition-all shadow-lg">
              Submit Application
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Volunteer;