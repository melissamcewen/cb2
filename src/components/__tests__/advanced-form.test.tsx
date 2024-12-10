import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react';
import AdvancedForm from '../advanced-form';
import type { CategoryGroup } from 'haircare-ingredients-analyzer';
import type { CategoryConfig } from '@/types';

const mockCategoryGroups: Record<string, CategoryGroup> = {
  silicones: {
    name: 'Silicones',
    description: 'Test description',
    categories: {
      'water-soluble': {
        name: 'Water Soluble Silicones',
        description: 'Test description',
      },
      'non-water-soluble': {
        name: 'Non-water Soluble Silicones',
        description: 'Test description',
      },
    },
  },
  other: {
    name: 'Other',
    description: 'Test description',
    categories: {
      waxes: {
        name: 'Waxes',
        description: 'Test description',
      },
      soap: {
        name: 'Soap',
        description: 'Test description',
      },
    },
  },
};

const mockConfig: CategoryConfig = {
  mainGroups: ['silicones'],
  mainCategories: ['sulfates'],
  advancedCategories: ['water-soluble', 'non-water-soluble', 'waxes', 'soap'],
};

describe('AdvancedForm', () => {
  it('shows only configured advanced options when button is clicked', async () => {
    render(
      <AdvancedForm
        preferences={{}}
        onPreferenceChange={() => {}}
        categoryGroups={mockCategoryGroups}
        config={mockConfig}
      />,
    );

    // Initially options should be hidden
    expect(screen.queryByText('Water Soluble Silicones')).not.toBeInTheDocument();

    // Click to show options
    await act(async () => {
      fireEvent.click(screen.getByText(/more options/i));
    });

    // Should show configured advanced options
    expect(screen.getByText('Water Soluble Silicones')).toBeInTheDocument();
    expect(screen.getByText('Non-water Soluble Silicones')).toBeInTheDocument();
    expect(screen.getByText('Waxes')).toBeInTheDocument();
    expect(screen.getByText('Soap')).toBeInTheDocument();
  });

  it('reflects checked state from preferences', async () => {
    const mockPreferences = {
      'water-soluble': true,
      'non-water-soluble': false,
    };

    render(
      <AdvancedForm
        preferences={mockPreferences}
        onPreferenceChange={() => {}}
        categoryGroups={mockCategoryGroups}
        config={mockConfig}
      />,
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
        categoryGroups={mockCategoryGroups}
        config={mockConfig}
      />,
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
        categoryGroups={mockCategoryGroups}
        config={mockConfig}
      />,
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
