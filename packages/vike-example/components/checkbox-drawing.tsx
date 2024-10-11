import React, { memo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import { toggleDrawing } from "../actions/app";

const id = "drawing";

function selector(state) {
  return state.getIn(["app", "drawing"]);
}

function CheckboxDrawing(): React.JSX.Element {
  const dispatch = useDispatch();

  const onChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    ({ target: { checked } }) => {
      dispatch(
        toggleDrawing({
          drawing: checked,
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
        Drawing
      </label>
    </div>
  );
}

export default memo(CheckboxDrawing);
