import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react';
import AdvancedForm from '../advanced-form';
import { AdvancedCategory } from '../../types';

const mockAdvancedCategories: Record<string, AdvancedCategory> = {
  'water-soluble': {
    name: 'Water Soluble Silicones',
    description: 'Test description',
    parentGroup: 'silicones'
  },
  'non-water-soluble': {
    name: 'Non-water Soluble Silicones',
    description: 'Test description',
    parentGroup: 'silicones'
  },
  'waxes': {
    name: 'Waxes',
    description: 'Test description',
    parentGroup: ''
  },
  'soap': {
    name: 'Soap',
    description: 'Test description',
    parentGroup: ''
  }
};

describe('AdvancedForm', () => {
  it('shows more options when button is clicked', async () => {
    render(
      <AdvancedForm
        preferences={{}}
        onPreferenceChange={() => {}}
        advancedCategories={mockAdvancedCategories}
      />
    );

    // Initially options should be hidden
    expect(screen.queryByText('Water Soluble Silicones')).not.toBeInTheDocument();

    // Click to show options
    await act(async () => {
      fireEvent.click(screen.getByText(/more options/i));
    });

    // Options should now be visible
    expect(screen.getByText('Water Soluble Silicones')).toBeInTheDocument();
    expect(screen.getByText('Non-water Soluble Silicones')).toBeInTheDocument();
  });

  it('reflects checked state from preferences', async () => {
    const mockPreferences = {
      'water-soluble': true,
      'non-water-soluble': false
    };

    render(
      <AdvancedForm
        preferences={mockPreferences}
        onPreferenceChange={() => {}}
        advancedCategories={mockAdvancedCategories}
      />
    );

    // Show options
    await act(async () => {
      fireEvent.click(screen.getByText(/more options/i));
    });

    // Check correct boxes are checked
    expect(screen.getByLabelText('Water Soluble Silicones')).toBeChecked();
    expect(screen.getByLabelText('Non-water Soluble Silicones')).not.toBeChecked();
  });

  it('calls onPreferenceChange when option is toggled', async () => {
    const mockOnChange = jest.fn();
    render(
      <AdvancedForm
        preferences={{}}
        onPreferenceChange={mockOnChange}
        advancedCategories={mockAdvancedCategories}
      />
    );

    // Show options
    await act(async () => {
      fireEvent.click(screen.getByText(/more options/i));
    });

    // Toggle an option
    fireEvent.click(screen.getByLabelText('Water Soluble Silicones'));
    expect(mockOnChange).toHaveBeenCalledWith('water-soluble', true);
  });

  it('toggles visibility with button text', async () => {
    render(
      <AdvancedForm
        preferences={{}}
        onPreferenceChange={() => {}}
        advancedCategories={mockAdvancedCategories}
      />
    );

    const button = screen.getByRole('button');
    expect(button).toHaveTextContent(/more options/i);

    await act(async () => {
      fireEvent.click(button);
    });
    expect(button).toHaveTextContent(/less options/i);

    await act(async () => {
      fireEvent.click(button);
    });
    expect(button).toHaveTextContent(/more options/i);
  });
});
