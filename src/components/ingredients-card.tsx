interface MatchConfig {
  // Add match config properties if needed
}

interface Ingredient {
  name: string;
  description?: string;
  category: string[];
  notes?: string;
  source?: string[];
  synonyms?: string[];
  link?: string[];
  matchConfig?: MatchConfig;
}

interface IngredientsCardProps {
  ingredient: Ingredient;
}

export default function IngredientsCard({ ingredient }: IngredientsCardProps): JSX.Element {
  return (
    <div className="card bg-base-100 shadow">
      <div className="card-body">
        <h2 className="card-title">{ingredient.name}</h2>
        {ingredient.description && <p>{ingredient.description}</p>}
        <div className="flex flex-wrap gap-2 mt-2">
          {ingredient.category.map((cat) => (
            <span
              key={cat}
              className="badge badge-primary"
            >
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
