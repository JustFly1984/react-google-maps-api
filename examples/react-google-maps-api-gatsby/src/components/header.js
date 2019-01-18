import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

import {
  headerStyle,
  linkStyle,
  innerHeaderStyle,
  h1style
} from './styles'

const Header = ({ siteTitle }) => (
  <div style={headerStyle}>
    <div style={innerHeaderStyle}>
      <h1 style={h1style}>
        <Link
          to='/'
          style={linkStyle}
        >
          {siteTitle}
        </Link>
      </h1>
    </div>
  </div>
)

Header.propTypes = {
  siteTitle: PropTypes.string.isRequired
}

export default Header
