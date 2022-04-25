import type { ComponentStory, ComponentMeta } from '@storybook/react'
import { OverlayView as ExampleComponent} from '@react-google-maps/api'

import ExampleOverlayView from './example-overlay-view'
import { shapeExampleStyles } from '../components/styles'


export default {
  title: 'Example/Overlay View',
  component: ExampleComponent,
  args: {styles: shapeExampleStyles},
} as ComponentMeta<typeof ExampleComponent>

const Template: ComponentStory<typeof ExampleOverlayView> = (args) => (
  <ExampleOverlayView {...args} />
)

export const OverlayView = Template.bind({})
