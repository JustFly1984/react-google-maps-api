import type { ComponentStory, ComponentMeta } from '@storybook/react'
import { GoogleMap } from '.'

export default {
  title: 'Example/GoogleMap',
  component: GoogleMap,
  args: {
    zoom: 8,
    mapContainerStyle: {
      width: '480px',
      height: '320px',
    },
    center: {
      lat: -3.745,
      lng: -38.523,
    },
  },
} as ComponentMeta<typeof GoogleMap>

const Template: ComponentStory<typeof GoogleMap> = (args) => (
  <GoogleMap {...args} />
)

export const Default = Template.bind({})
Default.args = {
  zoom: 8,
}
export const Satellite = Template.bind({})
Satellite.args = {
  zoom: 15,
  mapTypeId: 'satellite'
}
