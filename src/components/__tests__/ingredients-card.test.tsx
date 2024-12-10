import { render, screen } from '@testing-library/react';
import IngredientsCard from '../ingredients-card';
import type { Ingredient, MatchDetails, MatchType, MatchSearch } from 'haircare-ingredients-analyzer';

const mockIngredient: Ingredient = {
  name: 'Test Ingredient',
  description: 'Test description',
  category: ['Category 1', 'Category 2'],
  notes: 'Test notes',
  link: ['https://example.com'],
  synonyms: ['Test synonym'],
};

describe('IngredientsCard', () => {
  const mockPerfectMatch: MatchDetails = {
    confidence: 1,
    matched: true,
    matchTypes: ['exact'] as Array<'exact' | 'partial' | 'none'>,
    searchType: 'exact' as 'exact' | 'partial' | 'none'
  };

  const mockLowMatch: MatchDetails = {
    confidence: 0.5,
    matched: true,
    matchTypes: ['partial'] as Array<'exact' | 'partial' | 'none'>,
    searchType: 'partial' as 'exact' | 'partial' | 'none'
  };

  const mockUnknownMatch: MatchDetails = {
    confidence: 0,
    matched: false,
    matchTypes: ['none'] as Array<'exact' | 'partial' | 'none'>,
    searchType: 'none' as 'exact' | 'partial' | 'none'
  };

  it('renders ingredient details with perfect match', () => {
    render(
      <IngredientsCard
        ingredient={mockIngredient}
        matchDetails={mockPerfectMatch}
      />,
    );

    expect(screen.getByText('Perfect Match')).toBeInTheDocument();
    expect(screen.getByText(mockIngredient.name)).toBeInTheDocument();
  });

  it('renders ingredient details with low confidence', () => {
    render(
      <IngredientsCard
        ingredient={mockIngredient}
        matchDetails={mockLowMatch}
      />,
    );

    expect(screen.getByText('Low Confidence Match')).toBeInTheDocument();
  });

  it('renders ingredient details with unknown state', () => {
    render(
      <IngredientsCard
        ingredient={mockIngredient}
        matchDetails={mockUnknownMatch}
      />,
    );

    expect(screen.getByText('Unknown Ingredient')).toBeInTheDocument();
  });

  it('renders all categories as badges', () => {
    render(
      <IngredientsCard
        ingredient={mockIngredient}
        matchDetails={mockPerfectMatch}
      />,
    );

    mockIngredient.category.forEach((cat) => {
      expect(screen.getByText(cat)).toBeInTheDocument();
    });
  });

  it('renders notes when provided', () => {
    render(
      <IngredientsCard
        ingredient={mockIngredient}
        matchDetails={mockPerfectMatch}
      />,
    );

    expect(screen.getByText(mockIngredient.notes)).toBeInTheDocument();
  });

  it('renders more info link when provided', () => {
    render(
      <IngredientsCard
        ingredient={mockIngredient}
        matchDetails={mockPerfectMatch}
      />,
    );

    const link = screen.getByRole('link', { name: /more info/i });
    expect(link).toHaveAttribute('href', mockIngredient.link[0]);
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders minimal ingredient info without optional fields', () => {
    const minimalIngredient: Ingredient = {
      name: 'Test Ingredient',
      category: ['Test'],
    };

    render(
      <IngredientsCard
        ingredient={minimalIngredient}
        matchDetails={mockUnknownMatch}
      />,
    );

    expect(screen.getByText('Test Ingredient')).toBeInTheDocument();
    expect(screen.getByText('Test')).toBeInTheDocument();
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });

  it('applies correct styles based on match state', () => {
    const { rerender } = render(
      <IngredientsCard
        ingredient={mockIngredient}
        matchDetails={mockPerfectMatch}
      />,
    );

    expect(screen.getByTestId('ingredients-card')).toHaveClass('bg-success');

    rerender(
      <IngredientsCard
        ingredient={mockIngredient}
        matchDetails={mockLowMatch}
      />,
    );

    expect(screen.getByTestId('ingredients-card')).toHaveClass('bg-warning');

    rerender(
      <IngredientsCard
        ingredient={mockIngredient}
        matchDetails={mockUnknownMatch}
      />,
    );

    expect(screen.getByTestId('ingredients-card')).toHaveClass('bg-neutral');
  });
});
