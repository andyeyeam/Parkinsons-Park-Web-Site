import React from 'react';
import { Leaf, Calendar, Users, MapPin, Heart, Mountain, BookOpen } from 'lucide-react';
import { ParkEvent, VolunteerRole, Feature } from './types';
import heritageOpenDaysImage from './src/assets/images/heritage-open-days.jpg';
import remembranceImage from './src/assets/images/remembrance.jpg';

export const MOCK_EVENTS: ParkEvent[] = [
  {
    id: '1',
    title: "Children's Gala",
    date: '2026-09-06',
    time: '14:00 to 17:00',
    description: "Our annual Children's Gala returns. Expect games, costumes, and themed activities for all ages!",
    type: 'family',
    imageUrl: 'https://parkinsonspark.co.uk/wp-content/uploads/2016/10/1-parkinsons-park.jpg?w=2000&h=576&crop=1'
  },
  {
    id: '2',
    title: 'Heritage Open Days',
    date: '2026-09-11',
    time: 'Various Times',
    description: "Running from Fri 11th Sep to Sun 20th Sep 2026. The Park will feature events aimed at reflecting on the Park's history and our shared heritage.",
    type: 'walk',
    imageUrl: heritageOpenDaysImage
  },
  {
    id: '4',
    title: 'Remembrance Week',
    date: '2026-11-04',
    time: 'Dawn to Dusk',
    description: "A week of reflection (4th-12th Nov) featuring a decorative display at the farm gate..",
    type: 'family',
    imageUrl: remembranceImage
  },
  {
    id: '5',
    title: 'Advent Trees & Lights',
    date: '2026-12-01',
    time: 'Evening Displays',
    description: "Throughout December, the park will feature beautiful Advent Tree displays and festive lighting to brighten our winter walks.",
    type: 'family',
    imageUrl: 'https://images.unsplash.com/photo-1512389142860-9c449e58a543?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: '6',
    title: 'Lantern Parade',
    date: '2026-12-13',
    time: '15:45 to 17:00',
    description: "A magical community evening. The parade starts in the park and concludes at the Guiseley Cross. Bring your handmade lanterns!",
    type: 'family',
    imageUrl: 'https://parkinsonspark.co.uk/wp-content/uploads/2022/12/stuart2.jpg?w=768'
  }
];

export const VOLUNTEER_ROLES: VolunteerRole[] = [
  {
    title: 'Bog Garden',
    description: 'Located near Netherfield entrance, this wetland area requires periodic upkeep and maintenance work to support pond-dwelling wildlife.',
    commitment: 'Flexible'
  },
  {
    title: 'Top Copse',
    description: 'This secluded woodland section houses the park\'s bug hotel and needs occasional tidying alongside maintenance to preserve the structure.',
    commitment: 'Flexible'
  },
  {
    title: 'Community Orchard',
    description: 'A specialized position for those with soft fruit tree knowledge, involving pruning expertise. Full training is provided for interested candidates.',
    commitment: 'Flexible'
  }
];

export const FEATURES: Feature[] = [
  {
    icon: <Leaf className="w-6 h-6 text-emerald-600" />,
    title: "Rich Ecology",
    description: "Eight distinct habitat zones from ancient woodland to wetland bog gardens, supporting diverse Yorkshire wildlife including rare red-list bird species.",
    link: "/ecology"
  },
  {
    icon: <Mountain className="w-6 h-6 text-emerald-600" />,
    title: "Ancient Geology",
    description: "Discover 300 million years of geological history from tropical Pangaea to ice age glaciers. Explore the Pennine Millstone Grit, fossilized marine life, and the forces that carved the Guiseley Gap.",
    link: "/geology"
  },
  {
    icon: <BookOpen className="w-6 h-6 text-emerald-600" />,
    title: "Deep History",
    description: "1,000 years from Viking settlements to Victorian philanthropists. Discover Frank and Albert Parkinson's legacy, community decline, and FOPP's remarkable restoration journey.",
    link: "/history"
  }
];