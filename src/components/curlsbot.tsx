import { useState } from 'react';
import Image from 'next/image';
import PrefForm from './pref-form';
import EntryForm from './entry-form';
import AdvancedForm from './advanced-form';

const basicPrefs = ["Silicones", "Sulfates"];

export default function Curlsbot(): JSX.Element {
  const [preferences, setPreferences] = useState<Record<string, boolean>>({});

  const handlePreferenceChange = (pref: string, checked: boolean) => {
    setPreferences(prev => ({
      ...prev,
      [pref]: checked
    }));
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
              <div className="tooltip tooltip-open tooltip-right" data-tip="hello">
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
            <EntryForm />
          </div>
        </div>
      </div>
      <div className="grid lg:grid-cols-2 gap-6">{/* Results */}</div>
    </div>
  );
}
