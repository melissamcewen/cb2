import type { CategoryGroup, Category, MatchConfig } from 'haircare-ingredients-analyzer';

export type { CategoryGroup, Category, MatchConfig };


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
}

export interface PrefFormProps {
  categoryGroups: Record<string, CategoryGroup>;
  preferences: Record<string, boolean>;
  onPreferenceChange: (pref: string, checked: boolean) => void;
  config: CategoryConfig;
}

export enum ResultState {
  INFO = 'info',
  WARNING = 'warning',
  CAUTION = 'caution'
}

export interface ResultsCardProps {
  state: ResultState;
  title: string;
  message: string;
}

export interface CategoryConfig {
  mainGroups: string[];  // Category group IDs to show in main options
  mainCategories: string[];  // Individual category IDs to show in main options
  advancedCategories: string[];  // Category IDs to show in advanced options
}
