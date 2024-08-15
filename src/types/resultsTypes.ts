export interface initialResultsType {
  quizResults: null,
  companyRating: 0,
  globalRating: 0,
  loading: boolean,
  error: null,
}

export interface sendResultsRequestType {
  quiz_id: string,
  data: {
    answers: {
      string: string[]
    }
  }
}

export interface resultsResponseType {
  company_member_id: string,
  quiz_id: string,
  score: number,
  total_questions: number,
  correct_answers: number
}

export interface exportDataType {
  companyId: string,
  userId: string,
}
