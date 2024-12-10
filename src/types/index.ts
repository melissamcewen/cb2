import type {
  CategoryGroup,
  Category,
  MatchConfig,
  MatchDetails,
  Ingredient,
} from 'haircare-ingredients-analyzer';

export type { CategoryGroup, Category, MatchConfig, MatchDetails };

export interface CheckboxProps {
  label: string;
  checked?: boolean;
  indeterminate?: boolean;
  onChange: (checked: boolean) => void;
  onExpand?: () => void;
}

export interface LayoutProps {
  children: React.ReactNode;
}

export interface AdvancedFormProps {
  preferences: Record<string, boolean>;
  onPreferenceChange: (pref: string, checked: boolean) => void;
  categoryGroups: Record<string, CategoryGroup>;
  config: CategoryConfig;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export interface PrefFormProps {
  categoryGroups: Record<string, CategoryGroup>;
  preferences: Record<string, boolean>;
  onPreferenceChange: (pref: string, checked: boolean) => void;
  config: CategoryConfig;
  isAdvancedOpen: boolean;
  onAdvancedOpen: () => void;
}

export enum ResultState {
  INFO = 'info',
  WARNING = 'warning',
  CAUTION = 'caution',
}

export interface ResultsCardProps {
  state: ResultState;
  title: string;
  message: string;
}

export interface CategoryConfig {
  mainGroups: string[]; // Category group IDs to show in main options
  mainCategories: string[]; // Individual category IDs to show in main options
  advancedCategories: string[]; // Category IDs to show in advanced options
}

export interface IngredientsCardProps {
  ingredient: Ingredient;
  matchDetails: MatchDetails;
}
