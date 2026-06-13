import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import DataTable from './index';

// Mock Axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('DataTable Component', () => {
  test('renders table headers and displays sales data from API correctly', async () => {
    // Mock Axios response
    mockedAxios.get.mockResolvedValue({
      data: {
        content: [
          {
            id: 1,
            visited: 15,
            deals: 8,
            amount: 23500.0,
            date: '2026-06-13T12:00:00Z',
            seller: { id: 1, name: 'Logan' },
          },
          {
            id: 2,
            visited: 20,
            deals: 12,
            amount: 35000.0,
            date: '2026-06-12T12:00:00Z',
            seller: { id: 2, name: 'Anakin' },
          }
        ],
        first: true,
        last: true,
        number: 0,
        totalPages: 1,
        totalElements: 2,
      }
    });

    render(<DataTable />);

    // Check if table headers exist
    expect(screen.getByText('Data')).toBeInTheDocument();
    expect(screen.getByText('Vendedor')).toBeInTheDocument();
    expect(screen.getByText('Clientes visitados')).toBeInTheDocument();
    expect(screen.getByText('Negócios fechados')).toBeInTheDocument();
    expect(screen.getByText('Valor')).toBeInTheDocument();

    // Wait for the API data to load and render
    await waitFor(() => {
      expect(screen.getByText('Logan')).toBeInTheDocument();
      expect(screen.getByText('Anakin')).toBeInTheDocument();
    });

    // Check values
    expect(screen.getByText('15')).toBeInTheDocument();
    expect(screen.getByText('8')).toBeInTheDocument();
    expect(screen.getByText('23500.00')).toBeInTheDocument();

    expect(screen.getByText('20')).toBeInTheDocument();
    expect(screen.getByText('12')).toBeInTheDocument();
    expect(screen.getByText('35000.00')).toBeInTheDocument();
  });
});
