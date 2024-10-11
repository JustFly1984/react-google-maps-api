import React, { memo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import { toggleTransit } from "../actions/app";

const id = "transit";

function selector(state) {
  return state.getIn(["app", "transit"]);
}

function CheckboxTransit(): React.JSX.Element {
  const dispatch = useDispatch();

  const onChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    ({ target: { checked } }) => {
      dispatch(
        toggleTransit({
          transit: checked,
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
        Transit
      </label>
    </div>
  );
}

export default memo(CheckboxTransit);
