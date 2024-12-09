import { ExclamationTriangleIcon } from '@heroicons/react/24/solid';

export default function DetailCard(): JSX.Element {
  return (
    <div className="card bg-error text-primary-content">
      <div className="card-body justify-between">
        <h2 className="card-title">
          <ExclamationTriangleIcon className="h-7 w-7" />
          Sulfates Detected
        </h2>
        <div className="prose">
          <ul>
            <li>Sulfate 1</li>
            <li>Sulfate 2</li>
          </ul>
        </div>

        <div className="card-actions justify-end content-end">
          <button className="btn">More info</button>
        </div>
      </div>
    </div>
  );
}
