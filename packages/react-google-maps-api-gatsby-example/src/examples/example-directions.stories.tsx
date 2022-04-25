import type { ComponentStory, ComponentMeta } from '@storybook/react'
import ExampleDirections from './example-directions'
import { shapeExampleStyles } from '../components/styles'


export default {
  title: 'Example/Directions',
  component: ExampleDirections,
  args: {styles: shapeExampleStyles},
} as ComponentMeta<typeof ExampleDirections>

const Template: ComponentStory<typeof ExampleDirections> = (args) => (
  <ExampleDirections {...args} />
)

export const Directions = Template.bind({})
