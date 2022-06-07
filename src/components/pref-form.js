/* props
  basicprefs = array
  advancedprefs = array

*/

import Checkbox from './checkbox.js';

export default function prefForm(props) {
  const basics = [];
  props.basicprefs.forEach((pref) => {
    basics.push(<Checkbox label={pref} />);
  });
  return <div className="form-control w-full ">{basics}</div>;
}
