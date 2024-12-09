import { ExclamationTriangleIcon } from '@heroicons/react/24/solid';

export default function ResultsCard(): JSX.Element {
  return (
    <div className="card bg-error col-span-2 text-accent-content">
      <div className="card-body items-center text-center">
        <h2 className="card-title py-5">
          <ExclamationTriangleIcon className="h-7 w-7" />
          Results
        </h2>
        <p>We've detected stuff, see below for details.</p>
        <div className="card-actions justify-end py-5">
          <button className="btn">New Analysis</button>
          <button className="btn">Get Product Recommendations</button>
        </div>
      </div>
    </div>
  );
}
