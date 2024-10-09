import { fromJS } from "immutable";
import { handleActions } from "redux-actions";

import {
  CHANGE_LANGUAGE,
  LOAD_SCRIPT_TOGGLE,
  SET_GOOGLE_MAPS_API_KEY,
  FUSION_TOGGLE,
  DATA_TOGGLE,
  DIRECTIONS_TOGGLE,
  HEATMAP_TOGGLE,
  TRAFFIC_TOGGLE,
  SHAPES_TOGGLE,
  DRAWING_TOGGLE,
  BICYCLING_TOGGLE,
  TRANSIT_TOGGLE,
  GROUND_TOGGLE,
  OPTIONS_TOGGLE,
  OVERLAY_VIEW_TOGGLE,
  STANDALONE_SEARCH_BOX_TOGGLE,
} from "../action-types";

const initialState = fromJS({
  language: "en",
  loadScriptChecked: false,
  googleMapsApiKey: "",
  fusion: false,
  data: false,
  directions: false,
  heatmap: false,
  traffic: false,
  shapes: false,
  drawing: false,
  bicycling: false,
  transit: false,
  ground: false,
  options: false,
  overlayView: false,
  standaloneSearchBox: false,
});

export type ReduxState = typeof initialState;

export type ChangeLanguagePayload = {
  language: string;
};

export type SetGoogleMapsApiKeyPayload = {
  googleMapsApiKey: string;
};

export type FusionTogglePayload = {
  fusion: boolean;
};

export default handleActions(
  {
    [CHANGE_LANGUAGE]: (state, { payload: { language } }: { payload: ChangeLanguagePayload }) => {
      return state.merge({
        language,
      });
    },
    [LOAD_SCRIPT_TOGGLE]: (state) => {
      return state.merge({
        loadScriptChecked: !state.get("loadScriptChecked"),
      });
    },
    [SET_GOOGLE_MAPS_API_KEY]: (state, { payload: { googleMapsApiKey } }: { payload: SetGoogleMapsApiKeyPayload }) => {
      return state.merge({
        googleMapsApiKey,
      });
    },
    [FUSION_TOGGLE]: (state, { payload: { fusion } }: { payload: FusionTogglePayload }) => {
      return state.merge({
        fusion,
      });
    },
    [DATA_TOGGLE]: (state, { payload: { data } }) => {
      return state.merge({
        data,
      });
    },
    [DIRECTIONS_TOGGLE]: (state, { payload: { directions } }) => {
      return state.merge({
        directions,
      });
    },
    [HEATMAP_TOGGLE]: (state, { payload: { heatmap } }) => {
      return state.merge({
        heatmap,
      });
    },
    [TRAFFIC_TOGGLE]: (state, { payload: { traffic } }) => {
      return state.merge({
        traffic,
      });
    },
    [SHAPES_TOGGLE]: (state, { payload: { shapes } }) => {
      return state.merge({
        shapes,
      });
    },
    [DRAWING_TOGGLE]: (state, { payload: { drawing } }) => {
      return state.merge({
        drawing,
      });
    },
    [BICYCLING_TOGGLE]: (state, { payload: { bicycling } }) => {
      return state.merge({
        bicycling,
      });
    },
    [TRANSIT_TOGGLE]: (state, { payload: { transit } }) => {
      return state.merge({
        transit,
      });
    },
    [GROUND_TOGGLE]: (state, { payload: { ground } }) => {
      return state.merge({
        ground,
      });
    },
    [OPTIONS_TOGGLE]: (state, { payload: { options } }) => {
      return state.merge({
        options,
      });
    },
    [OVERLAY_VIEW_TOGGLE]: (state, { payload: { overlayView } }) => {
      return state.merge({
        overlayView,
      });
    },
    [STANDALONE_SEARCH_BOX_TOGGLE]: (state, { payload: { standaloneSearchBox } }) => {
      return state.merge({
        standaloneSearchBox,
      });
    },
  },
  initialState,
);
