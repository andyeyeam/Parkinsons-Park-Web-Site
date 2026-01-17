import React from 'react';
import { Leaf, Mountain, BookOpen } from 'lucide-react';
import { ParkEvent, VolunteerRole, Feature } from './types';

export const MOCK_EVENTS: ParkEvent[] = [
  {
    id: '1',
    title: 'Working Party January',
    date: '2025-01-24',
    time: '10:00 to 13:00',
    description: 'Hillside Entrance improvements. Various tidy up and planting activities.',
    type: 'volunteer',
    imageUrl: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: '2',
    title: 'Working Party March',
    date: '2025-03-28',
    time: '10:00 to 13:00',
    description: 'Great British Spring Clean. Litter picking and making the Park look perfect as we go into Spring.',
    type: 'volunteer',
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: '3',
    title: 'Annual General Meeting',
    date: '2025-04-01',
    time: 'TBA',
    description: 'Annual General Meeting. To present the Friends of Parkinson\'s Park status and to gather feedback from the community.',
    type: 'workshop',
    imageUrl: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: '4',
    title: 'Guiseley Carnival',
    date: '2025-06-28',
    time: 'All Day',
    description: 'Come and find our stall at the Guiseley Carnival where you will be able to chat to us and learn more about the Park and what the Friends of Parkinson\'s Park do.',
    type: 'family',
    imageUrl: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: '5',
    title: 'Working Party July',
    date: '2025-07-12',
    time: '10:00 to 13:00',
    description: 'Top Copse improvements. Pathway definitions, woodchip spreading, insect hotel maintenance.',
    type: 'volunteer',
    imageUrl: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: '6',
    title: "Children's Gala",
    date: '2025-09-06',
    time: '14:00 to 17:00',
    description: 'All the fun of the themed annual Summer fare with stalls, entertainment, face painting and more.',
    type: 'family',
    imageUrl: 'https://parkinsonspark.co.uk/wp-content/uploads/2016/10/1-parkinsons-park.jpg?w=2000&h=576&crop=1'
  },
  {
    id: '7',
    title: 'Working Party November',
    date: '2025-11-08',
    time: '10:00 to 13:00',
    description: 'The Orchard. Pruning the trees to ensure they are well maintained. Strimming and getting the area looking really nice.',
    type: 'volunteer',
    imageUrl: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: '8',
    title: 'Advent Trees & Lights',
    date: '2025-12-01',
    time: 'Throughout December',
    description: 'Throughout December our Celebration tree will be adorned with Christmas decorations. The entrances will light up with Christmas cheer.',
    type: 'family',
    imageUrl: 'https://images.unsplash.com/photo-1512389142860-9c449e58a543?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: '9',
    title: 'Christmas Lantern Parade',
    date: '2025-12-13',
    time: '15:45 to 17:00',
    description: 'Parade with us as we congregate at the park and walk down to the Guiseley Cross for Carols with a brass band, cakes and a magical Christmassy event.',
    type: 'family',
    imageUrl: 'https://parkinsonspark.co.uk/wp-content/uploads/2022/12/stuart2.jpg?w=768'
  }
];

export const VOLUNTEER_ROLES: VolunteerRole[] = [
  {
    title: 'General Interest',
    description: 'A General Interest role to help with work groups where we carry out routine maintenances such as weeding, bulb planting, pruning, litter picking and other similar work.',
    commitment: 'Flexible'
  },
  {
    title: 'Bog Garden Lead',
    description: 'Take responsibility for the upkeep and improvement of this wetland area near Netherfield entrance. Lead maintenance efforts to support pond-dwelling wildlife and ensure the area remains a thriving habitat.',
    commitment: 'Flexible'
  },
  {
    title: 'Top Copse Lead',
    description: 'Lead the upkeep and improvement of this secluded woodland section. Take responsibility for maintaining the bug hotel structure and coordinating regular tidying to preserve this important wildlife habitat.',
    commitment: 'Flexible'
  },
  {
    title: 'Community Orchard Lead',
    description: 'Take responsibility for the upkeep and improvement of the community orchard. Lead pruning and maintenance efforts for soft fruit trees. Knowledge of fruit tree care is beneficial, with full training provided.',
    commitment: 'Flexible'
  }
];

export const FEATURES: Feature[] = [
  {
    icon: <BookOpen className="w-6 h-6 text-emerald-600" />,
    title: "Deep History",
    description: "1,000 years from Viking settlements to Victorian philanthropists. Discover Frank and Albert Parkinson's legacy, community decline, and FOPP's remarkable restoration journey.",
    link: "/history"
  },
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
  }
];