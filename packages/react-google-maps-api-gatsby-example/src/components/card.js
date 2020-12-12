import * as React from 'react'
import PropTypes from 'prop-types'

function Card({ children }) {
  return (
    <div className='card shadow-sm mt-3'>
      <div className='card-body'>{children}</div>
    </div>
  )
}

Card.propTypes = {
  children: PropTypes.node.isRequired,
}

export default React.memo(Card)
