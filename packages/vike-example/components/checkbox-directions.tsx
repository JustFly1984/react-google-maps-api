import React, { memo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import { toggleDirections } from "../actions/app";

const id = "directions";

function selector(state) {
  return state.getIn(["app", "directions"]);
}

function CheckboxDirections(): React.JSX.Element {
  const dispatch = useDispatch();

  const onChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    ({ target: { checked } }) => {
      dispatch(
        toggleDirections({
          directions: checked,
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
        Directions
      </label>
    </div>
  );
}

export default memo(CheckboxDirections);
