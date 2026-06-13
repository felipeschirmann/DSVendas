import { render, screen } from '@testing-library/react';
import Footer from './index';

describe('Footer Component', () => {
  test('renders developer name and school link correctly', () => {
    render(<Footer />);
    
    // Check if the developer name is present in the document
    const developerLink = screen.getByText(/Felipe Schirmann/i);
    expect(developerLink).toBeInTheDocument();
    expect(developerLink.closest('a')).toHaveAttribute('href', 'https://github.com/felipeschirmann');
    
    // Check if school reference is present in the document
    const schoolLink = screen.getByText(/@devsuperior.ig/i);
    expect(schoolLink).toBeInTheDocument();
    expect(schoolLink.closest('a')).toHaveAttribute('href', 'https://instagram.com/devsuperior.ig');
  });
});
