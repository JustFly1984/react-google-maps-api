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
  const iter = (fn, key) => {
    const nextValue = nextProps[key]

    if (nextValue !== prevProps[key]) {
      fn(instance, nextValue)
    }
  }

  forEach(updaterMap, iter)
}

export const construct = (propTypes, updaterMap, prevProps, instance) => {
  const { nextProps } = reduce(propTypes, rdcUncontrolledAndControlledProps, {
    nextProps: {},
    prevProps,
  })

  applyUpdaterToNextProps(
    updaterMap,
    {
      /* empty prevProps for construct */
    },
    nextProps,
    instance
  )
}

export function componentDidMount (component, instance, eventMap) {
  registerEvents(component, instance, eventMap)
}

export function componentDidUpdate (component, instance, eventMap, updaterMap, prevProps) {
  component.unregisterAllEvents()

  applyUpdaterToNextProps(updaterMap, prevProps, component.props, instance)

  registerEvents(component, instance, eventMap)
}

export function componentWillUnmount (component) {
  component.unregisterAllEvents()
}

function registerEvents (component, instance, eventMap) {
  const registeredList = reduce(eventMap, (acc, googleEventName, onEventName) => {
    if (typeof component.props[onEventName] === 'function') {
      acc.push(
        google.maps.event.addListener(instance, googleEventName, component.props[onEventName])
      )
    }

    return acc
  }, [])

  component.unregisterAllEvents = forEach.bind(null, registeredList, unregisterEvent)
}

function unregisterEvent (registered) {
  google.maps.event.removeListener(registered)
}
