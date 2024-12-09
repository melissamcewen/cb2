import { useState } from 'react';
import Checkbox from './checkbox';
import { PrefFormProps } from '../types';

export default function PrefForm({
  categoryGroups,
  preferences,
  onPreferenceChange,
  advancedCategories
}: PrefFormProps): JSX.Element {
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});

  const isGroupIndeterminate = (groupName: string): boolean => {
    const subcategories = Object.entries(advancedCategories)
      .filter(([_, category]) => category.parentGroup === groupName)
      .map(([key]) => key);

    if (subcategories.length === 0) return false;

    const checkedCount = subcategories
      .map(cat => preferences[cat] || false)
      .filter(Boolean).length;

    return checkedCount > 0 && checkedCount < subcategories.length;
  };

  const isGroupChecked = (groupName: string): boolean => {
    const subcategories = Object.entries(advancedCategories)
      .filter(([_, category]) => category.parentGroup === groupName)
      .map(([key]) => key);

    if (subcategories.length === 0) return false;
    return subcategories.every(cat => preferences[cat]);
  };

  const handleGroupChange = (groupName: string, checked: boolean): void => {
    // Find all subcategories for this group and update them
    Object.entries(advancedCategories)
      .filter(([_, category]) => category.parentGroup === groupName)
      .forEach(([key]) => {
        onPreferenceChange(key, checked);
      });
  };

  return (
    <div className="w-full space-y-2 text-accent-content">
      {Object.entries(categoryGroups).map(([groupName, group]) => (
        <div key={groupName}>
          <Checkbox
            label={group.name}
            checked={isGroupChecked(groupName)}
            indeterminate={isGroupIndeterminate(groupName)}
            onChange={(checked) => handleGroupChange(groupName, checked)}
          />
        </div>
      ))}
    </div>
  );
}
