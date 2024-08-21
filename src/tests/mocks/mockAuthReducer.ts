import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  user: {
    id: 'user1',
    username: 'testuser',
    email: 'testuser@example.com',
  },
  access_token: 'mock_access_token',
  isLoggedIn: true,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
});

export const mockAuthReducer = authSlice.reducer;
