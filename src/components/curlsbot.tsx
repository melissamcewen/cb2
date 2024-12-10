import { useState } from 'react';
import Image from 'next/image';
import PrefForm from './pref-form';
import EntryForm from './entry-form';
import AdvancedForm from './advanced-form';
import ResultsCard from './results-card';
import IngredientsCard from './ingredients-card';
import { ResultState, CategoryGroup, CategoryConfig } from '@/types';
const categoryGroups: Record<string, CategoryGroup> = {
  silicones: {
    name: 'Silicones',
    description: 'Compounds that can form a barrier on hair',
    categories: {
      'water-soluble': {
        name: 'Water Soluble Silicones',
        description: 'Silicones that can be removed with water'
      },
      'non-water-soluble': {
        name: 'Non-water Soluble Silicones',
        description: 'Silicones that require stronger cleansers'
      }
    }
  },
  sulfates: {
    name: 'Cleansers',
    description: 'Cleansing agents that can be harsh on hair and skin',
    categories: {
      'sulfates': {
        name: 'Sulfates',
        description: 'Common in shampoos and cleansers'
      },
      'gentle detergents': {
        name: 'Gentle Detergents',
        description: 'Cleansers that are less harsh on hair and skin'
      }
    }
  },
  other: {
    name: 'Other',
    description: 'Other ingredients to check',
    categories: {
      'waxes': {
        name: 'Waxes',
        description: 'Ingredients that can build up on hair'
      },
      'soap': {
        name: 'Soap',
        description: 'Traditional cleansing agents that can be harsh'
      }
    }
  }
};

const defaultPreferences = {
  'water-soluble': true,
  'non-water-soluble': true,
  'sls': true,
  'sles': true
};

const testIngredients = [
  {
    name: 'Sodium Lauryl Sulfate',
    description:
      'A strong cleansing agent that can be drying to hair and skin.',
    category: ['Sulfate', 'Cleanser'],
    notes: 'Common in shampoos and cleansers',
    link: ['https://curlsbot.com/ingredients/sodium-lauryl-sulfate'],
    synonyms: ['SLS', 'Sodium dodecyl sulfate'],
  },
  {
    name: 'Dimethicone',
    description: 'A silicone that forms a barrier on hair. May cause buildup.',
    category: ['Silicone', 'Non-water Soluble'],
    notes: 'Common in conditioners and styling products',
    link: ['https://curlsbot.com/ingredients/dimethicone'],
    synonyms: ['Dimethylpolysiloxane'],
  },
];

const categoryConfig: CategoryConfig = {
  mainGroups: ['silicones'],
  mainCategories: ['sulfates'],
  advancedCategories: [
    'water-soluble',
    'non-water-soluble',
    'waxes',
    'soap'
  ]
};

export default function Curlsbot(): JSX.Element {
  const [preferences, setPreferences] = useState<Record<string, boolean>>(defaultPreferences);
  const [showResults, setShowResults] = useState(false);
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);

  const handlePreferenceChange = (pref: string, checked: boolean): void => {
    setPreferences((prev) => ({
      ...prev,
      [pref]: checked,
    }));
  };

  const handleAnalyze = (): void => {
    setShowResults(true);
  };

  return (
    <div>
      <div className="card md:bg-accent md:shadow mb-8 mt-5 flex text-accent-content">
        <div className="card-content grid-cols-5 md:grid">
          <div className="prose col-span-2 flex flex-wrap content-start md:text-left p-5 justify-center">
            <h1 className="text-xl font-bold text-center w-full text-accent-content">
              Curlsbot Ingredients Analyzer
            </h1>
            <div className="self-center">
              <div
                className="tooltip tooltip-open tooltip-right"
                data-tip="hello"
              >
                <Image
                  src="/curlbot-small.png"
                  className=""
                  height={120}
                  width={85}
                  alt="Curlsbot mascot"
                />
              </div>
            </div>
            <PrefForm
              categoryGroups={categoryGroups}
              preferences={preferences}
              onPreferenceChange={handlePreferenceChange}
              config={categoryConfig}
              isAdvancedOpen={isAdvancedOpen}
              onAdvancedOpen={() => setIsAdvancedOpen(true)}
            />
            <AdvancedForm
              preferences={preferences}
              onPreferenceChange={handlePreferenceChange}
              categoryGroups={categoryGroups}
              config={categoryConfig}
              isOpen={isAdvancedOpen}
              onOpenChange={setIsAdvancedOpen}
            />
          </div>
          <div className="card col-span-3 w-full bg-accent-focus text-neutral-content">
            <EntryForm onAnalyze={handleAnalyze} />
          </div>
        </div>
      </div>
      <div className="grid lg:grid-cols-2 gap-6">
        {showResults && (
          <>
            <ResultsCard
              state={ResultState.INFO}
              title="Results"
              message="We've analyzed your ingredients. See details below."
            />
            {testIngredients.map((ingredient) => (
              <IngredientsCard
                key={ingredient.name}
                ingredient={ingredient}
                matchDetails={{ confidence: 'unknown' }}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
}
