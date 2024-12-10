interface EntryFormProps {
  onAnalyze: () => void;
}

export default function EntryForm({ onAnalyze }: EntryFormProps): JSX.Element {
  return (
    <div className="card-body bg-accent">
      <h2 className="card-title">Enter your ingredients list</h2>
      <div className="form-control">
        <textarea
          className="textarea textarea-bordered h-24"
          placeholder="Paste your ingredients list here"
        ></textarea>
      </div>
      <div className="card-actions justify-end">
        <button className="btn btn-primary" onClick={onAnalyze}>
          Analyze
        </button>
      </div>
    </div>
  );
}
