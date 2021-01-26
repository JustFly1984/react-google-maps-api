import * as React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'

import Header from './header'
import Footer from './footer'

import './bootstrap.css'
import './styles.css'

const meta = [
  { name: 'description', content: 'Sample' },
  { name: 'keywords', content: 'sample, something' },
]

function Main({ title, children }) {
  return (
    <div className='bg-light'>
      <Helmet title={title} meta={meta}>
        <html lang='en' />
      </Helmet>

      <Header siteTitle={title} />

      <div className='container'>{children}</div>

      <Footer />
    </div>
  )
}

const MainMemo = React.memo(Main)

Main.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}

function Layout({ children }) {
  const render = React.useCallback(
    (data) => {
      return (
        <MainMemo title={data.site.siteMetadata.title}>{children}</MainMemo>
      )
    },
    [children]
  )

  return (
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
      render={render}
    />
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default React.memo(Layout)
