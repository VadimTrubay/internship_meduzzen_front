import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { fetchCompanyById } from "../redux/companies/operations";
import { store } from "../redux/store";
import CompanyProfilePage from "../pages/CompanyProfilePage/CompanyProfilePage";
import { getCompanyByIdApi } from "../api/apiCompanies";
import { selectUser } from "../redux/auth/selectors";
import { CompanyType } from '../types/companiesTypes';
import { UserType } from '../types/usersTypes';

jest.mock('../api/apiCompanies');
jest.mock('../redux/auth/selectors');

describe('fetchCompanyById thunk', () => {
  it('dispatches the correct actions on success', async () => {
    const mockData: CompanyType = { id: '1', name: 'Test Company', description: 'This is a test company.', visible: true, owner_id: 'user1' };
    (getCompanyByIdApi as jest.Mock).mockResolvedValueOnce({ data: mockData });

    const dispatch = jest.fn();
    const thunk = fetchCompanyById('1');
    await thunk(dispatch, () => ({}), undefined);

  });

  it('dispatches the correct actions on failure', async () => {
    const mockError = { response: { data: { detail: 'Error fetching company' } } };
    (getCompanyByIdApi as jest.Mock).mockRejectedValueOnce(mockError);

    const dispatch = jest.fn();
    const thunk = fetchCompanyById('1');
    await thunk(dispatch, () => ({}), undefined);

    expect(dispatch).toHaveBeenCalledWith({
      type: 'companies/fetchCompanyById/rejected',
      payload: 'Error fetching company',
      error: expect.anything(),
    });
  });
});

const renderComponent = () =>
  render(
    <Provider store={store}>
      <Router>
        <CompanyProfilePage />
      </Router>
    </Provider>
  );

describe('CompanyProfilePage', () => {
  beforeEach(() => {
    const mockData: CompanyType = { id: '1', name: 'Test Company', description: 'This is a test company.', visible: true, owner_id: 'user1' };
    (getCompanyByIdApi as jest.Mock).mockResolvedValueOnce({ data: mockData });
  });

  test('renders the company profile page', async () => {
    renderComponent();

    expect(await screen.findByText(/company profile/i)).toBeInTheDocument();
    expect(screen.getByText(/name:/i)).toBeInTheDocument();
    expect(screen.getByText(/description:/i)).toBeInTheDocument();
    expect(screen.getByText(/visible:/i)).toBeInTheDocument();
  });

  test('renders the company data correctly', async () => {
    renderComponent();

    expect(await screen.findByText('Test Company')).toBeInTheDocument();
    expect(screen.getByText('This is a test company.')).toBeInTheDocument();
    expect(screen.getByText(/members/i)).toBeInTheDocument();
    expect(screen.getByText(/quizzes/i)).toBeInTheDocument();
  });

  test('shows edit and delete buttons for the company owner', async () => {
    const mockOwnerUser: { id: string; username: string } = { id: 'user1', username: 'Owner' };
    (selectUser as jest.Mock).mockReturnValue(mockOwnerUser);

    renderComponent();

    expect(await screen.findByRole('button', { name: /edit/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /delete/i })).toBeInTheDocument();
  });

  test('opens edit company modal on edit button click', async () => {
    const mockOwnerUser: { id: string; username: string } = { id: 'user1', username: 'Owner' };
    (selectUser as jest.Mock).mockReturnValue(mockOwnerUser);

    renderComponent();

    const editButton = await screen.findByRole('button', { name: /edit/i });
    fireEvent.click(editButton);

    expect(await screen.findByText(/edit company/i)).toBeInTheDocument();
    expect(screen.getByText(/name:/i)).toBeInTheDocument();
    expect(screen.getByText(/description:/i)).toBeInTheDocument();
  });

  test('opens delete confirmation modal on delete button click', async () => {
    const mockOwnerUser: { id: string; username: string } = { id: 'user1', username: 'Owner' };
    (selectUser as jest.Mock).mockReturnValue(mockOwnerUser);

    renderComponent();

    const deleteButton = await screen.findByRole('button', { name: /delete/i });
    fireEvent.click(deleteButton);

    expect(await screen.findByText(/delete company/i)).toBeInTheDocument();
    expect(screen.getByText(/are you sure you want to delete this company?/i)).toBeInTheDocument();
  });

  test('does not show edit and delete buttons for non-owner user', async () => {
    const nonOwnerUser: { id: string; username: string } = { id: 'user2', username: 'Non-Owner' };
    (selectUser as jest.Mock).mockReturnValue(nonOwnerUser);

    renderComponent();

    expect(screen.queryByRole('button', { name: /edit/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /delete/i })).not.toBeInTheDocument();
  });
});
