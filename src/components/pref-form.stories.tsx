import type { Meta, StoryObj } from '@storybook/react';
import PrefForm from './pref-form';
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
};

const mockConfig = {
  mainGroups: ['silicones'],
  mainCategories: ['sulfates'],
  advancedCategories: ['Water-soluble', 'non-Water-soluble'],
};

const meta = {
  title: 'Components/PrefForm',
  component: PrefForm,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof PrefForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    categoryGroups: mockCategoryGroups,
    preferences: {},
    onPreferenceChange: (pref, checked) =>
      console.log('Preference changed:', pref, checked),
    config: mockConfig,
    isAdvancedOpen: false,
    onAdvancedOpen: () => console.log('Advanced opened'),
  },
};

export const WithSomeChecked: Story = {
  args: {
    ...Default.args,
    preferences: {
      'Water-soluble': true,
      'non-Water-soluble': false,
    },
  },
};

export const WithAdvancedOpen: Story = {
  args: {
    ...Default.args,
    isAdvancedOpen: true,
  },
};
