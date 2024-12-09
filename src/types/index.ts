export interface CheckboxProps {
  label: string;
}

export interface PrefFormProps {
  basicprefs: string[];
  advancedprefs?: string[];
}

export interface LayoutProps {
  children: React.ReactNode;
  home?: boolean;
}