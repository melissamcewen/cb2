import { render, screen } from '@testing-library/react';
import IngredientsCard from '../ingredients-card';

const mockIngredient = {
  name: 'Sodium Lauryl Sulfate',
  description: 'A strong cleansing agent',
  category: ['Sulfate', 'Cleanser'],
  notes: 'Common in shampoos',
  link: ['https://example.com/sls'],
  synonyms: ['SLS'],
};

describe('IngredientsCard', () => {
  it('renders ingredient name and description', () => {
    render(<IngredientsCard ingredient={mockIngredient} />);
    expect(screen.getByText(mockIngredient.name)).toBeInTheDocument();
    expect(screen.getByText(mockIngredient.description)).toBeInTheDocument();
  });

  it('renders all categories as badges', () => {
    render(<IngredientsCard ingredient={mockIngredient} />);
    mockIngredient.category.forEach((cat) => {
      expect(screen.getByText(cat)).toBeInTheDocument();
    });
  });

  it('renders notes when provided', () => {
    render(<IngredientsCard ingredient={mockIngredient} />);
    expect(screen.getByText(mockIngredient.notes)).toBeInTheDocument();
  });

  it('renders more info link when provided', () => {
    render(<IngredientsCard ingredient={mockIngredient} />);
    const link = screen.getByRole('link', { name: /more info/i });
    expect(link).toHaveAttribute('href', mockIngredient.link[0]);
    expect(link).toHaveAttribute('target', '_blank');
  });

  it('handles missing optional fields gracefully', () => {
    const minimalIngredient = {
      name: 'Test Ingredient',
      category: ['Test'],
    };
    render(<IngredientsCard ingredient={minimalIngredient} />);

    expect(screen.getByText('Test Ingredient')).toBeInTheDocument();
    expect(screen.getByText('Test')).toBeInTheDocument();
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
    expect(screen.queryByText(/common in/i)).not.toBeInTheDocument();
  });
});
