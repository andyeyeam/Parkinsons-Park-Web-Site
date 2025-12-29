import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Users, Factory, Heart, Sparkles, ArrowLeft, Award } from 'lucide-react';

const History: React.FC = () => {
  const timeline = [
    {
      era: "AD 866-950",
      title: "Viking Settlement",
      description: "Kelcliffe name derives from Old Norse meaning 'steep area where springs are,' suggesting settlement during the Viking era when Guiseley was part of Jorvik."
    },
    {
      era: "Pre-1066",
      title: "Anglo-Saxon Times",
      description: "Geophysics surveys revealed early medieval lynchets and headlands in Crooked Lands, extending the park's documented history into Anglo-Saxon times."
    },
    {
      era: "1639",
      title: "Common Field Division",
      description: "Parish records document the Common Close's division among thirteen families, replacing medieval common field systems."
    },
    {
      era: "1719",
      title: "Manor Sale to Tenants",
      description: "Manor of Guiseley and Esholt sold to tenants, enabling social mobility for farming families."
    },
    {
      era: "1838",
      title: "Leeds Tithe Map",
      description: "Fields identified as meadow and pasture owned by Marshall Grimshaw, Benjamin Popplewell, Betty Pawson, and Frances Foss."
    },
    {
      era: "circa 1900",
      title: "Jonathan Peate Era",
      description: "Local woollen cloth manufacturer and philanthropist purchased the land, planted oak trees around 1909, and supported the community."
    },
    {
      era: "1913",
      title: "F & A Parkinson Founded",
      description: "Frank and Albert Parkinson began manufacturing electrical motors, starting from a shed with £21 in savings."
    },
    {
      era: "1936-37",
      title: "Park Creation",
      description: "The Parkinsons acquired fields and developed the park with footpaths, benches, copses, bowling greens, tennis courts, and pavilion."
    },
    {
      era: "1946",
      title: "Frank's Legacy",
      description: "Frank Parkinson died, leaving £1.5 million including funds for Leeds University's Parkinson Building and community support."
    },
    {
      era: "1971",
      title: "Albert's Death",
      description: "After Albert Parkinson's death, the company lost its family character through buyouts and takeovers."
    },
    {
      era: "2002-2006",
      title: "Period of Decline",
      description: "Multiple ownership changes led to neglect, illegal activity, and deterioration of the park's facilities."
    },
    {
      era: "2011",
      title: "FOPP Established",
      description: "Friends of Parkinson's Park formed on September 13 to restore and preserve the neglected site."
    },
    {
      era: "2016",
      title: "Community Interest Company",
      description: "FOPP registered as a CIC to improve fundraising capacity and community stewardship."
    },
    {
      era: "2022",
      title: "Local Favourite Status",
      description: "Parkinson's Park achieved 'Local Favourite' status in Yorkshire through Fields In Trust's national vote."
    }
  ];

  const keyPeople = [
    {
      name: "Jonathan Peate",
      era: "circa 1900",
      role: "Philanthropist & Woollen Manufacturer",
      contribution: "Purchased surrounding land, planted oak trees during George V's coronation, and donated land for public buildings including Yeadon Town Hall and Nunroyd Park."
    },
    {
      name: "Frank Parkinson",
      era: "1913-1946",
      role: "Co-founder & Industrialist",
      contribution: "Started electrical motor business with £21, merged with Crompton's, created the park, and left £1.5 million legacy including the Parkinson Building at Leeds University."
    },
    {
      name: "Albert Parkinson",
      era: "1913-1971",
      role: "Co-founder & Industrialist",
      contribution: "Joined brother Frank in 1913, helped grow Crompton Parkinson Ltd, and maintained the company's family-oriented character and practical idealism philosophy."
    }
  ];

  const foAchievements = [
    {
      icon: <Sparkles className="w-5 h-5 text-emerald-600" />,
      title: "Restored Stonework",
      description: "Crumbling dry stone walls rebuilt by skilled wallers"
    },
    {
      icon: <Users className="w-5 h-5 text-emerald-600" />,
      title: "Community Orchard",
      description: "Established in 2015 using horticultural grants"
    },
    {
      icon: <Heart className="w-5 h-5 text-emerald-600" />,
      title: "Wildflower Meadows",
      description: "Created habitats and planted Jubilee Walk shrubs"
    },
    {
      icon: <Award className="w-5 h-5 text-emerald-600" />,
      title: "Heritage Research",
      description: "2012 Heritage Lottery Fund grant for historical studies"
    }
  ];

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
            <BookOpen className="w-8 h-8 text-emerald-400" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">All Our Stories</h1>
          <p className="text-xl text-emerald-100 max-w-3xl font-light leading-relaxed">
            From Viking settlements to Victorian industrialists, from decline to community-led renaissance — discover over 1,000 years of Parkinson's Park history.
          </p>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <div className="inline-block bg-emerald-50 px-4 py-2 rounded-full text-emerald-800 text-sm font-bold uppercase tracking-wider mb-4">
            1,000 Years of Heritage
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4">Historical Timeline</h2>
          <p className="text-stone-600 max-w-2xl mx-auto">
            In 2012, Heritage Lottery Fund supported FOPP's research into the park's background as part of the Diamond Jubilee "All Our Stories" project.
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-emerald-200"></div>
          <div className="space-y-8">
            {timeline.map((event, i) => (
              <div key={i} className="relative pl-20">
                <div className="absolute left-4 top-2 w-8 h-8 rounded-full bg-emerald-600 border-4 border-white shadow-lg flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-white"></div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm hover:shadow-md transition-all">
                  <div className="text-xs font-bold text-emerald-700 uppercase tracking-wider mb-1">{event.era}</div>
                  <h3 className="text-lg font-bold text-stone-900 mb-2">{event.title}</h3>
                  <p className="text-stone-600 text-sm leading-relaxed">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Early History Section */}
      <section className="bg-stone-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-stone-900">Early History & People</h2>
              <p className="text-lg text-stone-600 leading-relaxed">
                The 1838 Leeds tithe map identified the park's fields as meadow and pasture, revealing a rural agricultural community where Guiseley residents practiced weaving and farming. Field names opened windows into the past, revealing settlement patterns dating back to Viking times.
              </p>
              <p className="text-lg text-stone-600 leading-relaxed">
                The area's name, <strong>Kelcliffe</strong>, derives from Old Norse meaning "steep area where there are springs," suggesting Viking-era settlement (AD 866-950). Archaeological surveys revealed medieval farming features pre-dating 1066, extending documented history into Anglo-Saxon times.
              </p>
              <div className="bg-white p-6 rounded-2xl border border-stone-200">
                <h3 className="text-xl font-bold mb-4 text-stone-900">18th-19th Century Landowners</h3>
                <ul className="space-y-3 text-sm text-stone-600">
                  <li className="flex gap-2"><span className="text-emerald-600">•</span> <strong>John Blessard</strong> - Quaker farmer adopting new agricultural technologies</li>
                  <li className="flex gap-2"><span className="text-emerald-600">•</span> <strong>Stephen & Martha Overend</strong> - Experimented with iron-plate ploughs and potato cultivation</li>
                  <li className="flex gap-2"><span className="text-emerald-600">•</span> <strong>Marshall Grimshaw</strong> - Kelcliffe House owner, replaced tannery with dairy farming (1837)</li>
                  <li className="flex gap-2"><span className="text-emerald-600">•</span> <strong>James Leadbetter</strong> - Churchwarden who occupied Little Kelcliffe meadow</li>
                </ul>
              </div>
            </div>
            <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-stone-200">
              <h3 className="text-2xl font-bold mb-8 text-stone-900">Research Methods</h3>
              <p className="text-stone-600 mb-6 leading-relaxed">
                Local historians <strong>Jennifer Kirkby</strong> and <strong>Barbara Winfield</strong>, both founding FOPP members, conducted extensive research using:
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <BookOpen className="w-5 h-5 text-emerald-600 shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold text-stone-900">Parish Records</div>
                    <div className="text-sm text-stone-500">1639 Common Close division documents</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <BookOpen className="w-5 h-5 text-emerald-600 shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold text-stone-900">Tithe Maps</div>
                    <div className="text-sm text-stone-500">1838 Leeds field surveys and ownership records</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <BookOpen className="w-5 h-5 text-emerald-600 shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold text-stone-900">Geophysical Surveys</div>
                    <div className="text-sm text-stone-500">Archaeological evidence of medieval farming</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key People Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4">Visionary Philanthropists</h2>
          <p className="text-lg text-stone-600 max-w-3xl">
            Three extraordinary individuals shaped Parkinson's Park into a community treasure through their vision, generosity, and practical idealism.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {keyPeople.map((person, i) => (
            <div key={i} className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden hover:shadow-xl transition-all">
              <div className="bg-gradient-to-br from-emerald-900 to-emerald-800 text-white p-8">
                <div className="text-3xl font-bold mb-2">{person.name}</div>
                <div className="text-emerald-200 text-sm font-semibold mb-1">{person.era}</div>
                <div className="text-emerald-100 text-xs uppercase tracking-wider">{person.role}</div>
              </div>
              <div className="p-6">
                <p className="text-sm text-stone-600 leading-relaxed">{person.contribution}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* F & A Parkinson Section */}
      <section className="bg-emerald-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <Factory className="w-10 h-10 text-emerald-400" />
                <h2 className="text-4xl font-bold">F & A Parkinson Era</h2>
              </div>
              <p className="text-emerald-100 text-lg leading-relaxed">
                Frank Parkinson started an electrical motor agency from a shed at Eldon Mount with just £21 from his post office savings. His brother Albert joined in 1913, and during WWI they relocated to Jonathan Peate's land at Greenshaw Close.
              </p>
              <p className="text-emerald-100 text-lg leading-relaxed">
                In 1918, they purchased the Netherfield land and thrived through the Great Depression by embracing <strong>"practical idealism"</strong> — paying workers well while maintaining quality production at low costs, principles aligned with Gandhi's philosophy. In 1927, they merged with Crompton's, becoming Crompton Parkinson Ltd.
              </p>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <h3 className="text-xl font-bold mb-4">Frank's £1.5 Million Legacy (1946)</h3>
                <ul className="space-y-2 text-emerald-100">
                  <li className="flex gap-2"><span className="text-emerald-400">•</span> Parkinson Building at Leeds University (£200,000)</li>
                  <li className="flex gap-2"><span className="text-emerald-400">•</span> Bursaries for Yorkshire engineering students</li>
                  <li className="flex gap-2"><span className="text-emerald-400">•</span> Frank Parkinson Agricultural Trust</li>
                  <li className="flex gap-2"><span className="text-emerald-400">•</span> Yorkshire Trust for Guiseley's poor, sick, and elderly</li>
                  <li className="flex gap-2"><span className="text-emerald-400">•</span> £1,000 annually for staff welfare and events</li>
                </ul>
              </div>
            </div>
            <div className="space-y-6">
              <div className="bg-white text-stone-900 p-8 rounded-3xl shadow-2xl">
                <h3 className="text-2xl font-bold mb-6">Park Development (1936-1950s)</h3>
                <div className="space-y-4">
                  <div>
                    <div className="font-bold text-emerald-700 mb-1">1936-37</div>
                    <div className="text-sm text-stone-600">Acquired remaining fields, laid footpaths, installed gates and benches</div>
                  </div>
                  <div>
                    <div className="font-bold text-emerald-700 mb-1">Early 1950s</div>
                    <div className="text-sm text-stone-600">Planted two copses shaped like Yeadon and Guiseley</div>
                  </div>
                  <div>
                    <div className="font-bold text-emerald-700 mb-1">Facilities Added</div>
                    <div className="text-sm text-stone-600">Bowling and putting greens, rose garden, tennis courts, and pavilion</div>
                  </div>
                  <div className="mt-6 p-4 bg-emerald-50 rounded-xl">
                    <p className="text-xs text-stone-600 italic">
                      The park may have compensated for the loss of Guiseley Recreation Ground to council housing in the early 1920s.
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <h3 className="text-lg font-bold mb-3">Annual Community Events</h3>
                <p className="text-emerald-100 text-sm">
                  Frank's will funded annual Children's Gala, Flower and Produce Show, and October bonfire celebration starting in 1949.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Times & Decline Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-stone-100 rounded-[3rem] p-12">
          <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-6">Recent Times: Decline & Neglect</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <p className="text-lg text-stone-600 leading-relaxed">
                The park became cherished by locals for sledging on named runs like the "Snowdrop" (steep Great Brow) and "Bluebell Run" (gentle Crooked Lands slopes). An "old man's corner" near Kelcliffe Lane served as a gathering spot for elderly residents sharing country knowledge.
              </p>
              <div className="bg-red-50 border-l-4 border-red-600 p-6 rounded-r-xl">
                <h3 className="text-xl font-bold text-red-900 mb-3">Corporate Ownership Era</h3>
                <div className="space-y-3 text-sm text-red-800">
                  <div><strong>1968:</strong> Hawker Siddeley Aerospace acquired Cromptons</div>
                  <div><strong>1971:</strong> Albert Parkinson's death — company lost family character</div>
                  <div><strong>1999:</strong> Cooper Industries sale — asset stripping and closures</div>
                  <div><strong>2002:</strong> St Modwen Properties PLC acquired land</div>
                  <div><strong>2006:</strong> Bellway dismantled factory, removed facilities, blocked ancient trackways</div>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="bg-white p-8 rounded-2xl border border-stone-200 shadow-sm">
                <h3 className="text-xl font-bold text-stone-900 mb-4">Signs of Deterioration</h3>
                <ul className="space-y-3 text-stone-600">
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">✗</span>
                    <span>Copses filled with refuse and illegal activity</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">✗</span>
                    <span>Gates deteriorated or disappeared completely</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">✗</span>
                    <span>Wooden structures decayed beyond repair</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">✗</span>
                    <span>Stone walls crumbled from neglect</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">✗</span>
                    <span>Dense vegetation obscured historic oak trees</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">✗</span>
                    <span>Bowling greens and putting greens removed</span>
                  </li>
                </ul>
              </div>
              <p className="text-stone-600 text-sm italic">
                Neither Cooper Industries nor St Modwen possessed local knowledge, allowing the landscape to deteriorate significantly through unmanaged rewilding and vandalism.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOPP Renaissance Section */}
      <section className="bg-emerald-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Heart className="w-12 h-12 text-emerald-400 mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Community-Led Renaissance</h2>
            <p className="text-xl text-emerald-100 max-w-3xl mx-auto leading-relaxed">
              On September 13, 2011, concerned residents formed Friends of Parkinson's Park to restore the neglected site and honor Frank and Albert Parkinson's philanthropic legacy.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
            <div className="space-y-6">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold mb-6">Founding Members</h3>
                <div className="grid grid-cols-2 gap-4 text-emerald-100">
                  <div className="text-sm">Chris Parapia (Chair)</div>
                  <div className="text-sm">Barbara Winfield</div>
                  <div className="text-sm">Jennifer Kirkby</div>
                  <div className="text-sm">Andy Cheetham</div>
                  <div className="text-sm">Joanna Brooks</div>
                  <div className="text-sm">Colin Alexander</div>
                </div>
              </div>
              <p className="text-emerald-100 leading-relaxed">
                In November 2011, FOPP partnered with developer Bellway to begin regenerating the site. The organization successfully restored a forgotten industrial landscape into a thriving community asset.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {foAchievements.map((achievement, i) => (
                <div key={i} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                  <div className="bg-emerald-600 w-10 h-10 rounded-xl flex items-center justify-center mb-4">
                    {achievement.icon}
                  </div>
                  <h4 className="font-bold mb-2">{achievement.title}</h4>
                  <p className="text-sm text-emerald-100">{achievement.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white text-stone-900 rounded-[3rem] p-12">
            <h3 className="text-2xl font-bold mb-8 text-center">Milestones & Recognition</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-emerald-700 mb-2">2012</div>
                <div className="font-semibold mb-2">Heritage Lottery Fund</div>
                <div className="text-sm text-stone-600">All Our Stories grant for historical research and geophysical surveys</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-emerald-700 mb-2">2016</div>
                <div className="font-semibold mb-2">CIC Registration</div>
                <div className="text-sm text-stone-600">Became Community Interest Company for improved fundraising and stewardship</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-emerald-700 mb-2">2022</div>
                <div className="font-semibold mb-2">Local Favourite</div>
                <div className="text-sm text-stone-600">Yorkshire recognition through Fields In Trust national vote</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Programs Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-white rounded-[3rem] p-12 border border-stone-200 shadow-sm text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-stone-900">Continuing the Legacy</h2>
          <p className="text-xl text-stone-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            FOPP continues Frank and Albert Parkinson's vision through annual community events, ecological restoration, and programs that bring people together in this cherished green space.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-emerald-50 p-6 rounded-2xl">
              <div className="font-bold text-stone-900 mb-1">Children's Gala</div>
              <div className="text-xs text-emerald-700 uppercase tracking-wider">Annual Tradition</div>
            </div>
            <div className="bg-emerald-50 p-6 rounded-2xl">
              <div className="font-bold text-stone-900 mb-1">Lantern Parade</div>
              <div className="text-xs text-emerald-700 uppercase tracking-wider">Winter Event</div>
            </div>
            <div className="bg-emerald-50 p-6 rounded-2xl">
              <div className="font-bold text-stone-900 mb-1">Apple Day</div>
              <div className="text-xs text-emerald-700 uppercase tracking-wider">Orchard Celebration</div>
            </div>
            <div className="bg-emerald-50 p-6 rounded-2xl">
              <div className="font-bold text-stone-900 mb-1">Little Friends</div>
              <div className="text-xs text-emerald-700 uppercase tracking-wider">Forest Schools</div>
            </div>
          </div>
          <p className="text-sm text-stone-500 mt-8 italic">
            During COVID-19 lockdowns, the park served as vital green space for community mental health and social connection.
          </p>
        </div>
      </section>
    </div>
  );
};

export default History;
