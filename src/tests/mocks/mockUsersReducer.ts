import {createSlice} from '@reduxjs/toolkit';
import {initialUsersType} from '../../types/usersTypes';

const initialState: initialUsersType = {
  items: {
    users: [
      {id: 'user1', username: 'Test User 1', email: 'test1@example.com', password: 'test1'},
      {id: 'user2', username: 'Test User 2', email: 'test2@example.com', password: 'test2'},
    ],
    total_count: 2,
  },
  userById: {id: 'user1', username: 'Test User 1', email: 'test1@example.com', password: 'test1'},
  loading: false,
  error: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
});

export const mockUsersReducer = usersSlice.reducer;
