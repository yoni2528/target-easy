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

export const TRAINING_CATEGORIES = [
  { id: "new", label: "מתחמש חדש", icon: "🎯", color: "#4ade80" },
  { id: "refresh", label: "רענון אקדח", icon: "🔄", color: "#60a5fa" },
  { id: "renewal", label: "חידוש רישיון", icon: "📋", color: "#fbbf24" },
  { id: "group", label: "אימוני קבוצות", icon: "👥", color: "#a78bfa" },
  { id: "pro", label: "ירי מקצועי", icon: "⚡", color: "#f87171", hasLevels: true },
];

export const SKILL_LEVELS = [
  { min: 1000, max: 1200, label: "מתחיל" },
  { min: 1200, max: 1400, label: "בסיסי" },
  { min: 1400, max: 1600, label: "בינוני" },
  { min: 1600, max: 1800, label: "מתקדם" },
  { min: 1800, max: 9999, label: "מקצוען" },
];

export const MOCK_INSTRUCTORS: Instructor[] = [
  {
    id: "1", name: "דוד כהן",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
    verified: true, elo: 1847, stars: 4.9,
    metrics: { service: 4.9, professionalism: 5.0, quality: 4.8 },
    trainees: 1243, trainingTypes: ["מתחמש חדש", "רענון", "חידוש", "ירי מקצועי"],
    ranges: ["מטווח השרון", "מטווח נתניה"], city: "נתניה",
    available: true, nextSlot: "היום, 14:00", priceFrom: 250,
    bio: "מדריך ירי מוסמך עם 15 שנות ניסיון. שירתתי כקצין נשק ביחידה מיוחדת. מתמחה בהכשרת מתחמשים חדשים ואימוני ירי מתקדמים.",
    experience: 15,
    reviews: [
      { id: "r1", name: "יוסי לוי", date: "לפני שבוע", text: "מדריך מעולה! סבלני ומקצועי. הרגשתי בטוח לאורך כל האימון.", rating: 5, verified: true },
      { id: "r2", name: "שרה כהן", date: "לפני חודש", text: "האימון הכי טוב שהיה לי. דוד יודע להסביר בצורה ברורה ופשוטה.", rating: 5, verified: true },
      { id: "r3", name: "משה דוד", date: "לפני חודשיים", text: "מקצוען אמיתי. שיפרתי את הדיוק שלי משמעותית.", rating: 4, verified: true },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1595590424283-b8f17842773f?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1584281722234-404e4dc10ae2?w=600&h=400&fit=crop",
    ],
  },
  {
    id: "2", name: "מיכל אברהם",
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face",
    verified: true, elo: 1723, stars: 4.8,
    metrics: { service: 5.0, professionalism: 4.8, quality: 4.7 },
    trainees: 856, trainingTypes: ["מתחמש חדש", "רענון", "אימוני קבוצות"],
    ranges: ["מטווח תל אביב", "מטווח ראשון לציון"], city: "תל אביב",
    available: true, nextSlot: "מחר, 09:00", priceFrom: 280,
    bio: "מדריכת ירי מוסמכת, לוחמת בעבר ביחידת אגוז. מאמינה בגישה אישית ובסביבה תומכת.",
    experience: 8,
    reviews: [
      { id: "r4", name: "רונית כץ", date: "לפני 3 ימים", text: "מיכל מעולה, במיוחד למי שמפחד מנשק. יצרה אווירה נעימה ובטוחה.", rating: 5, verified: true },
    ],
    gallery: ["https://images.unsplash.com/photo-1595590424283-b8f17842773f?w=600&h=400&fit=crop"],
  },
  {
    id: "3", name: "אלון ברק",
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
    verified: true, elo: 1956, stars: 5.0,
    metrics: { service: 4.8, professionalism: 5.0, quality: 5.0 },
    trainees: 2100, trainingTypes: ["ירי מקצועי", "חידוש", "רענון"],
    ranges: ["מטווח ירושלים", "מטווח מעלה אדומים", "מטווח בית שמש"], city: "ירושלים",
    available: false, nextSlot: "יום ראשון, 10:00", priceFrom: 350,
    bio: "קצין נשק ותיק (20+ שנה), מדריך ירי ספורטיבי ומעשי. מנהל את אקדמיית הירי 'ברק'.",
    experience: 22,
    reviews: [
      { id: "r6", name: "תומר שמש", date: "לפני שבוע", text: "פשוט הטוב ביותר. אלון לקח אותי מרמת מתחיל לרמת תחרותי.", rating: 5, verified: true },
    ],
    gallery: [],
  },
  {
    id: "4", name: "יעל שפירא",
    photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face",
    verified: false, elo: 1534, stars: 4.6,
    metrics: { service: 4.7, professionalism: 4.5, quality: 4.6 },
    trainees: 412, trainingTypes: ["מתחמש חדש", "רענון"],
    ranges: ["מטווח חיפה"], city: "חיפה",
    available: true, nextSlot: "היום, 16:30", priceFrom: 220,
    bio: "מדריכת ירי עם 5 שנות ניסיון. אוהבת לעבוד עם מתחילים וליצור חוויה חיובית ראשונה.",
    experience: 5,
    reviews: [
      { id: "r7", name: "נועה לב", date: "לפני חודש", text: "יעל נהדרת! הפכה את האימון הראשון שלי לחוויה מהנה.", rating: 5, verified: true },
    ],
    gallery: [],
  },
  {
    id: "5", name: "רון מלכה",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face",
    verified: true, elo: 1689, stars: 4.7,
    metrics: { service: 4.6, professionalism: 4.8, quality: 4.7 },
    trainees: 678, trainingTypes: ["רענון", "חידוש", "אימוני קבוצות", "ירי מקצועי"],
    ranges: ["מטווח באר שבע", "מטווח אילת"], city: "באר שבע",
    available: true, nextSlot: "מחר, 11:00", priceFrom: 200,
    bio: "מדריך ירי ותיק מהדרום. 12 שנות ניסיון בהדרכה במטווחים אזרחיים וצבאיים.",
    experience: 12,
    reviews: [
      { id: "r9", name: "עמית דר", date: "לפני שבוע", text: "מקצועי ויעיל. סיימנו בזמן ובלי בעיות.", rating: 4, verified: true },
    ],
    gallery: [],
  },
  {
    id: "6", name: "נתן גולדשטיין",
    photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop&crop=face",
    verified: true, elo: 1802, stars: 4.8,
    metrics: { service: 4.9, professionalism: 4.9, quality: 4.7 },
    trainees: 1567, trainingTypes: ["מתחמש חדש", "רענון", "חידוש", "אימוני קבוצות"],
    ranges: ["מטווח פתח תקווה", "מטווח כפר סבא", "מטווח הוד השרון"], city: "פתח תקווה",
    available: false, nextSlot: "יום שלישי, 08:00", priceFrom: 270,
    bio: "בעל ניסיון של 18 שנה בהדרכת ירי. מנהל בית ספר לירי במרכז.",
    experience: 18,
    reviews: [
      { id: "r10", name: "ליאור חן", date: "לפני שבועיים", text: "נתן מדריך ברמה הכי גבוהה. ממליץ!", rating: 5, verified: true },
    ],
    gallery: [],
  },
];

export const AVAILABLE_DATES = [
  { date: "2026-02-12", slots: ["09:00", "10:30", "14:00", "16:00"] },
  { date: "2026-02-13", slots: ["08:00", "11:00", "15:00"] },
  { date: "2026-02-14", slots: ["09:00", "12:00"] },
  { date: "2026-02-15", slots: ["10:00", "14:00", "16:30"] },
  { date: "2026-02-16", slots: ["08:00", "09:30", "11:00", "14:00", "16:00"] },
];
