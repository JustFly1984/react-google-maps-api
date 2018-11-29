/* eslint-disable filenames/match-regex */
/* global google */
import { has } from './has'
import { lowerFirst } from './lowerfirst'
import { reduce } from './reduce'
import { forEach } from './foreach'

const rdcUncontrolledAndControlledProps = (acc, value, key) => {
  if (has(acc.prevProps, key)) {
    const match = key.match(/^default(\S+)/)

    if (match) {
      const unprefixedKey = lowerFirst(match[1])

      if (!has(acc.nextProps, unprefixedKey)) {
        acc.nextProps[unprefixedKey] = acc.prevProps[key]
      }
    } else {
      acc.nextProps[key] = acc.prevProps[key]
    }
  }

  return acc
}

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

export const construct = (propTypes, updaterMap, prevProps, instance) => {
  const { nextProps } = reduce(propTypes, rdcUncontrolledAndControlledProps, {
    nextProps: {},
    prevProps,
  })

  return applyUpdaterToNextProps(
    updaterMap,
    {}, // empty prevProps for construct
    nextProps,
    instance
  )
}

/*
export function componentDidMount (props, instance, eventMap) {
  return registerEvents(props, instance, eventMap)
}

export function componentDidUpdate (props, instance, eventMap, updaterMap, state) {
  unregisterEvent(state.registeredList)

  applyUpdaterToNextProps(updaterMap, state.prevProps, props, instance)

  return registerEvents(props, instance, eventMap)
}
*/
export function getDerivedStateFromProps(props, state, instance, eventMap, updaterMap) {
  unregisterEvent(state.registeredList)

  return {
    prevProps: applyUpdaterToNextProps(updaterMap, state.prevProps, props, instance),
    registeredList: registerEvents(props, instance, eventMap)
  }
}

export function componentWillUnmount(component) {
  unregisterEvent(component.state.registeredList)
}

export function registerEvents(props, instance, eventMap) {
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

export function unregisterEvents(events = []) {
  events.map(unregisterEvent);
}

function unregisterEvent(registered) {
  google.maps.event.removeListener(registered)
}


export function applyUpdatersToPropsAndRegisterEvents({
  updaterMap, eventMap, prevProps, nextProps, instance
}) {
  applyUpdaterToNextProps(updaterMap, prevProps, nextProps, instance);
  return registerEvents(nextProps, instance, eventMap);
}



