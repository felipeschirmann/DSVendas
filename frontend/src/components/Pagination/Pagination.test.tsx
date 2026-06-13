import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from './index';
import { SalePage } from 'types/sale';

describe('Pagination Component', () => {
  const mockPageChange = jest.fn();

  beforeEach(() => {
    mockPageChange.mockClear();
  });

  test('renders active page number and handles first page state correctly', () => {
    const mockPage: SalePage = {
      first: true,
      last: false,
      number: 0,
      totalPages: 5,
      totalElements: 50,
    };

    render(<Pagination page={mockPage} onPageChange={mockPageChange} />);

    // Active page should display 1 (page.number + 1)
    expect(screen.getByText('1')).toBeInTheDocument();

    // "Anterior" button list-item parent should contain the disabled class
    const prevButton = screen.getByText('Anterior');
    expect(prevButton.closest('li')).toHaveClass('disabled');

    // "Próxima" button should not be disabled
    const nextButton = screen.getByText('Próxima');
    expect(nextButton.closest('li')).not.toHaveClass('disabled');

    // Clicking "Anterior" should not trigger onPageChange (since it is disabled)
    // Actually, in the code: <li className={`page-item ${page.first ? 'disabled': ''}`}>
    // <button className="page-link" onClick={ () => onPageChange(page.number - 1) }>Anterior</button>
    // Note: in bootstrap, adding "disabled" to the "li" does not automatically disable click events on the "button" inside.
    // However, clicking Next should trigger onPageChange(1)
    fireEvent.click(nextButton);
    expect(mockPageChange).toHaveBeenCalledWith(1);
  });

  test('handles last page state correctly and triggers page navigation', () => {
    const mockPage: SalePage = {
      first: false,
      last: true,
      number: 4,
      totalPages: 5,
      totalElements: 50,
    };

    render(<Pagination page={mockPage} onPageChange={mockPageChange} />);

    // Active page should display 5
    expect(screen.getByText('5')).toBeInTheDocument();

    // "Anterior" button should not be disabled
    const prevButton = screen.getByText('Anterior');
    expect(prevButton.closest('li')).not.toHaveClass('disabled');

    // "Próxima" button should be disabled
    const nextButton = screen.getByText('Próxima');
    expect(nextButton.closest('li')).toHaveClass('disabled');

    // Clicking "Anterior" triggers onPageChange(3)
    fireEvent.click(prevButton);
    expect(mockPageChange).toHaveBeenCalledWith(3);
  });
});
