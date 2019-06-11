import * as React from "react"

import invariant from "invariant"

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
  searchBox: google.maps.places.SearchBox | null;
}

export interface StandaloneSearchBoxProps {
  bounds?: google.maps.LatLngBounds | google.maps.LatLngBoundsLiteral;
  options?: google.maps.places.SearchBoxOptions;
  onPlacesChanged?: () => void;
  onLoad?: (searchBox: google.maps.places.SearchBox) => void;
  onUnmount?: (searchBox: google.maps.places.SearchBox) => void;
}

class StandaloneSearchBox extends React.PureComponent<
  StandaloneSearchBoxProps,
  StandaloneSearchBoxState
> {
  static contextType = MapContext

  registeredEvents: google.maps.MapsEventListener[] = []

  containerElement: React.RefObject<HTMLDivElement> = React.createRef()

  state: StandaloneSearchBoxState = {
    searchBox: null
  }

  // eslint-disable-next-line @getify/proper-arrows/this, @getify/proper-arrows/name
  setSearchBoxCallback = () => {
    if (this.state.searchBox !== null && this.props.onLoad) {
      this.props.onLoad(this.state.searchBox)
    }
  }

  componentDidMount() {
    invariant(
      google.maps.places,
      'You need to provide libraries={["places"]} prop to <LoadScript /> component'
    )

    if (
      this.containerElement !== null &&
      this.containerElement.current !== null
    ) {
      const input = this.containerElement.current.querySelector("input")

      if (input) {
        const searchBox = new google.maps.places.SearchBox(
          // @ts-ignore
          input,
          this.props.options
        )

        this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
          updaterMap,
          eventMap,
          prevProps: {},
          nextProps: this.props,
          instance: searchBox
        })

        this.setState(
          function setSearchBox() {
            return {
              searchBox
            }
          },
          this.setSearchBoxCallback
        )
      }
    }
  }

  componentDidUpdate(prevProps: StandaloneSearchBoxProps) {
    if (this.state.searchBox !== null) {
      unregisterEvents(this.registeredEvents)

      this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
        updaterMap,
        eventMap,
        prevProps,
        nextProps: this.props,
        instance: this.state.searchBox
      })
    }
  }

  componentWillUnmount() {
    if (this.state.searchBox !== null) {
      if (this.props.onUnmount) {
        this.props.onUnmount(this.state.searchBox)
      }

      unregisterEvents(this.registeredEvents)
    }
  }

  render() {
    return (
      <div ref={this.containerElement}>
        {React.Children.only(this.props.children)}
      </div>
    )
  }
}

export default StandaloneSearchBox
