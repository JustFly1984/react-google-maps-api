import React, { Component } from 'react'
import PropTypes from 'prop-types'
import langEn from '../img/us.svg'
import langEs from '../img/es.svg'
import langRu from '../img/ru.svg'
import { connect } from 'react-redux'

import { flagStyle } from '../components/styles'

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
    <div className='row'>
      <div className='col-sm-4 col-md-3 col-xl-2'>
        <div className='custom-control custom-radio mb-1'>
          <input
            type='radio'
            id='en'
            className='custom-control-input'
            checked={this.props.language === 'en'}
            onChange={this.setEnLang}
          />
          {` `}
          <label
            className='custom-control-label'
            htmlFor='en'
          >
            <img style={flagStyle} src={langEn} alt='EN' />
            English
          </label>
        </div>
      </div>

      <div className='col-sm-4 col-md-3 col-xl-2'>
        <div className='custom-control custom-radio mb-1'>
          <input
            type='radio'
            id='es'
            className='custom-control-input'
            checked={this.props.language === 'es'}
            onChange={this.setEsLang}
          />
          {` `}
          <label
            className='custom-control-label'
            htmlFor='es'
          >
            <img style={flagStyle} src={langEs} alt='ES' />
            Spanish
          </label>
        </div>
      </div>

      <div className='col-sm-4 col-md-3 col-xl-2'>
        <div className='custom-control custom-radio mb-1'>
          <input
            type='radio'
            id='ru'
            className='custom-control-input'
            checked={this.props.language === 'ru'}
            onChange={this.setRuLang}
          />
          {` `}
          <label
            className='custom-control-label'
            htmlFor='ru'
          >
            <img style={flagStyle} src={langRu} alt='RU' />
            Russian
          </label>
        </div>
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
