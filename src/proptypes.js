import PropTypes from 'prop-types'

const PointInterface = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  equals: PropTypes.func.isRequired,
  toString: PropTypes.func.isRequired
}

const LatLngInterface = {
  equals: PropTypes.func.isRequired,
  lat: PropTypes.func.isRequired,
  lng: PropTypes.func.isRequired,
  toJSON: PropTypes.func.isRequired,
  toString: PropTypes.func.isRequired,
  toUrlValue: PropTypes.func.isRequired
}

const LatLngLiteralInterface = {
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired
}

const PlaceInterface = {
  location: PropTypes.oneOfType([
    PropTypes.shape(LatLngInterface),
    PropTypes.shape(LatLngLiteralInterface)
  ]),
  placeId: PropTypes.string,
  query: PropTypes.string
}

const SizeInterface = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  widthUnit: PropTypes.string.isRequired,
  heightUnit: PropTypes.string.isRequired
}

const SymbolInterface = {
  anchor: PropTypes.shape(PointInterface).isRequired,
  fillColor: PropTypes.string.isRequired,
  fillOpacity: PropTypes.number.isRequired,
  labelOrigin: PropTypes.shape(PointInterface).isRequired,
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

const MVCArrayInterface = {
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

const MapTypeRegistryInterface = {
  set: PropTypes.func.isRequired
}

const FullscreenControlOptionsInterface = {
  position: PropTypes.oneOf([
    'BOTTOM_CENTER',
    'BOTTOM_LEFT',
    'BOTTOM_RIGHT',
    'LEFT_BOTTOM',
    'LEFT_CENTER',
    'LEFT_TOP',
    'RIGHT_BOTTOM',
    'RIGHT_CENTER',
    'RIGHT_TOP',
    'TOP_CENTER',
    'TOP_LEFT',
    'TOP_RIGHT'
  ]).isRequired
}

const MapTypeControlOptionsInterface = {
  mapTypeIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  position: PropTypes.oneOf([
    'BOTTOM_CENTER',
    'BOTTOM_LEFT',
    'BOTTOM_RIGHT',
    'LEFT_BOTTOM',
    'LEFT_CENTER',
    'LEFT_TOP',
    'RIGHT_BOTTOM',
    'RIGHT_CENTER',
    'RIGHT_TOP',
    'TOP_CENTER',
    'TOP_LEFT',
    'TOP_RIGHT'
  ]).isRequired,
  style: PropTypes.oneOf([
    'DEFAULT',
    'DROPDOWN_MENU',
    'HORIZONTAL_BAR'
  ]).isRequired
}

const PanControlOptionsInterface = {
  position: PropTypes.oneOf([
    'BOTTOM_CENTER',
    'BOTTOM_LEFT',
    'BOTTOM_RIGHT',
    'LEFT_BOTTOM',
    'LEFT_CENTER',
    'LEFT_TOP',
    'RIGHT_BOTTOM',
    'RIGHT_CENTER',
    'RIGHT_TOP',
    'TOP_CENTER',
    'TOP_LEFT',
    'TOP_RIGHT'
  ]).isRequired
}

const RotateControlOptionsInterface = {
  position: PropTypes.oneOf([
    'BOTTOM_CENTER',
    'BOTTOM_LEFT',
    'BOTTOM_RIGHT',
    'LEFT_BOTTOM',
    'LEFT_CENTER',
    'LEFT_TOP',
    'RIGHT_BOTTOM',
    'RIGHT_CENTER',
    'RIGHT_TOP',
    'TOP_CENTER',
    'TOP_LEFT',
    'TOP_RIGHT'
  ]).isRequired
}

const ScaleControlOptionsInterface = {
  style: PropTypes.oneOf([
    'DEFAULT'
  ]).isRequired
}

const StreetViewAddressControlOptionsInterface = {
  position: PropTypes.oneOf([
    'BOTTOM_CENTER',
    'BOTTOM_LEFT',
    'BOTTOM_RIGHT',
    'LEFT_BOTTOM',
    'LEFT_CENTER',
    'LEFT_TOP',
    'RIGHT_BOTTOM',
    'RIGHT_CENTER',
    'RIGHT_TOP',
    'TOP_CENTER',
    'TOP_LEFT',
    'TOP_RIGHT'
  ]).isRequired
}

const MotionTrackingControlOptionsInterface = {
  position: PropTypes.oneOf([
    'BOTTOM_CENTER',
    'BOTTOM_LEFT',
    'BOTTOM_RIGHT',
    'LEFT_BOTTOM',
    'LEFT_CENTER',
    'LEFT_TOP',
    'RIGHT_BOTTOM',
    'RIGHT_CENTER',
    'RIGHT_TOP',
    'TOP_CENTER',
    'TOP_LEFT',
    'TOP_RIGHT'
  ]).isRequired
}

const StreetViewPovInterface = {
  heading: PropTypes.number.isRequired,
  pitch: PropTypes.number.isRequired
}

const ZoomControlOptionsInterface = {
  position: PropTypes.oneOf([
    'BOTTOM_CENTER',
    'BOTTOM_LEFT',
    'BOTTOM_RIGHT',
    'LEFT_BOTTOM',
    'LEFT_CENTER',
    'LEFT_TOP',
    'RIGHT_BOTTOM',
    'RIGHT_CENTER',
    'RIGHT_TOP',
    'TOP_CENTER',
    'TOP_LEFT',
    'TOP_RIGHT'
  ]).isRequired
}

const StreetViewControlOptionsInterface = {
  position: PropTypes.oneOf([
    'BOTTOM_CENTER',
    'BOTTOM_LEFT',
    'BOTTOM_RIGHT',
    'LEFT_BOTTOM',
    'LEFT_CENTER',
    'LEFT_TOP',
    'RIGHT_BOTTOM',
    'RIGHT_CENTER',
    'RIGHT_TOP',
    'TOP_CENTER',
    'TOP_LEFT',
    'TOP_RIGHT'
  ]).isRequired
}

const LatLngBoundsInterface = {
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

const LatLngBoundsLiteralInterface = {
  east: PropTypes.number.isRequired,
  north: PropTypes.number.isRequired,
  south: PropTypes.number.isRequired,
  west: PropTypes.number.isRequired
}

const DataInterface = {
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

const GoogleMapInterface = {
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
  controls: PropTypes.arrayOf(
    PropTypes.shape(
      MVCArrayInterface
    )
  ).isRequired,
  data: PropTypes.shape(
    DataInterface
  ).isRequired,
  mapTypes: PropTypes.shape(
    MapTypeRegistryInterface
  ).isRequired,
  overlayMapTypes: PropTypes.shape(
    MVCArrayInterface
  ).isRequired
}

const RectangleOptionsInterface = {
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
  strokePosition: PropTypes.oneOf([
    'CENTER',
    'INSIDE',
    'OUTSIDE'
  ]).isRequired,
  strokeWeight: PropTypes.number.isRequired,
  visible: PropTypes.bool.isRequired,
  zIndex: PropTypes.number.isRequired
}

const MapTypeStyleInterface = {
  elementType: PropTypes.string.isRequired,
  featureType: PropTypes.string.isRequired,
  stylers: PropTypes.arrayOf(
    PropTypes.object // TODO
  ).isRequired
}

const IconInterface = {
  anchor: PropTypes.shape(PointInterface).isRequired,
  labelOrigin: PropTypes.shape(PointInterface).isRequired,
  origin: PropTypes.shape(PointInterface).isRequired,
  scaledSize: PropTypes.shape(SizeInterface).isRequired,
  size: PropTypes.shape(SizeInterface).isRequired,
  url: PropTypes.string.isRequired
}

const IconSequenceInterface = {
  fixedRotation: PropTypes.bool.isRequired,
  icon: PropTypes.shape(SymbolInterface),
  offset: PropTypes.string.isRequired,
  repeat: PropTypes.string.isRequired
}

const StreetViewPanoramaOptionsInterface = {
  addressControl: PropTypes.bool.isRequired,
  addressControlOptions: PropTypes.shape(
    StreetViewAddressControlOptionsInterface
  ).isRequired,
  clickToGo: PropTypes.bool.isRequired,
  disableDefaultUI: PropTypes.bool.isRequired,
  disableDoubleClickZoom: PropTypes.bool.isRequired,
  enableCloseButton: PropTypes.bool.isRequired,
  fullscreenControl: PropTypes.bool.isRequired,
  fullscreenControlOptions: PropTypes.shape(
    FullscreenControlOptionsInterface
  ).isRequired,
  imageDateControl: PropTypes.bool.isRequired,
  linksControl: PropTypes.bool.isRequired,
  motionTracking: PropTypes.bool.isRequired,
  motionTrackingControl: PropTypes.bool.isRequired,
  motionTrackingControlOptions: PropTypes.shape(
    MotionTrackingControlOptionsInterface
  ).isRequired,
  panControl: PropTypes.bool,
  panControlOptions: PropTypes.shape(
    PanControlOptionsInterface
  ).isRequired,
  pano: PropTypes.string.isRequired,
  position: PropTypes.oneOfType([
    PropTypes.shape(LatLngInterface),
    PropTypes.shape(LatLngLiteralInterface)
  ]).isRequired,
  pov: PropTypes.shape(
    StreetViewPovInterface
  ).isRequired,
  scrollwheel: PropTypes.bool.isRequired,
  showRoadLabels: PropTypes.bool.isRequired,
  visible: PropTypes.bool.isRequired,
  zoom: PropTypes.number.isRequired,
  zoomControl: PropTypes.bool.isRequired,
  zoomControlOptions: PropTypes.shape(
    ZoomControlOptionsInterface
  ).isRequired
}

const StreetViewPanoramaInterface = {
  options: PropTypes.shape(
    StreetViewPanoramaOptionsInterface
  ).isRequired,
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
  controls: PropTypes.arrayOf(
    PropTypes.shape(MVCArrayInterface)
  ).isRequired
}

const GoogleMapOptionsInterface = {
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
    StreetViewPanoramaInterface
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

const TrafficLayerOptionsInterface = {
  autoRefresh: PropTypes.bool.isRequired,
  map: PropTypes.shape(
    GoogleMapInterface
  ).isRequired
}

const PathInterface = PropTypes.oneOfType([
  PropTypes.shape(
    MVCArrayInterface
  ),
  PropTypes.arrayOf(
    PropTypes.shape(
      LatLngInterface
    )
  ),
  PropTypes.arrayOf(
    PropTypes.shape(
      LatLngLiteralInterface
    )
  )
])

const MarkerOptionsInterface = {
  anchorPoint: PropTypes.shape(
    PointInterface
  ).isRequired,
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

const InfoWindowOptionsInterface = {
  content: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node
  ]).isRequired,
  disableAutoPan: PropTypes.bool,
  maxWidth: PropTypes.number,
  pixelOffset: PropTypes.shape(
    SizeInterface
  ),
  position: PropTypes.oneOfType([
    PropTypes.shape(
      LatLngInterface
    ),
    PropTypes.shape(
      LatLngLiteralInterface
    )
  ]),
  zIndex: PropTypes.number
}

const InfoWindowInterface = {
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

const PolylineOptionsInterface = {
  clickable: PropTypes.bool,
  draggable: PropTypes.bool,
  editable: PropTypes.bool,
  geodesic: PropTypes.bool,
  icons: PropTypes.arrayOf(
    PropTypes.shape(
      IconSequenceInterface
    )
  ),
  map: PropTypes.shape(
    GoogleMapInterface
  ),
  path: PathInterface,
  strokeColor: PropTypes.string,
  strokeOpacity: PropTypes.number,
  strokeWeight: PropTypes.number,
  visible: PropTypes.bool,
  zIndex: PropTypes.number
}

const PolygonOptionsInterface = {
  clickable: PropTypes.backgroundColor,
  draggable: PropTypes.backgroundColor,
  editable: PropTypes.backgroundColor,
  fillColor: PropTypes.stringbackgroundColor,
  fillOpacity: PropTypes.numberbackgroundColor,
  geodesic: PropTypes.backgroundColor,
  map: PropTypes.shape(
    GoogleMapInterface
  ),
  paths: PropTypes.oneOfType([
    PropTypes.shape(
      MVCArrayInterface
    ),
    PropTypes.arrayOf(
      PropTypes.arrayOf(
        PropTypes.oneOfType([
          PropTypes.shape(
            LatLngInterface
          ),
          PropTypes.shape(
            LatLngLiteralInterface
          )
        ])
      )
    ),
    PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.shape(
          LatLngInterface
        ),
        PropTypes.shape(
          LatLngLiteralInterface
        )
      ])
    )
  ]),
  strokeColor: PropTypes.string,
  strokeOpacity: PropTypes.number,
  strokePosition: PropTypes.oneOf([
    'CENTER',
    'INSIDE',
    'OUTSIDE'
  ]),
  strokeWeight: PropTypes.number,
  visible: PropTypes.bool,
  zIndex: PropTypes.number
}

const CircleOptionsInterface = {
  center: PropTypes.oneOfType([
    PropTypes.shape(
      LatLngInterface
    ),
    PropTypes.shape(
      LatLngLiteralInterface
    )
  ]),
  clickable: PropTypes.bool,
  draggable: PropTypes.bool,
  editable: PropTypes.bool,
  fillColor: PropTypes.string,
  fillOpacity: PropTypes.number,
  map: PropTypes.shape(
    GoogleMapInterface
  ),
  radius: PropTypes.number,
  strokeColor: PropTypes.string,
  strokeOpacity: PropTypes.number,
  strokePosition: PropTypes.oneOf([
    'CENTER',
    'INSIDE',
    'OUTSIDE'
  ]),
  strokeWeight: PropTypes.number,
  visible: PropTypes.bool,
  zIndex: PropTypes.number
}

const KmlLayerOptionsInterface = {
  clickable: PropTypes.bool.isRequired,
  map: PropTypes.shape(
    GoogleMapInterface
  ).isRequired,
  preserveViewport: PropTypes.bool.isRequired,
  screenOverlays: PropTypes.bool.isRequired,
  suppressInfoWindows: PropTypes.bool.isRequired,
  url: PropTypes.string.isRequired,
  zIndex: PropTypes.number.isRequired
}

const MarkerShapeInterface = {
  coords: PropTypes.arrayOf(
    PropTypes.number
  ),
  type: PropTypes.string
}

const DataStyleOptionsInterface = {
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
  zIndex: PropTypes.number.isRequired
}

const DataOptionsInterface = {
  controlPosition: PropTypes.object.isRequired, // ControlPosition constants
  controls: PropTypes.arrayOf(
    PropTypes.string
  ).isRequired,
  drawingMode: PropTypes.string.isRequired,
  featureFactory: PropTypes.func.isRequired,
  map: PropTypes.shape(
    GoogleMapInterface
  ).isRequired,
  style: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape(DataStyleOptionsInterface)
  ]).isRequired
}

const FusionTablesHeatmapInterface = {
  enabled: PropTypes.bool.isRequired
}

const FusionTablesQueryInterface = {
  from: PropTypes.string.isRequired,
  limit: PropTypes.number.isRequired,
  offset: PropTypes.number.isRequired,
  orderBy: PropTypes.string.isRequired,
  select: PropTypes.string.isRequired,
  where: PropTypes.string.isRequired
}

const FusionTablesMarkerOptionsInterface = {
  iconName: PropTypes.string.isRequired
}

const FusionTablesPolygonOptionsInterface = {
  fillColor: PropTypes.string.isRequired,
  fillOpacity: PropTypes.number.isRequired,
  strokeColor: PropTypes.string.isRequired,
  strokeOpacity: PropTypes.number.isRequired,
  strokeWeight: PropTypes.number.isRequired
}

const FusionTablesPolylineOptionsInterface = {
  strokeColor: PropTypes.string.isRequired,
  strokeOpacity: PropTypes.number.isRequired,
  strokeWeight: PropTypes.number.isRequired
}

const FusionTablesStyleInterface = {
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

const FusionTablesLayerOptionsInterface = {
  clickable: PropTypes.bool.isRequired,
  heatmap: PropTypes.shape(
    FusionTablesHeatmapInterface
  ).isRequired,
  map: PropTypes.shape(
    GoogleMapInterface
  ).isRequired,
  query: PropTypes.shape(
    FusionTablesQueryInterface
  ).isRequired,
  styles: PropTypes.arrayOf(
    FusionTablesStyleInterface
  ).isRequired,
  suppressInfoWindows: PropTypes.bool.isRequired
}

const ImageMapTypeOptionsInterface = {
  alt: PropTypes.string.isRequired,
  getTileUrl: PropTypes.func.isRequired,
  maxZoom: PropTypes.number.isRequired,
  minZoom: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  opacity: PropTypes.number.isRequired,
  tileSize: PropTypes.shape(SizeInterface).isRequired
}

const GroundOverlayOptionsInterface = {
  clickable: PropTypes.bool.isRequired,
  // map prop is merged inside the component
  // map: PropTypes.shape(
  //   GoogleMapInterface
  // ),
  opacity: PropTypes.number.isRequired
}

const HeatmapLayerOptionsInterface = {
  data: PropTypes.shape(
    MVCArrayInterface
  ).isRequired,
  dissipating: PropTypes.bool.isRequired,
  gradient: PropTypes.arrayOf(
    PropTypes.string
  ).isRequired,
  map: PropTypes.shape(
    GoogleMapInterface
  ).isRequired,
  maxIntensity: PropTypes.number.isRequired,
  opacity: PropTypes.number.isRequired,
  radius: PropTypes.number.isRequired
}

const ComponentRestrictionsInterface = {
  country: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(
      PropTypes.string
    )
  ]).isRequired
}

const AutocompleteOptionsInterface = {
  bounds: PropTypes.oneOfType([
    PropTypes.shape(
      LatLngBoundsInterface
    ),
    PropTypes.shape(
      LatLngBoundsLiteralInterface
    )
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

const SearchBoxOptionsInterface = {
  bounds: PropTypes.oneOfType([
    PropTypes.shape(
      LatLngBoundsInterface
    ),
    PropTypes.shape(
      LatLngBoundsLiteralInterface
    )
  ]).isRequired
}

const TimeInterface = {
  text: PropTypes.string.isRequired,
  time_zone: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
}

const DistanceInterface = {
  text: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired
}

const DurationInterface = {
  text: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired
}

const TransitStopInterface = {
  location: PropTypes.shape(
    LatLngInterface
  ).isRequired,
  name: PropTypes.string.isRequired
}

const TransitAgencyInterface = {
  name: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
}

const TransitVehicleInterface = {
  icon: PropTypes.string.isRequired,
  local_icon: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf([
    'BUS',
    'CABLE_CAR',
    'COMMUTER_TRAIN',
    'FERRY',
    'FUNICULAR',
    'GONDOLA_LIFT',
    'HEAVY_RAIL',
    'HIGH_SPEED_TRAIN',
    'INTERCITY_BUS',
    'METRO_RAIL',
    'MONORAIL',
    'OTHER',
    'RAIL',
    'SHARE_TAXI',
    'SUBWAY',
    'TRAM',
    'TROLLEYBUS'
  ]).isRequired
}

const TransitLineInterface = {
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

const TransitDetailsInterface = {
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

const DirectionsStepInterface = {
  distance: PropTypes.shape(
    DistanceInterface
  ).isRequired,
  duration: PropTypes.shape(
    DurationInterface
  ).isRequired,
  end_location: PropTypes.shape(
    LatLngInterface
  ).isRequired,
  instructions: PropTypes.string.isRequired,
  path: PropTypes.arrayOf(
    PropTypes.shape(
      LatLngInterface
    )
  ).isRequired,
  start_location: PropTypes.shape(
    LatLngInterface
  ).isRequired,
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

const DirectionsLegInterface = {
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
  end_location: PropTypes.shape(
    LatLngInterface
  ).isRequired,
  start_address: PropTypes.string.isRequired,
  start_location: PropTypes.shape(
    LatLngInterface
  ).isRequired,
  steps: PropTypes.arrayOf(
    PropTypes.shape(
      DirectionsStepInterface
    )
  ).isRequired,
  via_waypoints: PropTypes.arrayOf(
    PropTypes.shape(
      LatLngInterface
    )
  ).isRequired
}

const TransitFareInterface = {
  currency: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired
}

const DirectionsRouteInterface = {
  bounds: PropTypes.shape(
    LatLngBoundsInterface
  ),
  copyrights: PropTypes.string,
  fare: PropTypes.shape(
    TransitFareInterface
  ),
  legs: PropTypes.arrayOf(
    PropTypes.shape(
      DirectionsLegInterface
    )
  ),
  overview_path: PropTypes.arrayOf(
    PropTypes.shape(
      LatLngInterface
    )
  ),
  overview_polyline: PropTypes.string,
  warnings: PropTypes.arrayOf(
    PropTypes.string
  ),
  waypoint_order: PropTypes.arrayOf(
    PropTypes.number
  )
}

const DirectionsGeocodedWaypointInterface = {
  partial_match: PropTypes.bool,
  place_id: PropTypes.string,
  types: PropTypes.arrayOf(
    PropTypes.string
  )
}

const DirectionsResultInterface = {
  geocoded_waypoints: PropTypes.arrayOf(
    PropTypes.shape(
      DirectionsGeocodedWaypointInterface
    )
  ),
  routes: PropTypes.arrayOf(
    PropTypes.shape(
      DirectionsRouteInterface
    )
  )
}

const DirectionsRendererOptionsInterface = {
  directions: PropTypes.shape(
    DirectionsResultInterface
  ),
  draggable: PropTypes.bool,
  hideRouteList: PropTypes.bool,
  infoWindow: PropTypes.shape(
    InfoWindowInterface
  ),
  map: PropTypes.shape(
    GoogleMapInterface
  ),
  markerOptions: PropTypes.shape(
    MarkerOptionsInterface
  ),
  panel: PropTypes.node,
  polylineOptions: PropTypes.shape(
    PolylineOptionsInterface
  ),
  preserveViewport: PropTypes.bool,
  routeIndex: PropTypes.number,
  suppressBicyclingLayer: PropTypes.bool,
  suppressInfoWindows: PropTypes.bool,
  suppressMarkers: PropTypes.bool,
  suppressPolylines: PropTypes.bool
}

const DrawingControlOptionsInterface = {
  drawingModes: PropTypes.arrayOf(
    PropTypes.string
  ),
  position: PropTypes.oneOf([
    'BOTTOM_CENTER',
    'BOTTOM_LEFT',
    'BOTTOM_RIGHT',
    'LEFT_BOTTOM',
    'LEFT_CENTER',
    'LEFT_TOP',
    'RIGHT_BOTTOM',
    'RIGHT_CENTER',
    'RIGHT_TOP',
    'TOP_CENTER',
    'TOP_LEFT',
    'TOP_RIGHT'
  ])
}

const DrawingManagerOptionsInterface = {
  circleOptions: PropTypes.shape(
    CircleOptionsInterface
  ),
  drawingControl: PropTypes.bool,
  drawingControlOptions: PropTypes.shape(
    DrawingControlOptionsInterface
  ),
  drawingMode: PropTypes.oneOf([
    'CIRCLE',
    'MARKER',
    'POLYGON',
    'POLYLINE',
    'RECTANGLE'
  ]),
  map: PropTypes.shape(
    GoogleMapInterface
  ),
  markerOptions: PropTypes.shape(
    MarkerOptionsInterface
  ),
  polygonOptions: PropTypes.shape(
    PolygonOptionsInterface
  ),
  polylineOptions: PropTypes.shape(
    PolylineOptionsInterface
  ),
  rectangleOptions: PropTypes.shape(
    RectangleOptionsInterface
  )
}

const DrivingOptionsInterface = {
  departureTime: PropTypes.instanceOf(Date),
  trafficModel: PropTypes.oneOf([
    'BEST_GUESS',
    'OPTIMISTIC',
    'PESSIMISTIC'
  ])
}

const TransitOptionsInterface = {
  arrivalTime: PropTypes.instanceOf(Date),
  departureTime: PropTypes.instanceOf(Date),
  modes: PropTypes.arrayOf(
    PropTypes.oneOf([
      'BUS',
      'RAIL',
      'SUBWAY',
      'TRAIN',
      'TRAM'
    ])
  ),
  routingPreference: PropTypes.oneOf([
    'FEWER_TRANSFERS',
    'LESS_WALKING'
  ])
}

const DirectionsWaypointInterface = {
  location: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape(LatLngInterface),
    PropTypes.shape(PlaceInterface)
  ]),
  stopover: PropTypes.bool
}

const DirectionsRequestInterface = {
  avoidFerries: PropTypes.bool,
  avoidHighways: PropTypes.bool,
  avoidTolls: PropTypes.bool,
  destination: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape(
      LatLngInterface
    ),
    PropTypes.shape(
      PlaceInterface
    ),
    PropTypes.shape(
      LatLngLiteralInterface
    )
  ]).isRequired, // required
  drivingOptions: PropTypes.shape(
    DrivingOptionsInterface
  ),
  optimizeWaypoints: PropTypes.bool,
  origin: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape(
      LatLngInterface
    ),
    PropTypes.shape(
      PlaceInterface
    ),
    PropTypes.shape(
      LatLngLiteralInterface
    )
  ]).isRequired, // required
  provideRouteAlternatives: PropTypes.bool,
  region: PropTypes.string,
  transitOptions: PropTypes.shape(
    TransitOptionsInterface
  ),
  travelMode: PropTypes.oneOf([
    'BICYCLING',
    'DRIVING',
    'TRANSIT',
    'WALKING'
  ]).isRequired, // required
  unitSystem: PropTypes.oneOf([
    'IMPERIAL',
    'METRIC'
  ]),
  waypoints: PropTypes.arrayOf(
    PropTypes.shape(
      DirectionsWaypointInterface
    )
  )
}

export const PolylinePropTypes = {
  options: PropTypes.shape(
    PolylineOptionsInterface
  ),
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

export const PolygonPropTypes = {
  options: PropTypes.shape(
    PolygonOptionsInterface
  ),
  draggable: PropTypes.bool,
  editable: PropTypes.bool,
  path: PropTypes.any, // TODO
  paths: PropTypes.any, // TODO
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

export const RectanglePropTypes = {
  options: PropTypes.shape(
    RectangleOptionsInterface
  ),
  bounds: PropTypes.any, // TODO
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

export const CirclePropTypes = {
  options: PropTypes.shape(
    CircleOptionsInterface
  ),
  center: PropTypes.oneOfType([
    PropTypes.shape(
      LatLngInterface
    ),
    PropTypes.shape(
      LatLngLiteralInterface
    )
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
  onRadiusChanged: PropTypes.func
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
  onSetProperty: PropTypes.func
}

export const OverlayViewPropTypes = {
  mapPaneName: PropTypes.string,
  children: PropTypes.node,
  position: PropTypes.object,
  bounds: PropTypes.object,
  getPixelPositionOffset: PropTypes.func
}

export const KmlLayerPropTypes = {
  options: PropTypes.shape(
    KmlLayerOptionsInterface
  ),
  url: PropTypes.string,
  zIndex: PropTypes.number,
  onDefaultViewportChanged: PropTypes.func,
  onClick: PropTypes.func,
  onStatusChanged: PropTypes.func
}

export const FusionTablesLayerPropTypes = {
  options: PropTypes.shape(
    FusionTablesLayerOptionsInterface
  ),
  onClick: PropTypes.func
}

export const ImageMapTypePropTypes = {
  options: PropTypes.shape(
    ImageMapTypeOptionsInterface
  ),
  onTilesLoaded: PropTypes.func
}

export const AutocompletePropTypes = {
  inputField: PropTypes.node.isRequired,
  options: PropTypes.shape(
    AutocompleteOptionsInterface
  ),
  onPlaceChanged: PropTypes.func
}

export const SearchBoxPropTypes = {
  options: PropTypes.shape(
    SearchBoxOptionsInterface
  ),
  children: PropTypes.node,
  controlPosition: PropTypes.number,
  bounds: PropTypes.any, // TODO
  onPlacesChanged: PropTypes.func
}

export const DrawingManagerPropTypes = {
  options: PropTypes.shape(
    DrawingManagerOptionsInterface
  ),
  drawingMode: PropTypes.any, // TODO
  onCircleComplete: PropTypes.func,
  onMarkerComplete: PropTypes.func,
  onOverlayComplete: PropTypes.func,
  onPolygonComplete: PropTypes.func,
  onPolylineComplete: PropTypes.func,
  onRectangleComplete: PropTypes.func
}

export const InfoWindowPropTypes = {
  children: PropTypes.node,
  options: PropTypes.shape(
    InfoWindowOptionsInterface
  ),
  position: PropTypes.oneOfType([
    PropTypes.shape(
      LatLngInterface
    ),
    PropTypes.shape(
      LatLngLiteralInterface
    )
  ]).isRequired,
  zIndex: PropTypes.number,
  onCloseClick: PropTypes.func,
  onDomReady: PropTypes.func,
  onContentChanged: PropTypes.func,
  onPositionChanged: PropTypes.func,
  onZindexChanged: PropTypes.func
}

export const InfoBoxPropTypes = {
  options: PropTypes.any, // TODO
  children: PropTypes.node,
  position: PropTypes.any, // TODO
  visible: PropTypes.bool,
  zIndex: PropTypes.number,
  onCloseClick: PropTypes.func,
  onDomReady: PropTypes.func,
  onContentChanged: PropTypes.func,
  onPositionChanged: PropTypes.func,
  onZindexChanged: PropTypes.func
}

export const HeatmapLayerPropTypes = {
  options: PropTypes.shape(
    HeatmapLayerOptionsInterface
  ),
  data: PropTypes.any // TODO
}

export const StreetViewPanoramaPropTypes = {
  options: PropTypes.shape(
    StreetViewPanoramaOptionsInterface
  ),
  children: PropTypes.node,
  links: PropTypes.any, // TODO
  motionTracking: PropTypes.bool,

  pano: PropTypes.string,
  position: PropTypes.any, // TODO
  pov: PropTypes.any, // TODO
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
  options: PropTypes.shape(
    MarkerOptionsInterface
  ),
  noRedraw: PropTypes.func,
  animation: PropTypes.any, // TODO
  clickable: PropTypes.bool,
  cursor: PropTypes.string,
  draggable: PropTypes.bool,
  icon: PropTypes.any, // TODO
  label: PropTypes.any, // TODO
  opacity: PropTypes.number,
  position: PropTypes.oneOfType([
    PropTypes.shape(
      LatLngInterface
    ),
    PropTypes.shape(
      LatLngLiteralInterface
    )
  ]),
  shape: PropTypes.any, // TODO
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

export const MarkerClusterPropTypes = {
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
  animation: PropTypes.any, // TODO
  clickable: PropTypes.bool,
  cursor: PropTypes.string,
  draggable: PropTypes.bool,
  icon: PropTypes.any, // TODO
  label: PropTypes.any, // TODO
  opacity: PropTypes.number,
  options: PropTypes.any, // TODO
  place: PropTypes.any, // TODO
  position: PropTypes.any, // TODO
  shape: PropTypes.any, // TODO
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
  options: PropTypes.shape(
    TrafficLayerOptionsInterface
  ),
  map: PropTypes.object // it is null at initialization, so can't be required
}

export const GroundOverlayPropTypes = {
  map: PropTypes.object, // it is null at initialization, so can't be required
  options: PropTypes.shape(
    GroundOverlayOptionsInterface
  ),
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

export const GoogleMapPropTypes = {
  id: PropTypes.string.isRequired,
  mapContainerStyle: PropTypes.object,
  mapContainerClassName: PropTypes.string,

  children: PropTypes.node,
  options: PropTypes.shape(
    GoogleMapOptionsInterface
  ),
  extraMapTypes: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.any // TODO
    )
  ),
  center: PropTypes.any, // TODO
  clickableIcons: PropTypes.bool,
  heading: PropTypes.number,
  mapTypeId: PropTypes.any, // TODO
  streetView: PropTypes.any, // TODO
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
  onLoad: PropTypes.func,
  libraries: PropTypes.arrayOf(
    PropTypes.string
  ).isRequired
}

export const DirectionsRendererPropTypes = {
  options: PropTypes.shape(
    DirectionsRendererOptionsInterface
  ),
  directions: PropTypes.any, // TODO
  panel: PropTypes.any, // TODO
  routeIndex: PropTypes.number,
  onDirectionsChanged: PropTypes.func
}

export const DirectionsServicePropTypes = {
  options: PropTypes.shape(
    DirectionsRequestInterface
  ).isRequired,
  callback: PropTypes.func.isRequired
}
