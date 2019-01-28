import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import {
  rowStyle
} from '../components/styles'

import {
  changeLanguage
} from '../actions/app'

class SectionLanguage extends Component {
  setEnLang = ({ target: { checked } }) => {
    if (checked) {
      this.props.changeLanguage({
        language: 'en'
      })
    }
  }

  setRuLang = ({ target: { checked } }) => {
    if (checked) {
      this.props.changeLanguage({
        language: 'ru'
      })
    }
  }

  setEsLang = ({ target: { checked } }) => {
    if (checked) {
      this.props.changeLanguage({
        language: 'es'
      })
    }
  }

  render = () => (
    <div style={rowStyle}>
      <div>
        <input
          type='checkbox'
          id='en'
          checked={this.props.language === 'en'}
          onChange={this.setEnLang}
        />
        {` `}
        <label htmlFor='en'>En language</label>
      </div>

      <div>
        <input
          type='checkbox'
          id='ru'
          checked={this.props.language === 'ru'}
          onChange={this.setRuLang}
        />
        {` `}
        <label htmlFor='ru'>Ru language</label>
      </div>

      <div>
        <input
          type='checkbox'
          id='es'
          checked={this.props.language === 'es'}
          onChange={this.setEsLang}
        />
        {` `}
        <label htmlFor='es'>Es language</label>
      </div>
    </div>
  )
}

SectionLanguage.propTypes = {
  language: PropTypes.string.isRequired,
  changeLanguage: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  language: state.getIn(['app', 'language'])
})

const mapDispatchToProps = dispatch => ({
  changeLanguage: ({ language }) => {
    dispatch(
      changeLanguage({
        language
      })
    )
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SectionLanguage)
