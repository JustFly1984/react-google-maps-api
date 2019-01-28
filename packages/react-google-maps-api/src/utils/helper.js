/* eslint-disable filenames/match-regex */
/* global google */
import { reduce } from './reduce'
import { forEach } from './foreach'

const applyUpdaterToNextProps = (updaterMap, prevProps, nextProps, instance) => {
  let map = {}

  const iter = (fn, key) => {
    const nextValue = nextProps[key]

    if (nextValue !== prevProps[key]) {
      map[key] = nextValue
      fn(instance, nextValue)
    }
  }

  forEach(updaterMap, iter)

  return map
}

export function registerEvents (props, instance, eventMap) {
  const registeredList = reduce(eventMap, (acc, googleEventName, onEventName) => {
    if (typeof props[onEventName] === 'function') {
      acc.push(
        google.maps.event.addListener(instance, googleEventName, props[onEventName])
      )
    }

    return acc
  }, [])

  return registeredList
}

export function unregisterEvents (events = []) {
  events.map(unregisterEvent)
}

function unregisterEvent (registered) {
  google.maps.event.removeListener(registered)
}

export function applyUpdatersToPropsAndRegisterEvents ({
  updaterMap, eventMap, prevProps, nextProps, instance
}) {
  applyUpdaterToNextProps(updaterMap, prevProps, nextProps, instance)
  return registerEvents(nextProps, instance, eventMap)
}
