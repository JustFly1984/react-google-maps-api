import type { ComponentStory, ComponentMeta } from '@storybook/react'
// import { TransitLayer as ExampleShapes} from '@react-google-maps/api'

import ExampleShapes from './example-shapes'
import { shapeExampleStyles } from '../components/styles'


export default {
  title: 'Example/Shapes',
  component: ExampleShapes,
  args: {styles: shapeExampleStyles},
} as ComponentMeta<typeof ExampleShapes>

const Template: ComponentStory<typeof ExampleShapes> = (args) => (
  <ExampleShapes {...args} />
)

export const Shapes = Template.bind({})
