/* eslint-disable filenames/match-regex */
/* global google */
import { reduce } from './reduce'
import { forEach } from './foreach'

const applyUpdaterToNextProps = (updaterMap: any, prevProps: any, nextProps: any, instance: any) => {
  forEach(updaterMap, (updaterFn: any, key: string) => {
    const nextValue = nextProps[key];
    const prevValue = prevProps[key];

    if (nextValue !== prevValue) {
      updaterFn(instance, nextValue)
    }
  })
}

export function registerEvents(props: any, instance: any, eventMap: Record<string, string>): google.maps.MapsEventListener[] {
  const registeredList = reduce(eventMap, (acc: google.maps.MapsEventListener[], googleEventName: string, reactEventName: any) => {

    if (typeof props[reactEventName] === 'function') {
      acc.push(
        google.maps.event.addListener(instance, googleEventName, props[reactEventName])
      )
    }

    return acc
  }, [])

  return registeredList
}

export function unregisterEvents(events: google.maps.MapsEventListener[] = []) {
  events.map(unregisterEvent)
}

function unregisterEvent(registered: google.maps.MapsEventListener) {
  google.maps.event.removeListener(registered)
}

export function applyUpdatersToPropsAndRegisterEvents({
  updaterMap, eventMap, prevProps, nextProps, instance
}: { updaterMap: any, eventMap: Record<string, string>, prevProps: any, nextProps: any, instance: any }) {
  applyUpdaterToNextProps(updaterMap, prevProps, nextProps, instance)
  return registerEvents(nextProps, instance, eventMap)
}
