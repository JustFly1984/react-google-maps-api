// eslint-disable-next-line filenames/match-exported
import React from 'react'
import PropTypes from 'prop-types'
import uuid from 'uuidv4'
import { connect } from 'react-redux'
import { LoadScript } from '@react-google-maps/api'

import CheckboxData from '../components/checkbox-data'
import CheckboxDirections from '../components/checkbox-directions'
import CheckboxHeatmap from '../components/checkbox-heatmap'
import CheckboxTraffic from '../components/checkbox-traffic'
import CheckboxShapes from '../components/checkbox-shapes'
import CheckboxDrawing from '../components/checkbox-drawing'
import CheckboxBicycling from '../components/checkbox-bicycling'
import CheckboxGround from '../components/checkbox-ground'
import CheckboxOptions from '../components/checkbox-options'
import CheckboxSearchbox from '../components/checkbox-searchbox'

import SectionData from './section-data'
import SectionDirections from './section-directions'
import SectionHeatmap from './section-heatmap'
import SectionTraffic from './section-traffic'
import SectionShapes from './section-shapes'
import SectionDrawing from './section-drawing'
import SectionBicycling from './section-bicycling'
import SectionGround from './section-ground'
import SectionOptions from './section-options'
import SectionSearchbox from './section-searchbox'

import styles from './styles.module.css'
uuidv4

const Loading = <div className={styles.loadingStyle} />

const googleMapsLibraries = ['drawing', 'visualization', 'places']

const loaderId = uuid()

const onLoad = () => console.log('script loaded')

const GoogleMaps = ({ googleMapsApiKey, language }) => (
  <div>
    <LoadScript
      id={loaderId}
      googleMapsApiKey={googleMapsApiKey}
      language={language}
      region={'EN'}
      version={'weekly'}
      onLoad={onLoad}
      loadingElement={Loading}
      libraries={googleMapsLibraries}
      preventGoogleFontsLoading
    >
      <div className='card shadow-sm mb-3'>
        <div className='card-body'>
          <CheckboxData />

          <SectionData />
        </div>
      </div>

      <div className='card shadow-sm mb-3'>
        <div className='card-body'>
          <CheckboxDirections />

          <SectionDirections />
        </div>
      </div>

      <div className='card shadow-sm mb-3'>
        <div className='card-body'>
          <CheckboxHeatmap />

          <SectionHeatmap />
        </div>
      </div>

      <div className='card shadow-sm mb-3'>
        <div className='card-body'>
          <CheckboxTraffic />

          <SectionTraffic />
        </div>
      </div>

      <div className='card shadow-sm mb-3'>
        <div className='card-body'>
          <CheckboxShapes />

          <SectionShapes />
        </div>
      </div>

      <div className='card shadow-sm mb-3'>
        <div className='card-body'>
          <CheckboxDrawing />

          <SectionDrawing />
        </div>
      </div>

      <div className='card shadow-sm mb-3'>
        <div className='card-body'>
          <CheckboxBicycling />

          <SectionBicycling />
        </div>
      </div>

      <div className='card shadow-sm mb-3'>
        <div className='card-body'>
          <CheckboxGround />

          <SectionGround />
        </div>
      </div>

      <div className='card shadow-sm mb-3'>
        <div className='card-body'>
          <CheckboxOptions />

          <SectionOptions />
        </div>
      </div>

      <div className='card shadow-sm mb-3'>
        <div className='card-body'>
          <CheckboxSearchbox />

          <SectionSearchbox />
        </div>
      </div>
    </LoadScript>
  </div>
)

GoogleMaps.propTypes = {
  language: PropTypes.string.isRequired,
  googleMapsApiKey: PropTypes.string.isRequired
}

const mapStateToProps = state => ({
  language: state.getIn(['app', 'language']),
  googleMapsApiKey: state.getIn(['app', 'googleMapsApiKey'])
})

export default connect(mapStateToProps)(GoogleMaps)
