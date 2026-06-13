import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import DonutChart from './index';

// Mock react-apexcharts to record props
jest.mock('react-apexcharts', () => {
  return {
    __esModule: true,
    default: (props: any) => (
      <div data-testid="donut-chart-mock">
        <span data-testid="series-data">{props.series.join(',')}</span>
        <span data-testid="labels">{props.options.labels.join(',')}</span>
      </div>
    ),
  };
});

// Mock Axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('DonutChart Component', () => {
  test('fetches sales amount sums and renders donut chart correctly', async () => {
    mockedAxios.get.mockResolvedValue({
      data: [
        { sellerName: 'Logan', sum: 22000.0 },
        { sellerName: 'Anakin', sum: 44000.0 }
      ]
    });

    render(<DonutChart />);

    // Wait for mock chart to render
    await waitFor(() => {
      expect(screen.getByTestId('donut-chart-mock')).toBeInTheDocument();
    });

    // Check series (sums)
    expect(screen.getByTestId('series-data')).toHaveTextContent('22000,44000');

    // Check labels (sellers)
    expect(screen.getByTestId('labels')).toHaveTextContent('Logan,Anakin');
  });
});
