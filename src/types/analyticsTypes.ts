export interface initialAnalyticsType {
  companyMembersResults: CompanyMembersResultsType | null;
  myQuizzesResults: myQuizzesResultsType[] | null;
  loading: boolean;
  error: null;
}

export interface CompanyMembersResultsType {
  [memberId: string]: {
    [timestamp: string]: number;
  };
}

export interface myQuizzesResultsType {
    quiz_id: string,
    quiz_name: string,
    company_id: string,
    company_name: string,
    last_attempt: string,
    average_score: number
}