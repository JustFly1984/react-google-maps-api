import React, { memo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import { toggleHeatmap } from "../actions/app";

const id = "heatmap";

function selector(state) {
  return state.getIn(["app", "heatmap"]);
}

function CheckboxHeatmap(): React.JSX.Element {
  const dispatch = useDispatch();

  const onChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    ({ target: { checked } }) => {
      dispatch(
        toggleHeatmap({
          heatmap: checked,
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
        Heatmap
      </label>
    </div>
  );
}

export default memo(CheckboxHeatmap);
