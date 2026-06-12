import { render, screen } from '@testing-library/react';
import Footer from './index';

test('renders developer name in footer', () => {
  render(<Footer />);
  const element = screen.getByText(/Felipe Schirmann/i);
  expect(element).toBeInTheDocument();
});
