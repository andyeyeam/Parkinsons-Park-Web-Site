
export interface ParkEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  description: string;
  type: 'volunteer' | 'walk' | 'workshop' | 'family';
  imageUrl: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  parts: { text: string }[];
}

export interface VolunteerRole {
  title: string;
  description: string;
  commitment: string;
}

export interface Feature {
  icon: React.ReactElement;
  title: string;
  description: string;
  link?: string;
}
