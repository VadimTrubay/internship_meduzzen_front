import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom';
import {Provider} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';
import {store} from "../redux/store";
import RegistrationForm from "../pages/UserRegistrationPage/UserRegistrationPage";


describe('RegistrationForm', () => {
  const renderComponent = () => {
    return render(
      <Provider store={store}>
        <Router>
          <RegistrationForm/>
        </Router>
      </Provider>
    );
  };

  test('renders the registration form', () => {
    renderComponent();

    expect(screen.getByRole('button', {name: /register/i})).toBeInTheDocument();
    expect(screen.getByRole('button', {name: /register/i})).toBeDisabled();

    expect(screen.getByLabelText(/terms of service/i)).toBeInTheDocument();
  });

  test('enables the register button when terms are accepted', () => {
    renderComponent();

    const termsCheckbox = screen.getByLabelText(/terms of service/i);
    fireEvent.click(termsCheckbox);

    const registerButton = screen.getByRole('button', {name: /register/i});
    expect(registerButton).toBeEnabled();
  });

  test('displays validation errors on invalid form submission', async () => {
    renderComponent();

    const registerButton = screen.getByRole('button', {name: /register/i});
    const termsCheckbox = screen.getByLabelText(/terms of service/i);

    fireEvent.click(termsCheckbox);
    fireEvent.click(registerButton);

  });
});
