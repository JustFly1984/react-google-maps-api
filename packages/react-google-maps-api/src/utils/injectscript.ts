import { Loader, LoaderOptions } from '@googlemaps/js-api-loader'

import { isBrowser } from './isbrowser'

export const injectScript = ({ id, ...options }: LoaderOptions): Promise<any> => {
  if (!isBrowser) {
    return Promise.reject(new Error('document is undefined'))
  }

  return new Loader({ id, ...options })
    .load()
    .then(() => id) // continue resolving to id
    .catch((err) => {
      console.error('injectScript error: ', err)
      throw err
    })
}
