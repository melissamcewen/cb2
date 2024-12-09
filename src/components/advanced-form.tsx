import { useState } from 'react';
import Checkbox from './checkbox';

const advancedPrefs = [
  "Waxes",
  "Soap",
  "Water Soluble Silicones",
  "Non-water Soluble Silicones"
];

interface AdvancedFormProps {
  preferences: Record<string, boolean>;
  onPreferenceChange: (pref: string, checked: boolean) => void;
}

export default function AdvancedForm({ preferences, onPreferenceChange }: AdvancedFormProps): JSX.Element {
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
          {advancedPrefs.map((pref) => (
            <Checkbox
              key={pref}
              label={pref}
              onChange={(checked) => onPreferenceChange(pref, checked)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
