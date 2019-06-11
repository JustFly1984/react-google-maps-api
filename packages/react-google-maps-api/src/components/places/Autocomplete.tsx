import * as React from "react"

import {
  unregisterEvents,
  applyUpdatersToPropsAndRegisterEvents
} from "../../utils/helper"

import MapContext from "../../map-context"

import invariant from "invariant"

const eventMap = {
  onPlaceChanged: "place_changed"
}

const updaterMap = {
  bounds(
    instance: google.maps.places.Autocomplete,
    bounds: google.maps.LatLngBounds | google.maps.LatLngBoundsLiteral
  ) {
    instance.setBounds(bounds)
  },
  restrictions(
    instance: google.maps.places.Autocomplete,
    restrictions: google.maps.places.ComponentRestrictions
  ) {
    instance.setComponentRestrictions(restrictions)
  },
  fields(instance: google.maps.places.Autocomplete, fields: string[]) {
    // TODO: add to @types/googlemaps
    // @ts-ignore
    instance.setFields(fields)
  },
  options(
    instance: google.maps.places.Autocomplete,
    options: google.maps.places.AutocompleteOptions
  ) {
    // TODO: add to @types/googlemaps
    // @ts-ignore
    instance.setOptions(options)
  },
  types(instance: google.maps.places.Autocomplete, types: string[]) {
    instance.setTypes(types)
  }
}

interface AutocompleteState {
  autocomplete: google.maps.places.Autocomplete | null;
}

export interface AutocompleteProps {
  // required
  children: React.ReactChild;
  bounds?: google.maps.LatLngBounds | google.maps.LatLngBoundsLiteral;
  restrictions?: google.maps.places.ComponentRestrictions;
  fields?: string[];
  options?: google.maps.places.AutocompleteOptions;
  types?: string[];
  onPlaceChanged?: () => void;
  onLoad?: (autocomplete: google.maps.places.Autocomplete) => void;
  onUnmount?: (autocomplete: google.maps.places.Autocomplete) => void;
}

export class Autocomplete extends React.PureComponent<
  AutocompleteProps,
  AutocompleteState
> {
  static contextType = MapContext

  registeredEvents: google.maps.MapsEventListener[] = []
  containerElement: React.RefObject<HTMLDivElement> = React.createRef()

  state: AutocompleteState = {
    autocomplete: null
  }

  // eslint-disable-next-line @getify/proper-arrows/this, @getify/proper-arrows/name
  setAutocompleteCallback = () => {
    if (this.state.autocomplete !== null && this.props.onLoad) {
      this.props.onLoad(this.state.autocomplete)
    }
  }

  componentDidMount() {
    invariant(
      google.maps.places,
      'You need to provide libraries={["places"]} prop to <LoadScript /> component'
    )

    // TODO: why is this possibly null
    // @ts-ignore
    const input = this.containerElement.current.querySelector("input")

    if (input) {
      const autocomplete = new google.maps.places.Autocomplete(
        input,
        this.props.options
      )

      this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
        updaterMap,
        eventMap,
        prevProps: {},
        nextProps: this.props,
        instance: autocomplete
      })

      this.setState(
        function setAutocomplete() {
          return {
            autocomplete
          }
        },
        this.setAutocompleteCallback
      )
    }
  }

  componentDidUpdate(prevProps: AutocompleteProps) {
    unregisterEvents(this.registeredEvents)

    this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
      updaterMap,
      eventMap,
      prevProps,
      nextProps: this.props,
      instance: this.state.autocomplete
    })
  }

  componentWillUnmount() {
    if (this.state.autocomplete !== null) {
      unregisterEvents(this.registeredEvents)
    }
  }

  render() {
    return (
      <div ref={this.containerElement}>
        { React.Children.only(this.props.children) }
      </div>
    )
  }
}

export default Autocomplete
