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


export interface QuizRequestType {
  id: string;
  name: string;
  description: string;
  frequency_days: number;
  questions: QuestionRequestType[];
}


export interface QuestionRequestType {
  id: string;
  question_text: string;
  correct_answer: QuestionAnswerResponseType[];
  options: QuestionOptionsResponseType[];
}


// export interface QuestionAnswerRequeste {
//     id: string
//     answer_text: string
//     is_correct: boolean
//     question_id: number
// }


// export interface CompanyUpdateType {
//   id: string;
//   name?: string;
//   description?: string;
//   visible: boolean;
// }
//


//
// export interface CompaniesListProps {
//   companies: CompanyType[];
// }
