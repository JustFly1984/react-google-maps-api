import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'

import Header from './header'
import './layout.css'

import { layoutStyle } from './styles'

const meta = [
  { name: 'description', content: 'Sample' },
  { name: 'keywords', content: 'sample, something' },
]

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <>
        <Helmet
          title={data.site.siteMetadata.title}
          meta={meta}
        >
          <html lang='en' />
        </Helmet>

        <Header siteTitle={data.site.siteMetadata.title} />

        <div
          style={layoutStyle}
        >
          {children}
        </div>
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
