import type { CategoryGroup, CategoryConfig } from '@/types';

export const categoryGroups: Record<string, CategoryGroup> = {
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
  },
  sulfates: {
    name: 'Cleansers',
    description: 'Cleansing agents that can be harsh on hair and skin',
    categories: {
      'sulfates': {
        name: 'Sulfates',
        description: 'Common in shampoos and cleansers'
      },
      'gentle detergents': {
        name: 'Gentle Detergents',
        description: 'Cleansers that are less harsh on hair and skin'
      }
    }
  },
  other: {
    name: 'Other',
    description: 'Other ingredients to check',
    categories: {
      'waxes': {
        name: 'Waxes',
        description: 'Ingredients that can build up on hair'
      },
      'soap': {
        name: 'Soap',
        description: 'Traditional cleansing agents that can be harsh'
      }
    }
  }
};

export const categoryConfig: CategoryConfig = {
  mainGroups: ['silicones'],
  mainCategories: ['sulfates'],
  advancedCategories: [
    'water-soluble',
    'non-water-soluble',
    'waxes',
    'soap'
  ]
};

export const defaultPreferences = {
  'water-soluble': true,
  'non-water-soluble': true,
  'sls': true,
  'sles': true
};
