
import googlemapsReactWrapperDecorator from './googlemapsReactWrapperDecorator'

export const decorators = [googlemapsReactWrapperDecorator]

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}
