import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Dashboard from './index';

// Mock sub-components to isolate page layout testing
jest.mock('components/BarChart', () => () => <div data-testid="bar-chart">Bar Chart</div>);
jest.mock('components/DonutChart', () => () => <div data-testid="donut-chart">Donut Chart</div>);
jest.mock('components/DataTable', () => () => <div data-testid="data-table">Data Table</div>);

describe('Dashboard Page', () => {
  test('renders Dashboard page layout and sub-components correctly', () => {
    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );

    // Check if the page title is present
    expect(screen.getByText('Dashboard de vendas')).toBeInTheDocument();

    // Check if the mocked sub-components are rendered
    expect(screen.getByTestId('bar-chart')).toBeInTheDocument();
    expect(screen.getByTestId('donut-chart')).toBeInTheDocument();
    expect(screen.getByTestId('data-table')).toBeInTheDocument();
  });
});
