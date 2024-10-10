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

const initialState = {
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
};

export type AppState = typeof initialState;

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
    [CHANGE_LANGUAGE]: (state: AppState, { payload: { language } }: { payload: ChangeLanguagePayload }): AppState => {
      return {
        ...state,
        language,
      };
    },
    [LOAD_SCRIPT_TOGGLE]: (state: AppState): AppState => {
      return {
        ...state,
        loadScriptChecked: !state.loadScriptChecked,
      };
    },
    [SET_GOOGLE_MAPS_API_KEY]: (
      state: AppState,
      { payload: { googleMapsApiKey } }: { payload: SetGoogleMapsApiKeyPayload },
    ) => {
      return {
        ...state,
        googleMapsApiKey,
      };
    },
    [FUSION_TOGGLE]: (state: AppState, { payload: { fusion } }: { payload: FusionTogglePayload }) => {
      return {
        ...state,
        fusion,
      };
    },
    [DATA_TOGGLE]: (state: AppState, { payload: { data } }) => {
      return {
        ...state,
        data,
      };
    },
    [DIRECTIONS_TOGGLE]: (state: AppState, { payload: { directions } }) => {
      return {
        ...state,
        directions,
      };
    },
    [HEATMAP_TOGGLE]: (state: AppState, { payload: { heatmap } }) => {
      return {
        ...state,
        heatmap,
      };
    },
    [TRAFFIC_TOGGLE]: (state: AppState, { payload: { traffic } }) => {
      return {
        ...state,
        traffic,
      };
    },
    [SHAPES_TOGGLE]: (state: AppState, { payload: { shapes } }) => {
      return {
        ...state,
        shapes,
      };
    },
    [DRAWING_TOGGLE]: (state: AppState, { payload: { drawing } }) => {
      return {
        ...state,
        drawing,
      };
    },
    [BICYCLING_TOGGLE]: (state: AppState, { payload: { bicycling } }) => {
      return {
        ...state,
        bicycling,
      };
    },
    [TRANSIT_TOGGLE]: (state: AppState, { payload: { transit } }) => {
      return {
        ...state,
        transit,
      };
    },
    [GROUND_TOGGLE]: (state: AppState, { payload: { ground } }) => {
      return {
        ...state,
        ground,
      };
    },
    [OPTIONS_TOGGLE]: (state: AppState, { payload: { options } }) => {
      return {
        ...state,
        options,
      };
    },
    [OVERLAY_VIEW_TOGGLE]: (state: AppState, { payload: { overlayView } }) => {
      return {
        ...state,
        overlayView,
      };
    },
    [STANDALONE_SEARCH_BOX_TOGGLE]: (state: AppState, { payload: { standaloneSearchBox } }) => {
      return {
        ...state,
        standaloneSearchBox,
      };
    },
  },
  initialState,
);
