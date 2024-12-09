import { useState } from 'react';
import Checkbox from './checkbox';
import { AdvancedFormProps } from '../types';

export default function AdvancedForm({
  preferences,
  onPreferenceChange,
  advancedCategories
}: AdvancedFormProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="btn btn-sm btn-ghost w-full"
      >
        {isOpen ? '- Less options' : '+ More options'}
      </button>

      {isOpen && (
        <div className="mt-2 space-y-2">
          {Object.entries(advancedCategories).map(([key, category]) => (
            <Checkbox
              key={key}
              label={category.name}
              checked={preferences[key] || false}
              onChange={(checked) => onPreferenceChange(key, checked)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
