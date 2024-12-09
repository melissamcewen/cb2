import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { act } from 'react';
import AdvancedForm from '../advanced-form';

describe('AdvancedForm', () => {
  const mockPreferences = {};
  const mockOnPreferenceChange = jest.fn();

  beforeEach(() => {
    mockOnPreferenceChange.mockClear();
  });

  it('shows more options when button is clicked', async () => {
    render(
      <AdvancedForm
        preferences={mockPreferences}
        onPreferenceChange={mockOnPreferenceChange}
      />
    );

    // Initially, advanced options should be hidden
    expect(screen.queryByLabelText('Waxes')).not.toBeInTheDocument();

    // Click "More options" button
    const moreOptionsButton = screen.getByText(/more options/i);
    await act(async () => {
      fireEvent.click(moreOptionsButton);
    });

    // Wait for advanced options to be visible
    await waitFor(() => {
      expect(screen.getByLabelText('Waxes')).toBeInTheDocument();
      expect(screen.getByLabelText('Soap')).toBeInTheDocument();
      expect(screen.getByLabelText('Water Soluble Silicones')).toBeInTheDocument();
      expect(screen.getByLabelText('Non-water Soluble Silicones')).toBeInTheDocument();
    });
  });

  it('toggles button text correctly', async () => {
    render(
      <AdvancedForm
        preferences={mockPreferences}
        onPreferenceChange={mockOnPreferenceChange}
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

  it('calls onPreferenceChange when preferences are toggled', async () => {
    render(
      <AdvancedForm
        preferences={mockPreferences}
        onPreferenceChange={mockOnPreferenceChange}
      />
    );

    const moreOptionsButton = screen.getByText(/more options/i);
    await act(async () => {
      fireEvent.click(moreOptionsButton);
    });

    await waitFor(() => {
      expect(screen.getByLabelText('Waxes')).toBeInTheDocument();
    });

    await act(async () => {
      fireEvent.click(screen.getByLabelText('Waxes'));
    });

    expect(mockOnPreferenceChange).toHaveBeenCalledWith('Waxes', true);
  });
});
