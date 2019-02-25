import * as React from "react"
import { PureComponent, RefObject, Children, Context, createRef } from "react"

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
  autocomplete?: google.maps.places.Autocomplete
}

interface AutocompleteProps {
  bounds?: google.maps.LatLngBounds | google.maps.LatLngBoundsLiteral
  restrictions?: google.maps.places.ComponentRestrictions
  fields?: string[]
  options?: google.maps.places.AutocompleteOptions
  types?: string[]
  onPlaceChanged?: () => void
}

export class Autocomplete extends PureComponent<
  AutocompleteProps,
  AutocompleteState
> {
  static contextType = MapContext

  registeredEvents: google.maps.MapsEventListener[] = []
  containerElement: RefObject<HTMLDivElement>

  state: AutocompleteState = {
    autocomplete: null
  }

  constructor(props: AutocompleteProps, context: Context<google.maps.Map>) {
    super(props, context)

    invariant(
      google.maps.places,
      'Did you include "libraries=places" in the URL?',
      "sdfs"
    )
    this.containerElement = createRef()
  }

  componentDidMount = () => {
    const autocomplete = new google.maps.places.Autocomplete(
      this.containerElement.current.querySelector("input"),
      this.props.options
    )

    this.setState(() => ({
      autocomplete
    }))
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
    <div ref={this.containerElement}>{Children.only(this.props.children)}</div>
  )

  getBounds = () => this.state.autocomplete.getBounds()

  // TODO: add to @types/googlemaps
  // @ts-ignore
  getFields = () => this.state.autocomplete.getFields()

  getPlace = () => this.state.autocomplete.getPlace()
}

export default Autocomplete
