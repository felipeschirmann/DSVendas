import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import NavBar from './index';

describe('NavBar Component', () => {
  test('renders logo image and points to home path', () => {
    render(
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>
    );
    
    // Check if the logo image is present
    const logoImg = screen.getByAltText(/DevSuperior/i);
    expect(logoImg).toBeInTheDocument();
    
    // Check if the logo link wraps the image and redirects to "/"
    const linkElement = logoImg.closest('a');
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', '/');
  });
});
