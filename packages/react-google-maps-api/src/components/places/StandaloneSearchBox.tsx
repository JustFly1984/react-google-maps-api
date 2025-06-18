import {
  Children,
  type JSX,
  createRef,
  PureComponent,
  type ReactNode,
  type RefObject,
  type ContextType,
} from 'react'
import invariant from 'invariant'

import {
  unregisterEvents,
  applyUpdatersToPropsAndRegisterEvents,
} from '../../utils/helper.js'

import MapContext from '../../map-context.js'

const eventMap = {
  onPlacesChanged: 'places_changed',
}

const updaterMap = {
  bounds(
    instance: google.maps.places.SearchBox,
    bounds: google.maps.LatLngBounds | google.maps.LatLngBoundsLiteral
  ): void {
    instance.setBounds(bounds)
  },
}

type StandaloneSearchBoxState = {
  searchBox: google.maps.places.SearchBox | null
}

export type StandaloneSearchBoxProps = {
  children?: ReactNode | undefined
  /** The area towards which to bias query predictions. Predictions are biased towards, but not restricted to, queries targeting these bounds. */
  bounds?:
    | google.maps.LatLngBounds
    | google.maps.LatLngBoundsLiteral
    | undefined
  options?: google.maps.places.SearchBoxOptions | undefined
  /** This event is fired when the user selects a query, getPlaces should be used to get new places. */
  onPlacesChanged?: (() => void) | undefined
  /** This callback is called when the searchBox instance has loaded. It is called with the searchBox instance. */
  onLoad?: ((searchBox: google.maps.places.SearchBox) => void) | undefined
  /** This callback is called when the component unmounts. It is called with the searchBox instance. */
  onUnmount?: ((searchBox: google.maps.places.SearchBox) => void) | undefined
}

class StandaloneSearchBox extends PureComponent<
  StandaloneSearchBoxProps,
  StandaloneSearchBoxState
> {
  static override contextType = MapContext
  declare context: ContextType<typeof MapContext>

  registeredEvents: google.maps.MapsEventListener[] = []

  containerElement: RefObject<HTMLDivElement> = createRef()

  override state: StandaloneSearchBoxState = {
    searchBox: null,
  }

  setSearchBoxCallback = (): void => {
    if (this.state.searchBox !== null && this.props.onLoad) {
      this.props.onLoad(this.state.searchBox)
    }
  }

  override componentDidMount(): void {
    invariant(
      !!google.maps.places,
      'You need to provide libraries={["places"]} prop to <LoadScript /> component %s',
      google.maps.places
    )

    if (
      this.containerElement !== null &&
      this.containerElement.current !== null
    ) {
      const input = this.containerElement.current.querySelector('input')

      if (input !== null) {
        const searchBox = new google.maps.places.SearchBox(
          input,
          this.props.options
        )

        this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
          updaterMap,
          eventMap,
          prevProps: {},
          nextProps: this.props,
          instance: searchBox,
        })

        this.setState(function setSearchBox() {
          return {
            searchBox,
          }
        }, this.setSearchBoxCallback)
      }
    }
  }

  override componentDidUpdate(prevProps: StandaloneSearchBoxProps): void {
    if (this.state.searchBox !== null) {
      unregisterEvents(this.registeredEvents)

      this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
        updaterMap,
        eventMap,
        prevProps,
        nextProps: this.props,
        instance: this.state.searchBox,
      })
    }
  }

  override componentWillUnmount(): void {
    if (this.state.searchBox !== null) {
      if (this.props.onUnmount) {
        this.props.onUnmount(this.state.searchBox)
      }

      unregisterEvents(this.registeredEvents)
    }
  }

  override render(): JSX.Element {
    return (
      <div ref={this.containerElement}>
        {Children.only(this.props.children)}
      </div>
    )
  }
}

export default StandaloneSearchBox
