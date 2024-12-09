import { useState } from 'react';
import Image from 'next/image';
import PrefForm from './pref-form';
import EntryForm from './entry-form';
import AdvancedForm from './advanced-form';
import ResultsCard from './results-card';
import IngredientsCard from './ingredients-card';

const basicPrefs = ['Silicones', 'Sulfates'];
const defaultPreferences = {
  Silicones: true,
  Sulfates: true,
  Waxes: true,
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

export default function Curlsbot(): JSX.Element {
  const [preferences, setPreferences] =
    useState<Record<string, boolean>>(defaultPreferences);
  const [showResults, setShowResults] = useState(false);

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
              basicprefs={basicPrefs}
              preferences={preferences}
              onPreferenceChange={handlePreferenceChange}
            />
            <AdvancedForm
              preferences={preferences}
              onPreferenceChange={handlePreferenceChange}
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
            <ResultsCard />
            {testIngredients.map((ingredient) => (
              <IngredientsCard key={ingredient.name} ingredient={ingredient} />
            ))}
          </>
        )}
      </div>
    </div>
  );
}
