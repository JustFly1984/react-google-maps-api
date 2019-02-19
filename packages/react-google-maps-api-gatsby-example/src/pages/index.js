// eslint-disable-next-line filenames/match-exported
import React from 'react'
import PropTypes from 'prop-types'
import Layout from '../components/layout'
import Footer from '../components/footer'
import { connect } from 'react-redux'

import InputBoxApiKey from '../components/inpunbox-apikey'
import SectionLanguage from '../components/section-language'
import CheckboxLoadscript from '../components/checkbox-loadscript'

import GoogleMaps from '../components/google-maps'

const IndexPage = ({ googleMapsApiKey, loadScriptChecked }) => (
  <Layout>
    <div className='container'>
      <div className='row'>
        <div className='col-lg-10 offset-lg-1'>
          <h2 className='h4 mb-3'>Settings</h2>
          <div className='card shadow-sm mb-5'>
            <div className='card-body'>
              <div>
                <InputBoxApiKey />

                <p className='small'>You can create new Google API key here: <a href='https://console.cloud.google.com/apis/credentials/key' alt='google api key' target='_blank' rel='noopener noreferrer'>https://console.cloud.google.com/apis/credentials/key</a></p>
              </div>

              <hr className='mb-4' />

              <SectionLanguage />

              <hr className='mb-4' />

              <CheckboxLoadscript />
            </div>
          </div>
        </div>
      </div>

      {loadScriptChecked && googleMapsApiKey.length >= 38 ? <GoogleMaps /> : null}
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
