/* globals google */
import { type ContextType, memo, PureComponent, useContext, useEffect, useState } from 'react'

import invariant from 'invariant'

import { unregisterEvents, applyUpdatersToPropsAndRegisterEvents } from '../../utils/helper'

import MapContext from '../../map-context'

const eventMap = {
  onCircleComplete: 'circlecomplete',
  onMarkerComplete: 'markercomplete',
  onOverlayComplete: 'overlaycomplete',
  onPolygonComplete: 'polygoncomplete',
  onPolylineComplete: 'polylinecomplete',
  onRectangleComplete: 'rectanglecomplete',
}

const updaterMap = {
  drawingMode(
    instance: google.maps.drawing.DrawingManager,
    drawingMode: google.maps.drawing.OverlayType | null
  ): void {
    instance.setDrawingMode(drawingMode)
  },
  options(
    instance: google.maps.drawing.DrawingManager,
    options: google.maps.drawing.DrawingManagerOptions
  ): void {
    instance.setOptions(options)
  },
}

interface DrawingManagerState {
  drawingManager: google.maps.drawing.DrawingManager | null
}

export interface DrawingManagerProps {
  options?: google.maps.drawing.DrawingManagerOptions | undefined
  /** Changes the DrawingManager's drawing mode, which defines the type of overlay to be added on the map. Accepted values are 'marker', 'polygon', 'polyline', 'rectangle', 'circle', or null. A drawing mode of null means that the user can interact with the map as normal, and clicks do not draw anything. */
  drawingMode?: google.maps.drawing.OverlayType | null | undefined
  /** This event is fired when the user has finished drawing a circle. */
  onCircleComplete?: ((circle: google.maps.Circle) => void) | undefined
  /** This event is fired when the user has finished drawing a marker. */
  onMarkerComplete?: ((marker: google.maps.Marker) => void) | undefined
  /** This event is fired when the user has finished drawing an overlay of any type. */
  onOverlayComplete?: ((e: google.maps.drawing.OverlayCompleteEvent) => void) | undefined
  /** This event is fired when the user has finished drawing a polygon. */
  onPolygonComplete?: ((polygon: google.maps.Polygon) => void) | undefined
  /** This event is fired when the user has finished drawing a polyline. */
  onPolylineComplete?: ((polyline: google.maps.Polyline) => void) | undefined
  /** This event is fired when the user has finished drawing a rectangle. */
  onRectangleComplete?: ((rectangle: google.maps.Rectangle) => void) | undefined
  /** This callback is called when the drawingManager instance has loaded. It is called with the drawingManager instance. */
  onLoad?: ((drawingManager: google.maps.drawing.DrawingManager) => void) | undefined
  /** This callback is called when the component unmounts. It is called with the drawingManager instance. */
  onUnmount?: ((drawingManager: google.maps.drawing.DrawingManager) => void) | undefined
}

function DrawingManagerFunctional({
  options,
  drawingMode,
  onCircleComplete,
  onMarkerComplete,
  onOverlayComplete,
  onPolygonComplete,
  onPolylineComplete,
  onRectangleComplete,
  onLoad,
  onUnmount
}: DrawingManagerProps): null {
  const map = useContext<google.maps.Map | null>(MapContext)

  const [instance, setInstance] = useState<google.maps.drawing.DrawingManager | null>(null)

  const [circlecompleteListener, setCircleCompleteListener] = useState<google.maps.MapsEventListener | null>(null)
  const [markercompleteListener, setMarkerCompleteListener] = useState<google.maps.MapsEventListener | null>(null)
  const [overlaycompleteListener, setOverlayCompleteListener] = useState<google.maps.MapsEventListener | null>(null)
  const [polygoncompleteListener, setPolygonCompleteListener] = useState<google.maps.MapsEventListener | null>(null)
  const [polylinecompleteListener, setPolylineCompleteListener] = useState<google.maps.MapsEventListener | null>(null)
  const [rectanglecompleteListener, setRectangleCompleteListener] = useState<google.maps.MapsEventListener | null>(null)

  // Order does matter
  useEffect(() => {
    if (instance !== null) {
      instance.setMap(map)
    }
  }, [map])

  useEffect(() => {
    if (options && instance !== null) {
      instance.setOptions(options)
    }
  }, [instance, options])

  useEffect(() => {
    if (instance !== null) {
      instance.setDrawingMode(drawingMode ?? null)
    }
  }, [instance, drawingMode])

  useEffect(() => {
    if (instance && onCircleComplete) {
      if (circlecompleteListener !== null) {
        google.maps.event.removeListener(circlecompleteListener)
      }

      setCircleCompleteListener(
        google.maps.event.addListener(instance, 'circlecomplete', onCircleComplete)
      )
    }
  }, [instance, onCircleComplete])

  useEffect(() => {
    if (instance && onMarkerComplete) {
      if (markercompleteListener !== null) {
        google.maps.event.removeListener(markercompleteListener)
      }

      setMarkerCompleteListener(
        google.maps.event.addListener(instance, 'markercomplete', onMarkerComplete)
      )
    }
  }, [instance, onMarkerComplete])

  useEffect(() => {
    if (instance && onOverlayComplete) {
      if (overlaycompleteListener !== null) {
        google.maps.event.removeListener(overlaycompleteListener)
      }

      setOverlayCompleteListener(
        google.maps.event.addListener(instance, 'overlaycomplete', onOverlayComplete)
      )
    }
  }, [instance, onOverlayComplete])

  useEffect(() => {
    if (instance && onPolygonComplete) {
      if (polygoncompleteListener !== null) {
        google.maps.event.removeListener(polygoncompleteListener)
      }

      setPolygonCompleteListener(
        google.maps.event.addListener(instance, 'polygoncomplete', onPolygonComplete)
      )
    }
  }, [instance, onPolygonComplete])

  useEffect(() => {
    if (instance && onPolylineComplete) {
      if (polylinecompleteListener !== null) {
        google.maps.event.removeListener(polylinecompleteListener)
      }

      setPolylineCompleteListener(
        google.maps.event.addListener(instance, 'polylinecomplete', onPolylineComplete)
      )
    }
  }, [instance, onPolylineComplete])

  useEffect(() => {
    if (instance && onRectangleComplete) {
      if (rectanglecompleteListener !== null) {
        google.maps.event.removeListener(rectanglecompleteListener)
      }

      setRectangleCompleteListener(
        google.maps.event.addListener(instance, 'rectanglecomplete', onRectangleComplete)
      )
    }
  }, [instance, onRectangleComplete])

  useEffect(() => {
    invariant(
      !!google.maps.drawing,
      `Did you include prop libraries={['drawing']} in the URL? %s`,
      google.maps.drawing
    )

    const drawingManager = new google.maps.drawing.DrawingManager({
      ...(options || {}),
      map,
    })

    if (drawingMode) {
      drawingManager.setDrawingMode(drawingMode)
    }

    if (onCircleComplete) {
      setCircleCompleteListener(
        google.maps.event.addListener(drawingManager, 'circlecomplete', onCircleComplete)
      )
    }

    if (onMarkerComplete) {
      setMarkerCompleteListener(
        google.maps.event.addListener(drawingManager, 'markercomplete', onMarkerComplete)
      )
    }

    if (onOverlayComplete) {
      setOverlayCompleteListener(
        google.maps.event.addListener(drawingManager, 'overlaycomplete', onOverlayComplete)
      )
    }

    if (onPolygonComplete) {
      setPolygonCompleteListener(
        google.maps.event.addListener(drawingManager, 'polygoncomplete', onPolygonComplete)
      )
    }

    if (onPolylineComplete) {
      setPolylineCompleteListener(
        google.maps.event.addListener(drawingManager, 'polylinecomplete', onPolylineComplete)
      )
    }

    if (onRectangleComplete) {
      setRectangleCompleteListener(
        google.maps.event.addListener(drawingManager, 'rectanglecomplete', onRectangleComplete)
      )
    }

    setInstance(drawingManager)

    if (onLoad) {
      onLoad(drawingManager)
    }

    return () => {
      if (instance !== null) {
        if (circlecompleteListener) {
          google.maps.event.removeListener(circlecompleteListener)
        }

        if (markercompleteListener) {
          google.maps.event.removeListener(markercompleteListener)
        }

        if (overlaycompleteListener) {
          google.maps.event.removeListener(overlaycompleteListener)
        }

        if (polygoncompleteListener) {
          google.maps.event.removeListener(polygoncompleteListener)
        }

        if (polylinecompleteListener) {
          google.maps.event.removeListener(polylinecompleteListener)
        }

        if (rectanglecompleteListener) {
          google.maps.event.removeListener(rectanglecompleteListener)
        }

        if (onUnmount) {
          onUnmount(instance)
        }

        instance.setMap(null)
      }
    }
  }, [])

  return null
}

export const DrawingManagerF = memo(DrawingManagerFunctional)

export class DrawingManager extends PureComponent<DrawingManagerProps, DrawingManagerState> {
  static override contextType = MapContext

  declare context: ContextType<typeof MapContext>

  registeredEvents: google.maps.MapsEventListener[] = []

  override state: DrawingManagerState = {
    drawingManager: null,
  }

  constructor(props: DrawingManagerProps) {
    super(props)

    invariant(
      !!google.maps.drawing,
      `Did you include prop libraries={['drawing']} in the URL? %s`,
      google.maps.drawing
    )
  }

  setDrawingManagerCallback = (): void => {
    if (this.state.drawingManager !== null && this.props.onLoad) {
      this.props.onLoad(this.state.drawingManager)
    }
  }

  override componentDidMount(): void {
    const drawingManager = new google.maps.drawing.DrawingManager({
      ...(this.props.options || {}),
      map: this.context,
    })

    this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
      updaterMap,
      eventMap,
      prevProps: {},
      nextProps: this.props,
      instance: drawingManager,
    })

    this.setState(function setDrawingManager() {
      return {
        drawingManager,
      }
    }, this.setDrawingManagerCallback)
  }

  override componentDidUpdate(prevProps: DrawingManagerProps): void {
    if (this.state.drawingManager !== null) {
      unregisterEvents(this.registeredEvents)

      this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
        updaterMap,
        eventMap,
        prevProps,
        nextProps: this.props,
        instance: this.state.drawingManager,
      })
    }
  }

  override componentWillUnmount(): void {
    if (this.state.drawingManager !== null) {
      if (this.props.onUnmount) {
        this.props.onUnmount(this.state.drawingManager)
      }

      unregisterEvents(this.registeredEvents)

      this.state.drawingManager.setMap(null)
    }
  }

  override render(): null {
    return null
  }
}

export default DrawingManager
