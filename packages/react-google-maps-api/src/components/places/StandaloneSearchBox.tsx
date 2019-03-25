import * as React from "react"

import * as invariant from "invariant"

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
  searchBox: google.maps.places.SearchBox | null
}

interface StandaloneSearchBoxProps {
  bounds?: google.maps.LatLngBounds | google.maps.LatLngBoundsLiteral
  options?: google.maps.places.SearchBoxOptions
  onPlacesChanged?: () => void
  onLoad: (searchBox: google.maps.places.SearchBox) => void
}

class StandaloneSearchBox extends React.PureComponent<
  StandaloneSearchBoxProps,
  StandaloneSearchBoxState
> {
  public static defaultProps = {
    onLoad: () => {}
  }
  static contextType = MapContext

  registeredEvents: google.maps.MapsEventListener[] = []

  containerElement: React.RefObject<HTMLDivElement>

  state: StandaloneSearchBoxState = {
    searchBox: null
  }

  constructor(
    props: StandaloneSearchBoxProps,
    context: React.Context<google.maps.Map>
  ) {
    super(props, context)

    invariant(
      google.maps.places,
      'Did you include "libraries=places" in the URL?'
    )

    this.containerElement = React.createRef()
  }

  componentDidMount = () => {
    // TODO
    // @ts-ignore
    const input = this.containerElement.current.querySelector("input")

    if (input) {
      const searchBox = new google.maps.places.SearchBox(
        // @ts-ignore
        input,
        this.props.options
      )

      this.setState(
        () => ({
          searchBox
        }),
        () => {
          if (this.state.searchBox !== null) {
            this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
              updaterMap,
              eventMap,
              prevProps: {},
              nextProps: this.props,
              instance: this.state.searchBox
            })

            this.props.onLoad(this.state.searchBox)
          }
        }
      )
    }
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
    <div ref={this.containerElement}>
      {React.Children.only(this.props.children)}
    </div>
  )
}

export default StandaloneSearchBox
