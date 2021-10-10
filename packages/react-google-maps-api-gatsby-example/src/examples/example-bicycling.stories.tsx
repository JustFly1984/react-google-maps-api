import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import ExampleBicycling from './example-bicycling'
import { shapeExampleStyles } from '../components/styles'


export default {
  title: 'Example/Bicycling',
  component: ExampleBicycling,
  args: {styles: shapeExampleStyles},
} as ComponentMeta<typeof ExampleBicycling>

const Template: ComponentStory<typeof ExampleBicycling> = (args) => (
  <ExampleBicycling {...args} />
)

export const Bicycling = Template.bind({})
