import Checkbox from './checkbox';

interface PrefFormProps {
  basicprefs: string[];
  preferences: Record<string, boolean>;
  onPreferenceChange: (pref: string, checked: boolean) => void;
}

export default function PrefForm({ basicprefs, preferences, onPreferenceChange }: PrefFormProps): JSX.Element {
  return (
    <div className="w-full space-y-2 text-accent-content">
      {basicprefs.map((pref) => (
        <Checkbox
          key={pref}
          label={pref}
          checked={preferences[pref] || false}
          onChange={(checked) => onPreferenceChange(pref, checked)}
        />
      ))}
    </div>
  );
}
