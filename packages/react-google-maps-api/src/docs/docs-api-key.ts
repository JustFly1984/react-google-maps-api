import localDevKey from './googleMapKey'
const KEY_NAME = 'react-google-maps-api-key'

export function setKey(key: string) {
  window.sessionStorage.setItem(KEY_NAME, key)
}

export function getKey() {
  return localDevKey || window.sessionStorage.getItem(KEY_NAME)
}
