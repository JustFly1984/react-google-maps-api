import { memo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import { toggleOptions } from "../actions/app";

const id = "options";

function selector(state) {
  return state.getIn(["app", "options"]);
}

function CheckboxOptions(): React.JSX.Element {
  const dispatch = useDispatch();

  const onChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    ({ target: { checked } }) => {
      dispatch(
        toggleOptions({
          options: checked,
        }),
      );
    },
    [dispatch],
  );
  const value = useSelector(selector);
  return (
    <div className="custom-control custom-checkbox">
      <input id={id} className="custom-control-input" type="checkbox" onChange={onChange} value={value} />

      <label className="custom-control-label" htmlFor={id}>
        Options
      </label>
    </div>
  );
}

export default memo(CheckboxOptions);
