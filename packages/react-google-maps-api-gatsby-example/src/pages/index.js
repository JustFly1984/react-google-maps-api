import * as React from 'react'
import Layout from '../components/layout'
import { useSelector } from 'react-redux'

import Info from '../components/info'
import Settings from '../components/settings'
import GoogleMaps from '../components/google-maps'
import NoMaps from '../components/no-maps'

function selector(state) {
  return {
    loadScriptChecked: state.getIn(['app', 'loadScriptChecked']),
    googleMapsApiKey: state.getIn(['app', 'googleMapsApiKey']),
  }
}

function IndexPage() {
  const { googleMapsApiKey, loadScriptChecked } = useSelector(selector)

  return (
    <Layout>
      <div className='row'>
        <div className='col-lg-10 offset-lg-1'>
          <Info />

          <div className='mb-5'>
            <h2 className='h5'>Settings</h2>

            <Settings />
          </div>

          <div className='mb-5'>
            <h2 className='h5'>Examples</h2>

            {loadScriptChecked && googleMapsApiKey.length >= 38 ? (
              <GoogleMaps />
            ) : (
              <NoMaps />
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default React.memo(IndexPage)
