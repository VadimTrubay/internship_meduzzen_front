import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import {Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import UserMenu from '../components/UserMenu/UserMenu';
import {mockAuthReducer} from './mocks/mockAuthReducer';

jest.mock('../components/LogoutButton/LogoutButton', () => ({
  LogoutButton: () => <button>Logout</button>,
}));

describe('UserMenu component', () => {
  const store = configureStore({
    reducer: {
      auth: mockAuthReducer,
    },
  });

  test('renders user information correctly', () => {
    render(
      <Provider store={store}>
        <UserMenu/>
      </Provider>
    );

    expect(screen.getByText(/testuser@example.com/i)).toBeInTheDocument();
  });

  test('renders LogoutButton', () => {
    render(
      <Provider store={store}>
        <UserMenu/>
      </Provider>
    );

    expect(screen.getByText(/logout/i)).toBeInTheDocument();
  });
});
