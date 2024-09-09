import {createSlice} from '@reduxjs/toolkit';
import {initialAnalyticsType, CompanyMembersResultsType, myQuizzesResultsType} from '../../types/analyticsTypes';

const mockCompanyMembersResults: CompanyMembersResultsType = {
  data: {
    'member1': {
      '2024-08-01T12:00:00Z': 75,
      '2024-08-02T12:00:00Z': 80,
    },
    'member2': {
      '2024-08-01T12:00:00Z': 90,
    },
  },
};

const mockMyQuizzesResults: myQuizzesResultsType[] = [
  {
    quiz_id: 'quiz1',
    quiz_name: 'Quiz 1',
    company_id: 'company1',
    company_name: 'Company A',
    last_attempt: '2024-08-01T12:00:00Z',
    average_score: 85,
  },
  {
    quiz_id: 'quiz2',
    quiz_name: 'Quiz 2',
    company_id: 'company2',
    company_name: 'Company B',
    last_attempt: '2024-08-02T15:30:00Z',
    average_score: 90,
  },
];

const initialState: initialAnalyticsType = {
  companyMembersResults: mockCompanyMembersResults,
  myQuizzesResults: mockMyQuizzesResults,
  loading: false,
  error: null,
};

const analyticsSlice = createSlice({
  name: 'analytics',
  initialState,
  reducers: {},
});

export const mockAnalyticsReducer = analyticsSlice.reducer;
