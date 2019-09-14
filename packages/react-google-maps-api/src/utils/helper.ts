/* eslint-disable filenames/match-regex */
import { reduce } from './reduce'
import { forEach } from './foreach'

export const applyUpdaterToNextProps = (
  updaterMap: any,
  prevProps: any,
  nextProps: any,
  instance: any
): any => {
  const map: any = {}

  const iter = (fn: any, key: string) => {
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
  props: any,
  instance: any,
  eventMap: Record<string, string>
): google.maps.MapsEventListener[] {
  const registeredList = reduce(
    eventMap,
    function reducer(
      acc: google.maps.MapsEventListener[],
      googleEventName: string,
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
function unregisterEvent(registered: google.maps.MapsEventListener) {
  google.maps.event.removeListener(registered)
}

export function unregisterEvents(events: google.maps.MapsEventListener[] = []) {
  events.map(unregisterEvent)
}

export function applyUpdatersToPropsAndRegisterEvents({
  updaterMap,
  eventMap,
  prevProps,
  nextProps,
  instance,
}: {
  updaterMap: any
  eventMap: Record<string, string>
  prevProps: any
  nextProps: any
  instance: any
}) {
  const registeredEvents = registerEvents(nextProps, instance, eventMap)
  applyUpdaterToNextProps(updaterMap, prevProps, nextProps, instance)
  return registeredEvents
}
