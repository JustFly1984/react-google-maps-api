import * as React from "react"

import {
  unregisterEvents,
  applyUpdatersToPropsAndRegisterEvents
} from "../../utils/helper"

import MapContext from "../../map-context"

import * as invariant from "invariant"

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

interface AutocompleteProps {
  bounds?: google.maps.LatLngBounds | google.maps.LatLngBoundsLiteral;
  restrictions?: google.maps.places.ComponentRestrictions;
  fields?: string[];
  options?: google.maps.places.AutocompleteOptions;
  types?: string[];
  onPlaceChanged?: () => void;
  onLoad?: (autocomplete: google.maps.places.Autocomplete) => void;
}

export class Autocomplete extends React.PureComponent<
  AutocompleteProps,
  AutocompleteState
> {
  static contextType = MapContext

  registeredEvents: google.maps.MapsEventListener[] = []
  containerElement: React.RefObject<HTMLDivElement>

  state: AutocompleteState = {
    autocomplete: null
  }

  constructor(props: AutocompleteProps, context: React.Context<google.maps.Map>) {
    super(props, context)

    invariant(
      google.maps.places,
      'Did you include "libraries=places" in the URL?',
      "sdfs"
    )

    this.containerElement = React.createRef()
  }

  componentDidMount = () => {
    const input = this.containerElement.current!.querySelector("input")

    if (input) {
      const autocomplete = new google.maps.places.Autocomplete(
        input,
        this.props.options
      )

      this.setState(
        () => ({
          autocomplete
        }),
        () => {
          if (this.state.autocomplete !== null && this.props.onLoad) {
            // @ts-ignore
            this.props.onLoad(this.state.autocomplete)
          }
        }
      )
    }
  }

  componentDidUpdate = (prevProps: AutocompleteProps) => {
    unregisterEvents(this.registeredEvents)

    this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
      updaterMap,
      eventMap,
      prevProps,
      nextProps: this.props,
      instance: this.state.autocomplete
    })
  }

  componentWillUnmount = () => {
    unregisterEvents(this.registeredEvents)
  }

  render = () => (
    <div ref={this.containerElement}>
      { React.Children.only(this.props.children) }
    </div>
  )
}

export default Autocomplete
