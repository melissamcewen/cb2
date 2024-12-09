import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { act } from 'react';
import PrefForm from '../pref-form';
import { CategoryGroup, AdvancedCategory } from '../../types';

const mockCategoryGroups: Record<string, CategoryGroup> = {
  silicones: {
    name: 'Silicones',
    description: 'Test description',
    categories: {}
  }
};

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
  }
};

describe('PrefForm', () => {
  it('renders category groups', () => {
    render(
      <PrefForm
        categoryGroups={mockCategoryGroups}
        preferences={{}}
        onPreferenceChange={() => {}}
        advancedCategories={mockAdvancedCategories}
      />
    );
    expect(screen.getByText('Silicones')).toBeInTheDocument();
  });

  it('shows indeterminate state when some subcategories are checked', () => {
    const partialPreferences = {
      'water-soluble': true,
      'non-water-soluble': false
    };

    render(
      <PrefForm
        categoryGroups={mockCategoryGroups}
        preferences={partialPreferences}
        onPreferenceChange={() => {}}
        advancedCategories={mockAdvancedCategories}
      />
    );

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveProperty('indeterminate', true);
  });

  it('shows checked state when all subcategories are checked', () => {
    const allCheckedPreferences = {
      'water-soluble': true,
      'non-water-soluble': true
    };

    render(
      <PrefForm
        categoryGroups={mockCategoryGroups}
        preferences={allCheckedPreferences}
        onPreferenceChange={() => {}}
        advancedCategories={mockAdvancedCategories}
      />
    );

    const checkbox = screen.getByRole('checkbox');
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
        advancedCategories={mockAdvancedCategories}
      />
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
      'non-water-soluble': true
    };

    render(
      <PrefForm
        categoryGroups={mockCategoryGroups}
        preferences={allCheckedPreferences}
        onPreferenceChange={mockOnChange}
        advancedCategories={mockAdvancedCategories}
      />
    );

    // Click parent checkbox to uncheck
    fireEvent.click(screen.getByLabelText('Silicones'));

    // Should update both subcategories to false
    expect(mockOnChange).toHaveBeenCalledWith('water-soluble', false);
    expect(mockOnChange).toHaveBeenCalledWith('non-water-soluble', false);
  });
});
