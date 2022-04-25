import type { ComponentStory, ComponentMeta } from '@storybook/react'
import { TrafficLayer as ExampleComponent} from '@react-google-maps/api'

import ExampleTraffic from './example-traffic'
import { shapeExampleStyles } from '../components/styles'


export default {
  title: 'Example/Traffic Layer',
  component: ExampleComponent,
  args: {styles: shapeExampleStyles},
} as ComponentMeta<typeof ExampleComponent>

const Template: ComponentStory<typeof ExampleTraffic> = (args) => (
  <ExampleTraffic {...args} />
)

export const TrafficLayer = Template.bind({})
