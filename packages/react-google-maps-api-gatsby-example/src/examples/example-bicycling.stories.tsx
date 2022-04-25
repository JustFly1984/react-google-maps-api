
import type { ComponentStory, ComponentMeta } from '@storybook/react'
import { BicyclingLayer as ExampleComponent } from '@react-google-maps/api'

import ExampleBicycling from './example-bicycling'
import { shapeExampleStyles } from '../components/styles'


export default {
  title: 'Example/Bicycling Layer',
  component: ExampleComponent,
  args: {styles: shapeExampleStyles},
} as ComponentMeta<typeof ExampleComponent>

const Template: ComponentStory<typeof ExampleBicycling> = (args) => (
  <ExampleBicycling {...args} />
)

export const BicyclingLayer = Template.bind({})
