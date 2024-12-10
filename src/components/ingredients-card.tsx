import type { Ingredient, MatchDetails } from 'haircare-ingredients-analyzer';
import {
  ExclamationTriangleIcon,
  CheckCircleIcon,
  QuestionMarkCircleIcon,
} from '@heroicons/react/24/solid';
import { MatchType, MatchSearch } from 'haircare-ingredients-analyzer';

const getMatchState = (confidence: number) => {
  if (confidence >= 0.8) return 'perfect';
  if (confidence >= 0.5) return 'low_confidence';
  return 'unknown';
};

const stateConfig = {
  perfect: {
    icon: CheckCircleIcon,
    bgColor: 'bg-success',
    textColor: 'text-success-content',
    label: 'Perfect Match',
  },
  low_confidence: {
    icon: ExclamationTriangleIcon,
    bgColor: 'bg-warning',
    textColor: 'text-warning-content',
    label: 'Low Confidence Match',
  },
  unknown: {
    icon: QuestionMarkCircleIcon,
    bgColor: 'bg-neutral',
    textColor: 'text-neutral-content',
    label: 'Unknown Ingredient',
  },
};

interface IngredientsCardProps {
  ingredient: Ingredient;
  matchDetails: MatchDetails;
}

const defaultMatch: MatchDetails = {
  confidence: 0,
  matched: false,
  matchTypes: ['fuzzyMatch'],
  searchType: 'ingredient'
};

export default function IngredientsCard({
  ingredient,
  matchDetails = defaultMatch,
}: IngredientsCardProps): JSX.Element {
  const state = getMatchState(matchDetails.confidence ?? 0);
  const { icon: Icon, bgColor, textColor, label } = stateConfig[state];

  return (
    <div
      data-testid="ingredients-card"
      className={`card shadow ${bgColor} ${textColor}`}
    >
      <div className="card-body">
        <div className="flex items-center gap-2">
          <Icon className="h-6 w-6" />
          <h2 className="card-title">{ingredient.name}</h2>
          <span className="text-sm opacity-75">{label}</span>
        </div>
        {ingredient.description && <p>{ingredient.description}</p>}
        <div className="flex flex-wrap gap-2 mt-2">
          {ingredient.category.map((cat) => (
            <span key={cat} className="badge badge-primary">
              {cat}
            </span>
          ))}
        </div>
        {ingredient.notes && (
          <div className="mt-2">
            <p className="text-sm">{ingredient.notes}</p>
          </div>
        )}
        {ingredient.link && ingredient.link.length > 0 && (
          <div className="card-actions justify-end mt-4">
            <a
              href={ingredient.link[0]}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-sm"
            >
              More Info
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
