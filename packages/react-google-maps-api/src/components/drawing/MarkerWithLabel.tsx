import React, {CSSProperties} from 'react'
import ReactDOM from 'react-dom'
import Marker, {MarkerProps, updaterMap} from "./Marker"
// @ts-ignore // seems like there are not types
import markerWithLabelFactory from 'markerwithlabel'

interface LabelAnchor {
  x: number,
  y: number
}

export interface MarkerWithLabelProps extends MarkerProps {
  labelAnchor?: LabelAnchor
  labelClass?: string
  labelStyle?: CSSProperties
  labelVisible?: boolean
}

const markerWithLabelUpdaterMap = {
  labelAnchor(instance: google.maps.Marker, labelAnchor: LabelAnchor) {
    instance.set(`labelAnchor`, labelAnchor)
  },
  labelClass(instance: google.maps.Marker, labelClass: string) {
    instance.set(`labelClass`, labelClass)
  },
  labelStyle(instance: google.maps.Marker, labelStyle: CSSProperties) {
    instance.set(`labelStyle`, labelStyle)
  },
  labelVisible(instance: google.maps.Marker, labelVisible: boolean) {
    instance.set(`labelVisible`, labelVisible)
  },
  ...updaterMap
}


class MarkerWithLabel extends Marker<MarkerWithLabelProps> {

  containerElement: HTMLDivElement | null = null

  createMarker = (markerOptions: google.maps.MarkerOptions) => {
    const MarkerWithLabel = markerWithLabelFactory(google.maps)
    this.containerElement = document.createElement('div')
    const marker = new MarkerWithLabel(markerOptions)
    marker.set('labelContent', this.containerElement)
    return marker
  }

  createUpdaterMap = () => markerWithLabelUpdaterMap

  componentWillUnmount() {
    super.componentWillUnmount();
    this.containerElement = null
  }

  render() {
    const element = super.render()
    return (
      <>
        {element}
        {this.containerElement &&
        ReactDOM.createPortal(
          this.props.children,
          this.containerElement
        )}
      </>
    )
  }
}


export default MarkerWithLabel
