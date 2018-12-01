import PropTypes from 'prop-types'

export const PointInterface = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  equals: PropTypes.func.isRequired,
  toString: PropTypes.func.isRequired
}

export const SizeInterface = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  widthUnit: PropTypes.string.isRequired,
  heightUnit: PropTypes.string.isRequired
}

export const SymbolInterface = {
  anchor: PropTypes.shape(PointInterface).isRequired,
  fillColor: PropTypes.string.isRequired,
  fillOpacity: PropTypes.number.isRequired,
  labelOrigin: PropTypes.shape(PointInterface).isRequired,
  path: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  rotation: PropTypes.number,
  scale: PropTypes.number,
  strokeColor: PropTypes.string,
  strokeOpacity: PropTypes.number,
  strokeWeight: PropTypes.number
}

export const MVCArrayInterface = {
  clear: PropTypes.func.isRequired,
  forEach: PropTypes.func.isRequired,
  getArray: PropTypes.func.isRequired,
  getAt: PropTypes.func.isRequired,
  getLength: PropTypes.func.isRequired,
  insertAt: PropTypes.func.isRequired,
  pop: PropTypes.func.isRequired,
  push: PropTypes.func.isRequired,
  removeAt: PropTypes.func.isRequired,
  setAt: PropTypes.func.isRequired
}

export const MapTypeRegistryInterface = {
  set: PropTypes.func.isRequired
}

export const LatLngInterface = {
  equals: PropTypes.func.isRequired,
  lat: PropTypes.func.isRequired,
  lng: PropTypes.func.isRequired,
  toJSON: PropTypes.func.isRequired,
  toString: PropTypes.func.isRequired,
  toUrlValue: PropTypes.func.isRequired
}

export const LatLngLiteralInterface = {
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired
}

export const FullscreenControlOptionsInterface = {
  position: PropTypes.string.isRequired // constants
}

export const MapTypeControlOptionsInterface = {
  mapTypeIds: PropTypes.arrayOf(PropTypes.string).isRequired,
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
  pitch: PropTypes.number.isRequired
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
  stylers: PropTypes.arrayOf(PropTypes.object).isRequired
}

export const IconInterface = {
  anchor: PropTypes.shape(PointInterface).isRequired,
  labelOrigin: PropTypes.shape(PointInterface).isRequired,
  origin: PropTypes.shape(PointInterface).isRequired,
  scaledSize: PropTypes.shape(SizeInterface).isRequired,
  size: PropTypes.shape(SizeInterface).isRequired,
  url: PropTypes.string.isRequired
}

export const IconSequenceInterface = {
  fixedRotation: PropTypes.bool.isRequired,
  icon: PropTypes.shape(SymbolInterface),
  offset: PropTypes.string.isRequired,
  repeat: PropTypes.string.isRequired
}

export const StreetViewPanoramaOptionsInterface = {
  addressControl: PropTypes.bool.isRequired,
  addressControlOptions: PropTypes.shape(StreetViewAddressControlOptionsInterface).isRequired,
  clickToGo: PropTypes.bool.isRequired,
  disableDefaultUI: PropTypes.bool.isRequired,
  disableDoubleClickZoom: PropTypes.bool.isRequired,
  enableCloseButton: PropTypes.bool.isRequired,
  fullscreenControl: PropTypes.bool.isRequired,
  fullscreenControlOptions: PropTypes.shape(FullscreenControlOptionsInterface).isRequired,
  imageDateControl: PropTypes.bool.isRequired,
  linksControl: PropTypes.bool.isRequired,
  motionTracking: PropTypes.bool.isRequired,
  motionTrackingControl: PropTypes.bool.isRequired,
  motionTrackingControlOptions: PropTypes.shape(MotionTrackingControlOptionsInterface).isRequired,
  panControl: PropTypes.bool,
  panControlOptions: PropTypes.shape(PanControlOptionsInterface).isRequired,
  pano: PropTypes.string.isRequired,
  position: PropTypes.oneOfType([
    PropTypes.shape(LatLngInterface),
    PropTypes.shape(LatLngLiteralInterface)
  ]).isRequired,
  pov: PropTypes.shape(StreetViewPovInterface).isRequired,
  scrollwheel: PropTypes.bool.isRequired,
  showRoadLabels: PropTypes.bool.isRequired,
  visible: PropTypes.bool.isRequired,
  zoom: PropTypes.number.isRequired,
  zoomControl: PropTypes.bool.isRequired,
  zoomControlOptions: PropTypes.shape(ZoomControlOptionsInterface).isRequired
}

export const StreetViewPanoramaInterface = {
  options: PropTypes.shape(StreetViewPanoramaOptionsInterface).isRequired,
  onCloseclick: PropTypes.func.isRequired,
  onPanoChanged: PropTypes.func.isRequired,
  onPositionChanged: PropTypes.func.isRequired,
  onPovChanged: PropTypes.func.isRequired,
  onResize: PropTypes.func.isRequired,
  onStatusChanged: PropTypes.func.isRequired,
  onVisibleChanged: PropTypes.func.isRequired,
  onZoomChanged: PropTypes.func.isRequired,

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
  controls: PropTypes.arrayOf(PropTypes.shape(MVCArrayInterface)).isRequired
}

export const GoogleMapOptionsInterface = {
  backgroundColor: PropTypes.string.isRequired,
  center: PropTypes.oneOfType([
    PropTypes.shape(LatLngInterface),
    PropTypes.shape(LatLngLiteralInterface)
  ]).isRequired,
  clickableIcons: PropTypes.bool.isRequired,
  disableDefaultUI: PropTypes.bool.isRequired,
  disableDoubleClickZoom: PropTypes.bool.isRequired,
  draggable: PropTypes.bool.isRequired,
  draggableCursor: PropTypes.string.isRequired,
  draggingCursor: PropTypes.string.isRequired,
  fullscreenControl: PropTypes.bool.isRequired,
  fullscreenControlOptions: PropTypes.shape(FullscreenControlOptionsInterface).isRequired,
  gestureHandling: PropTypes.string.isRequired,
  heading: PropTypes.number.isRequired,
  keyboardShortcuts: PropTypes.bool.isRequired,
  mapTypeControl: PropTypes.bool.isRequired,
  mapTypeControlOptions: PropTypes.shape(MapTypeControlOptionsInterface).isRequired,
  mapTypeId: PropTypes.string.isRequired,
  maxZoom: PropTypes.number.isRequired,
  minZoom: PropTypes.number.isRequired,
  noClear: PropTypes.bool.isRequired,
  panControl: PropTypes.bool.isRequired,
  panControlOptions: PropTypes.shape(PanControlOptionsInterface).isRequired,
  rotateControl: PropTypes.bool.isRequired,
  rotateControlOptions: PropTypes.shape(RotateControlOptionsInterface).isRequired,
  scaleControl: PropTypes.bool.isRequired,
  scaleControlOptions: PropTypes.shape(ScaleControlOptionsInterface).isRequired,
  scrollwheel: PropTypes.bool.isRequired,
  streetView: PropTypes.shape(StreetViewPanoramaInterface).isRequired,
  streetViewControl: PropTypes.bool.isRequired,
  streetViewControlOptions: PropTypes.shape(StreetViewControlOptionsInterface).isRequired,
  styles: PropTypes.arrayOf(PropTypes.shape(MapTypeStyleInterface)).isRequired,
  tilt: PropTypes.number.isRequired,
  zoom: PropTypes.number.isRequired,
  zoomControl: PropTypes.bool.isRequired,
  zoomControlOptions: PropTypes.shape(ZoomControlOptionsInterface).isRequired
}

export const DataInterface = {
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
  toGeoJson: PropTypes.func.isRequired
}

export const GoogleMapInterface = {
  fitBounds: PropTypes.func.isRequired,
  getBounds: PropTypes.func.isRequired,
  getCenter: PropTypes.func.isRequired,
  getClicableIcons: PropTypes.func, // .isRequired, // WTF
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
  controls: PropTypes.arrayOf(PropTypes.shape(MVCArrayInterface)).isRequired,
  data: PropTypes.shape(DataInterface).isRequired,
  mapTypes: PropTypes.shape(MapTypeRegistryInterface).isRequired,
  overlayMapTypes: PropTypes.shape(MVCArrayInterface).isRequired
}

export const TrafficLayerOptionsInterface = {
  autoRefresh: PropTypes.bool.isRequired,
  map: PropTypes.shape(GoogleMapInterface).isRequired
}

export const PathInterface = PropTypes.oneOfType([
  PropTypes.shape(MVCArrayInterface),
  PropTypes.arrayOf(PropTypes.shape(LatLngInterface)),
  PropTypes.arrayOf(PropTypes.shape(LatLngLiteralInterface))
])

export const MarkerOptionsInterface = {
  anchorPoint: PropTypes.shape(PointInterface).isRequired,
  animation: PropTypes.string.isRequired, // Animation constants
  clickable: PropTypes.bool.isRequired,
  crossOnDrag: PropTypes.bool.isRequired,
  cursor: PropTypes.string.isRequired,
  draggable: PropTypes.bool.isRequired,
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.shape(IconInterface)]).isRequired
}

export const InfoWindowOptionsInterface = {
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  disableAutoPan: PropTypes.bool,
  maxWidth: PropTypes.number,
  pixelOffset: PropTypes.shape(SizeInterface),
  position: PropTypes.oneOfType([
    PropTypes.shape(LatLngInterface),
    PropTypes.shape(LatLngLiteralInterface)
  ]),
  zIndex: PropTypes.number
}

export const InfoWindowInterface = {
  close: PropTypes.func.isRequired,
  getContent: PropTypes.func.isRequired,
  getPosition: PropTypes.func.isRequired,
  getZIndex: PropTypes.func.isRequired,
  open: PropTypes.func.isRequired,
  setContent: PropTypes.func.isRequired,
  setOptions: PropTypes.func.isRequired,
  setPosition: PropTypes.func.isRequired,
  setZIndex: PropTypes.func.isRequired,
  onCloseClick: PropTypes.func.isRequired,
  onContentChanged: PropTypes.func.isRequired,
  onDomReady: PropTypes.func.isRequired,
  onPositionChanged: PropTypes.func.isRequired,
  onZindexChanged: PropTypes.func.isRequired
}

export const PolylineOptionsInterface = {
  clickable: PropTypes.bool,
  draggable: PropTypes.bool,
  editable: PropTypes.bool,
  geodesic: PropTypes.bool,
  icons: PropTypes.arrayOf(PropTypes.shape(IconSequenceInterface)),
  map: PropTypes.shape(GoogleMapInterface),
  path: PathInterface,
  strokeColor: PropTypes.string,
  strokeOpacity: PropTypes.number,
  strokeWeight: PropTypes.number,
  visible: PropTypes.bool,
  zIndex: PropTypes.number
}

export const PolylinePropTypes = {
  options: PropTypes.shape(PolylineOptionsInterface),
  draggable: PropTypes.bool,
  editable: PropTypes.bool,
  path: PathInterface,
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
  onDrag: PropTypes.func
}

export const PolygonOptionsInterface = {
  clickable: PropTypes.backgroundColor,
  draggable: PropTypes.backgroundColor,
  editable: PropTypes.backgroundColor,
  fillColor: PropTypes.stringbackgroundColor,
  fillOpacity: PropTypes.numberbackgroundColor,
  geodesic: PropTypes.backgroundColor,
  map: PropTypes.shape(GoogleMapInterface),
  paths: PropTypes.oneOfType([
    PropTypes.shape(MVCArrayInterface),
    PropTypes.arrayOf(
      PropTypes.arrayOf(
        PropTypes.oneOfType([
          PropTypes.shape(LatLngInterface),
          PropTypes.shape(LatLngLiteralInterface)
        ])
      )
    ),
    PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.shape(LatLngInterface),
        PropTypes.shape(LatLngLiteralInterface)
      ])
    )
  ]),
  strokeColor: PropTypes.string,
  strokeOpacity: PropTypes.number,
  strokePosition: PropTypes.string, // StrokePosition constants
  strokeWeight: PropTypes.number,
  visible: PropTypes.bool,
  zIndex: PropTypes.number
}

export const PolygonPropTypes = {
  options: PropTypes.shape(PolygonOptionsInterface),
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
  onDrag: PropTypes.func
}

export const LatLngBoundsInterface = {
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
  union: PropTypes.func.isRequired
}

export const LatLngBoundsLiteralInterface = {
  east: PropTypes.number.isRequired,
  north: PropTypes.number.isRequired,
  south: PropTypes.number.isRequired,
  west: PropTypes.number.isRequired
}

export const RectangleOptionsInterface = {
  bounds: PropTypes.oneOfType([
    PropTypes.shape(LatLngBoundsInterface),
    PropTypes.shape(LatLngBoundsLiteralInterface)
  ]).isRequired,
  clickable: PropTypes.bool.isRequired,
  draggable: PropTypes.bool.isRequired,
  editable: PropTypes.bool.isRequired,
  fillColor: PropTypes.string.isRequired,
  fillOpacity: PropTypes.number.isRequired,
  map: PropTypes.shape(GoogleMapInterface).isRequired,
  strokeColor: PropTypes.string.isRequired,
  strokeOpacity: PropTypes.number.isRequired,
  strokePosition: PropTypes.string.isRequired, // StrokePosition constants
  strokeWeight: PropTypes.number.isRequired,
  visible: PropTypes.bool.isRequired,
  zIndex: PropTypes.number.isRequired
}

export const RectanglePropTypes = {
  options: PropTypes.shape(RectangleOptionsInterface),
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
  onDrag: PropTypes.func
}

export const CircleOptionsInterface = {
  center: PropTypes.oneOfType([
    PropTypes.shape(LatLngInterface),
    PropTypes.shape(LatLngLiteralInterface)
  ]),
  clickable: PropTypes.bool,
  draggable: PropTypes.bool,
  editable: PropTypes.bool,
  fillColor: PropTypes.string,
  fillOpacity: PropTypes.number,
  map: PropTypes.shape(GoogleMapInterface),
  radius: PropTypes.number,
  strokeColor: PropTypes.string,
  strokeOpacity: PropTypes.number,
  strokePosition: PropTypes.string, // StrokePosition constants
  strokeWeight: PropTypes.number,
  visible: PropTypes.bool,
  zIndex: PropTypes.number
}

export const CirclePropTypes = {
  options: PropTypes.shape(CircleOptionsInterface),
  center: PropTypes.oneOfType([
    PropTypes.shape(LatLngInterface),
    PropTypes.shape(LatLngLiteralInterface)
  ]).isRequired,
  draggable: PropTypes.bool,
  editable: PropTypes.bool,
  radius: PropTypes.number.isRequired,
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
  onRadiusChanged: PropTypes.func
}

export const MarkerShapeInterface = {
  coords: PropTypes.arrayOf(PropTypes.number),
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
    PropTypes.shape(IconInterface),
    PropTypes.shape(SymbolInterface)
  ]).isRequired,
  shape: PropTypes.shape(MarkerShapeInterface).isRequired,
  strokeColor: PropTypes.string.isRequired,
  strokeOpacity: PropTypes.number.isRequired,
  strokeWeight: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
  zIndex: PropTypes.number.isRequired
}

export const DataOptionsInterface = {
  controlPosition: PropTypes.object.isRequired, // ControlPosition constants
  controls: PropTypes.arrayOf(PropTypes.string).isRequired,
  drawingMode: PropTypes.string.isRequired,
  featureFactory: PropTypes.func.isRequired,
  map: PropTypes.shape(GoogleMapInterface).isRequired,
  style: PropTypes.oneOfType([PropTypes.func, PropTypes.shape(DataStyleOptionsInterface)])
    .isRequired
}

export const DataPropTypes = {
  options: PropTypes.shape(DataOptionsInterface),
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
  onSetProperty: PropTypes.func
}

export const OverlayViewPropTypes = {
  mapPaneName: PropTypes.string,
  children: PropTypes.node,
  position: PropTypes.object,
  bounds: PropTypes.object,
  getPixelPositionOffset: PropTypes.func
}

export const KmlLayerOptionsInterface = {
  clickable: PropTypes.bool.isRequired,
  map: PropTypes.shape(GoogleMapInterface).isRequired,
  preserveViewport: PropTypes.bool.isRequired,
  screenOverlays: PropTypes.bool.isRequired,
  suppressInfoWindows: PropTypes.bool.isRequired,
  url: PropTypes.string.isRequired,
  zIndex: PropTypes.number.isRequired
}

export const KmlLayerPropTypes = {
  options: PropTypes.shape(KmlLayerOptionsInterface),
  url: PropTypes.string,
  zIndex: PropTypes.number,
  onDefaultViewportChanged: PropTypes.func,
  onClick: PropTypes.func,
  onStatusChanged: PropTypes.func
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
  where: PropTypes.string.isRequired
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
  markerOptions: PropTypes.shape(FusionTablesMarkerOptionsInterface).isRequired,
  polygonOptions: PropTypes.shape(FusionTablesPolygonOptionsInterface).isRequired,
  polylineOptions: PropTypes.shape(FusionTablesPolylineOptionsInterface).isRequired,
  where: PropTypes.string.isRequired
}

export const FusionTablesLayerOptionsInterface = {
  clickable: PropTypes.bool.isRequired,
  heatmap: PropTypes.shape(FusionTablesHeatmapInterface).isRequired,
  map: PropTypes.shape(GoogleMapInterface).isRequired,
  query: PropTypes.shape(FusionTablesQueryInterface).isRequired,
  styles: PropTypes.arrayOf(FusionTablesStyleInterface).isRequired,
  suppressInfoWindows: PropTypes.bool.isRequired
}

export const FusionTablesLayerPropTypes = {
  options: PropTypes.shape(FusionTablesLayerOptionsInterface),
  onClick: PropTypes.func
}

export const ImageMapTypeOptionsInterface = {
  alt: PropTypes.string.isRequired,
  getTileUrl: PropTypes.func.isRequired,
  maxZoom: PropTypes.number.isRequired,
  minZoom: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  opacity: PropTypes.number.isRequired,
  tileSize: PropTypes.shape(SizeInterface).isRequired
}

export const ImageMapTypePropTypes = {
  options: PropTypes.shape(ImageMapTypeOptionsInterface),
  onTilesLoaded: PropTypes.func
}

export const GroundOverlayOptionsInterface = {
  clickable: PropTypes.bool.isRequired,
  // map prop is merged inside the component
  // map: PropTypes.shape(
  //   GoogleMapInterface
  // ),
  opacity: PropTypes.number.isRequired
}

export const HeatmapLayerOptionsInterface = {
  data: PropTypes.shape(MVCArrayInterface).isRequired,
  dissipating: PropTypes.bool.isRequired,
  gradient: PropTypes.arrayOf(PropTypes.string).isRequired,
  map: PropTypes.shape(GoogleMapInterface).isRequired,
  maxIntensity: PropTypes.number.isRequired,
  opacity: PropTypes.number.isRequired,
  radius: PropTypes.number.isRequired
}

export const ComponentRestrictionsInterface = {
  country: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]).isRequired
}

export const AutocompleteOptionsInterface = {
  bounds: PropTypes.oneOfType([
    PropTypes.shape(LatLngBoundsInterface),
    PropTypes.shape(LatLngBoundsLiteralInterface)
  ]).isRequired,
  componentRestrictions: PropTypes.shape(ComponentRestrictionsInterface).isRequired,
  fields: PropTypes.arrayOf(PropTypes.string).isRequired,
  placeIdOnly: PropTypes.bool.isRequired,
  strictBounds: PropTypes.bool.isRequired,
  types: PropTypes.arrayOf(PropTypes.string).isRequired
}

export const AutocompletePropTypes = {
  inputField: PropTypes.node.isRequired,
  options: PropTypes.shape(AutocompleteOptionsInterface),
  onPlaceChanged: PropTypes.func
}

export const SearchBoxOptionsInterface = {
  bounds: PropTypes.oneOfType([
    PropTypes.shape(LatLngBoundsInterface),
    PropTypes.shape(LatLngBoundsLiteralInterface)
  ]).isRequired
}

export const SearchBoxPropTypes = {
  options: PropTypes.shape(SearchBoxOptionsInterface),
  children: PropTypes.node,
  controlPosition: PropTypes.number,
  bounds: PropTypes.any,
  onPlacesChanged: PropTypes.func
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
  location: PropTypes.shape(LatLngInterface).isRequired,
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
  agencies: PropTypes.arrayOf(PropTypes.shape(TransitAgencyInterface)).isRequired,
  color: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  short_name: PropTypes.string.isRequired,
  text_color: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  vehicle: PropTypes.shape(TransitVehicleInterface).isRequired
}

export const TransitDetailsInterface = {
  arrival_stop: PropTypes.shape(TransitStopInterface).isRequired,
  arrival_time: PropTypes.shape(TimeInterface).isRequired,
  departure_stop: PropTypes.shape(TransitStopInterface).isRequired,
  departure_time: PropTypes.shape(TimeInterface).isRequired,
  headsign: PropTypes.string.isRequired,
  headway: PropTypes.number.isRequired,
  line: PropTypes.shape(TransitLineInterface).isRequired,
  num_stops: PropTypes.number.isRequired
}

export const DirectionsStepInterface = {
  distance: PropTypes.shape(DistanceInterface).isRequired,
  duration: PropTypes.shape(DurationInterface).isRequired,
  end_location: PropTypes.shape(LatLngInterface).isRequired,
  instructions: PropTypes.string.isRequired,
  path: PropTypes.arrayOf(PropTypes.shape(LatLngInterface)).isRequired,
  start_location: PropTypes.shape(LatLngInterface).isRequired,
  steps: PropTypes.arrayOf(
    PropTypes.shape(
      // eslint-disable-next-line babel/no-invalid-this
      this
    )
  ).isRequired,
  transit: PropTypes.shape(TransitDetailsInterface).isRequired,
  travel_mode: PropTypes.string.isRequired // TravelMode constants
}

export const DirectionsLegInterface = {
  arrival_time: PropTypes.shape(TimeInterface).isRequired,
  departure_time: PropTypes.shape(TimeInterface).isRequired,
  distance: PropTypes.shape(DistanceInterface).isRequired,
  duration: PropTypes.shape(DurationInterface).isRequired,
  duration_in_traffic: PropTypes.shape(DurationInterface).isRequired,
  end_address: PropTypes.string.isRequired,
  end_location: PropTypes.shape(LatLngInterface).isRequired,
  start_address: PropTypes.string.isRequired,
  start_location: PropTypes.shape(LatLngInterface).isRequired,
  steps: PropTypes.arrayOf(PropTypes.shape(DirectionsStepInterface)).isRequired,
  via_waypoints: PropTypes.arrayOf(PropTypes.shape(LatLngInterface)).isRequired
}

export const TransitFareInterface = {
  currency: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired
}

export const DirectionsRouteInterface = {
  bounds: PropTypes.shape(LatLngBoundsInterface).isRequired,
  copyrights: PropTypes.string.isRequired,
  fare: PropTypes.shape(TransitFareInterface).isRequired,
  legs: PropTypes.arrayOf(PropTypes.shape(DirectionsLegInterface)).isRequired,
  overview_path: PropTypes.arrayOf(PropTypes.shape(LatLngInterface)).isRequired,
  overview_polyline: PropTypes.string.isRequired,
  warnings: PropTypes.arrayOf(PropTypes.string).isRequired,
  waypoint_order: PropTypes.arrayOf(PropTypes.number).isRequired
}

export const DirectionsGeocodedWaypointInterface = {
  partial_match: PropTypes.bool.isRequired,
  place_id: PropTypes.string.isRequired,
  types: PropTypes.arrayOf(PropTypes.string).isRequired
}

export const DirectionsResultInterface = {
  geocoded_waypoints: PropTypes.arrayOf(PropTypes.shape(DirectionsGeocodedWaypointInterface))
    .isRequired,
  routes: PropTypes.arrayOf(PropTypes.shape(DirectionsRouteInterface)).isRequired
}

export const DirectionsRendererOptionsInterface = {
  directions: PropTypes.shape(DirectionsResultInterface).isRequired,
  draggable: PropTypes.bool.isRequired,
  hideRouteList: PropTypes.bool.isRequired,
  infoWindow: PropTypes.shape(InfoWindowInterface).isRequired,
  map: PropTypes.shape(GoogleMapInterface).isRequired,
  markerOptions: PropTypes.shape(MarkerOptionsInterface).isRequired,
  panel: PropTypes.node.isRequired,
  polylineOptions: PropTypes.shape(PolylineOptionsInterface).isRequired,
  preserveViewport: PropTypes.bool.isRequired,
  routeIndex: PropTypes.number.isRequired,
  suppressBicyclingLayer: PropTypes.bool.isRequired,
  suppressInfoWindows: PropTypes.bool.isRequired,
  suppressMarkers: PropTypes.bool.isRequired,
  suppressPolylines: PropTypes.bool.isRequired
}

export const DirectionsRendererPropTypes = {
  options: PropTypes.shape(DirectionsRendererOptionsInterface),
  directions: PropTypes.any,
  panel: PropTypes.any,
  routeIndex: PropTypes.number,
  onDirectionsChanged: PropTypes.func
}

export const DrawingControlOptionsInterface = {
  drawingModes: PropTypes.arrayOf(PropTypes.string).isRequired,
  position: PropTypes.string.isRequired // ControlPosition constants
}

export const DrawingManagerOptionsInterface = {
  circleOptions: PropTypes.shape(CircleOptionsInterface).isRequired,
  drawingControl: PropTypes.bool.isRequired,
  drawingControlOptions: PropTypes.shape(DrawingControlOptionsInterface).isRequired,
  drawingMode: PropTypes.string.isRequired, // OverlayType constants
  map: PropTypes.shape(GoogleMapInterface).isRequired,
  markerOptions: PropTypes.shape(MarkerOptionsInterface).isRequired,
  polygonOptions: PropTypes.shape(PolygonOptionsInterface).isRequired,
  polylineOptions: PropTypes.shape(PolylineOptionsInterface).isRequired,
  rectangleOptions: PropTypes.shape(RectangleOptionsInterface).isRequired
}

export const DrawingManagerPropTypes = {
  options: PropTypes.shape(DrawingManagerOptionsInterface),
  drawingMode: PropTypes.any,
  onCircleComplete: PropTypes.func,
  onMarkerComplete: PropTypes.func,
  onOverlayComplete: PropTypes.func,
  onPolygonComplete: PropTypes.func,
  onPolylineComplete: PropTypes.func,
  onRectangleComplete: PropTypes.func
}

export const InfoWindowPropTypes = {
  children: PropTypes.node,
  options: PropTypes.shape(InfoWindowOptionsInterface),
  position: PropTypes.oneOfType([
    PropTypes.shape(LatLngInterface),
    PropTypes.shape(LatLngLiteralInterface)
  ]).isRequired,
  zIndex: PropTypes.number,
  onCloseClick: PropTypes.func,
  onDomReady: PropTypes.func,
  onContentChanged: PropTypes.func,
  onPositionChanged: PropTypes.func,
  onZindexChanged: PropTypes.func
}

export const InfoBoxPropTypes = {
  options: PropTypes.any,
  children: PropTypes.node,
  position: PropTypes.any,
  visible: PropTypes.bool,
  zIndex: PropTypes.number,
  onCloseClick: PropTypes.func,
  onDomReady: PropTypes.func,
  onContentChanged: PropTypes.func,
  onPositionChanged: PropTypes.func,
  onZindexChanged: PropTypes.func
}

export const HeatmapLayerPropTypes = {
  options: PropTypes.shape(HeatmapLayerOptionsInterface),
  data: PropTypes.any
}

export const StreetViewPanoramaPropTypes = {
  options: PropTypes.shape(StreetViewPanoramaOptionsInterface),
  children: PropTypes.node,
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
  onZoomChanged: PropTypes.func
}

export const MarkerPropTypes = {
  children: PropTypes.node,
  options: PropTypes.shape(MarkerOptionsInterface),
  noRedraw: PropTypes.func,
  animation: PropTypes.any,
  clickable: PropTypes.bool,
  cursor: PropTypes.string,
  draggable: PropTypes.bool,
  icon: PropTypes.any,
  label: PropTypes.any,
  opacity: PropTypes.number,
  position: PropTypes.oneOfType([
    PropTypes.shape(LatLngInterface),
    PropTypes.shape(LatLngLiteralInterface)
  ]),
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
  onZindexChanged: PropTypes.func
}

export const MarkerClustererPropTypes = {
  children: PropTypes.node,
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
  onMouseOver: PropTypes.func
}

export const MarkerWithLabelPropTypes = {
  children: PropTypes.node,
  labelAnchor: PropTypes.object,
  labelClass: PropTypes.string,
  labelStyle: PropTypes.object,
  labelVisible: PropTypes.bool,
  noRedraw: PropTypes.bool,
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
  onZindexChanged: PropTypes.func
}

export const BicyclingLayerPropTypes = {
  map: PropTypes.object
}

export const TrafficLayerPropTypes = {
  options: PropTypes.shape(TrafficLayerOptionsInterface),
  map: PropTypes.object
}

export const GroundOverlayPropTypes = {
  map: PropTypes.object, // it is null at initialization, so can't be required
  options: PropTypes.shape(GroundOverlayOptionsInterface),
  url: PropTypes.string,
  bounds: PropTypes.arrayOf(
    PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired
    }).isRequired
  ).isRequired,
  opacity: PropTypes.number,

  onDblClick: PropTypes.func,
  onClick: PropTypes.func
}

export const GoogleMapProviderPropTypes = {
  id: PropTypes.string.isRequired,
  mapContainerStyle: PropTypes.object,
  mapContainerClassName: PropTypes.string
}

export const GoogleMapPropTypes = {
  children: PropTypes.node,
  options: PropTypes.shape(GoogleMapOptionsInterface),
  extraMapTypes: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.any)),
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
  onZoomChanged: PropTypes.func
}

export const LoadScriptPropTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.string.isRequired,
  googleMapsApiKey: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
  region: PropTypes.string.isRequired,
  version: PropTypes.string.isRequired,
  loadingElement: PropTypes.element.isRequired,
  onLoad: PropTypes.func
}
