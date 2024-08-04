export interface initialQuizzesType {
  items: {
    quizzes: QuizType[];
    total_count: number;
  };
  quizById: QuizType | null;
  loading: boolean;
  error: null;
}

export interface QuizType {
  id: string;
  name: string;
  description: string;
  frequency_days: number;
}

// export interface CompanyUpdateType {
//   id: string;
//   name?: string;
//   description?: string;
//   visible: boolean;
// }
//
// export interface CompanyAddType {
//   name: string;
//   description: string;
//   visible: boolean;
// }
//
// export interface CompaniesListProps {
//   companies: CompanyType[];
// }
