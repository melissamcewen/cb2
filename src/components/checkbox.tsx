import { CheckboxProps } from '../types';

export default function Checkbox({ label, onChange }: CheckboxProps): JSX.Element {
  return (
    <label className="flex items-center space-x-2 cursor-pointer">
      <input
        type="checkbox"
        className="checkbox checkbox-sm"
        onChange={(e) => onChange(e.target.checked)}
      />
      <span className="text-sm">{label}</span>
    </label>
  );
}
