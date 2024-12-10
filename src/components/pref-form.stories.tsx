import type { Meta, StoryObj } from '@storybook/react';
import PrefForm from './pref-form';
import type { CategoryGroup } from 'haircare-ingredients-analyzer';

const mockCategoryGroups: Record<string, CategoryGroup> = {
  silicones: {
    name: 'Silicones',
    description: 'Compounds that can form a barrier on hair',
    categories: {
      'water-soluble': {
        name: 'Water Soluble Silicones',
        description: 'Silicones that can be removed with water'
      },
      'non-water-soluble': {
        name: 'Non-water Soluble Silicones',
        description: 'Silicones that require stronger cleansers'
      }
    }
  }
};

const mockConfig = {
  mainGroups: ['silicones'],
  mainCategories: ['sulfates'],
  advancedCategories: ['water-soluble', 'non-water-soluble']
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
    onPreferenceChange: (pref, checked) => console.log('Preference changed:', pref, checked),
    config: mockConfig,
    isAdvancedOpen: false,
    onAdvancedOpen: () => console.log('Advanced opened'),
  },
};

export const WithSomeChecked: Story = {
  args: {
    ...Default.args,
    preferences: {
      'water-soluble': true,
      'non-water-soluble': false,
    },
  },
};

export const WithAdvancedOpen: Story = {
  args: {
    ...Default.args,
    isAdvancedOpen: true,
  },
};
