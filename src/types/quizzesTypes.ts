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

export interface QuizCompanyIdRequestType {
  companyId: string;
  quizData: QuizCompanyRequestType
}

export interface QuizCompanyRequestType {
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
  formikAddQuiz: any;
  title: string;
  title_name: string;
  title_description: string;
  title_frequency_days: string;
  title_questions: string;
  title_answer_options: string;
}
