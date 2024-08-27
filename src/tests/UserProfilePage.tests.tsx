import React from 'react';
import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom';
import {Provider} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';
import {store} from "../redux/store";
import UserProfilePage from "../pages/UserProfilePage/UserProfilePage";
import {deleteUser} from "../redux/users/operations";


jest.mock('../redux/users/operations', () => ({
  deleteUser: jest.fn(),
  fetchUserById: jest.fn(),
  updatePassword: jest.fn(),
}));

jest.mock('../redux/results/operations', () => ({
  fetchGlobalRating: jest.fn(),
}));

jest.mock('../redux/analytics/operations', () => ({
  fetchMyQuizzesResults: jest.fn(),
}));


jest.mock('../redux/auth/selectors', () => ({
  selectUser: () => ({id: '1', username: 'testuser', email: 'test@example.com'}),
  selectLoading: () => false,
}));

jest.mock('../redux/results/selectors', () => ({
  selectGlobalRating: () => 8,
}));

describe('UserProfilePage', () => {
  const renderComponent = () => {
    return render(
      <Provider store={store}>
        <Router>
          <UserProfilePage/>
        </Router>
      </Provider>
    );
  };

  test('renders user profile details', () => {
    renderComponent();

    expect(screen.getByText(/User Profile/i)).toBeInTheDocument();
    expect(screen.getByText(/Username:/i)).toBeInTheDocument();
    expect(screen.getByText(/testuser/i)).toBeInTheDocument();
    expect(screen.getByText(/Email:/i)).toBeInTheDocument();
    expect(screen.getByText(/test@example.com/i)).toBeInTheDocument();
  });

  test('opens and closes edit username modal', async () => {
    renderComponent();

    fireEvent.click(screen.getByRole('button', {name: /Change Username/i}));

    expect(screen.getByText(/Edit username/i)).toBeVisible();

    fireEvent.click(screen.getByRole('button', {name: /done/i}));
    await waitFor(() => expect(screen.queryByText(/Edit username/i)).not.toBeVisible());
  });

  test('opens and closes edit password modal', async () => {
    renderComponent();

    fireEvent.click(screen.getByRole('button', {name: /Change Password/i}));

    expect(screen.getByText(/Edit password/i)).toBeVisible();

    fireEvent.click(screen.getByRole('button', {name: /done/i}));
    await waitFor(() => expect(screen.queryByText(/Edit password/i)).not.toBeVisible());
  });

  test('opens and closes delete profile modal', async () => {
    renderComponent();

    fireEvent.click(screen.getByRole('button', {name: /Delete Profile/i}));

    expect(screen.getByText(/Delete profile/i)).toBeVisible();

    fireEvent.click(screen.getByRole('button', {name: /done/i}));

    await waitFor(() => expect(deleteUser).toHaveBeenCalledWith('1'));
  });
});
