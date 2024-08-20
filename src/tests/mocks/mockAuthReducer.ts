import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  user: {
    id: 'user1',
    username: 'testuser',
    email: 'testuser@example.com',
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
});

export const mockAuthReducer = authSlice.reducer;