export interface CheckboxProps {
  label: string;
  checked?: boolean;
  onChange: (checked: boolean) => void;
}

export interface LayoutProps {
  children: React.ReactNode;
}
