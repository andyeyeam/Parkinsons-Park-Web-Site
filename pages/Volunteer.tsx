import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { VOLUNTEER_ROLES } from '../constants';
import { CheckCircle2, Heart, Users, MapPin, X, AlertCircle } from 'lucide-react';
import { VolunteerFormData, FormStatus } from '../types';
import volunteersImage from '../src/assets/images/PPVolunteers.jpg';

const Volunteer: React.FC = () => {
  const [formData, setFormData] = useState<VolunteerFormData>({
    fullName: '',
    email: '',
    role: 'General Interest',
    message: ''
  });

  const [errors, setErrors] = useState<Partial<Record<keyof VolunteerFormData, string>>>({});
  const [status, setStatus] = useState<FormStatus>({ type: 'idle' });
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear error for this field when user starts typing
    if (errors[name as keyof VolunteerFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof VolunteerFormData, string>> = {};

    // Full Name validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Name is required';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Name must be at least 2 characters';
    } else if (!/^[a-zA-Z\s\-']+$/.test(formData.fullName)) {
      newErrors.fullName = 'Name can only contain letters, spaces, hyphens, and apostrophes';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Role validation
    if (!formData.role) {
      newErrors.role = 'Please select a role';
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    } else if (formData.message.length > 1000) {
      newErrors.message = 'Message must be less than 1000 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (!validateForm()) {
      setStatus({
        type: 'error',
        message: 'Please fill in all required fields correctly.'
      });
      return;
    }

    setStatus({ type: 'loading' });

    try {
      // Prepare template params
      const templateParams = {
        from_name: formData.fullName,
        from_email: formData.email,
        role: formData.role,
        message: formData.message,
        to_email: 'parkinsonspark@gmail.com'
      };

      // Send email via EmailJS
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      setStatus({ type: 'success' });
      setShowSuccessPopup(true);

      // Reset form
      setFormData({
        fullName: '',
        email: '',
        role: 'General Interest',
        message: ''
      });

    } catch (error) {
      console.error('EmailJS Error:', error);
      setStatus({
        type: 'error',
        message: 'Failed to send message. Please try again or contact us directly at parkinsonspark@gmail.com.'
      });
    }
  };

  const closeSuccessPopup = () => {
    setShowSuccessPopup(false);
    setStatus({ type: 'idle' });
  };

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
          <form onSubmit={handleSubmit} className="space-y-6 text-left bg-white p-10 rounded-3xl shadow-xl border border-stone-200">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Full Name Input */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-stone-700">
                  Full Name <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-xl border ${
                    errors.fullName ? 'border-red-300 focus:ring-red-600' : 'border-stone-200 focus:ring-emerald-600'
                  } focus:ring-2 outline-none`}
                  placeholder="John Doe"
                  disabled={status.type === 'loading'}
                />
                {errors.fullName && (
                  <span className="text-xs text-red-600 font-medium flex items-center space-x-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.fullName}</span>
                  </span>
                )}
              </div>

              {/* Email Input */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-stone-700">
                  Email Address <span className="text-red-600">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-xl border ${
                    errors.email ? 'border-red-300 focus:ring-red-600' : 'border-stone-200 focus:ring-emerald-600'
                  } focus:ring-2 outline-none`}
                  placeholder="john@example.com"
                  disabled={status.type === 'loading'}
                />
                {errors.email && (
                  <span className="text-xs text-red-600 font-medium flex items-center space-x-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.email}</span>
                  </span>
                )}
              </div>
            </div>

            {/* Role Select */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-stone-700">
                Which role are you interested in? <span className="text-red-600">*</span>
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 rounded-xl border ${
                  errors.role ? 'border-red-300 focus:ring-red-600' : 'border-stone-200 focus:ring-emerald-600'
                } focus:ring-2 outline-none`}
                disabled={status.type === 'loading'}
              >
                <option value="Bog Garden">Bog Garden</option>
                <option value="Top Copse">Top Copse</option>
                <option value="Community Orchard">Community Orchard</option>
                <option value="General Interest">General Interest</option>
              </select>
              {errors.role && (
                <span className="text-xs text-red-600 font-medium flex items-center space-x-1">
                  <AlertCircle className="w-3 h-3" />
                  <span>{errors.role}</span>
                </span>
              )}
            </div>

            {/* Message Textarea */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-stone-700">
                Tell us a bit about why you'd like to volunteer <span className="text-red-600">*</span>
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={4}
                className={`w-full px-4 py-3 rounded-xl border ${
                  errors.message ? 'border-red-300 focus:ring-red-600' : 'border-stone-200 focus:ring-emerald-600'
                } focus:ring-2 outline-none resize-none`}
                placeholder="I love the outdoors and want to help maintain this beautiful park..."
                disabled={status.type === 'loading'}
              />
              <div className="flex justify-between items-center">
                <div>
                  {errors.message && (
                    <span className="text-xs text-red-600 font-medium flex items-center space-x-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.message}</span>
                    </span>
                  )}
                </div>
                <span className="text-xs text-stone-400">
                  {formData.message.length}/1000
                </span>
              </div>
            </div>

            {/* Error Message Banner */}
            {status.type === 'error' && status.message && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <p className="text-sm font-semibold">{status.message}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={status.type === 'loading'}
              className={`w-full py-4 rounded-xl font-bold text-lg transition-all shadow-lg ${
                status.type === 'loading'
                  ? 'bg-stone-400 cursor-not-allowed'
                  : 'bg-emerald-700 text-white hover:bg-emerald-800 active:scale-98'
              }`}
            >
              {status.type === 'loading' ? (
                <span className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Sending...</span>
                </span>
              ) : (
                'Submit Application'
              )}
            </button>
          </form>
        </div>
      </section>

      {/* Success Popup Modal */}
      {showSuccessPopup && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-200"
          onClick={closeSuccessPopup}
        >
          <div
            className="bg-white rounded-[2.5rem] p-10 max-w-md mx-4 shadow-2xl border border-stone-100 animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-6">
              <div className="flex-1">
                <div className="inline-block bg-emerald-50 px-4 py-2 rounded-full text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
                  Application Submitted
                </div>
                <h3 className="text-2xl font-bold text-stone-900 leading-tight">
                  Thank You!
                </h3>
              </div>
              <button
                onClick={closeSuccessPopup}
                className="p-2 hover:bg-stone-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-stone-400" />
              </button>
            </div>

            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl p-8 text-center mb-6 border border-emerald-200">
              <CheckCircle2 className="w-16 h-16 text-emerald-600 mx-auto mb-4" />
              <div className="text-lg font-bold text-emerald-800">
                Your volunteer application has been sent!
              </div>
            </div>

            <p className="text-stone-600 text-sm text-center mb-6">
              Our volunteer coordinator will review your application and get back to you within 2-3 business days.
            </p>

            <button
              onClick={closeSuccessPopup}
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

export default Volunteer;
