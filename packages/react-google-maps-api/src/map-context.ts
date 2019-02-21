/* global google */
import { createContext, Context } from "react"

const MapContext: Context<google.maps.Map> = createContext(null)

export default MapContext
