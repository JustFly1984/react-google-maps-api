import { fromJS } from 'immutable'
import { handleActions } from 'redux-actions'

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
  GROUND_TOGGLE,
  OPTIONS_TOGGLE
} from '../action-types'

const initialState = fromJS({
  language: 'en',
  loadScriptChecked: false,
  googleMapsApiKey: '',
  fusion: false,
  data: false,
  directions: false,
  heatmap: false,
  traffic: false,
  shapes: false,
  drawing: false,
  bicycling: false,
  ground: false,
  options: false
})

export default handleActions({
  [CHANGE_LANGUAGE]: (state, { payload: { language } }) =>
    state.merge({
      language
    }),
  [LOAD_SCRIPT_TOGGLE]: (state, { payload: { loadScriptChecked } }) =>
    state.merge({
      loadScriptChecked
    }),
  [SET_GOOGLE_MAPS_API_KEY]: (state, { payload: { googleMapsApiKey } }) =>
    state.merge({
      googleMapsApiKey
    }),
  [FUSION_TOGGLE]: (state, { payload: { fusion } }) =>
    state.merge({
      fusion
    }),
  [DATA_TOGGLE]: (state, { payload: { data } }) =>
    state.merge({
      data
    }),
  [DIRECTIONS_TOGGLE]: (state, { payload: { directions } }) =>
    state.merge({
      directions
    }),
  [HEATMAP_TOGGLE]: (state, { payload: { heatmap } }) =>
    state.merge({
      heatmap
    }),
  [TRAFFIC_TOGGLE]: (state, { payload: { traffic } }) =>
    state.merge({
      traffic
    }),
  [SHAPES_TOGGLE]: (state, { payload: { shapes } }) =>
    state.merge({
      shapes
    }),
  [DRAWING_TOGGLE]: (state, { payload: { drawing } }) =>
    state.merge({
      drawing
    }),
  [BICYCLING_TOGGLE]: (state, { payload: { bicycling } }) =>
    state.merge({
      bicycling
    }),
  [GROUND_TOGGLE]: (state, { payload: { ground } }) =>
    state.merge({
      ground
    }),
  [OPTIONS_TOGGLE]: (state, { payload: { options } }) =>
    state.merge({
      options
    })
}, initialState)
