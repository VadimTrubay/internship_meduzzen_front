import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import User from "../components/User/User";
import {Table, TableBody, TableRow} from "@mui/material";


const mockUser: { id: string; email: string; username: string; password: string } = {
  id: '1',
  username: 'testuser',
  email: 'testuser@example.com',
  password: 'testpassword',
};

describe('User component', () => {
  test('renders user information correctly', () => {
    render(
      <Router>
        <Table>
          <TableBody>
            <TableRow>
              <User user={mockUser}/>
            </TableRow>
          </TableBody>
        </Table>
      </Router>
    );

    const link = screen.getByRole('link', {name: /testuser/i});
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/users/1');

    expect(screen.getByText(/testuser@example.com/i)).toBeInTheDocument();
  });

  test('should not render username and email if user is undefined', () => {
    render(
      <Router>
        <Table>
          <TableBody>
            <TableRow>
              <User user={undefined as any}/>
            </TableRow>
          </TableBody>
        </Table>
      </Router>
    );

    expect(screen.queryByText(/testuser/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/testuser@example.com/i)).not.toBeInTheDocument();
  });
});
