export interface initialAnalyticsType {
  companyMembersResults: CompanyMembersResultsType | null;
  loading: boolean;
  error: null;
}

export interface CompanyMembersResultsType {
  [memberId: string]: {
    [timestamp: string]: number;
  };
}