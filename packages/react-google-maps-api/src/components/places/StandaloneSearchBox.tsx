import * as React from 'react'

import invariant from 'invariant'

import { unregisterEvents, applyUpdatersToPropsAndRegisterEvents } from '../../utils/helper'

import MapContext from '../../map-context'

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

interface StandaloneSearchBoxState {
  searchBox: google.maps.places.SearchBox | null
}

export interface StandaloneSearchBoxProps {
  /** The area towards which to bias query predictions. Predictions are biased towards, but not restricted to, queries targeting these bounds. */
  bounds?: google.maps.LatLngBounds | google.maps.LatLngBoundsLiteral
  options?: google.maps.places.SearchBoxOptions
  /** This event is fired when the user selects a query, getPlaces should be used to get new places. */
  onPlacesChanged?: () => void
  /** This callback is called when the searchBox instance has loaded. It is called with the searchBox instance. */
  onLoad?: (searchBox: google.maps.places.SearchBox) => void
  /** This callback is called when the component unmounts. It is called with the searchBox instance. */
  onUnmount?: (searchBox: google.maps.places.SearchBox) => void
}

class StandaloneSearchBox extends React.PureComponent<
  StandaloneSearchBoxProps,
  StandaloneSearchBoxState
> {
  static contextType = MapContext

  registeredEvents: google.maps.MapsEventListener[] = []

  containerElement: React.RefObject<HTMLDivElement> = React.createRef()

  state: StandaloneSearchBoxState = {
    searchBox: null,
  }

  setSearchBoxCallback = (): void => {
    if (this.state.searchBox !== null && this.props.onLoad) {
      this.props.onLoad(this.state.searchBox)
    }
  }

  componentDidMount(): void {
    invariant(
      !!google.maps.places,
      'You need to provide libraries={["places"]} prop to <LoadScript /> component %s',
      google.maps.places
    )

    if (this.containerElement !== null && this.containerElement.current !== null) {
      const input = this.containerElement.current.querySelector('input')

      if (input !== null) {
        const searchBox = new google.maps.places.SearchBox(input, this.props.options)

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

  componentDidUpdate(prevProps: StandaloneSearchBoxProps): void {
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

  componentWillUnmount(): void {
    if (this.state.searchBox !== null) {
      if (this.props.onUnmount) {
        this.props.onUnmount(this.state.searchBox)
      }

      unregisterEvents(this.registeredEvents)
    }
  }

  render(): React.ReactNode {
    return <div ref={this.containerElement}>{React.Children.only(this.props.children)}</div>
  }
}

export default StandaloneSearchBox
