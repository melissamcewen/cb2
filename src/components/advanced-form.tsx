import { useState } from 'react';
import Checkbox from './checkbox';
import { AdvancedFormProps } from '@/types';
import type { Category } from 'haircare-ingredients-analyzer';

export default function AdvancedForm({
  preferences,
  onPreferenceChange,
  categoryGroups,
  config,
  isOpen,
  onOpenChange
}: AdvancedFormProps): JSX.Element {
  // Get all categories from all groups
  const allCategories = categoryGroups.reduce<Category[]>((acc, group) => [
    ...acc,
    ...group.categories
  ], []);

  // Filter categories that match the advanced categories config
  const filteredCategories = allCategories
    .filter(category => config.advancedCategories.includes(category.name));

  return (
    <div className="w-full bg-accent">
      <button
        onClick={() => onOpenChange(!isOpen)}
        className="btn btn-sm btn-ghost w-full"
      >
        {isOpen ? '- Less options' : '+ More options'}
      </button>

      {isOpen && (
        <div className="mt-2 space-y-2">
          {filteredCategories.map((category) => (
            <Checkbox
              key={category.name}
              label={category.name}
              checked={preferences[category.name] || false}
              onChange={(checked) => onPreferenceChange(category.name, checked)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
