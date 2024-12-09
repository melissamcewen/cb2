import { render, screen, fireEvent } from '@testing-library/react';
import Checkbox from '../checkbox';

describe('Checkbox', () => {
  it('renders with label', () => {
    render(<Checkbox label="Test Label" onChange={() => {}} />);
    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  it('calls onChange when clicked', () => {
    const mockOnChange = jest.fn();
    render(<Checkbox label="Test Label" onChange={mockOnChange} />);

    fireEvent.click(screen.getByRole('checkbox'));
    expect(mockOnChange).toHaveBeenCalledWith(true);

    fireEvent.click(screen.getByRole('checkbox'));
    expect(mockOnChange).toHaveBeenCalledWith(false);
  });
});
