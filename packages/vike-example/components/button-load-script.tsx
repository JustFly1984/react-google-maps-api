import React, { memo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import { toggleLoadScript } from "../actions/app";
import { ReduxState } from "../reducers/app";

const id = "toggle-script";

function selector(state: ReduxState) {
  return {
    isApiKeyValid: state.googleMapsApiKey.length >= 38,
    checked: state.loadScriptChecked,
  };
}

function ButtonLoadScript(): React.JSX.Element {
  const dispatch = useDispatch();

  const onClick = useCallback(() => {
    dispatch(toggleLoadScript());
  }, [dispatch]);

  const { checked, isApiKeyValid } = useSelector(selector);

  return (
    <div>
      <button
        id={id}
        className={`btn btn-load ${checked ? "btn-danger" : "btn-primary"}`}
        type="button"
        onClick={onClick}
        disabled={!isApiKeyValid}
      >
        {checked ? "Unload Maps" : "Load Maps"}
      </button>
    </div>
  );
}

export default memo(ButtonLoadScript);
