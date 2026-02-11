export interface Instructor {
  id: string;
  name: string;
  photo: string;
  verified: boolean;
  elo: number;
  stars: number;
  metrics: { service: number; professionalism: number; quality: number };
  trainees: number;
  trainingTypes: string[];
  ranges: string[];
  city: string;
  available: boolean;
  nextSlot: string;
  priceFrom: number;
  bio: string;
  experience: number;
  reviews: Review[];
  gallery: string[];
}

export interface Review {
  id: string;
  name: string;
  date: string;
  text: string;
  rating: number;
  verified: boolean;
}
