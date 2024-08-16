// src/tests/MyInvitesPage.test.tsx

import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import {Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import MyInvitesPage from '../pages/MyInvitesPage/MyInvitesPage'; // Adjust the import path
import {actionsReducer} from '../redux/actions/slice'; // Adjust the import path
import {authReducer} from '../redux/auth/slice'; // Adjust the import path
import {fetchMyInvites, acceptInvite, declineInvite} from '../redux/actions/operations'; // Adjust the import path
import {memberType} from '../types/actionsTypes';
import {UserType} from '../types/usersTypes';

// Define initial state
const initialState = {
  actions: {
    myInvites: [
      {id: '1', company_name: 'Company A'} as memberType,
      {id: '2', company_name: 'Company B'} as memberType,
    ],
    loading: false,
    error: null,
  },
  auth: {
    user: {username: 'testuser'} as UserType,
  },
};

// Create a mock store
const store = configureStore({
  reducer: {
    actions: actionsReducer,
    auth: authReducer,
  },
  preloadedState: initialState,
});

// Mock dispatch function
const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch,
}));

describe('MyInvitesPage Component', () => {
  test('renders loading indicator when loading is true', () => {
    const testStore = configureStore({
      reducer: {
        actions: actionsReducer,
        auth: authReducer,
      },
      preloadedState: {
        actions: {
          ...initialState.actions,
          loading: true,
        },
        auth: initialState.auth,
      },
    });

    render(
      <Provider store={testStore}>
        <MyInvitesPage/>
      </Provider>
    );

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  test('renders invites and profile info correctly', () => {
    render(
      <Provider store={store}>
        <MyInvitesPage/>
      </Provider>
    );

    expect(screen.getByText(/My Invites/i)).toBeInTheDocument();
    expect(screen.getByText(/Profile: "testuser"/i)).toBeInTheDocument();
    expect(screen.getByText(/Company A/i)).toBeInTheDocument();
    expect(screen.getByText(/Company B/i)).toBeInTheDocument();
  });

  test('opens and closes accept invite modal', () => {
    render(
      <Provider store={store}>
        <MyInvitesPage/>
      </Provider>
    );

    // Open the accept invite modal
    fireEvent.click(screen.getAllByText(/Accept/i)[0]);
    expect(screen.getByText(/Accept Invite/i)).toBeInTheDocument();

    // Close the accept invite modal
    fireEvent.click(screen.getByRole('button', {name: /HighlightOff/i}));
    expect(screen.queryByText(/Accept Invite/i)).not.toBeInTheDocument();
  });

  test('opens and closes decline invite modal', () => {
    render(
      <Provider store={store}>
        <MyInvitesPage/>
      </Provider>
    );

    // Open the decline invite modal
    fireEvent.click(screen.getAllByText(/Decline/i)[0]);
    expect(screen.getByText(/Decline Invite/i)).toBeInTheDocument();

    // Close the decline invite modal
    fireEvent.click(screen.getByRole('button', {name: /HighlightOff/i}));
    expect(screen.queryByText(/Decline Invite/i)).not.toBeInTheDocument();
  });

  test('handles accept invite action', () => {
    render(
      <Provider store={store}>
        <MyInvitesPage/>
      </Provider>
    );

    // Open the accept invite modal
    fireEvent.click(screen.getAllByText(/Accept/i)[0]);

    // Click the accept button in the modal
    fireEvent.click(screen.getByRole('button', {name: /Done/i}));

    // Check if the dispatch function was called with the correct action
    expect(mockDispatch).toHaveBeenCalledWith(acceptInvite('1'));
    expect(mockDispatch).toHaveBeenCalledWith(fetchMyInvites());
  });

  test('handles decline invite action', () => {
    render(
      <Provider store={store}>
        <MyInvitesPage/>
      </Provider>
    );

    // Open the decline invite modal
    fireEvent.click(screen.getAllByText(/Decline/i)[0]);

    // Click the decline button in the modal
    fireEvent.click(screen.getByRole('button', {name: /Done/i}));

    // Check if the dispatch function was called with the correct action
    expect(mockDispatch).toHaveBeenCalledWith(declineInvite('1'));
    expect(mockDispatch).toHaveBeenCalledWith(fetchMyInvites());
  });
});
