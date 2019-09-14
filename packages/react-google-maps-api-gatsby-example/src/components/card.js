import React from 'react'
import PropTypes from 'prop-types'

const Card = ({ children }) => (
  <div className='card shadow-sm mt-3'>
    <div className='card-body'>{children}</div>
  </div>
)

Card.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Card
