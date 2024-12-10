import type { Meta, StoryObj } from '@storybook/react';
import IngredientsCard from './ingredients-card';

const meta = {
  title: 'Components/IngredientsCard',
  component: IngredientsCard,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof IngredientsCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Perfect: Story = {
  args: {
    ingredient: {
      name: 'Sodium Lauryl Sulfate',
      description: 'A strong cleansing agent',
      category: ['Sulfate', 'Cleanser'],
      notes: 'Common in shampoos',
      link: ['https://example.com/sls'],
      synonyms: ['SLS'],
    },
    matchDetails: {
      confidence: 1,
      matched: true,
      matchTypes: ['exactMatch'],
      searchType: 'ingredient',
    },
  },
};

export const LowConfidence: Story = {
  args: {
    ...Perfect.args,
    matchDetails: {
      confidence: 0.5,
      matched: true,
      matchTypes: ['partialMatch'],
      searchType: 'ingredient',
    },
  },
};

export const Unknown: Story = {
  args: {
    ...Perfect.args,
    matchDetails: {
      confidence: 0,
      matched: false,
      matchTypes: ['fuzzyMatch'],
      searchType: 'ingredient',
    },
  },
};

export const Minimal: Story = {
  args: {
    ingredient: {
      name: 'Test Ingredient',
      category: ['Test'],
    },
    matchDetails: {
      confidence: 0,
      matched: false,
      matchTypes: ['fuzzyMatch'],
      searchType: 'ingredient',
    },
  },
};
