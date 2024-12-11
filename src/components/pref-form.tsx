import { useState } from 'react';
import Checkbox from './checkbox';
import { PrefFormProps } from '@/types';
import type { CategoryGroup, Category } from '@/types';

export default function PrefForm({
  categoryGroups,
  preferences,
  onPreferenceChange,
  config,
  isAdvancedOpen,
  onAdvancedOpen
}: PrefFormProps): JSX.Element {
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});

  // Get all categories flattened
  const allCategories = categoryGroups.reduce<Category[]>((acc, group) => {
    return [...acc, ...group.categories];
  }, []);

  // Filter to show configured main groups and categories
  const filteredGroups = categoryGroups.filter(group =>
    config.mainGroups.includes(group.name)
  );

  const mainCategories = allCategories.filter(category =>
    config.mainCategories.includes(category.name)
  );

  const isGroupIndeterminate = (group: CategoryGroup): boolean => {
    const categoryValues = group.categories
      .map(cat => preferences[cat.name] || false);
    const checkedCount = categoryValues.filter(Boolean).length;
    return checkedCount > 0 && checkedCount < categoryValues.length;
  };

  const isGroupChecked = (group: CategoryGroup): boolean => {
    return group.categories.every((cat) =>
      preferences[cat.name]
    );
  };

  const handleGroupChange = (group: CategoryGroup, checked: boolean): void => {
    group.categories.forEach((cat) => {
      onPreferenceChange(cat.name, checked);
    });
  };

  return (
    <div className="w-full space-y-2 text-accent-content">
      {/* Render main groups */}
      {filteredGroups.map((group) => (
        <div key={group.name}>
          <Checkbox
            label={group.name}
            checked={isGroupChecked(group)}
            indeterminate={isGroupIndeterminate(group)}
            onChange={(checked) => handleGroupChange(group, checked)}
            onExpand={!isAdvancedOpen && isGroupIndeterminate(group) ? () => onAdvancedOpen() : undefined}
          />
        </div>
      ))}

      {/* Render individual main categories */}
      {mainCategories.map((category) => (
        <div key={category.name}>
          <Checkbox
            label={category.name}
            checked={preferences[category.name] || false}
            onChange={(checked) => onPreferenceChange(category.name, checked)}
          />
        </div>
      ))}
    </div>
  );
}
