import React from 'react';
import { Leaf, Mountain, BookOpen } from 'lucide-react';
import { ParkEvent, VolunteerRole, Feature } from './types';
import guiseleyCarnivalImage from './src/assets/images/guiseley-carnival.jpg';
import childrensGalaImage from './src/assets/images/childrens-gala.jpg';

export const MOCK_EVENTS: ParkEvent[] = [
  {
    id: '1',
    title: 'Working Party January',
    date: '2025-01-24',
    time: '24th January',
    description: 'Hillside Entrance improvements. Various tidy up and planting activities.',
    type: 'volunteer',
    imageUrl: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: '2',
    title: 'Working Party March',
    date: '2025-03-28',
    time: '28th March',
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
    time: '28th June',
    description: 'Come and find our stall at the Guiseley Carnival where you will be able to chat to us and learn more about the Park and what the Friends of Parkinson\'s Park do.',
    type: 'family',
    imageUrl: guiseleyCarnivalImage
  },
  {
    id: '5',
    title: 'Working Party July',
    date: '2025-07-12',
    time: 'July',
    description: 'Top Copse improvements. Pathway definitions, woodchip spreading, insect hotel maintenance.',
    type: 'volunteer',
    imageUrl: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: '6',
    title: "Children's Gala",
    date: '2025-09-06',
    time: '6th September',
    description: 'All the fun of the themed annual Summer fare with stalls, entertainment, face painting and more.',
    type: 'family',
    imageUrl: childrensGalaImage
  },
  {
    id: '7',
    title: 'Working Party November',
    date: '2025-11-08',
    time: 'November',
    description: 'The Orchard. Pruning the trees to ensure they are well maintained. Strimming and getting the area looking really nice.',
    type: 'volunteer',
    imageUrl: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: '8',
    title: 'Advent Trees & Lights',
    date: '2025-12-01',
    time: 'December',
    description: 'Throughout December our Celebration tree will be adorned with Christmas decorations. The entrances will light up with Christmas cheer.',
    type: 'family',
    imageUrl: 'https://images.unsplash.com/photo-1512389142860-9c449e58a543?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: '9',
    title: 'Christmas Lantern Parade',
    date: '2025-12-13',
    time: '13th December',
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
    title: 'Events Director',
    description: 'Ensure events are planned, coordinated and executed safely and in line with Friends goals and purpose.',
    commitment: 'Flexible'
  },
  {
    title: 'Publicity, Marketing and Facebook',
    description: 'Publicise key events like the Children\'s Gala and the Lantern Parade. Manage the Facebook account and ensure there is a regular stream of posts detailing the day to day and week to week activities in the Park.',
    commitment: 'Flexible'
  },
  {
    title: 'Projects Director',
    description: 'Oversight of the Park improvement plan. Coordinating key improvement projects and initiatives. Ensure work is carried out in line with budgets and goals.',
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