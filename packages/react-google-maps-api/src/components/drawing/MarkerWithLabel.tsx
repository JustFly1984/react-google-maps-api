import React, {CSSProperties} from 'react'
import ReactDOM from 'react-dom'
import Marker, {MarkerProps, updaterMap} from "./Marker"
import markerWithLabelFactory from 'markerwithlabel'

export interface MarkerWithLabelProps extends MarkerProps {
  labelAnchor?: google.maps.Point
  labelClass?: string
  labelStyle?: CSSProperties
  labelVisible?: boolean
}

const markerWithLabelUpdaterMap = {
  labelAnchor(instance: google.maps.Marker, labelAnchor: google.maps.Point) {
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
