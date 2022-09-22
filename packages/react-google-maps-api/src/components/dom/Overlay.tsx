import { getOffsetOverride } from './dom-helper'

type fnPixelPositionOffset = (
  offsetWidth: number,
  offsetHeight: number
) => { x: number; y: number }
export function createOverlay(
  container: HTMLElement,
  pane: keyof google.maps.MapPanes,
  position: google.maps.LatLng | google.maps.LatLngLiteral,
  getPixelPositionOffset?: fnPixelPositionOffset
) {
  class Overlay extends google.maps.OverlayView {
    container: HTMLElement
    pane: keyof google.maps.MapPanes
    position: google.maps.LatLng | google.maps.LatLngLiteral

    constructor(
      container: HTMLElement,
      pane: keyof google.maps.MapPanes,
      position: google.maps.LatLng | google.maps.LatLngLiteral
    ) {
      super()
      this.container = container
      this.pane = pane
      this.position = position
    }

    onAdd(): void {
      const pane = this.getPanes()?.[this.pane]
      pane?.appendChild(this.container)
    }

    draw(): void {
      const projection = this.getProjection()
      const point = projection.fromLatLngToDivPixel(this.position)
      const offset = {
        ...(this.container
          ? getOffsetOverride(this.container, getPixelPositionOffset)
          : {
            x: 0,
            y: 0,
          }),
      }
      if (point === null) {
        return
      }

      this.container.style.transform = `translate(${point.x + offset.x}px, ${
        point.y + offset.y
      }px)`
    }

    onRemove(): void {
      if (this.container.parentNode !== null) {
        this.container.parentNode.removeChild(this.container)
      }
    }
  }
  return new Overlay(container, pane, position)
}
