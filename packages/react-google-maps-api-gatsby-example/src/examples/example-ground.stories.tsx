import type { ComponentStory, ComponentMeta } from '@storybook/react'
import { GroundOverlay as ExampleComponent} from '@react-google-maps/api'

import ExampleGround from './example-ground'
import { shapeExampleStyles } from '../components/styles'


export default {
  title: 'Example/Ground Overlay',
  component: ExampleComponent,
  args: {styles: shapeExampleStyles},
} as ComponentMeta<typeof ExampleComponent>

const Template: ComponentStory<typeof ExampleGround> = (args) => (
  <ExampleGround {...args} />
)

export const GroundOverlay = Template.bind({})
