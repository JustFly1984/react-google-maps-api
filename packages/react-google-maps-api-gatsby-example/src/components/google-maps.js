import React, { memo } from 'react'
import uniqid from 'uniqid'
import { useSelector } from 'react-redux'

import { LoadScript } from '@react-google-maps/api'

import Card from '../components/card'

import CheckboxData from '../components/checkbox-data'
import CheckboxDirections from '../components/checkbox-directions'
import CheckboxHeatmap from '../components/checkbox-heatmap'
import CheckboxTraffic from '../components/checkbox-traffic'
import CheckboxOverlayView from '../components/checkbox-overlay-view'
import CheckboxShapes from '../components/checkbox-shapes'
import CheckboxDrawing from '../components/checkbox-drawing'
import CheckboxBicycling from '../components/checkbox-bicycling'
import CheckboxTransit from '../components/checkbox-transit'
import CheckboxGround from '../components/checkbox-ground'
import CheckboxOptions from '../components/checkbox-options'
import CheckboxSearchBox from './checkbox-search-box'

import SectionData from './section-data'
import SectionDirections from './section-directions'
import SectionHeatmap from './section-heatmap'
import SectionTraffic from './section-traffic'
import SectionShapes from './section-shapes'
import SectionDrawing from './section-drawing'
import SectionBicycling from './section-bicycling'
import SectionTransit from './section-transit'
import SectionGround from './section-ground'
import SectionOptions from './section-options'
import SectionOverlayView from './section-overlay-view'
import SectionSearchBox from './section-search-box'

import * as styles from './styles.module.css'

const Loading = <div className={styles.loadingStyle} />

const googleMapsLibraries = ['drawing', 'visualization', 'places']

const loaderId = uniqid('loader-')

const onLoad = () => console.log('script loaded')

const onError = (err) => console.log('onError: ', err)

function selector(state) {
  return {
    language: state.getIn(['app', 'language']),
    googleMapsApiKey: state.getIn(['app', 'googleMapsApiKey']),
  }
}

function GoogleMaps() {
  const { googleMapsApiKey, language } = useSelector(selector)

  return (
    <LoadScript
      id={loaderId}
      googleMapsApiKey={googleMapsApiKey}
      language={language}
      region='EN'
      version='weekly'
      onLoad={onLoad}
      onError={onError}
      loadingElement={Loading}
      libraries={googleMapsLibraries}
      preventGoogleFontsLoading={false}
    >
      <Card>
        <CheckboxData />

        <SectionData />
      </Card>

      <Card>
        <CheckboxDirections />

        <SectionDirections />
      </Card>

      <Card>
        <CheckboxHeatmap />

        <SectionHeatmap />
      </Card>

      <Card>
        <CheckboxTraffic />

        <SectionTraffic />
      </Card>

      <Card>
        <CheckboxShapes />

        <SectionShapes />
      </Card>

      <Card>
        <CheckboxDrawing />

        <SectionDrawing />
      </Card>

      <Card>
        <CheckboxBicycling />

        <SectionBicycling />
      </Card>

      <Card>
        <CheckboxTransit />

        <SectionTransit />
      </Card>

      <Card>
        <CheckboxGround />

        <SectionGround />
      </Card>

      <Card>
        <CheckboxOptions />

        <SectionOptions />
      </Card>

      <Card>
        <CheckboxOverlayView />

        <SectionOverlayView />
      </Card>

      <Card>
        <CheckboxSearchBox />

        <SectionSearchBox />
      </Card>
    </LoadScript>
  )
}

export default memo(GoogleMaps)
