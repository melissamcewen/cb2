import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { act } from 'react';
import PrefForm from '../pref-form';
import type { CategoryGroup } from 'haircare-ingredients-analyzer';
import type { CategoryConfig } from '@/types';

const mockCategoryGroups: Record<string, CategoryGroup> = {
  silicones: {
    name: 'Silicones',
    description: 'Test description',
    categories: {
      'water-soluble': {
        name: 'Water Soluble',
        description: 'Test description',
      },
      'non-water-soluble': {
        name: 'Non-water Soluble',
        description: 'Test description',
      },
    },
  },
  sulfates: {
    name: 'Sulfates',
    description: 'Test description',
    categories: {
      sulfates: {
        name: 'Sulfates',
        description: 'Test description',
      },
    },
  },
};

const mockConfig: CategoryConfig = {
  mainGroups: ['silicones'],
  mainCategories: ['sulfates'],
  advancedCategories: ['water-soluble', 'non-water-soluble'],
};

describe('PrefForm', () => {
  const defaultProps = {
    isAdvancedOpen: false,
    onAdvancedOpen: () => {},
  };

  it('renders configured main groups and categories', () => {
    render(
      <PrefForm
        categoryGroups={mockCategoryGroups}
        preferences={{}}
        onPreferenceChange={() => {}}
        config={mockConfig}
        {...defaultProps}
      />,
    );
    // Should show configured main group
    expect(screen.getByText('Silicones')).toBeInTheDocument();
    // Should show configured main category
    expect(screen.getByText('Sulfates')).toBeInTheDocument();
    // Should not show advanced categories
    expect(screen.queryByText('Water Soluble')).not.toBeInTheDocument();
  });

  it('renders category groups', () => {
    render(
      <PrefForm
        categoryGroups={mockCategoryGroups}
        preferences={{}}
        onPreferenceChange={() => {}}
        config={mockConfig}
        {...defaultProps}
      />,
    );
    expect(screen.getByText('Silicones')).toBeInTheDocument();
  });

  it('shows indeterminate state when some subcategories are checked', () => {
    const partialPreferences = {
      'water-soluble': true,
      'non-water-soluble': false,
    };

    render(
      <PrefForm
        categoryGroups={mockCategoryGroups}
        preferences={partialPreferences}
        onPreferenceChange={() => {}}
        config={mockConfig}
        {...defaultProps}
      />,
    );

    const checkbox = screen.getByLabelText('Silicones');
    expect(checkbox).toHaveProperty('indeterminate', true);
  });

  it('shows checked state when all subcategories are checked', () => {
    const allCheckedPreferences = {
      'water-soluble': true,
      'non-water-soluble': true,
    };

    render(
      <PrefForm
        categoryGroups={mockCategoryGroups}
        preferences={allCheckedPreferences}
        onPreferenceChange={() => {}}
        config={mockConfig}
        {...defaultProps}
      />,
    );

    // Get specifically the Silicones checkbox
    const checkbox = screen.getByLabelText('Silicones');
    expect(checkbox).toBeChecked();
    expect(checkbox).toHaveProperty('indeterminate', false);
  });

  it('updates all subcategories when parent is clicked', () => {
    const mockOnChange = jest.fn();
    render(
      <PrefForm
        categoryGroups={mockCategoryGroups}
        preferences={{}}
        onPreferenceChange={mockOnChange}
        config={mockConfig}
        {...defaultProps}
      />,
    );

    // Click parent checkbox
    fireEvent.click(screen.getByLabelText('Silicones'));

    // Should update both subcategories
    expect(mockOnChange).toHaveBeenCalledWith('water-soluble', true);
    expect(mockOnChange).toHaveBeenCalledWith('non-water-soluble', true);
  });

  it('unchecks all subcategories when checked parent is clicked', () => {
    const mockOnChange = jest.fn();
    const allCheckedPreferences = {
      'water-soluble': true,
      'non-water-soluble': true,
    };

    render(
      <PrefForm
        categoryGroups={mockCategoryGroups}
        preferences={allCheckedPreferences}
        onPreferenceChange={mockOnChange}
        config={mockConfig}
        {...defaultProps}
      />,
    );

    // Click parent checkbox to uncheck
    fireEvent.click(screen.getByLabelText('Silicones'));

    // Should update both subcategories to false
    expect(mockOnChange).toHaveBeenCalledWith('water-soluble', false);
    expect(mockOnChange).toHaveBeenCalledWith('non-water-soluble', false);
  });

  it('shows More options button only when advanced is not open', () => {
    // Set up partial preferences to create indeterminate state
    const partialPreferences = {
      'water-soluble': true,
      'non-water-soluble': false,
    };

    const { rerender } = render(
      <PrefForm
        categoryGroups={mockCategoryGroups}
        preferences={partialPreferences}  // Use partial preferences
        onPreferenceChange={() => {}}
        config={mockConfig}
        isAdvancedOpen={false}
        onAdvancedOpen={() => {}}
      />,
    );

    // Should show More options when advanced is closed AND state is indeterminate
    expect(screen.getByText('More options')).toBeInTheDocument();

    // Rerender with advanced open
    rerender(
      <PrefForm
        categoryGroups={mockCategoryGroups}
        preferences={partialPreferences}  // Keep partial preferences
        onPreferenceChange={() => {}}
        config={mockConfig}
        isAdvancedOpen={true}
        onAdvancedOpen={() => {}}
      />,
    );

    // Should not show More options when advanced is open
    expect(screen.queryByText('More options')).not.toBeInTheDocument();

    // Additional test case: when all checked, no More options even when closed
    rerender(
      <PrefForm
        categoryGroups={mockCategoryGroups}
        preferences={{
          'water-soluble': true,
          'non-water-soluble': true,
        }}
        onPreferenceChange={() => {}}
        config={mockConfig}
        isAdvancedOpen={false}
        onAdvancedOpen={() => {}}
      />,
    );

    // Should not show More options when all checked, even if advanced is closed
    expect(screen.queryByText('More options')).not.toBeInTheDocument();
  });
});
