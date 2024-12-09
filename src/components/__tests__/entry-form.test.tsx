import { render, screen, fireEvent } from '@testing-library/react';
import EntryForm from '../entry-form';

describe('EntryForm', () => {
  it('calls onAnalyze when analyze button is clicked', () => {
    const mockOnAnalyze = jest.fn();
    render(<EntryForm onAnalyze={mockOnAnalyze} />);

    fireEvent.click(screen.getByText('Analyze'));
    expect(mockOnAnalyze).toHaveBeenCalled();
  });

  it('renders textarea for ingredients', () => {
    render(<EntryForm onAnalyze={() => {}} />);
    expect(screen.getByPlaceholderText('Paste your ingredients list here')).toBeInTheDocument();
  });
});
