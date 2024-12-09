import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { act } from 'react';
import Curlsbot from '../curlsbot';

describe('Curlsbot', () => {
  it('renders the main title', () => {
    render(<Curlsbot />);
    expect(screen.getByText('Curlsbot Ingredients Analyzer')).toBeInTheDocument();
  });

  it('manages preferences state correctly', async () => {
    render(<Curlsbot />);

    // Test basic preferences
    const silicones = screen.getByLabelText('Silicones');
    const sulfates = screen.getByLabelText('Sulfates');

    await act(async () => {
      fireEvent.click(silicones);
      fireEvent.click(sulfates);
    });

    // Open advanced preferences
    const moreOptionsButton = screen.getByText(/more options/i);
    await act(async () => {
      fireEvent.click(moreOptionsButton);
    });

    // Wait for advanced options to be visible
    await waitFor(() => {
      expect(screen.getByLabelText('Waxes')).toBeInTheDocument();
      expect(screen.getByLabelText('Soap')).toBeInTheDocument();
    });

    // Test advanced preferences
    await act(async () => {
      fireEvent.click(screen.getByLabelText('Waxes'));
      fireEvent.click(screen.getByLabelText('Soap'));
    });

    // Verify all checkboxes are present
    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes.length).toBe(6); // 2 basic + 4 advanced preferences
  });

  it('toggles advanced preferences visibility', async () => {
    render(<Curlsbot />);

    // Advanced preferences should be hidden initially
    expect(screen.queryByLabelText('Waxes')).not.toBeInTheDocument();

    // Show advanced preferences
    const moreOptionsButton = screen.getByText(/more options/i);
    await act(async () => {
      fireEvent.click(moreOptionsButton);
    });

    // Wait for advanced options to be visible
    await waitFor(() => {
      expect(screen.getByLabelText('Waxes')).toBeInTheDocument();
    });

    // Hide advanced preferences
    const lessOptionsButton = screen.getByText(/less options/i);
    await act(async () => {
      fireEvent.click(lessOptionsButton);
    });

    // Wait for advanced options to be hidden
    await waitFor(() => {
      expect(screen.queryByLabelText('Waxes')).not.toBeInTheDocument();
    });
  });
});
