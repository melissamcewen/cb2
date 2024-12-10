import { ExclamationTriangleIcon, InformationCircleIcon } from '@heroicons/react/24/solid';
import { ResultState, ResultsCardProps } from '@/types';

const stateConfig = {
  [ResultState.INFO]: {
    icon: InformationCircleIcon,
    bgColor: 'bg-info',
    textColor: 'text-info-content'
  },
  [ResultState.WARNING]: {
    icon: ExclamationTriangleIcon,
    bgColor: 'bg-warning',
    textColor: 'text-warning-content'
  },
  [ResultState.CAUTION]: {
    icon: ExclamationTriangleIcon,
    bgColor: 'bg-error',
    textColor: 'text-error-content'
  }
};

export default function ResultsCard({ state, title, message }: ResultsCardProps): JSX.Element {
  const { icon: Icon, bgColor, textColor } = stateConfig[state];

  return (
    <div data-testid="results-card" className={`card col-span-2 ${bgColor} ${textColor}`}>
      <div className="card-body items-center text-center">
        <h2 className="card-title py-5">
          <Icon className="h-7 w-7" />
          {title}
        </h2>
        <p>{message}</p>
        <div className="card-actions justify-end py-5">
          <button className="btn">New Analysis</button>
          <button className="btn">Get Product Recommendations</button>
        </div>
      </div>
    </div>
  );
}
