export interface Instructor {
  id: string;
  name: string;
  photo: string;
  verified: boolean;
  eloShooting: number;
  eloInstruction: number;
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
  videos?: VideoDemo[];
  socialLinks?: {
    instagram?: string;
    facebook?: string;
    youtube?: string;
  };
  rangeType?: ("מטווח סגור" | "מטווח פתוח")[];
  countsAsRefresh?: boolean;
  deals?: ("כוחות ביטחון" | "סטודנטים" | "גמלאים")[];
}

export interface Review {
  id: string;
  name: string;
  date: string;
  text: string;
  rating: number;
  verified: boolean;
}

export interface VideoDemo {
  id: string;
  title: string;
  thumbnail: string;
  platform: "youtube" | "instagram" | "facebook" | "local";
  url?: string;
}
