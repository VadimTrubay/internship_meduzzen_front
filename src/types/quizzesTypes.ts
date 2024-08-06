export interface initialQuizzesType {
  items: {
    quizzes: QuizResponseType[];
    total_count: number;
  };
  quizById: QuizResponseType | null;
  loading: boolean;
  error: null;
}

export interface QuizResponseType {
  id: string;
  name: string;
  description: string;
  frequency_days: number;
}

export interface QuizCompanyRequestType {
  companyId: string;
  id: string;
  name: string;
  description: string;
  frequency_days: number;
  questions: QuestionRequestType[];
}

export interface IQuizRequestType {
  name: string;
  description: string;
  frequency_days: number;
  questions: QuestionRequestType[];
}

export interface QuestionRequestType {
  question_text: string;
  correct_answer: string[];
  answer_options: string[];
}

export interface AddQuizModalType {
  openModal: boolean;
  closeModal: () => void;
  style_close: string;
  color_off: "inherit" | "disabled" | "action" | "primary" | "secondary" | "error" | "info" | "success" | "warning";
  style_title: string;
  title: string;
  formikAddQuiz: any;
  name: string;
  description: string;
  frequency_days: string;
  questions: string;
  answer_options: string;
  correct_answer: string;
}
