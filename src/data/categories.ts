import type { CategoryConfig } from '@/types';
import type { CategoryGroup } from 'haircare-ingredients-analyzer';

export const categoryConfig: CategoryConfig = {
  mainGroups: ['Silicones'],
  mainCategories: ['Sulfates'],
  advancedCategories: [
    'Water-soluble Silicones',
    'Non-Water-soluble Silicones',
    'Waxes',
    'Soap',
  ],
};

export const defaultPreferences = {
  Sulfates: true,
  Silicones: true,
};
