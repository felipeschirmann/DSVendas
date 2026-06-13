import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import BarChart from './index';

// Mock react-apexcharts to record props
jest.mock('react-apexcharts', () => {
  return {
    __esModule: true,
    default: (props: any) => (
      <div data-testid="bar-chart-mock">
        <span data-testid="series-name">{props.series[0].name}</span>
        <span data-testid="series-data">{props.series[0].data.join(',')}</span>
        <span data-testid="categories">{props.options.xaxis.categories.join(',')}</span>
      </div>
    ),
  };
});

// Mock Axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('BarChart Component', () => {
  test('fetches sales success rates and renders bar chart correctly', async () => {
    mockedAxios.get.mockResolvedValue({
      data: [
        { sellerName: 'Logan', visited: 10, deals: 5 },
        { sellerName: 'Anakin', visited: 20, deals: 15 }
      ]
    });

    render(<BarChart />);

    // Wait for mock chart to render
    await waitFor(() => {
      expect(screen.getByTestId('bar-chart-mock')).toBeInTheDocument();
    });

    // Check series name
    expect(screen.getByTestId('series-name')).toHaveTextContent('% Sucesso');

    // Check success rates: Logan is 50.0% (5/10), Anakin is 75.0% (15/20)
    expect(screen.getByTestId('series-data')).toHaveTextContent('50,75');

    // Check categories (sellers)
    expect(screen.getByTestId('categories')).toHaveTextContent('Logan,Anakin');
  });
});
