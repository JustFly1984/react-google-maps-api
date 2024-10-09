import React, { memo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import { toggleOverlayView } from "../actions/app";

const id = "overlayView";

function selector(state) {
  return {
    value: state.getIn(["app", "overlayView"]),
  };
}

function CheckboxOverlayView(): React.JSX.Element {
  const dispatch = useDispatch();

  const onChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    ({ target: { checked } }) => {
      dispatch(
        toggleOverlayView({
          overlayView: checked,
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
        Overlay View
      </label>
    </div>
  );
}

export default memo(CheckboxOverlayView);
