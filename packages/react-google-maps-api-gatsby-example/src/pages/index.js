// eslint-disable-next-line filenames/match-exported
import React from 'react'
import PropTypes from 'prop-types'
import Layout from '../components/layout'
import Footer from '../components/footer'
import { connect } from 'react-redux'

import Settings from '../components/settings'
import GoogleMaps from '../components/google-maps'
import NoMaps from '../components/no-maps'

const IndexPage = ({ googleMapsApiKey, loadScriptChecked }) => (
  <Layout>
    <div className='container'>
      <div className='row'>
        <div className='col-lg-10 offset-lg-1'>
          <h2 className='h5 mb-3'>Settings</h2>

          <Settings />

          <h2 className='h5 mb-3'>Examples</h2>

          {loadScriptChecked && googleMapsApiKey.length >= 38 ? <GoogleMaps /> : <NoMaps />}
        </div>
      </div>
    </div>

    <Footer />
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

export default connect(mapStateToProps)(IndexPage)
