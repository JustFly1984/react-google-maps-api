/* global google */
import { createContext, Context } from 'react'

export interface IMapContext {
  map?: google.maps.Map
}

const MapContext: Context<IMapContext> = createContext(null)

export default MapContext
