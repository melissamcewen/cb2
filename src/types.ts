export interface MatchConfig {
  // Add match config properties if needed
}

export interface Category {
  name: string;
  description: string;
  tags?: string[];
  notes?: string;
  source?: string[];
  matchConfig?: MatchConfig;
}

export interface CategoryGroup {
  name: string;
  description: string;
  categories: Record<string, Category>;
  matchConfig?: MatchConfig;
}

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

export interface AdvancedCategory {
  name: string;
  description: string;
  parentGroup: string;
}

export interface AdvancedFormProps {
  preferences: Record<string, boolean>;
  onPreferenceChange: (pref: string, checked: boolean) => void;
  advancedCategories: Record<string, AdvancedCategory>;
}

export interface PrefFormProps {
  categoryGroups: Record<string, CategoryGroup>;
  preferences: Record<string, boolean>;
  onPreferenceChange: (pref: string, checked: boolean) => void;
  advancedCategories: Record<string, AdvancedCategory>;
}
