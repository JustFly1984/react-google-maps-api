import { Wrapper } from '@googlemaps/react-wrapper'
import { googleMapsApiConfig } from './maps.config'

/** Storybook decorator for loading google maps API
 *
 * This decorator is based on `@googlemaps/react-wrapper`
 *
 * @see https://cloud.google.com/blog/products/maps-platform/loading-google-maps-platform-javascript-modern-web-applications
 * @see https://www.npmjs.com/package/@googlemaps/react-wrapper
 */
const googlemapsReactWrapperDecorator = (Story) => {
  return (
    <Wrapper {...googleMapsApiConfig}>
      <Story />
    </Wrapper>
  )
}

export default googlemapsReactWrapperDecorator
