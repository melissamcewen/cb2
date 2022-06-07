import { PlusIcon } from '@heroicons/react/solid';
export default function AdvancedForm() {
  return (
    <div tabindex="0" className="collapse collapse-plus">
      <div className="text-xl font-medium label">
        <span className="label-text text-xl text-accent-content">
          More options
        </span>
        <button className="btn btn-square btn-primary btn-sm">
          <PlusIcon className="h-6 w-6" />
        </button>
      </div>
      <div className="collapse-content text-accent-content">
        <p>tabindex="0" attribute is necessary to make the div focusable</p>
      </div>
    </div>
  );
}
