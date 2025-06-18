import React, { memo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import { toggleData } from "../actions/app";
import { ReduxState } from "../reducers/index";

const id = "data";

function selector(state: ReduxState) {
  return {
    value: state.app.data,
  };
}

function CheckboxData() {
  const dispatch = useDispatch();

  const onChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    ({ target: { checked } }) => {
      dispatch(
        toggleData({
          data: checked,
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
        Data
      </label>
    </div>
  );
}

export default memo(CheckboxData);
