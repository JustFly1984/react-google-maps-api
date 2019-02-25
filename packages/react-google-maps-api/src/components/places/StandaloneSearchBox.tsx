import * as React from "react"
import { Context, createRef, Children, PureComponent, RefObject } from "react"
//@ts-ignore
import invariant from "invariant" // Do we need this dependency?

import {
  unregisterEvents,
  applyUpdatersToPropsAndRegisterEvents
} from "../../utils/helper"

import MapContext from "../../map-context"

const eventMap = {
  onPlacesChanged: "places_changed"
}

const updaterMap = {
  bounds(
    instance: google.maps.places.SearchBox,
    bounds: google.maps.LatLngBounds | google.maps.LatLngBoundsLiteral
  ) {
    instance.setBounds(bounds)
  }
}

interface StandaloneSearchBoxState {
  searchBox?: google.maps.places.SearchBox
}

interface StandaloneSearchBoxProps {
  bounds?: google.maps.LatLngBounds | google.maps.LatLngBoundsLiteral
  options?: google.maps.places.SearchBoxOptions
  onPlacesChanged?: () => void
}

class StandaloneSearchBox extends PureComponent<
  StandaloneSearchBoxProps,
  StandaloneSearchBoxState
> {
  static contextType = MapContext

  registeredEvents: google.maps.MapsEventListener[] = []

  containerElement: RefObject<HTMLDivElement>

  state: StandaloneSearchBoxState = {
    searchBox: null
  }

  constructor(
    props: StandaloneSearchBoxProps,
    context: Context<google.maps.Map>
  ) {
    super(props, context)

    invariant(
      google.maps.places,
      'Did you include "libraries=places" in the URL?'
    )
    this.containerElement = createRef()
  }

  componentDidMount = () => {
    const searchBox = new google.maps.places.SearchBox(
      this.containerElement.current.querySelector("input"),
      this.props.options
    )

    this.setState(
      () => ({
        searchBox
      }),
      () => {
        this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
          updaterMap,
          eventMap,
          prevProps: {},
          nextProps: this.props,
          instance: this.state.searchBox
        })
      }
    )
  }

  componentDidUpdate = (prevProps: StandaloneSearchBoxProps) => {
    unregisterEvents(this.registeredEvents)

    this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
      updaterMap,
      eventMap,
      prevProps,
      nextProps: this.props,
      instance: this.state.searchBox
    })
  }

  componentWillUnmount = () => {
    unregisterEvents(this.registeredEvents)
  }

  render = () => (
    <div ref={this.containerElement}>{Children.only(this.props.children)}</div>
  )

  getBounds = () => this.state.searchBox.getBounds()

  getPlaces = () => this.state.searchBox.getPlaces()
}

export default StandaloneSearchBox
