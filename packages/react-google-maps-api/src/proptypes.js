import PropTypes from 'prop-types'

const PointInterface = {
  x: PropTypes.number,
  y: PropTypes.number,
  equals: PropTypes.func,
  toString: PropTypes.func
}

const LatLngInterface = {
  equals: PropTypes.func,
  lat: PropTypes.func,
  lng: PropTypes.func,
  toJSON: PropTypes.func,
  toString: PropTypes.func,
  toUrlValue: PropTypes.func
}

const LatLngLiteralInterface = {
  lat: PropTypes.number,
  lng: PropTypes.number
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
  width: PropTypes.number,
  height: PropTypes.number,
  widthUnit: PropTypes.string,
  heightUnit: PropTypes.string
}

const SymbolInterface = {
  anchor: PropTypes.shape(PointInterface),
  fillColor: PropTypes.string,
  fillOpacity: PropTypes.number,
  labelOrigin: PropTypes.shape(PointInterface),
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
  clear: PropTypes.func,
  forEach: PropTypes.func,
  getArray: PropTypes.func,
  getAt: PropTypes.func,
  getLength: PropTypes.func,
  insertAt: PropTypes.func,
  pop: PropTypes.func,
  push: PropTypes.func,
  removeAt: PropTypes.func,
  setAt: PropTypes.func
}

const MapTypeRegistryInterface = {
  set: PropTypes.func
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
  ])
}

const MapTypeControlOptionsInterface = {
  mapTypeIds: PropTypes.arrayOf(PropTypes.string),
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
  ]),
  style: PropTypes.oneOf([
    'DEFAULT',
    'DROPDOWN_MENU',
    'HORIZONTAL_BAR'
  ])
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
  ])
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
  ])
}

const ScaleControlOptionsInterface = {
  style: PropTypes.oneOf([
    'DEFAULT'
  ])
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
  ])
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
  ])
}

const StreetViewPovInterface = {
  heading: PropTypes.number,
  pitch: PropTypes.number
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
  ])
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
  ])
}

const LatLngBoundsInterface = {
  contains: PropTypes.func,
  equals: PropTypes.func,
  extend: PropTypes.func,
  getCenter: PropTypes.func,
  getNorthEast: PropTypes.func,
  getSouthWest: PropTypes.func,
  intersects: PropTypes.func,
  isEmpty: PropTypes.func,
  toJSON: PropTypes.func,
  toSpan: PropTypes.func,
  toString: PropTypes.func,
  toUrlValue: PropTypes.func,
  union: PropTypes.func
}

const LatLngBoundsLiteralInterface = {
  east: PropTypes.number,
  north: PropTypes.number,
  south: PropTypes.number,
  west: PropTypes.number
}

const DataInterface = {
  add: PropTypes.func,
  addGeoJson: PropTypes.func,
  contains: PropTypes.func,
  forEach: PropTypes.func,
  getControlPosition: PropTypes.func,
  getControls: PropTypes.func,
  getDrawingMode: PropTypes.func,
  getFeatureById: PropTypes.func,
  getMap: PropTypes.func,
  getStyle: PropTypes.func,
  loadGeoJson: PropTypes.func,
  overrideStyle: PropTypes.func,
  remove: PropTypes.func,
  revertStyle: PropTypes.func,
  setControlPosition: PropTypes.func,
  setControls: PropTypes.func,
  setDrawingMode: PropTypes.func,
  setMap: PropTypes.func,
  setStyle: PropTypes.func,
  toGeoJson: PropTypes.func
}

const GoogleMapInterface = {
  fitBounds: PropTypes.func,
  getBounds: PropTypes.func,
  getCenter: PropTypes.func,
  getClicableIcons: PropTypes.func, // , // WTF
  getDiv: PropTypes.func,
  getHeading: PropTypes.func,
  getMapTypeId: PropTypes.func,
  getProjection: PropTypes.func,
  getTilt: PropTypes.func,
  getZoom: PropTypes.func,
  panBy: PropTypes.func,
  panTo: PropTypes.func,
  panToBounds: PropTypes.func,
  setCenter: PropTypes.func,
  setClickableIcons: PropTypes.func,
  setHeading: PropTypes.func,
  setMapTypeId: PropTypes.func,
  setOptions: PropTypes.func,
  setStreetView: PropTypes.func,
  setTilt: PropTypes.func,
  setZoom: PropTypes.func,
  controls: PropTypes.arrayOf(
    PropTypes.shape(
      MVCArrayInterface
    )
  ),
  data: PropTypes.shape(
    DataInterface
  ),
  mapTypes: PropTypes.shape(
    MapTypeRegistryInterface
  ),
  overlayMapTypes: PropTypes.shape(
    MVCArrayInterface
  )
}

const RectangleOptionsInterface = {
  bounds: PropTypes.oneOfType([
    PropTypes.shape(LatLngBoundsInterface),
    PropTypes.shape(LatLngBoundsLiteralInterface)
  ]),
  clickable: PropTypes.bool,
  draggable: PropTypes.bool,
  editable: PropTypes.bool,
  fillColor: PropTypes.string,
  fillOpacity: PropTypes.number,
  map: PropTypes.shape(GoogleMapInterface),
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

const MapTypeStyleInterface = {
  elementType: PropTypes.string,
  featureType: PropTypes.string,
  stylers: PropTypes.arrayOf(
    PropTypes.object // TODO
  )
}

const IconInterface = {
  anchor: PropTypes.shape(
    PointInterface
  ),
  labelOrigin: PropTypes.shape(
    PointInterface
  ),
  origin: PropTypes.shape(
    PointInterface
  ),
  scaledSize: PropTypes.shape(
    SizeInterface
  ),
  size: PropTypes.shape(
    SizeInterface
  ),
  url: PropTypes.string
}

const IconSequenceInterface = {
  fixedRotation: PropTypes.bool,
  icon: PropTypes.shape(
    SymbolInterface
  ),
  offset: PropTypes.string,
  repeat: PropTypes.string
}

const StreetViewPanoramaOptionsInterface = {
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
    PropTypes.shape(LatLngInterface),
    PropTypes.shape(LatLngLiteralInterface)
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
  )
}

const StreetViewPanoramaInterface = {
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

  getLinks: PropTypes.func,
  getLocation: PropTypes.func,
  getMotionTracking: PropTypes.func,
  getPano: PropTypes.func,
  getPhotographerPov: PropTypes.func,
  getPosition: PropTypes.func,
  getPov: PropTypes.func,
  getStatus: PropTypes.func,
  getVisible: PropTypes.func,
  getZoom: PropTypes.func,
  registerPanoProvider: PropTypes.func,
  setLinks: PropTypes.func,
  setMotionTracking: PropTypes.func,
  setOptions: PropTypes.func,
  setPano: PropTypes.func,
  setPosition: PropTypes.func,
  setPov: PropTypes.func,
  setVisible: PropTypes.func,
  setZoom: PropTypes.func,
  controls: PropTypes.arrayOf(
    PropTypes.shape(MVCArrayInterface)
  )
}

const GoogleMapOptionsInterface = {
  backgroundColor: PropTypes.string,
  center: PropTypes.oneOfType([
    PropTypes.shape(LatLngInterface),
    PropTypes.shape(LatLngLiteralInterface)
  ]),
  clickableIcons: PropTypes.bool,
  disableDefaultUI: PropTypes.bool,
  disableDoubleClickZoom: PropTypes.bool,
  draggable: PropTypes.bool,
  draggableCursor: PropTypes.string,
  draggingCursor: PropTypes.string,
  fullscreenControl: PropTypes.bool,
  fullscreenControlOptions: PropTypes.shape(
    FullscreenControlOptionsInterface
  ),
  gestureHandling: PropTypes.string,
  heading: PropTypes.number,
  keyboardShortcuts: PropTypes.bool,
  mapTypeControl: PropTypes.bool,
  mapTypeControlOptions: PropTypes.shape(
    MapTypeControlOptionsInterface
  ),
  mapTypeId: PropTypes.string,
  maxZoom: PropTypes.number,
  minZoom: PropTypes.number,
  noClear: PropTypes.bool,
  panControl: PropTypes.bool,
  panControlOptions: PropTypes.shape(
    PanControlOptionsInterface
  ),
  rotateControl: PropTypes.bool,
  rotateControlOptions: PropTypes.shape(
    RotateControlOptionsInterface
  ),
  scaleControl: PropTypes.bool,
  scaleControlOptions: PropTypes.shape(
    ScaleControlOptionsInterface
  ),
  scrollwheel: PropTypes.bool,
  streetView: PropTypes.shape(
    StreetViewPanoramaInterface
  ),
  streetViewControl: PropTypes.bool,
  streetViewControlOptions: PropTypes.shape(
    StreetViewControlOptionsInterface
  ),
  styles: PropTypes.arrayOf(
    PropTypes.shape(
      MapTypeStyleInterface
    )
  ),
  tilt: PropTypes.number,
  zoom: PropTypes.number,
  zoomControl: PropTypes.bool,
  zoomControlOptions: PropTypes.shape(
    ZoomControlOptionsInterface
  )
}

const TrafficLayerOptionsInterface = {
  autoRefresh: PropTypes.bool,
  map: PropTypes.shape(
    GoogleMapInterface
  )
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
  ),
  animation: PropTypes.string, // Animation constants
  clickable: PropTypes.bool,
  crossOnDrag: PropTypes.bool,
  cursor: PropTypes.string,
  draggable: PropTypes.bool,
  icon: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape(
      IconInterface
    )
  ])
}

const InfoWindowOptionsInterface = {
  content: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node
  ]),
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
  close: PropTypes.func,
  getContent: PropTypes.func,
  getPosition: PropTypes.func,
  getZIndex: PropTypes.func,
  open: PropTypes.func,
  setContent: PropTypes.func,
  setOptions: PropTypes.func,
  setPosition: PropTypes.func,
  setZIndex: PropTypes.func,
  onCloseClick: PropTypes.func,
  onContentChanged: PropTypes.func,
  onDomReady: PropTypes.func,
  onPositionChanged: PropTypes.func,
  onZindexChanged: PropTypes.func
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
  clickable: PropTypes.bool,
  map: PropTypes.shape(
    GoogleMapInterface
  ),
  preserveViewport: PropTypes.bool,
  screenOverlays: PropTypes.bool,
  suppressInfoWindows: PropTypes.bool,
  url: PropTypes.string,
  zIndex: PropTypes.number
}

const MarkerShapeInterface = {
  coords: PropTypes.arrayOf(
    PropTypes.number
  ),
  type: PropTypes.string
}

const DataStyleOptionsInterface = {
  clickable: PropTypes.bool,
  cursor: PropTypes.string,
  draggable: PropTypes.bool,
  editable: PropTypes.bool,
  fillColor: PropTypes.string,
  fillOpacity: PropTypes.number,
  icon: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape(
      IconInterface
    ),
    PropTypes.shape(
      SymbolInterface
    )
  ]),
  shape: PropTypes.shape(
    MarkerShapeInterface
  ),
  strokeColor: PropTypes.string,
  strokeOpacity: PropTypes.number,
  strokeWeight: PropTypes.number,
  title: PropTypes.string,
  visible: PropTypes.bool,
  zIndex: PropTypes.number
}

const DataOptionsInterface = {
  controlPosition: PropTypes.object, // ControlPosition constants
  controls: PropTypes.arrayOf(
    PropTypes.string
  ),
  drawingMode: PropTypes.string,
  featureFactory: PropTypes.func,
  map: PropTypes.shape(
    GoogleMapInterface
  ),
  style: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape(DataStyleOptionsInterface)
  ])
}

const FusionTablesHeatmapInterface = {
  enabled: PropTypes.bool
}

const FusionTablesQueryInterface = {
  from: PropTypes.string,
  limit: PropTypes.number,
  offset: PropTypes.number,
  orderBy: PropTypes.string,
  select: PropTypes.string,
  where: PropTypes.string
}

const FusionTablesMarkerOptionsInterface = {
  iconName: PropTypes.string
}

const FusionTablesPolygonOptionsInterface = {
  fillColor: PropTypes.string,
  fillOpacity: PropTypes.number,
  strokeColor: PropTypes.string,
  strokeOpacity: PropTypes.number,
  strokeWeight: PropTypes.number
}

const FusionTablesPolylineOptionsInterface = {
  strokeColor: PropTypes.string,
  strokeOpacity: PropTypes.number,
  strokeWeight: PropTypes.number
}

const FusionTablesStyleInterface = {
  markerOptions: PropTypes.shape(
    FusionTablesMarkerOptionsInterface
  ),
  polygonOptions: PropTypes.shape(
    FusionTablesPolygonOptionsInterface
  ),
  polylineOptions: PropTypes.shape(
    FusionTablesPolylineOptionsInterface
  ),
  where: PropTypes.string
}

const FusionTablesLayerOptionsInterface = {
  clickable: PropTypes.bool,
  heatmap: PropTypes.shape(
    FusionTablesHeatmapInterface
  ),
  map: PropTypes.shape(
    GoogleMapInterface
  ),
  query: PropTypes.shape(
    FusionTablesQueryInterface
  ),
  styles: PropTypes.arrayOf(
    FusionTablesStyleInterface
  ),
  suppressInfoWindows: PropTypes.bool
}

const ImageMapTypeOptionsInterface = {
  alt: PropTypes.string,
  getTileUrl: PropTypes.func,
  maxZoom: PropTypes.number,
  minZoom: PropTypes.number,
  name: PropTypes.string,
  opacity: PropTypes.number,
  tileSize: PropTypes.shape(
    SizeInterface
  )
}

const GroundOverlayOptionsInterface = {
  clickable: PropTypes.bool,
  // map prop is merged inside the component
  // map: PropTypes.shape(
  //   GoogleMapInterface
  // ),
  opacity: PropTypes.number
}

const HeatmapLayerOptionsInterface = {
  data: PropTypes.shape(
    MVCArrayInterface
  ),
  dissipating: PropTypes.bool,
  gradient: PropTypes.arrayOf(
    PropTypes.string
  ),
  map: PropTypes.shape(
    GoogleMapInterface
  ),
  maxIntensity: PropTypes.number,
  opacity: PropTypes.number,
  radius: PropTypes.number
}

const ComponentRestrictionsInterface = {
  country: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(
      PropTypes.string
    )
  ])
}

const AutocompleteOptionsInterface = {
  bounds: PropTypes.oneOfType([
    PropTypes.shape(
      LatLngBoundsInterface
    ),
    PropTypes.shape(
      LatLngBoundsLiteralInterface
    )
  ]),
  componentRestrictions: PropTypes.shape(
    ComponentRestrictionsInterface
  ),
  fields: PropTypes.arrayOf(
    PropTypes.string
  ),
  placeIdOnly: PropTypes.bool,
  strictBounds: PropTypes.bool,
  types: PropTypes.arrayOf(
    PropTypes.string
  )
}

const SearchBoxOptionsInterface = {
  bounds: PropTypes.oneOfType([
    PropTypes.shape(
      LatLngBoundsInterface
    ),
    PropTypes.shape(
      LatLngBoundsLiteralInterface
    )
  ])
}

const TimeInterface = {
  text: PropTypes.string,
  time_zone: PropTypes.string,
  value: PropTypes.string
}

const DistanceInterface = {
  text: PropTypes.string,
  value: PropTypes.number
}

const DurationInterface = {
  text: PropTypes.string,
  value: PropTypes.number
}

const TransitStopInterface = {
  location: PropTypes.shape(
    LatLngInterface
  ),
  name: PropTypes.string
}

const TransitAgencyInterface = {
  name: PropTypes.string,
  phone: PropTypes.string,
  url: PropTypes.string
}

const TransitVehicleInterface = {
  icon: PropTypes.string,
  local_icon: PropTypes.string,
  name: PropTypes.string,
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
  ])
}

const TransitLineInterface = {
  agencies: PropTypes.arrayOf(
    PropTypes.shape(
      TransitAgencyInterface
    )
  ),
  color: PropTypes.string,
  icon: PropTypes.string,
  name: PropTypes.string,
  short_name: PropTypes.string,
  text_color: PropTypes.string,
  url: PropTypes.string,
  vehicle: PropTypes.shape(
    TransitVehicleInterface
  )
}

const TransitDetailsInterface = {
  arrival_stop: PropTypes.shape(
    TransitStopInterface
  ),
  arrival_time: PropTypes.shape(
    TimeInterface
  ),
  departure_stop: PropTypes.shape(
    TransitStopInterface
  ),
  departure_time: PropTypes.shape(
    TimeInterface
  ),
  headsign: PropTypes.string,
  headway: PropTypes.number,
  line: PropTypes.shape(
    TransitLineInterface
  ),
  num_stops: PropTypes.number
}

const DirectionsStepInterface = {
  distance: PropTypes.shape(
    DistanceInterface
  ),
  duration: PropTypes.shape(
    DurationInterface
  ),
  end_location: PropTypes.shape(
    LatLngInterface
  ),
  instructions: PropTypes.string,
  path: PropTypes.arrayOf(
    PropTypes.shape(
      LatLngInterface
    )
  ),
  start_location: PropTypes.shape(
    LatLngInterface
  ),
  steps: PropTypes.arrayOf(
    PropTypes.shape(
      // eslint-disable-next-line babel/no-invalid-this
      this
    )
  ),
  transit: PropTypes.shape(
    TransitDetailsInterface
  ),
  travel_mode: PropTypes.string // TravelMode constants
}

const DirectionsLegInterface = {
  arrival_time: PropTypes.shape(
    TimeInterface
  ),
  departure_time: PropTypes.shape(
    TimeInterface
  ),
  distance: PropTypes.shape(
    DistanceInterface
  ),
  duration: PropTypes.shape(
    DurationInterface
  ),
  duration_in_traffic: PropTypes.shape(
    DurationInterface
  ),
  end_address: PropTypes.string,
  end_location: PropTypes.shape(
    LatLngInterface
  ),
  start_address: PropTypes.string,
  start_location: PropTypes.shape(
    LatLngInterface
  ),
  steps: PropTypes.arrayOf(
    PropTypes.shape(
      DirectionsStepInterface
    )
  ),
  via_waypoints: PropTypes.arrayOf(
    PropTypes.shape(
      LatLngInterface
    )
  )
}

const TransitFareInterface = {
  currency: PropTypes.string,
  value: PropTypes.number
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
  bounds: PropTypes.oneOfType([
    PropTypes.shape(LatLngBoundsInterface),
    PropTypes.shape(LatLngBoundsLiteralInterface)
  ]).isRequired,
  opacity: PropTypes.number,

  onDblClick: PropTypes.func,
  onClick: PropTypes.func
}

export const GoogleMapPropTypes = {
  id: PropTypes.string.isRequired,
  reuseSameInstance: PropTypes.bool,
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
  onZoomChanged: PropTypes.func,
  onLoad: PropTypes.func
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
  onError: PropTypes.func,
  onUnmount: PropTypes.func,
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
