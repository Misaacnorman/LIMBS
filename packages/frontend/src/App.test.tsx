import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

test('renders welcome message', () => {
  render(<App />);
  expect(screen.getByText(/Welcome to TestMate LIMS/i)).toBeInTheDocument();
});
