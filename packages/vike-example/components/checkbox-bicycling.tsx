import React, { memo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { toggleBicycling } from "../actions/app";
import { ReduxState } from "../reducers/app";

const id = "bicycling";

function selector(state: ReduxState) {
  return state.bicycling;
}

function CheckboxBicycling(): React.JSX.Element {
  const dispatch = useDispatch();

  const onChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    ({ target: { checked } }) => {
      dispatch(
        toggleBicycling({
          bicycling: checked,
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
        Bicycling
      </label>
    </div>
  );
}

export default memo(CheckboxBicycling);
