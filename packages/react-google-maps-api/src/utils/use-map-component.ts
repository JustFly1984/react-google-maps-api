/* global google */
import {
  useState,
  useEffect,
  useContext
} from 'react'

import MapContext from '../map-context'

import {
  unregisterEvents,
  applyUpdatersToPropsAndRegisterEvents
} from './helper'

import usePrevious from "./use-previous"

export default function useMapComponent(props: any, updaterMap: any, eventMap: any, className) {
  const [instance, setInstance] = useState(null)
  const context = useContext(MapContext)
  const prevProps = usePrevious(props)

  let tempInstance
  if (!instance) {
    tempInstance = new google.maps[className]();
    setInstance(tempInstance)
    tempInstance.setMap(context)
  }

  useEffect(() => {
    const registeredEvents = applyUpdatersToPropsAndRegisterEvents({
      updaterMap,
      eventMap,
      prevProps,
      nextProps: props,
      instance: instance || tempInstance
    })

    return () => unregisterEvents(registeredEvents)
  })

  return null;
}
