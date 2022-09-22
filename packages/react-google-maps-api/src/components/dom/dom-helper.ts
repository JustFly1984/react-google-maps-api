import { PositionDrawProps } from "../../types"

export function getOffsetOverride(
  containerElement: HTMLElement,
  getPixelPositionOffset?:( (offsetWidth: number, offsetHeight: number) => { x: number; y: number }) | undefined
): { x: number; y: number } {
  return typeof getPixelPositionOffset === 'function'
    ? getPixelPositionOffset(containerElement.offsetWidth, containerElement.offsetHeight)
    : {
      x: 0,
      y: 0,
    }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function createLatLng(inst: any, Type: any): any { return new Type(inst.lat, inst.lng) }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function createLatLngBounds(inst: any, Type: any): any {
  return new Type(
    new google.maps.LatLng(inst.ne.lat, inst.ne.lng),
    new google.maps.LatLng(inst.sw.lat, inst.sw.lng)
  )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ensureOfType(
  inst: google.maps.LatLng | google.maps.LatLngLiteral | undefined,
  type: any,
  factory: any
): any {
  return inst instanceof type ? inst : factory(inst, type)
}

function ensureOfTypeBounds(
  inst: google.maps.LatLngBounds | google.maps.LatLngBoundsLiteral,
  type: any,
  factory: (inst: google.maps.LatLngBounds | google.maps.LatLngBoundsLiteral, type: any) => any
): any {
  return inst instanceof type ? inst : factory(inst, type)
}

function getLayoutStylesByBounds(
  mapCanvasProjection: google.maps.MapCanvasProjection,
  offset: { x: number; y: number },
  bounds: google.maps.LatLngBounds
): { left: string; top: string; width?: string | undefined; height?: string | undefined } {
  const ne = mapCanvasProjection && mapCanvasProjection.fromLatLngToDivPixel(bounds.getNorthEast())

  const sw = mapCanvasProjection && mapCanvasProjection.fromLatLngToDivPixel(bounds.getSouthWest())

  if (ne && sw) {
    return {
      left: `${sw.x + offset.x}px`,
      top: `${ne.y + offset.y}px`,
      width: `${ne.x - sw.x - offset.x}px`,
      height: `${sw.y - ne.y - offset.y}px`,
    }
  }

  return {
    left: '-9999px',
    top: '-9999px',
  }
}

function getLayoutStylesByPosition  (
  mapCanvasProjection: google.maps.MapCanvasProjection,
  offset: { x: number; y: number },
  position: google.maps.LatLng
): { left: string; top: string } {
  const point = mapCanvasProjection && mapCanvasProjection.fromLatLngToDivPixel(position)

  if (point) {
    const { x, y } = point

    return {
      left: `${x + offset.x}px`,
      top: `${y + offset.y}px`,
    }
  }

  return {
    left: '-9999px',
    top: '-9999px',
  }
}

export function getLayoutStyles (
  mapCanvasProjection: google.maps.MapCanvasProjection,
  offset: { x: number; y: number },
  bounds?: google.maps.LatLngBounds | google.maps.LatLngBoundsLiteral | undefined,
  position?: google.maps.LatLng | google.maps.LatLngLiteral | undefined
): PositionDrawProps {
  return bounds !== undefined
    ? getLayoutStylesByBounds(
        mapCanvasProjection,
        offset,
        ensureOfTypeBounds(bounds, google.maps.LatLngBounds, createLatLngBounds)
      )
    : getLayoutStylesByPosition(
        mapCanvasProjection,
        offset,
        ensureOfType(position, google.maps.LatLng, createLatLng)
      )
}

export function arePositionsEqual (
  currentPosition: PositionDrawProps,
  previousPosition: PositionDrawProps
): boolean {
  return currentPosition.left === previousPosition.left
    && currentPosition.top === previousPosition.top
    && currentPosition.width === previousPosition.height
    && currentPosition.height === previousPosition.height;
}
