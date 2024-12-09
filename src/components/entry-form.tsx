export default function EntryForm(): JSX.Element {
  return (
    <div className="card-body">
      <div className="form-control">
        <label className="label">
          <span className="label-text text-accent-content">
            Paste an ingredients list here
          </span>
        </label>
        <textarea
          className="textarea textarea-bordered h-52 textarea textarea-accent"
          placeholder="Find the ingredients list on the brand website and paste it here"
          defaultValue=""
        />
      </div>
      <div className="form-control mt-6">
        <button className="btn btn-primary">Analyze</button>
      </div>
    </div>
  );
}
