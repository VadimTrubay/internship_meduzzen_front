import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import AboutPage from "../pages/AboutPage/AboutPage";


describe('AboutPage Component', () => {
  test('renders AboutPage with correct content', () => {
    render(<AboutPage/>);

    expect(screen.getByText(/About/i)).toBeInTheDocument();

    expect(screen.getByText(/Meduzzen/)).toBeInTheDocument();
    expect(screen.getByText(/Outstaff and outsourcing agency/)).toBeInTheDocument();
    expect(screen.getByText(/Python \(Django, FastAPI, Flask\),/)).toBeInTheDocument();
    expect(screen.getByText(/JavaScript \(React, Vue, Angular\), AWS\./)).toBeInTheDocument();
  });
});
