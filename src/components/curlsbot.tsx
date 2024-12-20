import { useState } from 'react';
import PrefForm from './pref-form';
import EntryForm from './entry-form';
import AdvancedForm from './advanced-form';
import ResultsCard from './results-card';
import IngredientsCard from './ingredients-card';
import { ResultState } from '@/types';
import { categoryGroups, categoryConfig, defaultPreferences } from '@/data/categories';
import { testIngredients } from '@/data/test-ingredients';

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
                <img
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
                matchDetails={{
                  confidence: 0,
                  matched: false,
                  matchTypes: ['fuzzyMatch'],
                  searchType: 'ingredient'
                }}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
}
