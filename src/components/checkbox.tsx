import { useRef, useEffect } from 'react';
import { CheckboxProps } from '../types';

export default function Checkbox({
  label,
  checked,
  indeterminate,
  onChange,
  onExpand
}: CheckboxProps): JSX.Element {
  const checkboxRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.indeterminate = !!indeterminate;
    }
  }, [indeterminate]);

  return (
    <label className="flex items-center space-x-2 cursor-pointer">
      <input
        ref={checkboxRef}
        type="checkbox"
        className="checkbox checkbox-sm"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span className="text-sm">{label}</span>
      {indeterminate && (
        <button
          onClick={onExpand}
          className="btn btn-xs btn-ghost"
        >
          More options
        </button>
      )}
    </label>
  );
}
