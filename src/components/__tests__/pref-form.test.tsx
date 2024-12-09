import { render, screen, fireEvent } from '@testing-library/react';
import PrefForm from '../pref-form';

describe('PrefForm', () => {
  const mockBasicPrefs = ['Silicones', 'Sulfates'];
  const mockPreferences = {};
  const mockOnPreferenceChange = jest.fn();

  beforeEach(() => {
    mockOnPreferenceChange.mockClear();
  });

  it('renders all basic preferences', () => {
    render(
      <PrefForm
        basicprefs={mockBasicPrefs}
        preferences={mockPreferences}
        onPreferenceChange={mockOnPreferenceChange}
      />
    );

    mockBasicPrefs.forEach(pref => {
      expect(screen.getByText(pref)).toBeInTheDocument();
    });
  });

  it('calls onPreferenceChange when preferences are toggled', () => {
    render(
      <PrefForm
        basicprefs={mockBasicPrefs}
        preferences={mockPreferences}
        onPreferenceChange={mockOnPreferenceChange}
      />
    );

    fireEvent.click(screen.getByText('Silicones'));
    expect(mockOnPreferenceChange).toHaveBeenCalledWith('Silicones', true);
  });
});
