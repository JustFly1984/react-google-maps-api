import React, { Component } from 'react'
import PropTypes from 'prop-types'
import langEn from '../img/us.svg'
import langEs from '../img/es.svg'
import langRu from '../img/ru.svg'
import { connect } from 'react-redux'

import { changeLanguage } from '../actions/app'

class SectionLanguage extends Component {
  setEnLang = ({ target: { checked } }) => {
    if (checked) {
      this.props.changeLanguage({
        language: 'en',
      })
    }
  }

  setRuLang = ({ target: { checked } }) => {
    if (checked) {
      this.props.changeLanguage({
        language: 'ru',
      })
    }
  }

  setEsLang = ({ target: { checked } }) => {
    if (checked) {
      this.props.changeLanguage({
        language: 'es',
      })
    }
  }

  render = () => (
    <div className='d-flex flex-wrap'>
      <div className='form-group custom-control custom-radio mr-4'>
        <input
          type='radio'
          id='en'
          className='custom-control-input'
          checked={this.props.language === 'en'}
          onChange={this.setEnLang}
        />
        {` `}
        <label className='custom-control-label' htmlFor='en'>
          <img src={langEn} className='flag' alt='EN' />
          English
        </label>
      </div>

      <div className='form-group custom-control custom-radio mr-4'>
        <input
          type='radio'
          id='es'
          className='custom-control-input'
          checked={this.props.language === 'es'}
          onChange={this.setEsLang}
        />
        {` `}
        <label className='custom-control-label' htmlFor='es'>
          <img src={langEs} className='flag' alt='ES' />
          Spanish
        </label>
      </div>

      <div className='form-group custom-control custom-radio mr-4'>
        <input
          type='radio'
          id='ru'
          className='custom-control-input'
          checked={this.props.language === 'ru'}
          onChange={this.setRuLang}
        />
        {` `}
        <label className='custom-control-label' htmlFor='ru'>
          <img src={langRu} className='flag' alt='RU' />
          Russian
        </label>
      </div>
    </div>
  )
}

SectionLanguage.propTypes = {
  language: PropTypes.string.isRequired,
  changeLanguage: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  language: state.getIn(['app', 'language']),
})

const mapDispatchToProps = dispatch => ({
  changeLanguage: ({ language }) => {
    dispatch(
      changeLanguage({
        language,
      })
    )
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SectionLanguage)
