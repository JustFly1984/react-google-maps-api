import PropTypes from 'prop-types'

export const PointPropTypes = PropTypes.shape({
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  equals: PropTypes.func.isRequired,
  toString: PropTypes.func.isRequired
})

export const SizePropTypes = PropTypes.shape({
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  widthUnit: PropTypes.string,
  heightUnit: PropTypes.string
})

export const SymbolInterface = {
  anchor: PointPropTypes,
  fillColor: PropTypes.string,
  fillOpacity: PropTypes.number,
  labelOrigin: PointPropTypes,
  path: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  rotation: PropTypes.number,
  scale: PropTypes.number,
  strokeColor: PropTypes.string,
  strokeOpacity: PropTypes.number,
  strokeWeight: PropTypes.number
}

export const MVCArrayPropTypes = PropTypes.shape({
  clear: PropTypes.func.isRequired,
  forEach: PropTypes.func.isRequired,
  getArray: PropTypes.func.isRequired,
  getAt: PropTypes.func.isRequired,
  getLength: PropTypes.func.isRequired,
  insertAt: PropTypes.func.isRequired,
  pop: PropTypes.func.isRequired,
  push: PropTypes.func.isRequired,
  removeAt: PropTypes.func.isRequired,
  setAt: PropTypes.func.isRequired,
})

export const MapTypeRegistryPropTypes = PropTypes.shape({
  set: PropTypes.func.isRequired
})

export const LatLngPropTypes = PropTypes.shape({
  equals: PropTypes.func.isRequired,
  lat: PropTypes.func.isRequired,
  lng: PropTypes.func.isRequired,
  toJSON: PropTypes.func.isRequired,
  toString: PropTypes.func.isRequired,
  toUrlValue: PropTypes.func.isRequired,
})

export const LatLngLiteralPropTypes = PropTypes.shape({
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired,
})

export const FullscreenControlOptionsInterface = {
  position: PropTypes.string.isRequired // constants
}

export const MapTypeControlOptionsInterface = {
  mapTypeIds: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.string
    ),
    PropTypes.arrayOf(
      PropTypes.object // MapTypeId constants
    )
  ]).isRequired,
  position: PropTypes.string.isRequired, // ControlPosition constants
  style: PropTypes.string.isRequired // MapTypeControlStyle constants
}

export const PanControlOptionsInterface = {
  position: PropTypes.string.isRequired // ControlPosition constants
}

export const RotateControlOptionsInterface = {
  position: PropTypes.string.isRequired // ControlPosition constants
}

export const ScaleControlOptionsInterface = {
  style: PropTypes.string.isRequired // ScaleControlStyle constants
}

export const StreetViewAddressControlOptionsInterface = {
  position: PropTypes.string.isRequired // ControlPosition constants
}

export const MotionTrackingControlOptionsInterface = {
  position: PropTypes.string.isRequired // ControlPosition constants
}

export const StreetViewPovInterface = {
  heading: PropTypes.number.isRequired,
  pitch: PropTypes.number.isRequired,
}

export const ZoomControlOptionsInterface = {
  position: PropTypes.string.isRequired // ControlPosition constants
}

export const StreetViewControlOptionsInterface = {
  position: PropTypes.string.isRequired // ControlPosition constants
}

export const MapTypeStyleInterface = {
  elementType: PropTypes.string.isRequired,
  featureType: PropTypes.string.isRequired,
  stylers: PropTypes.arrayOf(
    PropTypes.object
  ).isRequired
}

export const IconInterface = {
  anchor: PointPropTypes.isRequired,
  labelOrigin: PointPropTypes.isRequired,
  origin: PointPropTypes.isRequired,
  scaledSize: SizePropTypes.isRequired,
  size: SizePropTypes.isRequired,
  url: PropTypes.string.isRequired
}

export const IconSequenceInterface = {
  fixedRotation: PropTypes.bool.isRequired,
  icon: PropTypes.shape(
    SymbolInterface
  ),
  offset: PropTypes.string.isRequired,
  repeat: PropTypes.string.isRequired
}

export const StreetViewPanoramaOptionsInterface = {
  addressControl: PropTypes.bool,
  addressControlOptions: PropTypes.shape(
    StreetViewAddressControlOptionsInterface
  ),
  clickToGo: PropTypes.bool,
  disableDefaultUI: PropTypes.bool,
  disableDoubleClickZoom: PropTypes.bool,
  enableCloseButton: PropTypes.bool,
  fullscreenControl: PropTypes.bool,
  fullscreenControlOptions: PropTypes.shape(
    FullscreenControlOptionsInterface
  ),
  imageDateControl: PropTypes.bool,
  linksControl: PropTypes.bool,
  motionTracking: PropTypes.bool,
  motionTrackingControl: PropTypes.bool,
  motionTrackingControlOptions: PropTypes.shape(
    MotionTrackingControlOptionsInterface
  ),
  panControl: PropTypes.bool,
  panControlOptions: PropTypes.shape(
    PanControlOptionsInterface
  ),
  pano: PropTypes.string,
  position: PropTypes.oneOfType([
    LatLngPropTypes,
    LatLngLiteralPropTypes
  ]),
  pov: PropTypes.shape(
    StreetViewPovInterface
  ),
  scrollwheel: PropTypes.bool,
  showRoadLabels: PropTypes.bool,
  visible: PropTypes.bool,
  zoom: PropTypes.number,
  zoomControl: PropTypes.bool,
  zoomControlOptions: PropTypes.shape(
    ZoomControlOptionsInterface
  ),
}

export const StreetViewPanoramaClassPropTypes = {
  options: PropTypes.shape(
    StreetViewPanoramaOptionsInterface
  ),
  onCloseclick: PropTypes.func,
  onPanoChanged: PropTypes.func,
  onPositionChanged: PropTypes.func,
  onPovChanged: PropTypes.func,
  onResize: PropTypes.func,
  onStatusChanged: PropTypes.func,
  onVisibleChanged: PropTypes.func,
  onZoomChanged: PropTypes.func,

  getLinks: PropTypes.func.isRequired,
  getLocation: PropTypes.func.isRequired,
  getMotionTracking: PropTypes.func.isRequired,
  getPano: PropTypes.func.isRequired,
  getPhotographerPov: PropTypes.func.isRequired,
  getPosition: PropTypes.func.isRequired,
  getPov: PropTypes.func.isRequired,
  getStatus: PropTypes.func.isRequired,
  getVisible: PropTypes.func.isRequired,
  getZoom: PropTypes.func.isRequired,
  registerPanoProvider: PropTypes.func.isRequired,
  setLinks: PropTypes.func.isRequired,
  setMotionTracking: PropTypes.func.isRequired,
  setOptions: PropTypes.func.isRequired,
  setPano: PropTypes.func.isRequired,
  setPosition: PropTypes.func.isRequired,
  setPov: PropTypes.func.isRequired,
  setVisible: PropTypes.func.isRequired,
  setZoom: PropTypes.func.isRequired,
  controls: PropTypes.arrayOf(
    MVCArrayPropTypes
  ).isRequired
}

export const GoogleMapOptionsInterface = {
  backgroundColor: PropTypes.string.isRequired,
  center: PropTypes.oneOfType([
    LatLngPropTypes,
    LatLngLiteralPropTypes
  ]).isRequired,
  clickableIcons: PropTypes.bool.isRequired,
  disableDefaultUI: PropTypes.bool.isRequired,
  disableDoubleClickZoom: PropTypes.bool.isRequired,
  draggable: PropTypes.bool.isRequired,
  draggableCursor: PropTypes.string.isRequired,
  draggingCursor: PropTypes.string.isRequired,
  fullscreenControl: PropTypes.bool.isRequired,
  fullscreenControlOptions: PropTypes.shape(
    FullscreenControlOptionsInterface
  ).isRequired,
  gestureHandling: PropTypes.string.isRequired,
  heading: PropTypes.number.isRequired,
  keyboardShortcuts: PropTypes.bool.isRequired,
  mapTypeControl: PropTypes.bool.isRequired,
  mapTypeControlOptions: PropTypes.shape(
    MapTypeControlOptionsInterface
  ).isRequired,
  mapTypeId: PropTypes.string.isRequired,
  maxZoom: PropTypes.number.isRequired,
  minZoom: PropTypes.number.isRequired,
  noClear: PropTypes.bool.isRequired,
  panControl: PropTypes.bool.isRequired,
  panControlOptions: PropTypes.shape(
    PanControlOptionsInterface
  ).isRequired,
  rotateControl: PropTypes.bool.isRequired,
  rotateControlOptions: PropTypes.shape(
    RotateControlOptionsInterface
  ).isRequired,
  scaleControl: PropTypes.bool.isRequired,
  scaleControlOptions: PropTypes.shape(
    ScaleControlOptionsInterface
  ).isRequired,
  scrollwheel: PropTypes.bool.isRequired,
  streetView: PropTypes.shape(
    StreetViewPanoramaClassPropTypes
  ).isRequired,
  streetViewControl: PropTypes.bool.isRequired,
  streetViewControlOptions: PropTypes.shape(
    StreetViewControlOptionsInterface
  ).isRequired,
  styles: PropTypes.arrayOf(
    PropTypes.shape(
      MapTypeStyleInterface
    )
  ).isRequired,
  tilt: PropTypes.number.isRequired,
  zoom: PropTypes.number.isRequired,
  zoomControl: PropTypes.bool.isRequired,
  zoomControlOptions: PropTypes.shape(
    ZoomControlOptionsInterface
  ).isRequired
}

export const GoogleMapPropTypes = {
  children: PropTypes.node,
  options: PropTypes.shape(
    GoogleMapOptionsInterface
  ),
  defaultExtraMapTypes: PropTypes.arrayOf(
    PropTypes.arrayOf(PropTypes.any)
  ),
  defaultCenter: PropTypes.any,
  defaultClickableIcons: PropTypes.bool,
  defaultHeading: PropTypes.number,
  defaultMapTypeId: PropTypes.any,
  defaultOptions: PropTypes.any,
  defaultStreetView: PropTypes.any,
  defaultTilt: PropTypes.number,
  defaultZoom: PropTypes.number,
  center: PropTypes.any,
  clickableIcons: PropTypes.bool,
  heading: PropTypes.number,
  mapTypeId: PropTypes.any,
  streetView: PropTypes.any,
  tilt: PropTypes.number,
  zoom: PropTypes.number,
  onDblClick: PropTypes.func,
  onDragEnd: PropTypes.func,
  onDragStart: PropTypes.func,
  onMapTypeIdChanged: PropTypes.func,
  onMouseMove: PropTypes.func,
  onMouseOut: PropTypes.func,
  onMouseOver: PropTypes.func,
  onRightClick: PropTypes.func,
  onTilesLoaded: PropTypes.func,
  onBoundsChanged: PropTypes.func,
  onCenterChanged: PropTypes.func,
  onClick: PropTypes.func,
  onDrag: PropTypes.func,
  onHeadingChanged: PropTypes.func,
  onIdle: PropTypes.func,
  onProjectionChanged: PropTypes.func,
  onResize: PropTypes.func,
  onTiltChanged: PropTypes.func,
  onZoomChanged: PropTypes.func,
}

export const DataClassPropTypes = PropTypes.shape({
  add: PropTypes.func.isRequired,
  addGeoJson: PropTypes.func.isRequired,
  contains: PropTypes.func.isRequired,
  forEach: PropTypes.func.isRequired,
  getControlPosition: PropTypes.func.isRequired,
  getControls: PropTypes.func.isRequired,
  getDrawingMode: PropTypes.func.isRequired,
  getFeatureById: PropTypes.func.isRequired,
  getMap: PropTypes.func.isRequired,
  getStyle: PropTypes.func.isRequired,
  loadGeoJson: PropTypes.func.isRequired,
  overrideStyle: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  revertStyle: PropTypes.func.isRequired,
  setControlPosition: PropTypes.func.isRequired,
  setControls: PropTypes.func.isRequired,
  setDrawingMode: PropTypes.func.isRequired,
  setMap: PropTypes.func.isRequired,
  setStyle: PropTypes.func.isRequired,
  toGeoJson: PropTypes.func.isRequired,
}).isRequired

export const MapClassPropTypes = PropTypes.shape({
  fitBounds: PropTypes.func.isRequired,
  getBounds: PropTypes.func.isRequired,
  getCenter: PropTypes.func.isRequired,
  getClicableIcons: PropTypes.func.isRequired,
  getDiv: PropTypes.func.isRequired,
  getHeading: PropTypes.func.isRequired,
  getMapTypeId: PropTypes.func.isRequired,
  getProjection: PropTypes.func.isRequired,
  getTilt: PropTypes.func.isRequired,
  getZoom: PropTypes.func.isRequired,
  panBy: PropTypes.func.isRequired,
  panTo: PropTypes.func.isRequired,
  panToBounds: PropTypes.func.isRequired,
  setCenter: PropTypes.func.isRequired,
  setClickableIcons: PropTypes.func.isRequired,
  setHeading: PropTypes.func.isRequired,
  setMapTypeId: PropTypes.func.isRequired,
  setOptions: PropTypes.func.isRequired,
  setStreetView: PropTypes.func.isRequired,
  setTilt: PropTypes.func.isRequired,
  setZoom: PropTypes.func.isRequired,
  controls: PropTypes.arrayOf(
    MVCArrayPropTypes
  ).isRequired,
  data: DataClassPropTypes,
  mapTypes: MapTypeRegistryPropTypes,
  overlayMapTypes: MVCArrayPropTypes
})

export const TrafficLayerOptionsInterface = {
  autoRefresh: PropTypes.bool.isRequired,
  map: MapClassPropTypes.isRequired
}

export const TrafficLayerPropTypes = {
  defaultOptions: PropTypes.any,
  options: PropTypes.shape(
    TrafficLayerOptionsInterface
  ),
}

export const PathPropTypes = PropTypes.oneOfType([
  MVCArrayPropTypes,
  PropTypes.arrayOf(
    LatLngPropTypes
  ),
  PropTypes.arrayOf(
    LatLngLiteralPropTypes
  )
])

export const MarkerOptionsInterface = {
  anchorPoint: PointPropTypes.isRequired,
  animation: PropTypes.string.isRequired, // Animation constants
  clickable: PropTypes.bool.isRequired,
  crossOnDrag: PropTypes.bool.isRequired,
  cursor: PropTypes.string.isRequired,
  draggable: PropTypes.bool.isRequired,
  icon: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape(
      IconInterface
    )
  ]).isRequired
}

export const MarkerPropTypes = {
  children: PropTypes.node,
  options: PropTypes.shape(
    MarkerOptionsInterface
  ),
  noRedraw: PropTypes.func,
  defaultAnimation: PropTypes.any,
  defaultClickable: PropTypes.bool,
  defaultCursor: PropTypes.string,
  defaultDraggable: PropTypes.bool,
  defaultIcon: PropTypes.any,
  defaultLabel: PropTypes.any,
  defaultOpacity: PropTypes.number,
  defaultOptions: PropTypes.any,
  defaultPlace: PropTypes.any,
  defaultPosition: PropTypes.any,
  defaultShape: PropTypes.any,
  defaultTitle: PropTypes.string,
  defaultVisible: PropTypes.bool,
  defaultZIndex: PropTypes.number,
  animation: PropTypes.any,
  clickable: PropTypes.bool,
  cursor: PropTypes.string,
  draggable: PropTypes.bool,
  icon: PropTypes.any,
  label: PropTypes.any,
  opacity: PropTypes.number,
  position: PropTypes.oneOfType([
    LatLngPropTypes,
    LatLngLiteralPropTypes
  ]).isRequired,
  shape: PropTypes.any,
  title: PropTypes.string,
  visible: PropTypes.bool,
  zIndex: PropTypes.number,
  onDblClick: PropTypes.func,
  onDragEnd: PropTypes.func,
  onDragStart: PropTypes.func,
  onMouseDown: PropTypes.func,
  onMouseOut: PropTypes.func,
  onMouseOver: PropTypes.func,
  onMouseUp: PropTypes.func,
  onRightClick: PropTypes.func,
  onAnimationChanged: PropTypes.func,
  onClick: PropTypes.func,
  onClickableChanged: PropTypes.func,
  onCursorChanged: PropTypes.func,
  onDrag: PropTypes.func,
  onDraggableChanged: PropTypes.func,
  onFlatChanged: PropTypes.func,
  onIconChanged: PropTypes.func,
  onPositionChanged: PropTypes.func,
  onShapeChanged: PropTypes.func,
  onTitleChanged: PropTypes.func,
  onVisibleChanged: PropTypes.func,
  onZindexChanged: PropTypes.func,
}

export const InfoWindowOptionsInterface = {
  content: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node
  ]).isRequired,
  disableAutoPan: PropTypes.bool.isRequired,
  maxWidth: PropTypes.number.isRequired,
  pixelOffset: SizePropTypes.isRequired,
  position: PropTypes.oneOfType([
    LatLngPropTypes,
    LatLngLiteralPropTypes
  ]).isRequired,
  zIndex: PropTypes.number.isRequired
}

export const InfoWindowPropTypes = {
  children: PropTypes.node,
  options: PropTypes.shape(
    InfoWindowOptionsInterface
  ),
  defaultOptions: PropTypes.any,
  defaultPosition: PropTypes.any,
  defaultZIndex: PropTypes.number,
  position: PropTypes.oneOfType([
    LatLngPropTypes,
    LatLngLiteralPropTypes
  ]).isRequired,
  zIndex: PropTypes.number,
  onCloseClick: PropTypes.func,
  onDomReady: PropTypes.func,
  onContentChanged: PropTypes.func,
  onPositionChanged: PropTypes.func,
  onZindexChanged: PropTypes.func,
}

export const PolylineOptionsInterface = {
  clickable: PropTypes.bool.isRequired,
  draggable: PropTypes.bool.isRequired,
  editable: PropTypes.bool.isRequired,
  geodesic: PropTypes.bool.isRequired,
  icons: PropTypes.arrayOf(
    IconSequenceInterface
  ).isRequired,
  map: MapClassPropTypes.isRequired,
  path: PathPropTypes.isRequired,
  strokeColor: PropTypes.string.isRequired,
  strokeOpacity: PropTypes.number.isRequired,
  strokeWeight: PropTypes.number.isRequired,
  visible: PropTypes.bool.isRequired,
  zIndex: PropTypes.number.isRequired
}

export const PolylinePropTypes = {
  options: PropTypes.shape(
    PolylineOptionsInterface
  ),
  defaultDraggable: PropTypes.bool,
  defaultEditable: PropTypes.bool,
  defaultOptions: PropTypes.object,
  defaultPath: PropTypes.any,
  defaultVisible: PropTypes.bool,
  draggable: PropTypes.bool,
  editable: PropTypes.bool,
  path: PathPropTypes,
  visible: PropTypes.bool,
  onDblClick: PropTypes.func,
  onDragEnd: PropTypes.func,
  onDragStart: PropTypes.func,
  onMouseDown: PropTypes.func,
  onMouseMove: PropTypes.func,
  onMouseOut: PropTypes.func,
  onMouseOver: PropTypes.func,
  onMouseUp: PropTypes.func,
  onRightClick: PropTypes.func,
  onClick: PropTypes.func,
  onDrag: PropTypes.func,
}

export const PolygonOptionsInterface = {
  clickable: PropTypes.bool.isRequired,
  draggable: PropTypes.bool.isRequired,
  editable: PropTypes.bool.isRequired,
  fillColor: PropTypes.string.isRequired,
  fillOpacity: PropTypes.number.isRequired,
  geodesic: PropTypes.bool.isRequired,
  map: MapClassPropTypes.isRequired,
  paths: PropTypes.oneOfType([
    MVCArrayPropTypes,
    PropTypes.arrayOf(
      PropTypes.arrayOf(
        PropTypes.oneOfType([
          LatLngPropTypes,
          LatLngLiteralPropTypes
        ])
      )
    ),
    PropTypes.arrayOf(
      PropTypes.oneOfType([
        LatLngPropTypes,
        LatLngLiteralPropTypes
      ])
    )
  ]).isRequired,
  strokeColor: PropTypes.string.isRequired,
  strokeOpacity: PropTypes.number.isRequired,
  strokePosition: PropTypes.string.isRequired, // StrokePosition constants
  strokeWeight: PropTypes.number.isRequired,
  visible: PropTypes.bool.isRequired,
  zIndex: PropTypes.number.isRequired
}

export const PolygonPropTypes = {
  options: PropTypes.shape(
    PolygonOptionsInterface
  ),
  defaultDraggable: PropTypes.bool,
  defaultEditable: PropTypes.bool,
  defaultOptions: PropTypes.any,
  defaultPath: PropTypes.any,
  defaultPaths: PropTypes.any,
  defaultVisible: PropTypes.bool,
  draggable: PropTypes.bool,
  editable: PropTypes.bool,
  path: PropTypes.any,
  paths: PropTypes.any,
  visible: PropTypes.bool,
  onDblClick: PropTypes.func,
  onDragEnd: PropTypes.func,
  onDragStart: PropTypes.func,
  onMouseDown: PropTypes.func,
  onMouseMove: PropTypes.func,
  onMouseOut: PropTypes.func,
  onMouseOver: PropTypes.func,
  onMouseUp: PropTypes.func,
  onRightClick: PropTypes.func,
  onClick: PropTypes.func,
  onDrag: PropTypes.func,
}

export const LatLngBoundsPropTypes = {
  contains: PropTypes.func.isRequired,
  equals: PropTypes.func.isRequired,
  extend: PropTypes.func.isRequired,
  getCenter: PropTypes.func.isRequired,
  getNorthEast: PropTypes.func.isRequired,
  getSouthWest: PropTypes.func.isRequired,
  intersects: PropTypes.func.isRequired,
  isEmpty: PropTypes.func.isRequired,
  toJSON: PropTypes.func.isRequired,
  toSpan: PropTypes.func.isRequired,
  toString: PropTypes.func.isRequired,
  toUrlValue: PropTypes.func.isRequired,
  union: PropTypes.func.isRequired,
}

export const LatLngBoundsLiteralInterface = {
  east: PropTypes.number.isRequired,
  north: PropTypes.number.isRequired,
  south: PropTypes.number.isRequired,
  west: PropTypes.number.isRequired,
}

export const RectangleOptionsInterface = {
  bounds: PropTypes.oneOfType([
    LatLngBoundsPropTypes,
    PropTypes.shape(
      LatLngBoundsLiteralInterface
    )
  ]).isRequired,
  clickable: PropTypes.bool.isRequired,
  draggable: PropTypes.bool.isRequired,
  editable: PropTypes.bool.isRequired,
  fillColor: PropTypes.string.isRequired,
  fillOpacity: PropTypes.number.isRequired,
  map: MapClassPropTypes,
  strokeColor: PropTypes.string.isRequired,
  strokeOpacity: PropTypes.number.isRequired,
  strokePosition: PropTypes.string.isRequired, // StrokePosition constants
  strokeWeight: PropTypes.number.isRequired,
  visible: PropTypes.bool.isRequired,
  zIndex: PropTypes.number.isRequired,
}

export const RectanglePropTypes = {
  options: PropTypes.shape(
    RectangleOptionsInterface
  ),
  defaultBounds: PropTypes.any,
  defaultDraggable: PropTypes.bool,
  defaultEditable: PropTypes.bool,
  defaultOptions: PropTypes.any,
  defaultVisible: PropTypes.bool,
  bounds: PropTypes.any,
  draggable: PropTypes.bool,
  editable: PropTypes.bool,
  visible: PropTypes.bool,
  onDblClick: PropTypes.func,
  onDragEnd: PropTypes.func,
  onDragStart: PropTypes.func,
  onMouseDown: PropTypes.func,
  onMouseMove: PropTypes.func,
  onMouseOut: PropTypes.func,
  onMouseOver: PropTypes.func,
  onMouseUp: PropTypes.func,
  onRightClick: PropTypes.func,
  onBoundsChanged: PropTypes.func,
  onClick: PropTypes.func,
  onDrag: PropTypes.func,
}

export const CircleOptionsInterface = {
  center: PropTypes.oneOfType([
    LatLngPropTypes,
    LatLngLiteralPropTypes
  ]).isRequired,
  clickable: PropTypes.bool.isRequired,
  draggable: PropTypes.bool.isRequired,
  editable: PropTypes.bool.isRequired,
  fillColor: PropTypes.string.isRequired,
  fillOpacity: PropTypes.number.isRequired,
  map: MapClassPropTypes.isRequired,
  radius: PropTypes.number.isRequired,
  strokeColor: PropTypes.string.isRequired,
  strokeOpacity: PropTypes.number.isRequired,
  strokePosition: PropTypes.string.isRequired, // StrokePosition constants
  strokeWeight: PropTypes.number.isRequired,
  visible: PropTypes.bool.isRequired,
  zIndex: PropTypes.number.isRequired,
}

export const CirclePropTypes = {
  options: PropTypes.shape(
    CircleOptionsInterface
  ),
  defaultCenter: PropTypes.any,
  defaultDraggable: PropTypes.bool,
  defaultEditable: PropTypes.bool,
  defaultOptions: PropTypes.object,
  defaultRadius: PropTypes.number,
  defaultVisible: PropTypes.bool,
  center: PropTypes.oneOfType([
    LatLngPropTypes,
    LatLngLiteralPropTypes
  ]),
  draggable: PropTypes.bool,
  editable: PropTypes.bool,
  radius: PropTypes.number,
  visible: PropTypes.bool,
  onDblClick: PropTypes.func,
  onDragEnd: PropTypes.func,
  onDragStart: PropTypes.func,
  onMouseDown: PropTypes.func,
  onMouseMove: PropTypes.func,
  onMouseOut: PropTypes.func,
  onMouseOver: PropTypes.func,
  onMouseUp: PropTypes.func,
  onRightClick: PropTypes.func,
  onCenterChanged: PropTypes.func,
  onClick: PropTypes.func,
  onDrag: PropTypes.func,
  onRadiusChanged: PropTypes.func,
}

export const MarkerShapeInterface = {
  coords: PropTypes.arrayOf(
    PropTypes.number
  ),
  type: PropTypes.string
}

export const DataStyleOptionsInterface = {
  clickable: PropTypes.bool.isRequired,
  cursor: PropTypes.string.isRequired,
  draggable: PropTypes.bool.isRequired,
  editable: PropTypes.bool.isRequired,
  fillColor: PropTypes.string.isRequired,
  fillOpacity: PropTypes.number.isRequired,
  icon: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape(
      IconInterface
    ),
    PropTypes.shape(
      SymbolInterface
    )
  ]).isRequired,
  shape: PropTypes.shape(
    MarkerShapeInterface
  ).isRequired,
  strokeColor: PropTypes.string.isRequired,
  strokeOpacity: PropTypes.number.isRequired,
  strokeWeight: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
  zIndex: PropTypes.number.isRequired,
}

export const DataOptionsInterface = {
  controlPosition: PropTypes.object.isRequired, // ControlPosition constants
  controls: PropTypes.arrayOf(
    PropTypes.string
  ).isRequired,
  drawingMode: PropTypes.string.isRequired,
  featureFactory: PropTypes.func.isRequired,
  map: MapClassPropTypes.isRequired,
  style: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape(
      DataStyleOptionsInterface
    )
  ]).isRequired
}

export const DataPropTypes = {
  options: PropTypes.shape(
    DataOptionsInterface
  ),
  onAddFeature: PropTypes.func,
  onClick: PropTypes.func,
  onDblClick: PropTypes.func,
  onMouseDown: PropTypes.func,
  onMouseOut: PropTypes.func,
  onMouseOver: PropTypes.func,
  onMouseUp: PropTypes.func,
  onRemoveFeature: PropTypes.func,
  onRemoveProperty: PropTypes.func,
  onRightClick: PropTypes.func,
  onSetGeometry: PropTypes.func,
  onSetProperty: PropTypes.func,
}

export const OverlayViewPropTypes = {
  mapPaneName: PropTypes.string,
  children: PropTypes.node,
  position: PropTypes.object,
  bounds: PropTypes.object,
  getPixelPositionOffset: PropTypes.func,
}

export const KmlLayerOptionsInterface = {
  clickable: PropTypes.bool.isRequired,
  map: MapClassPropTypes.isRequired,
  preserveViewport: PropTypes.bool.isRequired,
  screenOverlays: PropTypes.bool.isRequired,
  suppressInfoWindows: PropTypes.bool.isRequired,
  url: PropTypes.string.isRequired,
  zIndex: PropTypes.number.isRequired
}

export const KmlLayerPropTypes = {
  options: PropTypes.shape(
    KmlLayerOptionsInterface
  ),
  defaultOptions: PropTypes.any,
  defaultUrl: PropTypes.string,
  defaultZIndex: PropTypes.number,
  url: PropTypes.string,
  zIndex: PropTypes.number,
  onDefaultViewportChanged: PropTypes.func,
  onClick: PropTypes.func,
  onStatusChanged: PropTypes.func,
}

export const FusionTablesHeatmapInterface = {
  enabled: PropTypes.bool.isRequired
}

export const FusionTablesQueryInterface = {
  from: PropTypes.string.isRequired,
  limit: PropTypes.number.isRequired,
  offset: PropTypes.number.isRequired,
  orderBy: PropTypes.string.isRequired,
  select: PropTypes.string.isRequired,
  where: PropTypes.string.isRequired,
}

export const FusionTablesMarkerOptionsInterface = {
  iconName: PropTypes.string.isRequired
}

export const FusionTablesPolygonOptionsInterface = {
  fillColor: PropTypes.string.isRequired,
  fillOpacity: PropTypes.number.isRequired,
  strokeColor: PropTypes.string.isRequired,
  strokeOpacity: PropTypes.number.isRequired,
  strokeWeight: PropTypes.number.isRequired
}

export const FusionTablesPolylineOptionsInterface = {
  strokeColor: PropTypes.string.isRequired,
  strokeOpacity: PropTypes.number.isRequired,
  strokeWeight: PropTypes.number.isRequired
}

export const FusionTablesStyleInterface = {
  markerOptions: PropTypes.shape(
    FusionTablesMarkerOptionsInterface
  ).isRequired,
  polygonOptions: PropTypes.shape(
    FusionTablesPolygonOptionsInterface
  ).isRequired,
  polylineOptions: PropTypes.shape(
    FusionTablesPolylineOptionsInterface
  ).isRequired,
  where: PropTypes.string.isRequired
}

export const FusionTablesLayerOptionsInterface = {
  clickable: PropTypes.bool.isRequired,
  heatmap: PropTypes.shape(
    FusionTablesHeatmapInterface
  ).isRequired,
  map: MapClassPropTypes.isRequired,
  query: PropTypes.shape(
    FusionTablesQueryInterface
  ).isRequired,
  styles: PropTypes.arrayOf(
    FusionTablesStyleInterface
  ).isRequired,
  suppressInfoWindows: PropTypes.bool.isRequired
}

export const FusionTablesLayerPropTypes = {
  options: PropTypes.shape(
    FusionTablesLayerOptionsInterface
  ),
  defaultOptions: PropTypes.any,
  onClick: PropTypes.func,
}

export const ImageMapTypeOptionsInterface = {
  alt: PropTypes.string.isRequired,
  getTileUrl: PropTypes.func.isRequired,
  maxZoom: PropTypes.number.isRequired,
  minZoom: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  opacity: PropTypes.number.isRequired,
  tileSize: SizePropTypes.isRequired
}

export const ImageMapTypePropTypes = {
  options: PropTypes.shape(
    ImageMapTypeOptionsInterface
  ),
  onTilesLoaded: PropTypes.func,
}

export const GroundOverlayOptionsInterface = {
  clickable: PropTypes.bool.isRequired,
  map: MapClassPropTypes.isRequired,
  opacity: PropTypes.number.isRequired
}

export const GroundOverlayPropTypes = {
  options: PropTypes.shape(
    GroundOverlayOptionsInterface
  ),
  defaultUrl: PropTypes.string.isRequired,
  defaultBounds: PropTypes.object.isRequired,
  url: PropTypes.string,
  bounds: PropTypes.object,
  defaultOpacity: PropTypes.number,
  opacity: PropTypes.number,
  onDblClick: PropTypes.func,
  onClick: PropTypes.func,
}

export const HeatmapLayerOptionsInterface = {
  data: MVCArrayPropTypes.isRequired,
  dissipating: PropTypes.bool.isRequired,
  gradient: PropTypes.arrayOf(
    PropTypes.string
  ).isRequired,
  map: MapClassPropTypes.isRequired,
  maxIntensity: PropTypes.number.isRequired,
  opacity: PropTypes.number.isRequired,
  radius: PropTypes.number.isRequired
}

export const HeatmapLayerPropTypes = {
  options: PropTypes.shape(
    HeatmapLayerOptionsInterface
  ),
  defaultOptions: PropTypes.any,
  defaultData: PropTypes.any,
  data: PropTypes.any,
}

export const StreetViewPanoramaPropTypes = {
  options: PropTypes.shape(
    StreetViewPanoramaOptionsInterface
  ),
  children: PropTypes.node,
  defaultLinks: PropTypes.any,
  defaultMotionTracking: PropTypes.bool,
  defaultOptions: PropTypes.any,
  defaultPano: PropTypes.string,
  defaultPosition: PropTypes.any,
  defaultPov: PropTypes.any,
  defaultVisible: PropTypes.bool,
  defaultZoom: PropTypes.number,
  links: PropTypes.any,
  motionTracking: PropTypes.bool,

  pano: PropTypes.string,
  position: PropTypes.any,
  pov: PropTypes.any,
  visible: PropTypes.bool,
  zoom: PropTypes.number,
  onCloseClick: PropTypes.func,
  onPanoChanged: PropTypes.func,
  onPositionChanged: PropTypes.func,
  onPovChanged: PropTypes.func,
  onResize: PropTypes.func,
  onStatusChanged: PropTypes.func,
  onVisibleChanged: PropTypes.func,
  onZoomChanged: PropTypes.func,
}

export const ComponentRestrictionsInterface = {
  country: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(
      PropTypes.string
    )
  ]).isRequired
}

export const AutocompleteOptionsInterface = {
  bounds: PropTypes.oneOfType([
    LatLngBoundsPropTypes,
    LatLngBoundsLiteralInterface
  ]).isRequired,
  componentRestrictions: PropTypes.shape(
    ComponentRestrictionsInterface
  ).isRequired,
  fields: PropTypes.arrayOf(
    PropTypes.string
  ).isRequired,
  placeIdOnly: PropTypes.bool.isRequired,
  strictBounds: PropTypes.bool.isRequired,
  types: PropTypes.arrayOf(
    PropTypes.string
  ).isRequired
}

export const AutocompletePropTypes = {
  inputField: PropTypes.node.isRequired,
  options: PropTypes.shape(
    AutocompleteOptionsInterface
  ),
  onPlaceChanged: PropTypes.func,

}

export const SearchBoxOptionsInterface = {
  bounds: PropTypes.oneOfType([
    LatLngBoundsPropTypes,
    LatLngBoundsLiteralInterface
  ]).isRequired
}

export const SearchBoxPropTypes = {
  options: PropTypes.shape(
    SearchBoxOptionsInterface
  ),
  children: PropTypes.node,
  controlPosition: PropTypes.number,
  defaultBounds: PropTypes.any,
  bounds: PropTypes.any,
  onPlacesChanged: PropTypes.func,
}

export const TimeInterface = {
  text: PropTypes.string.isRequired,
  time_zone: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
}

export const DistanceInterface = {
  text: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired
}

export const DurationInterface = {
  text: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired
}

export const TransitStopInterface = {
  location: LatLngPropTypes.isRequired,
  name: PropTypes.string.isRequired
}

export const TransitAgencyInterface = {
  name: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
}

export const TransitVehicleInterface = {
  icon: PropTypes.string.isRequired,
  local_icon: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired // VehicleType constants
}

export const TransitLineInterface = {
  agencies: PropTypes.arrayOf(
    PropTypes.shape(
      TransitAgencyInterface
    )
  ).isRequired,
  color: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  short_name: PropTypes.string.isRequired,
  text_color: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  vehicle: PropTypes.shape(
    TransitVehicleInterface
  ).isRequired
}

export const TransitDetailsInterface = {
  arrival_stop: PropTypes.shape(
    TransitStopInterface
  ).isRequired,
  arrival_time: PropTypes.shape(
    TimeInterface
  ).isRequired,
  departure_stop: PropTypes.shape(
    TransitStopInterface
  ).isRequired,
  departure_time: PropTypes.shape(
    TimeInterface
  ).isRequired,
  headsign: PropTypes.string.isRequired,
  headway: PropTypes.number.isRequired,
  line: PropTypes.shape(
    TransitLineInterface
  ).isRequired,
  num_stops: PropTypes.number.isRequired
}

export const DirectionsStepInterface = {
  distance: PropTypes.shape(
    DistanceInterface
  ).isRequired,
  duration: PropTypes.shape(
    DurationInterface
  ).isRequired,
  end_location: LatLngPropTypes.isRequired,
  instructions: PropTypes.string.isRequired,
  path: PropTypes.arrayOf(
    LatLngPropTypes
  ).isRequired,
  start_location: LatLngPropTypes.isRequired,
  steps: PropTypes.arrayOf(
    PropTypes.shape(
      // eslint-disable-next-line babel/no-invalid-this
      this
    )
  ).isRequired,
  transit: PropTypes.shape(
    TransitDetailsInterface
  ).isRequired,
  travel_mode: PropTypes.string.isRequired // TravelMode constants
}

export const DirectionsLegInterface = {
  arrival_time: PropTypes.shape(
    TimeInterface
  ).isRequired,
  departure_time: PropTypes.shape(
    TimeInterface
  ).isRequired,
  distance: PropTypes.shape(
    DistanceInterface
  ).isRequired,
  duration: PropTypes.shape(
    DurationInterface
  ).isRequired,
  duration_in_traffic: PropTypes.shape(
    DurationInterface
  ).isRequired,
  end_address: PropTypes.string.isRequired,
  end_location: LatLngPropTypes.isRequired,
  start_address: PropTypes.string.isRequired,
  start_location: LatLngPropTypes.isRequired,
  steps: PropTypes.arrayOf(
    PropTypes.shape(
      DirectionsStepInterface
    )
  ).isRequired,
  via_waypoints: PropTypes.arrayOf(
    LatLngPropTypes
  ).isRequired
}

export const TransitFareInterface = {
  currency: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired
}

export const DirectionsRouteInterface = {
  bounds: LatLngBoundsPropTypes.isRequired,
  copyrights: PropTypes.string.isRequired,
  fare: PropTypes.shape(
    TransitFareInterface
  ).isRequired,
  legs: PropTypes.arrayOf(
    PropTypes.shape(
      DirectionsLegInterface
    )
  ).isRequired,
  overview_path: PropTypes.arrayOf(
    LatLngPropTypes
  ).isRequired,
  overview_polyline: PropTypes.string.isRequired,
  warnings: PropTypes.arrayOf(
    PropTypes.string
  ).isRequired,
  waypoint_order: PropTypes.arrayOf(
    PropTypes.number
  ).isRequired
}

export const DirectionsGeocodedWaypointInterface = {
  partial_match: PropTypes.bool.isRequired,
  place_id: PropTypes.string.isRequired,
  types: PropTypes.arrayOf(
    PropTypes.string
  ).isRequired
}

export const DirectionsResultInterface = {
  geocoded_waypoints: PropTypes.arrayOf(
    PropTypes.shape(
      DirectionsGeocodedWaypointInterface
    )
  ).isRequired,
  routes: PropTypes.arrayOf(
    PropTypes.shape(
      DirectionsRouteInterface
    )
  ).isRequired
}

export const DirectionsRendererOptionsInterface = {
  directions: PropTypes.shape(
    DirectionsResultInterface
  ).isRequired,
  draggable: PropTypes.bool.isRequired,
  hideRouteList: PropTypes.bool.isRequired,
  infoWindow: InfoWindowPropTypes.isRequired,
  map: MapClassPropTypes.isRequired,
  markerOptions: PropTypes.shape(
    MarkerOptionsInterface
  ).isRequired,
  panel: PropTypes.node.isRequired,
  polylineOptions: PropTypes.shape(
    PolylineOptionsInterface
  ).isRequired,
  preserveViewport: PropTypes.bool.isRequired,
  routeIndex: PropTypes.number.isRequired,
  suppressBicyclingLayer: PropTypes.bool.isRequired,
  suppressInfoWindows: PropTypes.bool.isRequired,
  suppressMarkers: PropTypes.bool.isRequired,
  suppressPolylines: PropTypes.bool.isRequired
}

export const DirectionsRendererPropTypes = {
  options: PropTypes.shape(
    DirectionsRendererOptionsInterface
  ),
  defaultDirections: PropTypes.any,
  defaultOptions: PropTypes.any,
  defaultPanel: PropTypes.any,
  defaultRouteIndex: PropTypes.number,
  directions: PropTypes.any,
  panel: PropTypes.any,
  routeIndex: PropTypes.number,
  onDirectionsChanged: PropTypes.func,
}

export const DrawingControlOptionsInterface = {
  drawingModes: PropTypes.arrayOf(
    PropTypes.string
  ).isRequired,
  position: PropTypes.string.isRequired // ControlPosition constants
}

export const DrawingManagerOptionsInterface = {
  circleOptions: PropTypes.shape(
    CircleOptionsInterface
  ).isRequired,
  drawingControl: PropTypes.bool.isRequired,
  drawingControlOptions: PropTypes.shape(
    DrawingControlOptionsInterface
  ).isRequired,
  drawingMode: PropTypes.string.isRequired, // OverlayType constants
  map: MapClassPropTypes.isRequired,
  markerOptions: PropTypes.shape(
    MarkerOptionsInterface
  ).isRequired,
  polygonOptions: PropTypes.shape(
    PolygonOptionsInterface
  ).isRequired,
  polylineOptions: PropTypes.shape(
    PolylineOptionsInterface
  ).isRequired,
  rectangleOptions: PropTypes.shape(
    RectangleOptionsInterface
  ).isRequired
}

export const DrawingManagerPropTypes = {
  options: PropTypes.shape(
    DrawingManagerOptionsInterface
  ),
  defaultDrawingMode: PropTypes.any,
  defaultOptions: PropTypes.any,
  drawingMode: PropTypes.any,
  onCircleComplete: PropTypes.func,
  onMarkerComplete: PropTypes.func,
  onOverlayComplete: PropTypes.func,
  onPolygonComplete: PropTypes.func,
  onPolylineComplete: PropTypes.func,
  onRectangleComplete: PropTypes.func,
}

export const InfoBoxPropTypes = {
  options: PropTypes.any,
  children: PropTypes.node,
  defaultOptions: PropTypes.any,
  defaultPosition: PropTypes.any,
  defaultVisible: PropTypes.bool,
  defaultZIndex: PropTypes.number,
  position: PropTypes.any,
  visible: PropTypes.bool,
  zIndex: PropTypes.number,
  onCloseClick: PropTypes.func,
  onDomReady: PropTypes.func,
  onContentChanged: PropTypes.func,
  onPositionChanged: PropTypes.func,
  onZindexChanged: PropTypes.func,
}

export const MarkerClustererPropTypes = {
  children: PropTypes.node,
  defaultAverageCenter: PropTypes.bool,
  defaultBatchSizeIE: PropTypes.number,
  defaultBatchSize: PropTypes.number,
  defaultCalculator: PropTypes.func,
  defaultClusterClass: PropTypes.string,
  defaultEnableRetinaIcons: PropTypes.bool,
  defaultGridSize: PropTypes.number,
  defaultIgnoreHidden: PropTypes.bool,
  defaultImageExtension: PropTypes.string,
  defaultImagePath: PropTypes.string,
  defaultImageSizes: PropTypes.array,
  defaultMaxZoom: PropTypes.number,
  defaultMinimumClusterSize: PropTypes.number,
  defaultStyles: PropTypes.array,
  defaultTitle: PropTypes.string,
  defaultZoomOnClick: PropTypes.bool,
  averageCenter: PropTypes.bool,
  batchSizeIE: PropTypes.number,
  batchSize: PropTypes.number,
  calculator: PropTypes.func,
  clusterClass: PropTypes.string,
  enableRetinaIcons: PropTypes.bool,
  gridSize: PropTypes.number,
  ignoreHidden: PropTypes.bool,
  imageExtension: PropTypes.string,
  imagePath: PropTypes.string,
  imageSizes: PropTypes.array,
  maxZoom: PropTypes.number,
  minimumClusterSize: PropTypes.number,
  styles: PropTypes.array,
  title: PropTypes.string,
  zoomOnClick: PropTypes.bool,
  onClick: PropTypes.func,
  onClusteringBegin: PropTypes.func,
  onClusteringEnd: PropTypes.func,
  onMouseOut: PropTypes.func,
  onMouseOver: PropTypes.func,
}

export const MarkerWithLabelPropTypes = {
  children: PropTypes.node,
  labelAnchor: PropTypes.object,
  labelClass: PropTypes.string,
  labelStyle: PropTypes.object,
  labelVisible: PropTypes.bool,
  noRedraw: PropTypes.bool,
  defaultAnimation: PropTypes.any,
  defaultClickable: PropTypes.bool,
  defaultCursor: PropTypes.string,
  defaultDraggable: PropTypes.bool,
  defaultIcon: PropTypes.any,
  defaultLabel: PropTypes.any,
  defaultOpacity: PropTypes.number,
  defaultOptions: PropTypes.any,
  defaultPlace: PropTypes.any,
  defaultPosition: PropTypes.any,
  defaultShape: PropTypes.any,
  defaultTitle: PropTypes.string,
  defaultVisible: PropTypes.bool,
  defaultZIndex: PropTypes.number,
  animation: PropTypes.any,
  clickable: PropTypes.bool,
  cursor: PropTypes.string,
  draggable: PropTypes.bool,
  icon: PropTypes.any,
  label: PropTypes.any,
  opacity: PropTypes.number,
  options: PropTypes.any,
  place: PropTypes.any,
  position: PropTypes.any,
  shape: PropTypes.any,
  title: PropTypes.string,
  visible: PropTypes.bool,
  zIndex: PropTypes.number,
  onDblClick: PropTypes.func,
  onDragEnd: PropTypes.func,
  onDragStart: PropTypes.func,
  onMouseDown: PropTypes.func,
  onMouseOut: PropTypes.func,
  onMouseOver: PropTypes.func,
  onMouseUp: PropTypes.func,
  onRightClick: PropTypes.func,
  onAnimationChanged: PropTypes.func,
  onClick: PropTypes.func,
  onClickableChanged: PropTypes.func,
  onCursorChanged: PropTypes.func,
  onDrag: PropTypes.func,
  onDraggableChanged: PropTypes.func,
  onFlatChanged: PropTypes.func,
  onIconChanged: PropTypes.func,
  onPositionChanged: PropTypes.func,
  onShapeChanged: PropTypes.func,
  onTitleChanged: PropTypes.func,
  onVisibleChanged: PropTypes.func,
  onZindexChanged: PropTypes.func,
}
