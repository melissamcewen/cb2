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
  // Get all categories and filter to only show configured advanced categories
  const allCategories = Object.values(categoryGroups).reduce<Record<string, Category>>((acc, group) => ({
    ...acc,
    ...group.categories
  }), {});

  const filteredCategories = Object.entries(allCategories)
    .filter(([categoryId]) => config.advancedCategories.includes(categoryId));

  return (
    <div className="w-full">
      <button
        onClick={() => onOpenChange(!isOpen)}
        className="btn btn-sm btn-ghost w-full"
      >
        {isOpen ? '- Less options' : '+ More options'}
      </button>

      {isOpen && (
        <div className="mt-2 space-y-2">
          {filteredCategories.map(([key, category]) => (
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
