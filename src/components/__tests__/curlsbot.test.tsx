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

  it('shows results when analyze is clicked', async () => {
    render(<Curlsbot />);

    // Results should not be visible initially
    expect(screen.queryByText('Results')).not.toBeInTheDocument();

    // Click analyze button
    await act(async () => {
      fireEvent.click(screen.getByText('Analyze'));
    });

    // Results should now be visible
    expect(screen.getByText('Results')).toBeInTheDocument();
  });

  it('shows ingredients cards when analyze is clicked', async () => {
    render(<Curlsbot />);

    // Initially ingredients should not be visible
    expect(screen.queryByText('Sodium Lauryl Sulfate')).not.toBeInTheDocument();
    expect(screen.queryByText('Dimethicone')).not.toBeInTheDocument();

    // Click analyze button
    await act(async () => {
      fireEvent.click(screen.getByText('Analyze'));
    });

    // Verify ingredients cards are shown
    await waitFor(() => {
      expect(screen.getByText('Sodium Lauryl Sulfate')).toBeInTheDocument();
      expect(screen.getByText('Dimethicone')).toBeInTheDocument();
    });

    // Verify categories are shown
    expect(screen.getByText('Sulfate')).toBeInTheDocument();
    expect(screen.getByText('Silicone')).toBeInTheDocument();
  });

  it('shows ingredient details correctly', async () => {
    render(<Curlsbot />);

    await act(async () => {
      fireEvent.click(screen.getByText('Analyze'));
    });

    // Check for detailed information
    await waitFor(() => {
      expect(screen.getByText(/strong cleansing agent/i)).toBeInTheDocument();
      expect(screen.getByText(/common in shampoos/i)).toBeInTheDocument();
      expect(screen.getAllByRole('link', { name: /more info/i })).toHaveLength(2);
    });
  });
});
