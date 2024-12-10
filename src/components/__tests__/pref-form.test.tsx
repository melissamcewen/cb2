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
  it('renders configured main groups and categories', () => {
    render(
      <PrefForm
        categoryGroups={mockCategoryGroups}
        preferences={{}}
        onPreferenceChange={() => {}}
        config={mockConfig}
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
      />,
    );

    // Click parent checkbox to uncheck
    fireEvent.click(screen.getByLabelText('Silicones'));

    // Should update both subcategories to false
    expect(mockOnChange).toHaveBeenCalledWith('water-soluble', false);
    expect(mockOnChange).toHaveBeenCalledWith('non-water-soluble', false);
  });
});
