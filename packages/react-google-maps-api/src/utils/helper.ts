/* global google */
/* eslint-disable filenames/match-regex */
import { reduce } from './reduce'
import { forEach } from './foreach'

export const applyUpdaterToNextProps = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updaterMap: any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  prevProps: any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  nextProps: any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  instance: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): any => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const map: any = {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const iter = (fn: any, key: string): void => {
    const nextValue = nextProps[key]

    if (nextValue !== prevProps[key]) {
      map[key] = nextValue
      fn(instance, nextValue)
    }
  }

  forEach(updaterMap, iter)

  return map
}

export function registerEvents(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props: any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  instance: any,
  eventMap: Record<string, string>
): google.maps.MapsEventListener[] {
  const registeredList = reduce(
    eventMap,
    function reducer(
      acc: google.maps.MapsEventListener[],
      googleEventName: string,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onEventName: any
    ): google.maps.MapsEventListener[] {
      if (typeof props[onEventName] === 'function') {
        acc.push(google.maps.event.addListener(instance, googleEventName, props[onEventName]))
      }

      return acc
    },
    []
  )

  return registeredList
}
function unregisterEvent(registered: google.maps.MapsEventListener): void {
  google.maps.event.removeListener(registered)
}

export function unregisterEvents(events: google.maps.MapsEventListener[] = []): void {
  events.forEach(unregisterEvent)
}

export function applyUpdatersToPropsAndRegisterEvents({
  updaterMap,
  eventMap,
  prevProps,
  nextProps,
  instance,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updaterMap: any
  eventMap: Record<string, string>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  prevProps: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  nextProps: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  instance: any
}): google.maps.MapsEventListener[] {
  const registeredEvents = registerEvents(nextProps, instance, eventMap)
  applyUpdaterToNextProps(updaterMap, prevProps, nextProps, instance)
  return registeredEvents
}
