import { render, screen } from '@testing-library/react';
import ResultsCard from '../results-card';
import { ResultState } from '../../types';

describe('ResultsCard', () => {
  const mockProps = {
    title: 'Test Title',
    message: 'Test Message',
  };

  it('renders info state correctly', () => {
    render(
      <ResultsCard
        {...mockProps}
        state={ResultState.INFO}
      />
    );

    const card = screen.getByTestId('results-card');
    expect(card).toHaveClass('bg-info');
    expect(screen.getByText(mockProps.message)).toBeInTheDocument();
  });

  it('renders warning state correctly', () => {
    render(
      <ResultsCard
        {...mockProps}
        state={ResultState.WARNING}
      />
    );

    const card = screen.getByTestId('results-card');
    expect(card).toHaveClass('bg-warning');
  });

  it('renders caution state correctly', () => {
    render(
      <ResultsCard
        {...mockProps}
        state={ResultState.CAUTION}
      />
    );

    const card = screen.getByTestId('results-card');
    expect(card).toHaveClass('bg-error');
  });

  it('renders action buttons', () => {
    render(
      <ResultsCard
        {...mockProps}
        state={ResultState.INFO}
      />
    );

    expect(screen.getByText('New Analysis')).toBeInTheDocument();
    expect(screen.getByText('Get Product Recommendations')).toBeInTheDocument();
  });

  it('renders with different states', () => {
    const { rerender } = render(
      <ResultsCard
        {...mockProps}
        state={ResultState.INFO}
      />
    );

    expect(screen.getByTestId('results-card')).toHaveClass('bg-info');

    rerender(
      <ResultsCard
        {...mockProps}
        state={ResultState.WARNING}
      />
    );
    expect(screen.getByTestId('results-card')).toHaveClass('bg-warning');

    rerender(
      <ResultsCard
        {...mockProps}
        state={ResultState.CAUTION}
      />
    );
    expect(screen.getByTestId('results-card')).toHaveClass('bg-error');
  });
});
