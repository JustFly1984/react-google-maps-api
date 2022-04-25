import type { ComponentStory, ComponentMeta } from '@storybook/react'
import { DrawingManager as ExampleComponent } from '@react-google-maps/api'

import ExampleDrawing from './example-drawing'
import { shapeExampleStyles } from '../components/styles'


export default {
  title: 'Example/Drawing Manager',
  component: ExampleComponent,
  args: {styles: shapeExampleStyles},
} as ComponentMeta<typeof ExampleComponent>

const Template: ComponentStory<typeof ExampleDrawing> = (args) => (
  <ExampleDrawing {...args} />
)

export const DrawingManager = Template.bind({})
