import type { ComponentStory, ComponentMeta } from '@storybook/react'
import { Data as ExampleComponent } from '@react-google-maps/api'

import ExampleData from './example-data'
import { shapeExampleStyles } from '../components/styles'


export default {
  title: 'Example/Data',
  component: ExampleComponent,
  args: {styles: shapeExampleStyles},
} as ComponentMeta<typeof ExampleComponent>

const Template: ComponentStory<typeof ExampleData> = (args) => (
  <ExampleData {...args} />
)

export const Data = Template.bind({})
