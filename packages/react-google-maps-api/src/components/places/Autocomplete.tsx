import {
  type ComponentType,
  memo,
  useEffect,
  useRef,
  type JSX,
  type ReactNode,
} from 'react'
import invariant from 'invariant'

export type AutocompleteProps = {
  children: ReactNode
  bounds?:
    | google.maps.LatLngBounds
    | google.maps.LatLngBoundsLiteral
    | undefined
  restrictions?: google.maps.places.ComponentRestrictions | undefined
  fields?: string[] | undefined
  options?: google.maps.places.AutocompleteOptions | undefined
  types?: string[] | undefined
  onPlaceChanged?: (() => void) | undefined
  onLoad?: ((autocomplete: google.maps.places.Autocomplete) => void) | undefined
  onUnmount?:
    | ((autocomplete: google.maps.places.Autocomplete) => void)
    | undefined
  className?: string
}

function AutocompleteFunctional({
  children,
  bounds,
  restrictions,
  fields,
  options,
  types,
  onPlaceChanged,
  onLoad,
  onUnmount,
  className = '',
}: AutocompleteProps): JSX.Element {
  const containerElementRef = useRef<HTMLDivElement>(null)
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null)
  const registeredEventsRef = useRef<google.maps.MapsEventListener[]>([])

  useEffect(() => {
    invariant(
      !!google.maps.places,
      'You need to provide libraries={"places"} prop to <LoadScript /> component %s',
      google.maps.places
    )

    const input = containerElementRef.current?.querySelector('input')

    if (input) {
      const autocomplete = new google.maps.places.Autocomplete(input, options)
      autocompleteRef.current = autocomplete

      if (typeof bounds !== 'undefined') {
        autocomplete.setBounds(bounds)
      }

      if (typeof restrictions !== 'undefined') {
        autocomplete.setComponentRestrictions(restrictions)
      }

      if (typeof fields !== 'undefined') {
        autocomplete.setFields(fields)
      }

      if (typeof types !== 'undefined') {
        autocomplete.setTypes(types)
      }

      // Register event listeners
      const eventListeners: google.maps.MapsEventListener[] = []

      if (onPlaceChanged) {
        eventListeners.push(
          google.maps.event.addListener(autocomplete, 'place_changed', onPlaceChanged)
        )
      }

      registeredEventsRef.current = eventListeners

      if (onLoad) {
        onLoad(autocomplete)
      }
    }

    return (): void => {
      if (autocompleteRef.current !== null) {
        if (onUnmount) {
          onUnmount(autocompleteRef.current)
        }

        registeredEventsRef.current.forEach(event => event.remove())
        registeredEventsRef.current = []

        autocompleteRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    const autocomplete = autocompleteRef.current

    if (autocomplete !== null) {
      if (typeof bounds !== 'undefined') {
        autocomplete.setBounds(bounds)
      }

      if (typeof restrictions !== 'undefined') {
        autocomplete.setComponentRestrictions(restrictions)
      }

      if (typeof fields !== 'undefined') {
        autocomplete.setFields(fields)
      }

      if (typeof types !== 'undefined') {
        autocomplete.setTypes(types)
      }

      if (typeof options !== 'undefined') {
        autocomplete.setOptions(options)
      }
    }
  }, [bounds, restrictions, fields, types, options])

  useEffect(() => {
    const autocomplete = autocompleteRef.current

    if (autocomplete !== null) {
      registeredEventsRef.current.forEach(event => event.remove())
      registeredEventsRef.current = []

      const eventListeners: google.maps.MapsEventListener[] = []

      if (onPlaceChanged) {
        eventListeners.push(
          google.maps.event.addListener(autocomplete, 'place_changed', onPlaceChanged)
        )
      }

      registeredEventsRef.current = eventListeners
    }
  }, [onPlaceChanged])

  return (
    <div ref={containerElementRef} className={className}>
      {children}
    </div>
  )
}

export const AutocompleteF: ComponentType<AutocompleteProps> = memo<AutocompleteProps>(AutocompleteFunctional)

export const Autocomplete = AutocompleteF
