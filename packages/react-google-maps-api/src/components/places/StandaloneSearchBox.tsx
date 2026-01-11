import {
  type ComponentType,
  memo,
  useEffect,
  useRef,
  type JSX,
  type ReactNode,
} from 'react'
import invariant from 'invariant'

export type StandaloneSearchBoxProps = {
  children?: ReactNode | undefined
  bounds?:
    | google.maps.LatLngBounds
    | google.maps.LatLngBoundsLiteral
    | undefined
  options?: google.maps.places.SearchBoxOptions | undefined
  onPlacesChanged?: (() => void) | undefined
  onLoad?: ((searchBox: google.maps.places.SearchBox) => void) | undefined
  onUnmount?: ((searchBox: google.maps.places.SearchBox) => void) | undefined
}

function StandaloneSearchBoxFunctional({
  children,
  bounds,
  options,
  onPlacesChanged,
  onLoad,
  onUnmount,
}: StandaloneSearchBoxProps): JSX.Element {
  const containerElementRef = useRef<HTMLDivElement>(null)
  const searchBoxRef = useRef<google.maps.places.SearchBox | null>(null)
  const registeredEventsRef = useRef<google.maps.MapsEventListener[]>([])

  useEffect(() => {
    invariant(
      !!google.maps.places,
      'You need to provide libraries={"places"} prop to <LoadScript /> component %s',
      google.maps.places
    )

    const input = containerElementRef.current?.querySelector('input')

    if (input) {
      const searchBox = new google.maps.places.SearchBox(input, options)
      searchBoxRef.current = searchBox

      if (typeof bounds !== 'undefined') {
        searchBox.setBounds(bounds)
      }

      const eventListeners: google.maps.MapsEventListener[] = []

      if (onPlacesChanged) {
        eventListeners.push(
          google.maps.event.addListener(searchBox, 'places_changed', onPlacesChanged)
        )
      }

      registeredEventsRef.current = eventListeners

      if (onLoad) {
        onLoad(searchBox)
      }
    }

    return (): void => {
      if (searchBoxRef.current !== null) {
        if (onUnmount) {
          onUnmount(searchBoxRef.current)
        }

        registeredEventsRef.current.forEach(event => event.remove())
        registeredEventsRef.current = []

        searchBoxRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    const searchBox = searchBoxRef.current

    if (searchBox !== null) {
      if (typeof bounds !== 'undefined') {
        searchBox.setBounds(bounds)
      }
    }
  }, [bounds])

  useEffect(() => {
    const searchBox = searchBoxRef.current

    if (searchBox !== null) {
      registeredEventsRef.current.forEach(event => event.remove())
      registeredEventsRef.current = []

      const eventListeners: google.maps.MapsEventListener[] = []

      if (onPlacesChanged) {
        eventListeners.push(
          google.maps.event.addListener(searchBox, 'places_changed', onPlacesChanged)
        )
      }

      registeredEventsRef.current = eventListeners
    }
  }, [onPlacesChanged])

  return (
    <div ref={containerElementRef}>
      {children}
    </div>
  )
}

export const StandaloneSearchBoxF: ComponentType<StandaloneSearchBoxProps> = memo<StandaloneSearchBoxProps>(StandaloneSearchBoxFunctional)

export const StandaloneSearchBox = StandaloneSearchBoxF
