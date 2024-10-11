import React, { memo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import { toggleTraffic } from "../actions/app";

const id = "traffic";

function selector(state) {
  return state.getIn(["app", "traffic"]);
}

function CheckboxTraffic(): React.JSX.Element {
  const dispatch = useDispatch();

  const onChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    ({ target: { checked } }) => {
      dispatch(
        toggleTraffic({
          traffic: checked,
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
        Traffic
      </label>
    </div>
  );
}

export default memo(CheckboxTraffic);
