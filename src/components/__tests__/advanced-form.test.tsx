import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react';
import AdvancedForm from '../advanced-form';
import type { CategoryGroup } from 'haircare-ingredients-analyzer';
import { testCategories } from '@/data/testCategories';
import { categoryConfig } from '@/data/categories';

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
        categoryGroups={testCategories}
        config={categoryConfig}
        isOpen={false}
        onOpenChange={mockOnOpenChange}
      />,
    );

    // Initially options should be hidden
    expect(
      screen.queryByText('Water-soluble Silicones'),
    ).not.toBeInTheDocument();

    // Click button should call onOpenChange
    fireEvent.click(screen.getByText(/more options/i));
    expect(mockOnOpenChange).toHaveBeenCalledWith(true);

    // Rerender with isOpen=true
    rerender(
      <AdvancedForm
        preferences={{}}
        onPreferenceChange={() => {}}
        categoryGroups={testCategories}
        config={categoryConfig}
        isOpen={true}
        onOpenChange={mockOnOpenChange}
      />,
    );

    // Options should now be visible
    expect(screen.getByText('Water-soluble Silicones')).toBeInTheDocument();
    expect(screen.getByText('Non-Water-soluble Silicones')).toBeInTheDocument();
    expect(screen.getByText('Waxes')).toBeInTheDocument();
    expect(screen.getByText('Soap')).toBeInTheDocument();

    // Button text should change
    expect(screen.getByRole('button')).toHaveTextContent(/less options/i);
  });

  it('reflects checked state from preferences', async () => {
    const mockPreferences = {
      'Water-soluble Silicones': true,
      'Non-Water-soluble Silicones': false,
    };

    render(
      <AdvancedForm
        preferences={mockPreferences}
        onPreferenceChange={() => {}}
        categoryGroups={testCategories}
        config={categoryConfig}
        isOpen={true}
        onOpenChange={() => {}}
      />,
    );

    // Check correct boxes are checked
    expect(screen.getByLabelText('Water-soluble Silicones')).toBeChecked();
    expect(
      screen.getByLabelText('Non-Water-soluble Silicones'),
    ).not.toBeChecked();
  });

  it('calls onPreferenceChange when option is toggled', () => {
    const mockOnChange = jest.fn();
    render(
      <AdvancedForm
        preferences={{}}
        onPreferenceChange={mockOnChange}
        categoryGroups={testCategories}
        config={categoryConfig}
        isOpen={true}
        onOpenChange={() => {}}
      />,
    );

    // Toggle an option
    fireEvent.click(screen.getByLabelText('Water-soluble Silicones'));
    expect(mockOnChange).toHaveBeenCalledWith('Water-soluble Silicones', true);
  });

  it('shows correct button text based on isOpen state', () => {
    const { rerender } = render(
      <AdvancedForm
        preferences={{}}
        onPreferenceChange={() => {}}
        categoryGroups={testCategories}
        config={categoryConfig}
        isOpen={false}
        onOpenChange={() => {}}
      />,
    );

    expect(screen.getByRole('button')).toHaveTextContent(/more options/i);

    rerender(
      <AdvancedForm
        preferences={{}}
        onPreferenceChange={() => {}}
        categoryGroups={testCategories}
        config={categoryConfig}
        isOpen={true}
        onOpenChange={() => {}}
      />,
    );

    expect(screen.getByRole('button')).toHaveTextContent(/less options/i);
  });
});
