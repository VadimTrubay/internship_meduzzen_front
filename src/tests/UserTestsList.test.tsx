import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom';
import {Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import {MemoryRouter} from 'react-router-dom';
import {fetchMyResults} from '../redux/results/operations';
import {mainUrls} from "../config/urls";
import {selectMyQuizzesResults} from "../redux/analytics/selectors";
import UserTestsList from "../components/UsersTestsList/UserTestsList";
import {mockUsersReducer} from "./mocks/mockUsersReducer";
import {mockAnalyticsReducer} from "./mocks/mocksAnalyticsReducer";

// Mock necessary selectors
jest.mock('../redux/users/selectors', () => ({
  selectLoading: jest.fn(),
}));

jest.mock('../redux/analytics/selectors', () => ({
  selectMyQuizzesResults: jest.fn(),
}));

jest.mock('../redux/results/operations', () => ({
  fetchMyResults: jest.fn(),
}));

const mockQuizzesResults = [
  {
    quiz_id: 'quiz1',
    quiz_name: 'Quiz 1',
    company_name: 'Company A',
    average_score: 85,
    last_attempt: '2024-08-01T12:00:00Z',
  },
  {
    quiz_id: 'quiz2',
    quiz_name: 'Quiz 2',
    company_name: 'Company B',
    average_score: 90,
    last_attempt: '2024-08-02T15:30:00Z',
  },
];

const store = configureStore({
  reducer: {
    users: mockUsersReducer,
    analytics: mockAnalyticsReducer,
  },
});

describe('UserTestsList component', () => {
  beforeEach(() => {
    (selectMyQuizzesResults as jest.Mock).mockReturnValue(mockQuizzesResults);
  });

  test('renders loading indicator when loading is true', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <UserTestsList/>
        </MemoryRouter>
      </Provider>
    );
  });

  test('navigates to quiz details page when quiz name is clicked', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <UserTestsList/>
        </MemoryRouter>
      </Provider>
    );

    const quizLink = screen.getByText('Quiz 1');
    expect(quizLink.closest('a')).toHaveAttribute('href', mainUrls.analytics.myQuizzesAnalytics);
  });
});
