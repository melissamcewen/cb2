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
  const defaultProps = {
    isOpen: false,
    onOpenChange: () => {},
  };

  it('shows/hides content based on isOpen prop', async () => {
    const mockOnOpenChange = jest.fn();
    const { rerender } = render(
      <AdvancedForm
        preferences={{}}
        onPreferenceChange={() => {}}
        categoryGroups={mockCategoryGroups}
        config={mockConfig}
        isOpen={false}
        onOpenChange={mockOnOpenChange}
      />,
    );

    // Initially options should be hidden
    expect(
      screen.queryByText('Water Soluble Silicones'),
    ).not.toBeInTheDocument();

    // Click button should call onOpenChange
    fireEvent.click(screen.getByText(/more options/i));
    expect(mockOnOpenChange).toHaveBeenCalledWith(true);

    // Rerender with isOpen=true
    rerender(
      <AdvancedForm
        preferences={{}}
        onPreferenceChange={() => {}}
        categoryGroups={mockCategoryGroups}
        config={mockConfig}
        isOpen={true}
        onOpenChange={mockOnOpenChange}
      />,
    );

    // Options should now be visible
    expect(screen.getByText('Water Soluble Silicones')).toBeInTheDocument();
    expect(screen.getByText('Non-water Soluble Silicones')).toBeInTheDocument();
    expect(screen.getByText('Waxes')).toBeInTheDocument();
    expect(screen.getByText('Soap')).toBeInTheDocument();

    // Button text should change
    expect(screen.getByRole('button')).toHaveTextContent(/less options/i);
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
        isOpen={true}
        onOpenChange={() => {}}
      />,
    );

    // Check correct boxes are checked
    expect(screen.getByLabelText('Water Soluble Silicones')).toBeChecked();
    expect(
      screen.getByLabelText('Non-water Soluble Silicones'),
    ).not.toBeChecked();
  });

  it('calls onPreferenceChange when option is toggled', () => {
    const mockOnChange = jest.fn();
    render(
      <AdvancedForm
        preferences={{}}
        onPreferenceChange={mockOnChange}
        categoryGroups={mockCategoryGroups}
        config={mockConfig}
        isOpen={true}
        onOpenChange={() => {}}
      />,
    );

    // Toggle an option
    fireEvent.click(screen.getByLabelText('Water Soluble Silicones'));
    expect(mockOnChange).toHaveBeenCalledWith('water-soluble', true);
  });

  it('shows correct button text based on isOpen state', () => {
    const { rerender } = render(
      <AdvancedForm
        preferences={{}}
        onPreferenceChange={() => {}}
        categoryGroups={mockCategoryGroups}
        config={mockConfig}
        isOpen={false}
        onOpenChange={() => {}}
      />,
    );

    expect(screen.getByRole('button')).toHaveTextContent(/more options/i);

    rerender(
      <AdvancedForm
        preferences={{}}
        onPreferenceChange={() => {}}
        categoryGroups={mockCategoryGroups}
        config={mockConfig}
        isOpen={true}
        onOpenChange={() => {}}
      />,
    );

    expect(screen.getByRole('button')).toHaveTextContent(/less options/i);
  });
});
