import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import { Heart, ArrowLeft, Send, User, MessageSquare, CheckCircle2, X, AlertCircle } from 'lucide-react';
import { FormStatus } from '../types';

interface StoryFormData {
  name: string;
  isAnonymous: boolean;
  story: string;
}

const YourStories: React.FC = () => {
  const [formData, setFormData] = useState<StoryFormData>({
    name: '',
    isAnonymous: false,
    story: ''
  });

  const [errors, setErrors] = useState<Partial<Record<keyof StoryFormData, string>>>({});
  const [status, setStatus] = useState<FormStatus>({ type: 'idle' });
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const stories = [
    {
      author: 'Jane Blake',
      date: 'January 7, 2012',
      story: 'I have wonderful memories from the 1940s - picking wildflowers like milkmaids, waterblobs, harebells, and bluebells. We had May Queen ceremonies, and I loved sliding on the "fairy grass." My brothers would fly their model airplanes, and we\'d go sledging on the two steep runs, especially "Snow Drop."',
      theme: 'childhood'
    },
    {
      author: 'Graham Hogben',
      date: 'July 21, 2013',
      story: 'Growing up in the 1950s-60s on Nursery Road, I walked daily to Green Bottom School through the park. We had such adventures - daring jumps over barbed wire, racing toy cars on slopes, collecting conkers and marbles. We even named the trees - "The Galleon" and "The Old Oak." The community bonfire in the field above was magical.',
      theme: 'childhood'
    },
    {
      author: 'Another Guiseley Girl',
      date: 'February 20, 2015',
      story: 'From 1965-1983, the park was everything to us. The bluebells in spring, sledging in winter, walking our dogs, building dens. Children\'s Day was the highlight - races, Punch & Judy, trains, fancy dress. We\'d have picnics, fly kites, play tennis. I remember helping care for ponies and collecting wood for "chumping." The Crompton Parkinson siren marked the time.',
      theme: 'childhood'
    },
    {
      author: 'Stewart',
      date: 'October 28, 2011',
      story: 'My childhood was filled with adventures - collecting conkers, flying kites, climbing trees, building dens from fallen logs. There was this boggy area where I lost my shoes more than once!',
      theme: 'childhood'
    },
    {
      author: 'Paul T',
      date: 'October 29, 2011',
      story: 'I remember "chomping" - gathering firewood in October. We\'d store wood near the park wall. Bonfire Night was incredible - the whole community would gather, there were homemade treats, and the fireworks lit up the sky.',
      theme: 'community'
    },
    {
      author: 'David M',
      date: 'October 31, 2011',
      story: 'I worked at Crompton Parkinson for years and spent my lunch breaks in the park. I loved watching the seasonal changes and the views toward the Dales. I even founded the "Parkinsons Mountain Treckers" walking club!',
      theme: 'work'
    },
    {
      author: 'Jack W',
      date: 'November 27, 2011',
      story: 'I\'ve stood on the brow of the hill and watched the sun set for 17 years; it\'s just fantastic.',
      theme: 'nature'
    },
    {
      author: 'John Ridyard',
      date: 'December 2, 2012',
      story: 'I walked and ran to Green Bottom School through the park every day as a child. We had "Old Mans Corner," the "Snow Drop" sledging track, and in summer we\'d sledge on the "fairy grass" using cardboard!',
      theme: 'childhood'
    },
    {
      author: 'Christine',
      date: 'November 20, 2011',
      story: 'A memorable sledging day - my daughter hit a bench and got an eye injury. She still has the scar, and it\'s become part of our family story!',
      theme: 'family'
    },
    {
      author: 'GuiseleyGal',
      date: 'March 30, 2012',
      story: 'The park was our summer hangout. There was this large sycamore tree branch perfect for sitting, and a sandy clearing halfway down the slope where we\'d spend hours talking with friends.',
      theme: 'youth'
    },
    {
      author: 'Guiseley Mum',
      date: 'October 30, 2011',
      story: 'It was a favourite place to take my son on nature walks when he was little, although we didn\'t go in as often when the cows were there. The bluebells in spring, picnics, collecting conkers, autumn nature walks - such precious family memories.',
      theme: 'family'
    },
    {
      author: 'AD',
      date: 'October 27, 2011',
      story: 'My Granddad used to take me for walks up there; he told me there was a well, but I never found it.',
      theme: 'family'
    },
    {
      author: 'Valerie Shutler',
      date: 'April 18, 2018',
      story: 'My brother and I went to Green Bottom school in the 40\'s and we used to walk back to Grandparents house in \'Waverley\' no1 Nethercliffe Crescent. We\'d sledge with tin trays and take walks to the Chevin.',
      theme: 'childhood'
    },
    {
      author: 'Damian Pittam',
      date: 'April 2, 2013',
      story: 'Lived on Netherfield Road from 1981-1997. We called it "Cromptons Field" - we had treehouses, went sledging, played cricket in the car park, and tennis on the old courts with friends.',
      theme: 'youth'
    },
    {
      author: 'Rebecca James',
      date: 'October 8, 2016',
      story: 'Today, my preschool children love exploring this semi-wild park. We enjoy the organized events - the gala, lantern parade, advent tree, bug house. We pick blackberries, collect leaves, acorns, and apples through the seasons. We\'re creating our own family memories here.',
      theme: 'family'
    },
    {
      author: 'Graham Hogben',
      date: 'August 8, 2013',
      story: 'My father worked at Wilsons making Silver Cross prams. I attended the factory galas around 1955-60 - there were egg-and-spoon races, sack races, three-legged races, and even a miniature railway!',
      theme: 'community'
    },
    {
      author: 'Annie L',
      date: 'November 27, 2014',
      story: 'I\'m pleased you mentioned the cows. When I first moved to Guiseley I remember the cows appearing every year.',
      theme: 'nature'
    }
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (errors[name as keyof StoryFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, isAnonymous: e.target.checked }));
    if (e.target.checked) {
      setFormData(prev => ({ ...prev, name: 'Anonymous' }));
    } else {
      setFormData(prev => ({ ...prev, name: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof StoryFormData, string>> = {};

    if (!formData.isAnonymous && !formData.name.trim()) {
      newErrors.name = 'Name is required unless posting anonymously';
    }

    if (!formData.story.trim()) {
      newErrors.story = 'Please share your story';
    } else if (formData.story.trim().length < 10) {
      newErrors.story = 'Story must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setStatus({ type: 'loading' });

    try {
      const templateParams = {
        from_name: formData.isAnonymous ? 'Anonymous' : formData.name,
        story: formData.story,
        submission_type: 'Park Story',
        to_email: 'parkinsonspark@example.com'
      };

      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      setStatus({ type: 'success', message: 'Thank you for sharing your story!' });
      setShowSuccessPopup(true);
      setFormData({ name: '', isAnonymous: false, story: '' });
      setErrors({});

      setTimeout(() => {
        setShowSuccessPopup(false);
        setStatus({ type: 'idle' });
      }, 5000);
    } catch (error) {
      console.error('Error sending story:', error);
      setStatus({
        type: 'error',
        message: 'Failed to submit your story. Please try again or contact us directly.'
      });
    }
  };

  const scrollToForm = () => {
    document.getElementById('story-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-stone-50 pb-24">
      {/* Header Section */}
      <section className="bg-emerald-900 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/" className="inline-flex items-center gap-2 text-emerald-200 hover:text-white mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <div className="inline-flex items-center justify-center p-3 bg-emerald-800/50 rounded-2xl mb-6 backdrop-blur-sm border border-emerald-700">
            <Heart className="w-8 h-8 text-emerald-400" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Your Stories</h1>
          <p className="text-xl text-emerald-100 max-w-3xl font-light leading-relaxed mb-6">
            A collection of personal memories and experiences that bring the park's social history to life. From childhood adventures in the 1940s to family walks today, these stories capture the deep connection our community has with this special place.
          </p>
          <button
            onClick={scrollToForm}
            className="inline-flex items-center gap-2 bg-white text-emerald-900 px-6 py-3 rounded-full font-bold hover:bg-emerald-50 transition-all"
          >
            <MessageSquare className="w-5 h-5" />
            Do you have a story you would like to share?
          </button>
        </div>
      </section>

      {/* Stories Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <div className="inline-block bg-emerald-50 px-4 py-2 rounded-full text-emerald-800 text-sm font-bold uppercase tracking-wider mb-4">
            Community Memories
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4">Stories from Our Community</h2>
          <p className="text-stone-600 max-w-2xl mx-auto">
            Spanning eight decades, these cherished memories reveal how Parkinson's Park has been woven into the fabric of Guiseley life.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map((story, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-emerald-50 p-2 rounded-full">
                  <User className="w-4 h-4 text-emerald-700" />
                </div>
                <div>
                  <div className="font-bold text-stone-900">{story.author}</div>
                  <div className="text-xs text-stone-500">{story.date}</div>
                </div>
              </div>
              <p className="text-sm text-stone-600 leading-relaxed italic">"{story.story}"</p>
              <div className="mt-4">
                <span className="text-xs px-3 py-1 bg-stone-100 text-stone-600 rounded-full font-semibold">
                  {story.theme}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Story Submission Form */}
      <section id="story-form" className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-white rounded-[3rem] p-12 border border-stone-200 shadow-lg">
          <div className="text-center mb-8">
            <Heart className="w-12 h-12 text-emerald-700 mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4">Share Your Story</h2>
            <p className="text-stone-600">
              Help us preserve the social history of Parkinson's Park by sharing your memories and experiences.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-stone-700 mb-2">
                <User className="w-4 h-4" />
                Your Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                disabled={formData.isAnonymous}
                className={`w-full px-4 py-3 rounded-xl border ${
                  errors.name ? 'border-red-500' : 'border-stone-200'
                } focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all ${
                  formData.isAnonymous ? 'bg-stone-100' : ''
                }`}
                placeholder="Enter your name"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}

              <label className="flex items-center gap-2 mt-3 text-sm text-stone-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isAnonymous}
                  onChange={handleCheckboxChange}
                  className="w-4 h-4 text-emerald-600 border-stone-300 rounded focus:ring-emerald-500"
                />
                Post anonymously
              </label>
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-stone-700 mb-2">
                <MessageSquare className="w-4 h-4" />
                Your Story
              </label>
              <textarea
                name="story"
                value={formData.story}
                onChange={handleInputChange}
                rows={6}
                className={`w-full px-4 py-3 rounded-xl border ${
                  errors.story ? 'border-red-500' : 'border-stone-200'
                } focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all resize-none`}
                placeholder="Share your memories of Parkinson's Park..."
              />
              {errors.story && <p className="text-red-500 text-sm mt-1">{errors.story}</p>}
            </div>

            <button
              type="submit"
              disabled={status.type === 'loading'}
              className="w-full bg-emerald-700 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-emerald-800 transition-all disabled:bg-stone-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {status.type === 'loading' ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Submit Your Story
                </>
              )}
            </button>

            {status.type === 'error' && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <p className="text-red-800 text-sm">{status.message}</p>
              </div>
            )}
          </form>
        </div>
      </section>

      {/* Success Popup */}
      {showSuccessPopup && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl animate-in fade-in zoom-in duration-300">
            <div className="text-center">
              <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-emerald-700" />
              </div>
              <h3 className="text-2xl font-bold text-stone-900 mb-2">Thank You!</h3>
              <p className="text-stone-600 mb-6">
                Your story has been submitted and will help preserve the social history of Parkinson's Park.
              </p>
              <button
                onClick={() => setShowSuccessPopup(false)}
                className="bg-emerald-700 text-white px-6 py-3 rounded-full font-bold hover:bg-emerald-800 transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default YourStories;
