import { useState } from 'react';
import Checkbox from './checkbox';
import { PrefFormProps } from '@/types';

export default function PrefForm({
  categoryGroups,
  preferences,
  onPreferenceChange,
  config,
}: PrefFormProps): JSX.Element {
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>(
    {},
  );

  // Get all categories
  const allCategories = Object.values(categoryGroups).reduce<
    Record<string, Category>
  >(
    (acc, group) => ({
      ...acc,
      ...group.categories,
    }),
    {},
  );

  // Filter to show configured main groups and categories
  const filteredGroups = Object.entries(categoryGroups).filter(([groupId]) =>
    config.mainGroups.includes(groupId),
  );

  const mainCategories = Object.entries(allCategories).filter(([categoryId]) =>
    config.mainCategories.includes(categoryId),
  );

  const isGroupIndeterminate = (groupName: string): boolean => {
    const group = categoryGroups[groupName];
    const categoryValues = Object.keys(group.categories).map(
      (cat) => preferences[cat] || false,
    );
    const checkedCount = categoryValues.filter(Boolean).length;
    return checkedCount > 0 && checkedCount < categoryValues.length;
  };

  const isGroupChecked = (groupName: string): boolean => {
    const group = categoryGroups[groupName];
    return Object.keys(group.categories).every((cat) => preferences[cat]);
  };

  const handleGroupChange = (groupName: string, checked: boolean): void => {
    const group = categoryGroups[groupName];
    Object.keys(group.categories).forEach((cat) => {
      onPreferenceChange(cat, checked);
    });
  };

  return (
    <div className="w-full space-y-2 text-accent-content">
      {/* Render main groups */}
      {filteredGroups.map(([groupName, group]) => (
        <div key={groupName}>
          <Checkbox
            label={group.name}
            checked={isGroupChecked(groupName)}
            indeterminate={isGroupIndeterminate(groupName)}
            onChange={(checked) => handleGroupChange(groupName, checked)}
          />
        </div>
      ))}

      {/* Render individual main categories */}
      {mainCategories.map(([key, category]) => (
        <div key={key}>
          <Checkbox
            label={category.name}
            checked={preferences[key] || false}
            onChange={(checked) => onPreferenceChange(key, checked)}
          />
        </div>
      ))}
    </div>
  );
}
