import React from 'react';
import { render, screen } from '@testing-library/react';
import LogIn from '../components/Login';

test('renders learn react link', () => {
  render(<LogIn />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
