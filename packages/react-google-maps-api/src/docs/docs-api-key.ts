// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import localDevKey from './googleMapKey'
const KEY_NAME = 'react-google-maps-api-key'

export function setKey(key: string): void {
  window.sessionStorage.setItem(KEY_NAME, key)
}

export function getKey(): string | null {
  return localDevKey || window.sessionStorage.getItem(KEY_NAME)
}
