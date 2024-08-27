import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";

describe('NotFoundPage', () => {
  test('renders the 404 error message', () => {
    render(<NotFoundPage/>);

    expect(screen.getByText('404')).toBeInTheDocument();

    expect(screen.getByText("The page you’re looking for does’t exist.")).toBeInTheDocument();
  });

});
