import type { ComponentStory, ComponentMeta } from '@storybook/react'
import { StandaloneSearchBox as ExampleComponent} from '@react-google-maps/api'

import ExampleSearchBox from './example-search-box'
import { shapeExampleStyles } from '../components/styles'


export default {
  title: 'Example/Standalone Search Box',
  component: ExampleComponent,
  args: {styles: shapeExampleStyles},
} as ComponentMeta<typeof ExampleComponent>

const Template: ComponentStory<typeof ExampleSearchBox> = (args) => (
  <ExampleSearchBox {...args} />
)

export const StandaloneSearchBox = Template.bind({})
