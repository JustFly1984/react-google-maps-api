import { WrapperProps } from '@googlemaps/react-wrapper'

/**
 * Secret Google Maps API Config
 *
 * Create `maps.config.ts` in `.storybook` folder
 * with the following content and replace `YOUR_API_KEY`
 * with your API Key provided by Google.
 *
 * `maps.config.ts` is ignored by git and will not be
 * committed to repository and/or published.
 */
// @ts-expect-error
export const googleMapsApiConfig: WrapperProps = {
  // uncomment next line and replace `YOUR_API_KEY` with your API Key provided by Google.
  // apiKey: 'YOUR_API_KEY',
  libraries: ['drawing', 'visualization', 'places'],
}
