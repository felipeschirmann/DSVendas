import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Home from './index';

describe('Home Page', () => {
  test('renders Home page components and title correctly', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    
    // Check if the page title is present
    expect(screen.getByText('DSVendas')).toBeInTheDocument();
    
    // Check if the lead text is present
    expect(screen.getByText(/Analise o desempenho/i)).toBeInTheDocument();
    
    // Check if the CTA button link is present
    const ctaButton = screen.getByText('Acessar o Dashboard');
    expect(ctaButton).toBeInTheDocument();
    expect(ctaButton).toHaveAttribute('href', '/dashboard');
  });
});
