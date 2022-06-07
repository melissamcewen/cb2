/*
label = string
*/

export default function checkbox(props) {
  return (
    <label className="label cursor-pointer">
      <span className="label-text text-xl text-accent-content">
        {props.label}
      </span>
      <input
        type="checkbox"
        checked="checked"
        className="checkbox checkbox-lg checkbox-primary"
      />
    </label>
  );
}
