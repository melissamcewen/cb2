import type { Meta, StoryObj } from '@storybook/react';
import AdvancedForm from './advanced-form';
import type { CategoryGroup } from 'haircare-ingredients-analyzer';

const mockCategoryGroups: Record<string, CategoryGroup> = {
  silicones: {
    name: 'Silicones',
    description: 'Compounds that can form a barrier on hair',
    categories: {
      'Water-soluble': {
        name: 'Water-soluble Silicones',
        description: 'Silicones that can be removed with water',
      },
      'non-Water-soluble': {
        name: 'Non-Water-soluble Silicones',
        description: 'Silicones that require stronger cleansers',
      },
    },
  },
  other: {
    name: 'Other',
    description: 'Other ingredients to check',
    categories: {
      waxes: {
        name: 'Waxes',
        description: 'Ingredients that can build up on hair',
      },
      soap: {
        name: 'Soap',
        description: 'Traditional cleansing agents that can be harsh',
      },
    },
  },
};

const mockConfig = {
  mainGroups: ['silicones'],
  mainCategories: ['sulfates'],
  advancedCategories: ['Water-soluble', 'non-Water-soluble', 'waxes', 'soap'],
};

const meta = {
  title: 'Components/AdvancedForm',
  component: AdvancedForm,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof AdvancedForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    preferences: {},
    onPreferenceChange: (pref, checked) =>
      console.log('Preference changed:', pref, checked),
    categoryGroups: mockCategoryGroups,
    config: mockConfig,
    isOpen: false,
    onOpenChange: (isOpen) => console.log('Open state changed:', isOpen),
  },
};

export const Open: Story = {
  args: {
    ...Default.args,
    isOpen: true,
  },
};

export const WithSomeChecked: Story = {
  args: {
    ...Open.args,
    preferences: {
      'Water-soluble': true,
      'non-Water-soluble': false,
      waxes: true,
    },
  },
};
