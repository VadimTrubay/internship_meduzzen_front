import React from 'react';
import {render, screen, fireEvent, within} from '@testing-library/react';
import '@testing-library/jest-dom';
import {Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import CompaniesList from '../components/CompaniesList/CompaniesList';
import {mockCompaniesReducer} from './mocks/mockCompaniesReducer';
import {mockAuthReducer} from './mocks/mockAuthReducer';
import {selectUser} from '../redux/auth/selectors';
import {selectLoading} from '../redux/companies/selectors';

jest.mock('../redux/auth/selectors', () => ({
  selectUser: jest.fn(),
}));

jest.mock('../redux/companies/selectors', () => ({
  selectLoading: jest.fn(),
}));

jest.mock('../redux/actions/operations', () => ({
  createRequest: jest.fn(),
  fetchMyRequests: jest.fn(),
}));

const mockUser = {
  id: 'user1',
  username: 'testuser',
  email: 'testuser@example.com',
};

const store = configureStore({
  reducer: {
    companies: mockCompaniesReducer,
    auth: mockAuthReducer,
  },
});

describe('CompaniesList component', () => {
  beforeEach(() => {
    (selectUser as jest.Mock).mockReturnValue(mockUser);
    (selectLoading as jest.Mock).mockReturnValue(false);
  });

  test('renders companies correctly', () => {
    render(
      <Provider store={store}>
        <CompaniesList companies={[]}/>
      </Provider>
    );

    const table = screen.getByRole('table');
    const firstRow = within(table).getByText(/Mock Company 1/i);
    expect(firstRow).toBeInTheDocument();
    const firstDesc = within(table).getByText(/Mock Description 1/i);
    expect(firstDesc).toBeInTheDocument();

    const secondRow = within(table).getByText(/Mock Company 2/i);
    expect(secondRow).toBeInTheDocument();
    const secondDesc = within(table).getByText(/Mock Description 2/i);
    expect(secondDesc).toBeInTheDocument();
  });

  test('shows create request button for companies not owned by the user', () => {
    render(
      <Provider store={store}>
        <CompaniesList companies={[]}/>
      </Provider>
    );

    expect(screen.getByText((content, element) =>
      content.startsWith('Create Request')
    )).toBeInTheDocument();
  });

  test('opens and closes modal on button click', () => {
    render(
      <Provider store={store}>
        <CompaniesList companies={[]}/>
      </Provider>
    );

    fireEvent.click(screen.getByText(/Create Request/i));
    expect(screen.getByText(/Create Request/i)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', {name: /close/i}));
    expect(screen.queryByText(/Create Request/i)).not.toBeInTheDocument();
  });
});
