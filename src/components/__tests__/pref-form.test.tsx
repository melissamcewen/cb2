import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { act } from 'react';
import PrefForm from '../pref-form';
import { testCategories } from '@/data/testCategories';
import { categoryConfig } from '@/data/categories';

describe('PrefForm', () => {
  const defaultProps = {
    isAdvancedOpen: false,
    onAdvancedOpen: () => {},
  };

  it('renders configured main groups and categories', () => {
    render(
      <PrefForm
        categoryGroups={testCategories}
        preferences={{}}
        onPreferenceChange={() => {}}
        config={categoryConfig}
        {...defaultProps}
      />,
    );
    // Should show configured main group
    expect(screen.getByText('Silicones')).toBeInTheDocument();
    // Should show configured main category
    expect(screen.getByText('Sulfates')).toBeInTheDocument();
    // Should not show advanced categories
    expect(
      screen.queryByText('Water-soluble Silicones'),
    ).not.toBeInTheDocument();
  });

  it('renders category groups', () => {
    render(
      <PrefForm
        categoryGroups={testCategories}
        preferences={{}}
        onPreferenceChange={() => {}}
        config={categoryConfig}
        {...defaultProps}
      />,
    );
    expect(screen.getByText('Silicones')).toBeInTheDocument();
  });

  it('shows indeterminate state when some subcategories are checked', () => {
    const partialPreferences = {
      'Water-soluble Silicones': true,
      'Non-Water-soluble Silicones': false,
    };

    render(
      <PrefForm
        categoryGroups={testCategories}
        preferences={partialPreferences}
        onPreferenceChange={() => {}}
        config={categoryConfig}
        {...defaultProps}
      />,
    );

    const checkbox = screen.getByLabelText('Silicones');
    expect(checkbox).toHaveProperty('indeterminate', true);
  });

  it('shows checked state when all subcategories are checked', () => {
    const allCheckedPreferences = {
      'Water-soluble Silicones': true,
      'Non-Water-soluble Silicones': true,
    };

    render(
      <PrefForm
        categoryGroups={testCategories}
        preferences={allCheckedPreferences}
        onPreferenceChange={() => {}}
        config={categoryConfig}
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
        categoryGroups={testCategories}
        preferences={{}}
        onPreferenceChange={mockOnChange}
        config={categoryConfig}
        {...defaultProps}
      />,
    );

    // Click parent checkbox
    fireEvent.click(screen.getByLabelText('Silicones'));

    // Should update both subcategories
    expect(mockOnChange).toHaveBeenCalledWith('Water-soluble Silicones', true);
    expect(mockOnChange).toHaveBeenCalledWith(
      'Non-Water-soluble Silicones',
      true,
    );
  });

  it('unchecks all subcategories when checked parent is clicked', () => {
    const mockOnChange = jest.fn();
    const allCheckedPreferences = {
      'Water-soluble Silicones': true,
      'Non-Water-soluble Silicones': true,
    };

    render(
      <PrefForm
        categoryGroups={testCategories}
        preferences={allCheckedPreferences}
        onPreferenceChange={mockOnChange}
        config={categoryConfig}
        {...defaultProps}
      />,
    );

    // Click parent checkbox to uncheck
    fireEvent.click(screen.getByLabelText('Silicones'));

    // Should update both subcategories to false
    expect(mockOnChange).toHaveBeenCalledWith('Water-soluble Silicones', false);
    expect(mockOnChange).toHaveBeenCalledWith(
      'Non-Water-soluble Silicones',
      false,
    );
  });

  it('shows More options button only when advanced is not open', () => {
    // Set up partial preferences to create indeterminate state
    const partialPreferences = {
      'Water-soluble Silicones': true,
      'Non-Water-soluble Silicones': false,
    };

    const { rerender } = render(
      <PrefForm
        categoryGroups={testCategories}
        preferences={partialPreferences}
        onPreferenceChange={() => {}}
        config={categoryConfig}
        isAdvancedOpen={false}
        onAdvancedOpen={() => {}}
      />,
    );

    // Should show More options when advanced is closed AND state is indeterminate
    expect(screen.getByText(/more options/i)).toBeInTheDocument();

    // Rerender with advanced open
    rerender(
      <PrefForm
        categoryGroups={testCategories}
        preferences={partialPreferences}
        onPreferenceChange={() => {}}
        config={categoryConfig}
        isAdvancedOpen={true}
        onAdvancedOpen={() => {}}
      />,
    );

    // Should not show More options when advanced is open
    expect(screen.queryByText(/more options/i)).not.toBeInTheDocument();

    // Additional test case: when all checked, no More options even when closed
    rerender(
      <PrefForm
        categoryGroups={testCategories}
        preferences={{
          'Water-soluble Silicones': true,
          'Non-Water-soluble Silicones': true,
        }}
        onPreferenceChange={() => {}}
        config={categoryConfig}
        isAdvancedOpen={false}
        onAdvancedOpen={() => {}}
      />,
    );

    // Should not show More options when all checked, even if advanced is closed
    expect(screen.queryByText(/more options/i)).not.toBeInTheDocument();
  });
});
