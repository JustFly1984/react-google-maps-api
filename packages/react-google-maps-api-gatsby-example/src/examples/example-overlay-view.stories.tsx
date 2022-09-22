import type { ComponentStory, ComponentMeta } from '@storybook/react'
import { OverlayViewF } from '@react-google-maps/api'

import ExampleOverlayView from './example-overlay-view'
import { shapeExampleStyles } from '../components/styles'


export default {
  title: 'Example/Overlay View',
  component: OverlayViewF,
  args: {styles: shapeExampleStyles},
} as ComponentMeta<typeof OverlayViewF>

const Template: ComponentStory<typeof ExampleOverlayView> = (args) => (
  <ExampleOverlayView {...args} />
)

export const OverlayView = Template.bind({})
