// eslint-disable-next-line filenames/match-exported
import React from 'react'
import PropTypes from 'prop-types'
import Layout from '../components/layout'
import { connect } from 'react-redux'

import InputBoxApiKey from '../components/inpunbox-apikey'
import CheckboxLoadscript from '../components/checkbox-loadscript'
import SectionLanguage from '../components/section-language'

import CheckboxFusion from '../components/checkbox-fusion'
import CheckboxData from '../components/checkbox-data'
import CheckboxDirections from '../components/checkbox-directions'
import CheckboxHeatmap from '../components/checkbox-heatmap'
import CheckboxTraffic from '../components/checkbox-traffic'
import CheckboxShapes from '../components/checkbox-shapes'
import CheckboxDrawing from '../components/checkbox-drawing'
import CheckboxBicycling from '../components/checkbox-bicycling'
import CheckboxGround from '../components/checkbox-ground'
import CheckboxOptions from '../components/checkbox-options'

import GoogleMaps from '../components/google-maps'

const IndexPage = ({ googleMapsApiKey, loadScriptChecked }) => (
  <Layout>
    <section>
      <h1>Hello People!</h1>

      <p>Welcome to React Google Maps Light Example.</p>

      <p>
          You can create new Google API key here: <a href='https://console.cloud.google.com/apis/credentials/key' alt='google api key'>https://console.cloud.google.com/apis/credentials/key</a>
      </p>
    </section>

    <div>
      <InputBoxApiKey />

      <CheckboxLoadscript />

      <SectionLanguage />
    </div>

    <div>
      <CheckboxFusion />

      <CheckboxData />

      <CheckboxDirections />

      <CheckboxHeatmap />

      <CheckboxTraffic />

      <CheckboxShapes />

      <CheckboxDrawing />

      <CheckboxBicycling />

      <CheckboxGround />

      <CheckboxOptions />
    </div>

    {
      (
        loadScriptChecked &&
        googleMapsApiKey.length >= 38
      )
        ? (
          <GoogleMaps />
        )
        : null
    }
  </Layout>
)

IndexPage.propTypes = {
  googleMapsApiKey: PropTypes.string.isRequired,
  loadScriptChecked: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
  loadScriptChecked: state.getIn(['app', 'loadScriptChecked']),
  googleMapsApiKey: state.getIn(['app', 'googleMapsApiKey'])
})

export default connect(
  mapStateToProps
)(IndexPage)
