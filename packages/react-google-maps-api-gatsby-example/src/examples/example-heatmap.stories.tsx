import type { ComponentStory, ComponentMeta } from '@storybook/react'
import { HeatmapLayer as ExampleComponent} from '@react-google-maps/api'

import ExampleHeatmap from './example-heatmap'
import { shapeExampleStyles } from '../components/styles'


export default {
  title: 'Example/Heatmap Layer',
  component: ExampleComponent,
  args: {styles: shapeExampleStyles},
} as ComponentMeta<typeof ExampleComponent>

const Template: ComponentStory<typeof ExampleHeatmap> = (args) => (
  <ExampleHeatmap {...args} />
)

export const HeatmapLayer = Template.bind({})
