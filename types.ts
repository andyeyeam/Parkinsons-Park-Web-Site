
export interface ParkEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  description: string;
  type: 'volunteer' | 'walk' | 'workshop' | 'family';
  imageUrl: string;
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

export interface VolunteerFormData {
  fullName: string;
  email: string;
  role: string;
  message: string;
}

export interface FormStatus {
  type: 'idle' | 'loading' | 'success' | 'error';
  message?: string;
}
