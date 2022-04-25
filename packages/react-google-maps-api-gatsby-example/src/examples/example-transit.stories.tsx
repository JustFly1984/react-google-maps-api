import type { ComponentStory, ComponentMeta } from '@storybook/react'
import { TransitLayer as ExampleComponent} from '@react-google-maps/api'

import ExampleTransit from './example-transit'
import { shapeExampleStyles } from '../components/styles'


export default {
  title: 'Example/Transit Layer',
  component: ExampleComponent,
  args: {styles: shapeExampleStyles},
} as ComponentMeta<typeof ExampleComponent>

const Template: ComponentStory<typeof ExampleTransit> = (args) => (
  <ExampleTransit {...args} />
)

export const TransitLayer = Template.bind({})
