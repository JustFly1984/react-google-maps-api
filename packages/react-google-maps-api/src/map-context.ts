/* global google */
import { createContext } from "react"

const MapContext = createContext<google.maps.Map | null>(null)

export default MapContext
