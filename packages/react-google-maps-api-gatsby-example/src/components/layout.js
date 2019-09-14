import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'

import Header from './header'
import Footer from './footer'

import './bootstrap.css'
import './styles.css'

const meta = [
  { name: 'description', content: 'Sample' },
  { name: 'keywords', content: 'sample, something' },
]

const Main = ({ title, children }) => (
  <div className='bg-light'>
    <Helmet title={title} meta={meta}>
      <html lang='en' />
    </Helmet>

    <Header siteTitle={title} />

    <div className='container'>{children}</div>

    <Footer />
  </div>
)

Main.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}

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
    // eslint-disable-next-line react-perf/jsx-no-new-function-as-prop
    render={data => (
      <Main title={data.site.siteMetadata.title}>{children}</Main>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
