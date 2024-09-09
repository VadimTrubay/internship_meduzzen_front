import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {initialCompaniesType} from '../../types/companiesTypes';

const initialState: initialCompaniesType = {
  items: {
    companies: [
      {
        id: 'company1',
        name: 'Mock Company 1',
        description: 'Mock Description 1',
        visible: true,
        owner_id: 'user1',
      },
      {
        id: 'company2',
        name: 'Mock Company 2',
        description: 'Mock Description 2',
        visible: false,
        owner_id: 'user2',
      },
    ],
    total_count: 2,
  },
  companyById: null,
  loading: false,
  error: null,
};

const mockCompaniesSlice = createSlice({
  name: 'companies',
  initialState,
  reducers: {
  },
});

export const mockCompaniesReducer = mockCompaniesSlice.reducer;
