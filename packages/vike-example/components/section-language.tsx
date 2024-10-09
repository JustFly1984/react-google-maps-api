// eslint-disable-next-line node/no-extraneous-import
import { memo, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import langEn from '../img/us.svg'
import langEs from '../img/es.svg'
import langRu from '../img/ru.svg'

import { changeLanguage } from '../actions/app'

function selector(state) {
  return state.getIn(['app', 'language'])
}

function SectionLanguage() {
  const dispatch = useDispatch()

  const setEnLang = useCallback(
    ({ target: { checked } }) => {
      if (checked) {
        dispatch(
          changeLanguage({
            language: 'en',
          })
        )
      }
    },
    [dispatch]
  )

  const setRuLang = useCallback(
    ({ target: { checked } }) => {
      if (checked) {
        dispatch(
          changeLanguage({
            language: 'ru',
          })
        )
      }
    },
    [dispatch]
  )

  const setEsLang = useCallback(
    ({ target: { checked } }) => {
      if (checked) {
        dispatch(
          changeLanguage({
            language: 'es',
          })
        )
      }
    },
    [dispatch]
  )

  const language = useSelector(selector)

  return (
    <div className='d-flex flex-wrap'>
      <div className='form-group custom-control custom-radio mr-4'>
        <input
          type='radio'
          id='en'
          className='custom-control-input'
          checked={language === 'en'}
          onChange={setEnLang}
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
          checked={language === 'es'}
          onChange={setEsLang}
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
          checked={language === 'ru'}
          onChange={setRuLang}
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

export default memo(SectionLanguage)
