export interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
}

export interface QuizOption {
  label: string;
  value: string;
}

export interface QuizAnswers {
  experience: string;
  goal: string;
  location: string;
  budget: string;
}
