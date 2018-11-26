/* global google */
import { PureComponent } from 'react'
import PropTypes from 'prop-types'

import {
  construct,
  getDerivedStateFromProps,
  componentWillUnmount
} from '../../utils/MapChildHelper'

import { MAP, AUTOCOMPLETE } from '../../constants'
import { AutocompletePropTypes } from '../../proptypes'

const eventMap = {
  onPlaceChanged: 'place_changed',
}

const updaterMap = {
  bounds (instance, bounds) {
    instance.setBounds(bounds)
  },
  restrictions (instance, restrictions) {
    instance.setComponentRestrictions(restrictions)
  },
  fields (instance, fields) {
    instance.setFields(fields)
  },
  options (instance, options) {
    instance.setOptions(options)
  },
  types (instance, types) {
    instance.setTypes(types)
  }
}

export class Autocomplete extends PureComponent {
  static propTypes = AutocompletePropTypes

  static contextTypes = {
    [MAP]: PropTypes.object,
  }

  constructor (props, context) {
    super(props, context)

    const autocomplete = new google.maps.places.Autocomplete(
      props.inputField,
      props.options
    )

    this.state = {
      [AUTOCOMPLETE]: autocomplete,
      prevProps: construct(
        AutocompletePropTypes,
        updaterMap,
        props,
        autocomplete
      )
    }
  }

  static getDerivedStateFromProps (props, state) {
    return getDerivedStateFromProps(
      props,
      state,
      this.state[AUTOCOMPLETE],
      eventMap,
      updaterMap
    )
  }

  componentWillUnmount () {
    componentWillUnmount(this)
  }

  render () {
    return null
  }

  getBounds = () =>
    this.state[AUTOCOMPLETE].getBounds()

  getFields = () =>
    this.state[AUTOCOMPLETE].getFields()

  getPlace = () =>
    this.state[AUTOCOMPLETE].getPlace()
}

export default Autocomplete
