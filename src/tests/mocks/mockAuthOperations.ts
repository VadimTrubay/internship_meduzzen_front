import {createAsyncThunk} from '@reduxjs/toolkit';

export const mockSignUp = createAsyncThunk('auth/signUp', async () => {
  return {user: {id: 'test-user', username: 'Test User'}};
});

export const mockSignIn = createAsyncThunk('auth/signIn', async () => {
  return {user: {id: 'test-user', username: 'Test User'}};
});