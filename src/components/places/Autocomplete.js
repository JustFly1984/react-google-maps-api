/* global google */
import { PureComponent } from 'react'
import PropTypes from 'prop-types'

import {
  construct,
  componentDidMount,
  componentDidUpdate,
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

    construct(
      AutocompletePropTypes,
      updaterMap,
      props,
      autocomplete
    )

    this.state = {
      [AUTOCOMPLETE]: autocomplete,
    }

    this.getBounds = this.getBounds.bind(this)
    this.getFields = this.getFields.bind(this)
    this.getPlace = this.getPlace.bind(this)
  }

  componentDidMount () {
    componentDidMount(this, this.state[AUTOCOMPLETE], eventMap)
  }

  componentDidUpdate (prevProps) {
    componentDidUpdate(this, this.state[AUTOCOMPLETE], eventMap, updaterMap, prevProps)
  }

  componentWillUnmount () {
    componentWillUnmount(this)
  }

  render () {
    return false
  }

  getBounds () {
    return this.state[AUTOCOMPLETE].getBounds()
  }

  getFields () {
    return this.state[AUTOCOMPLETE].getFields()
  }

  getPlace () {
    return this.state[AUTOCOMPLETE].getPlace()
  }
}

export default Autocomplete
