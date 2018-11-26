"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MarkerWithLabelPropTypes = exports.MarkerClustererPropTypes = exports.InfoBoxPropTypes = exports.DrawingManagerPropTypes = exports.DrawingManagerOptionsInterface = exports.DrawingControlOptionsInterface = exports.DirectionsRendererPropTypes = exports.DirectionsRendererOptionsInterface = exports.DirectionsResultInterface = exports.DirectionsGeocodedWaypointInterface = exports.DirectionsRouteInterface = exports.TransitFareInterface = exports.DirectionsLegInterface = exports.DirectionsStepInterface = exports.TransitDetailsInterface = exports.TransitLineInterface = exports.TransitVehicleInterface = exports.TransitAgencyInterface = exports.TransitStopInterface = exports.DurationInterface = exports.DistanceInterface = exports.TimeInterface = exports.SearchBoxPropTypes = exports.SearchBoxOptionsInterface = exports.AutocompletePropTypes = exports.AutocompleteOptionsInterface = exports.ComponentRestrictionsInterface = exports.StreetViewPanoramaPropTypes = exports.HeatmapLayerPropTypes = exports.HeatmapLayerOptionsInterface = exports.GroundOverlayPropTypes = exports.GroundOverlayOptionsInterface = exports.ImageMapTypePropTypes = exports.ImageMapTypeOptionsInterface = exports.FusionTablesLayerPropTypes = exports.FusionTablesLayerOptionsInterface = exports.FusionTablesStyleInterface = exports.FusionTablesPolylineOptionsInterface = exports.FusionTablesPolygonOptionsInterface = exports.FusionTablesMarkerOptionsInterface = exports.FusionTablesQueryInterface = exports.FusionTablesHeatmapInterface = exports.KmlLayerPropTypes = exports.KmlLayerOptionsInterface = exports.OverlayViewPropTypes = exports.DataPropTypes = exports.DataOptionsInterface = exports.DataStyleOptionsInterface = exports.MarkerShapeInterface = exports.CirclePropTypes = exports.CircleOptionsInterface = exports.RectanglePropTypes = exports.RectangleOptionsInterface = exports.LatLngBoundsLiteralInterface = exports.LatLngBoundsPropTypes = exports.PolygonPropTypes = exports.PolygonOptionsInterface = exports.PolylinePropTypes = exports.PolylineOptionsInterface = exports.InfoWindowPropTypes = exports.InfoWindowOptionsInterface = exports.MarkerPropTypes = exports.MarkerOptionsInterface = exports.PathPropTypes = exports.TrafficLayerPropTypes = exports.TrafficLayerOptionsInterface = exports.MapClassPropTypes = exports.DataClassPropTypes = exports.GoogleMapPropTypes = exports.GoogleMapOptionsInterface = exports.StreetViewPanoramaClassPropTypes = exports.StreetViewPanoramaOptionsInterface = exports.IconSequenceInterface = exports.IconInterface = exports.MapTypeStyleInterface = exports.StreetViewControlOptionsInterface = exports.ZoomControlOptionsInterface = exports.StreetViewPovInterface = exports.MotionTrackingControlOptionsInterface = exports.StreetViewAddressControlOptionsInterface = exports.ScaleControlOptionsInterface = exports.RotateControlOptionsInterface = exports.PanControlOptionsInterface = exports.MapTypeControlOptionsInterface = exports.FullscreenControlOptionsInterface = exports.LatLngLiteralPropTypes = exports.LatLngPropTypes = exports.MapTypeRegistryPropTypes = exports.MVCArrayPropTypes = exports.SymbolInterface = exports.SizePropTypes = exports.PointPropTypes = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PointPropTypes = _propTypes.default.shape({
  x: _propTypes.default.number.isRequired,
  y: _propTypes.default.number.isRequired,
  equals: _propTypes.default.func.isRequired,
  toString: _propTypes.default.func.isRequired
});

exports.PointPropTypes = PointPropTypes;

var SizePropTypes = _propTypes.default.shape({
  width: _propTypes.default.number.isRequired,
  height: _propTypes.default.number.isRequired,
  widthUnit: _propTypes.default.string,
  heightUnit: _propTypes.default.string
});

exports.SizePropTypes = SizePropTypes;
var SymbolInterface = {
  anchor: PointPropTypes,
  fillColor: _propTypes.default.string,
  fillOpacity: _propTypes.default.number,
  labelOrigin: PointPropTypes,
  path: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.object]),
  rotation: _propTypes.default.number,
  scale: _propTypes.default.number,
  strokeColor: _propTypes.default.string,
  strokeOpacity: _propTypes.default.number,
  strokeWeight: _propTypes.default.number
};
exports.SymbolInterface = SymbolInterface;

var MVCArrayPropTypes = _propTypes.default.shape({
  clear: _propTypes.default.func.isRequired,
  forEach: _propTypes.default.func.isRequired,
  getArray: _propTypes.default.func.isRequired,
  getAt: _propTypes.default.func.isRequired,
  getLength: _propTypes.default.func.isRequired,
  insertAt: _propTypes.default.func.isRequired,
  pop: _propTypes.default.func.isRequired,
  push: _propTypes.default.func.isRequired,
  removeAt: _propTypes.default.func.isRequired,
  setAt: _propTypes.default.func.isRequired
});

exports.MVCArrayPropTypes = MVCArrayPropTypes;

var MapTypeRegistryPropTypes = _propTypes.default.shape({
  set: _propTypes.default.func.isRequired
});

exports.MapTypeRegistryPropTypes = MapTypeRegistryPropTypes;

var LatLngPropTypes = _propTypes.default.shape({
  equals: _propTypes.default.func.isRequired,
  lat: _propTypes.default.func.isRequired,
  lng: _propTypes.default.func.isRequired,
  toJSON: _propTypes.default.func.isRequired,
  toString: _propTypes.default.func.isRequired,
  toUrlValue: _propTypes.default.func.isRequired
});

exports.LatLngPropTypes = LatLngPropTypes;

var LatLngLiteralPropTypes = _propTypes.default.shape({
  lat: _propTypes.default.number.isRequired,
  lng: _propTypes.default.number.isRequired
});

exports.LatLngLiteralPropTypes = LatLngLiteralPropTypes;
var FullscreenControlOptionsInterface = {
  position: _propTypes.default.string.isRequired // constants

};
exports.FullscreenControlOptionsInterface = FullscreenControlOptionsInterface;
var MapTypeControlOptionsInterface = {
  mapTypeIds: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.string), _propTypes.default.arrayOf(_propTypes.default.object // MapTypeId constants
  )]).isRequired,
  position: _propTypes.default.string.isRequired,
  // ControlPosition constants
  style: _propTypes.default.string.isRequired // MapTypeControlStyle constants

};
exports.MapTypeControlOptionsInterface = MapTypeControlOptionsInterface;
var PanControlOptionsInterface = {
  position: _propTypes.default.string.isRequired // ControlPosition constants

};
exports.PanControlOptionsInterface = PanControlOptionsInterface;
var RotateControlOptionsInterface = {
  position: _propTypes.default.string.isRequired // ControlPosition constants

};
exports.RotateControlOptionsInterface = RotateControlOptionsInterface;
var ScaleControlOptionsInterface = {
  style: _propTypes.default.string.isRequired // ScaleControlStyle constants

};
exports.ScaleControlOptionsInterface = ScaleControlOptionsInterface;
var StreetViewAddressControlOptionsInterface = {
  position: _propTypes.default.string.isRequired // ControlPosition constants

};
exports.StreetViewAddressControlOptionsInterface = StreetViewAddressControlOptionsInterface;
var MotionTrackingControlOptionsInterface = {
  position: _propTypes.default.string.isRequired // ControlPosition constants

};
exports.MotionTrackingControlOptionsInterface = MotionTrackingControlOptionsInterface;
var StreetViewPovInterface = {
  heading: _propTypes.default.number.isRequired,
  pitch: _propTypes.default.number.isRequired
};
exports.StreetViewPovInterface = StreetViewPovInterface;
var ZoomControlOptionsInterface = {
  position: _propTypes.default.string.isRequired // ControlPosition constants

};
exports.ZoomControlOptionsInterface = ZoomControlOptionsInterface;
var StreetViewControlOptionsInterface = {
  position: _propTypes.default.string.isRequired // ControlPosition constants

};
exports.StreetViewControlOptionsInterface = StreetViewControlOptionsInterface;
var MapTypeStyleInterface = {
  elementType: _propTypes.default.string.isRequired,
  featureType: _propTypes.default.string.isRequired,
  stylers: _propTypes.default.arrayOf(_propTypes.default.object).isRequired
};
exports.MapTypeStyleInterface = MapTypeStyleInterface;
var IconInterface = {
  anchor: PointPropTypes.isRequired,
  labelOrigin: PointPropTypes.isRequired,
  origin: PointPropTypes.isRequired,
  scaledSize: SizePropTypes.isRequired,
  size: SizePropTypes.isRequired,
  url: _propTypes.default.string.isRequired
};
exports.IconInterface = IconInterface;
var IconSequenceInterface = {
  fixedRotation: _propTypes.default.bool.isRequired,
  icon: _propTypes.default.shape(SymbolInterface),
  offset: _propTypes.default.string.isRequired,
  repeat: _propTypes.default.string.isRequired
};
exports.IconSequenceInterface = IconSequenceInterface;
var StreetViewPanoramaOptionsInterface = {
  addressControl: _propTypes.default.bool,
  addressControlOptions: _propTypes.default.shape(StreetViewAddressControlOptionsInterface),
  clickToGo: _propTypes.default.bool,
  disableDefaultUI: _propTypes.default.bool,
  disableDoubleClickZoom: _propTypes.default.bool,
  enableCloseButton: _propTypes.default.bool,
  fullscreenControl: _propTypes.default.bool,
  fullscreenControlOptions: _propTypes.default.shape(FullscreenControlOptionsInterface),
  imageDateControl: _propTypes.default.bool,
  linksControl: _propTypes.default.bool,
  motionTracking: _propTypes.default.bool,
  motionTrackingControl: _propTypes.default.bool,
  motionTrackingControlOptions: _propTypes.default.shape(MotionTrackingControlOptionsInterface),
  panControl: _propTypes.default.bool,
  panControlOptions: _propTypes.default.shape(PanControlOptionsInterface),
  pano: _propTypes.default.string,
  position: _propTypes.default.oneOfType([LatLngPropTypes, LatLngLiteralPropTypes]),
  pov: _propTypes.default.shape(StreetViewPovInterface),
  scrollwheel: _propTypes.default.bool,
  showRoadLabels: _propTypes.default.bool,
  visible: _propTypes.default.bool,
  zoom: _propTypes.default.number,
  zoomControl: _propTypes.default.bool,
  zoomControlOptions: _propTypes.default.shape(ZoomControlOptionsInterface)
};
exports.StreetViewPanoramaOptionsInterface = StreetViewPanoramaOptionsInterface;
var StreetViewPanoramaClassPropTypes = {
  options: _propTypes.default.shape(StreetViewPanoramaOptionsInterface),
  onCloseclick: _propTypes.default.func,
  onPanoChanged: _propTypes.default.func,
  onPositionChanged: _propTypes.default.func,
  onPovChanged: _propTypes.default.func,
  onResize: _propTypes.default.func,
  onStatusChanged: _propTypes.default.func,
  onVisibleChanged: _propTypes.default.func,
  onZoomChanged: _propTypes.default.func,
  getLinks: _propTypes.default.func.isRequired,
  getLocation: _propTypes.default.func.isRequired,
  getMotionTracking: _propTypes.default.func.isRequired,
  getPano: _propTypes.default.func.isRequired,
  getPhotographerPov: _propTypes.default.func.isRequired,
  getPosition: _propTypes.default.func.isRequired,
  getPov: _propTypes.default.func.isRequired,
  getStatus: _propTypes.default.func.isRequired,
  getVisible: _propTypes.default.func.isRequired,
  getZoom: _propTypes.default.func.isRequired,
  registerPanoProvider: _propTypes.default.func.isRequired,
  setLinks: _propTypes.default.func.isRequired,
  setMotionTracking: _propTypes.default.func.isRequired,
  setOptions: _propTypes.default.func.isRequired,
  setPano: _propTypes.default.func.isRequired,
  setPosition: _propTypes.default.func.isRequired,
  setPov: _propTypes.default.func.isRequired,
  setVisible: _propTypes.default.func.isRequired,
  setZoom: _propTypes.default.func.isRequired,
  controls: _propTypes.default.arrayOf(MVCArrayPropTypes).isRequired
};
exports.StreetViewPanoramaClassPropTypes = StreetViewPanoramaClassPropTypes;
var GoogleMapOptionsInterface = {
  backgroundColor: _propTypes.default.string.isRequired,
  center: _propTypes.default.oneOfType([LatLngPropTypes, LatLngLiteralPropTypes]).isRequired,
  clickableIcons: _propTypes.default.bool.isRequired,
  disableDefaultUI: _propTypes.default.bool.isRequired,
  disableDoubleClickZoom: _propTypes.default.bool.isRequired,
  draggable: _propTypes.default.bool.isRequired,
  draggableCursor: _propTypes.default.string.isRequired,
  draggingCursor: _propTypes.default.string.isRequired,
  fullscreenControl: _propTypes.default.bool.isRequired,
  fullscreenControlOptions: _propTypes.default.shape(FullscreenControlOptionsInterface).isRequired,
  gestureHandling: _propTypes.default.string.isRequired,
  heading: _propTypes.default.number.isRequired,
  keyboardShortcuts: _propTypes.default.bool.isRequired,
  mapTypeControl: _propTypes.default.bool.isRequired,
  mapTypeControlOptions: _propTypes.default.shape(MapTypeControlOptionsInterface).isRequired,
  mapTypeId: _propTypes.default.string.isRequired,
  maxZoom: _propTypes.default.number.isRequired,
  minZoom: _propTypes.default.number.isRequired,
  noClear: _propTypes.default.bool.isRequired,
  panControl: _propTypes.default.bool.isRequired,
  panControlOptions: _propTypes.default.shape(PanControlOptionsInterface).isRequired,
  rotateControl: _propTypes.default.bool.isRequired,
  rotateControlOptions: _propTypes.default.shape(RotateControlOptionsInterface).isRequired,
  scaleControl: _propTypes.default.bool.isRequired,
  scaleControlOptions: _propTypes.default.shape(ScaleControlOptionsInterface).isRequired,
  scrollwheel: _propTypes.default.bool.isRequired,
  streetView: _propTypes.default.shape(StreetViewPanoramaClassPropTypes).isRequired,
  streetViewControl: _propTypes.default.bool.isRequired,
  streetViewControlOptions: _propTypes.default.shape(StreetViewControlOptionsInterface).isRequired,
  styles: _propTypes.default.arrayOf(_propTypes.default.shape(MapTypeStyleInterface)).isRequired,
  tilt: _propTypes.default.number.isRequired,
  zoom: _propTypes.default.number.isRequired,
  zoomControl: _propTypes.default.bool.isRequired,
  zoomControlOptions: _propTypes.default.shape(ZoomControlOptionsInterface).isRequired
};
exports.GoogleMapOptionsInterface = GoogleMapOptionsInterface;
var GoogleMapPropTypes = {
  children: _propTypes.default.node,
  options: _propTypes.default.shape(GoogleMapOptionsInterface),
  defaultExtraMapTypes: _propTypes.default.arrayOf(_propTypes.default.arrayOf(_propTypes.default.any)),
  defaultCenter: _propTypes.default.any,
  defaultClickableIcons: _propTypes.default.bool,
  defaultHeading: _propTypes.default.number,
  defaultMapTypeId: _propTypes.default.any,
  defaultOptions: _propTypes.default.any,
  defaultStreetView: _propTypes.default.any,
  defaultTilt: _propTypes.default.number,
  defaultZoom: _propTypes.default.number,
  center: _propTypes.default.any,
  clickableIcons: _propTypes.default.bool,
  heading: _propTypes.default.number,
  mapTypeId: _propTypes.default.any,
  streetView: _propTypes.default.any,
  tilt: _propTypes.default.number,
  zoom: _propTypes.default.number,
  onDblClick: _propTypes.default.func,
  onDragEnd: _propTypes.default.func,
  onDragStart: _propTypes.default.func,
  onMapTypeIdChanged: _propTypes.default.func,
  onMouseMove: _propTypes.default.func,
  onMouseOut: _propTypes.default.func,
  onMouseOver: _propTypes.default.func,
  onRightClick: _propTypes.default.func,
  onTilesLoaded: _propTypes.default.func,
  onBoundsChanged: _propTypes.default.func,
  onCenterChanged: _propTypes.default.func,
  onClick: _propTypes.default.func,
  onDrag: _propTypes.default.func,
  onHeadingChanged: _propTypes.default.func,
  onIdle: _propTypes.default.func,
  onProjectionChanged: _propTypes.default.func,
  onResize: _propTypes.default.func,
  onTiltChanged: _propTypes.default.func,
  onZoomChanged: _propTypes.default.func
};
exports.GoogleMapPropTypes = GoogleMapPropTypes;

var DataClassPropTypes = _propTypes.default.shape({
  add: _propTypes.default.func.isRequired,
  addGeoJson: _propTypes.default.func.isRequired,
  contains: _propTypes.default.func.isRequired,
  forEach: _propTypes.default.func.isRequired,
  getControlPosition: _propTypes.default.func.isRequired,
  getControls: _propTypes.default.func.isRequired,
  getDrawingMode: _propTypes.default.func.isRequired,
  getFeatureById: _propTypes.default.func.isRequired,
  getMap: _propTypes.default.func.isRequired,
  getStyle: _propTypes.default.func.isRequired,
  loadGeoJson: _propTypes.default.func.isRequired,
  overrideStyle: _propTypes.default.func.isRequired,
  remove: _propTypes.default.func.isRequired,
  revertStyle: _propTypes.default.func.isRequired,
  setControlPosition: _propTypes.default.func.isRequired,
  setControls: _propTypes.default.func.isRequired,
  setDrawingMode: _propTypes.default.func.isRequired,
  setMap: _propTypes.default.func.isRequired,
  setStyle: _propTypes.default.func.isRequired,
  toGeoJson: _propTypes.default.func.isRequired
}).isRequired;

exports.DataClassPropTypes = DataClassPropTypes;

var MapClassPropTypes = _propTypes.default.shape({
  fitBounds: _propTypes.default.func.isRequired,
  getBounds: _propTypes.default.func.isRequired,
  getCenter: _propTypes.default.func.isRequired,
  getClicableIcons: _propTypes.default.func.isRequired,
  getDiv: _propTypes.default.func.isRequired,
  getHeading: _propTypes.default.func.isRequired,
  getMapTypeId: _propTypes.default.func.isRequired,
  getProjection: _propTypes.default.func.isRequired,
  getTilt: _propTypes.default.func.isRequired,
  getZoom: _propTypes.default.func.isRequired,
  panBy: _propTypes.default.func.isRequired,
  panTo: _propTypes.default.func.isRequired,
  panToBounds: _propTypes.default.func.isRequired,
  setCenter: _propTypes.default.func.isRequired,
  setClickableIcons: _propTypes.default.func.isRequired,
  setHeading: _propTypes.default.func.isRequired,
  setMapTypeId: _propTypes.default.func.isRequired,
  setOptions: _propTypes.default.func.isRequired,
  setStreetView: _propTypes.default.func.isRequired,
  setTilt: _propTypes.default.func.isRequired,
  setZoom: _propTypes.default.func.isRequired,
  controls: _propTypes.default.arrayOf(MVCArrayPropTypes).isRequired,
  data: DataClassPropTypes,
  mapTypes: MapTypeRegistryPropTypes,
  overlayMapTypes: MVCArrayPropTypes
});

exports.MapClassPropTypes = MapClassPropTypes;
var TrafficLayerOptionsInterface = {
  autoRefresh: _propTypes.default.bool.isRequired,
  map: MapClassPropTypes.isRequired
};
exports.TrafficLayerOptionsInterface = TrafficLayerOptionsInterface;
var TrafficLayerPropTypes = {
  defaultOptions: _propTypes.default.any,
  options: _propTypes.default.shape(TrafficLayerOptionsInterface)
};
exports.TrafficLayerPropTypes = TrafficLayerPropTypes;

var PathPropTypes = _propTypes.default.oneOfType([MVCArrayPropTypes, _propTypes.default.arrayOf(LatLngPropTypes), _propTypes.default.arrayOf(LatLngLiteralPropTypes)]);

exports.PathPropTypes = PathPropTypes;
var MarkerOptionsInterface = {
  anchorPoint: PointPropTypes.isRequired,
  animation: _propTypes.default.string.isRequired,
  // Animation constants
  clickable: _propTypes.default.bool.isRequired,
  crossOnDrag: _propTypes.default.bool.isRequired,
  cursor: _propTypes.default.string.isRequired,
  draggable: _propTypes.default.bool.isRequired,
  icon: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.shape(IconInterface)]).isRequired
};
exports.MarkerOptionsInterface = MarkerOptionsInterface;
var MarkerPropTypes = {
  children: _propTypes.default.node,
  options: _propTypes.default.shape(MarkerOptionsInterface),
  noRedraw: _propTypes.default.func,
  defaultAnimation: _propTypes.default.any,
  defaultClickable: _propTypes.default.bool,
  defaultCursor: _propTypes.default.string,
  defaultDraggable: _propTypes.default.bool,
  defaultIcon: _propTypes.default.any,
  defaultLabel: _propTypes.default.any,
  defaultOpacity: _propTypes.default.number,
  defaultOptions: _propTypes.default.any,
  defaultPlace: _propTypes.default.any,
  defaultPosition: _propTypes.default.any,
  defaultShape: _propTypes.default.any,
  defaultTitle: _propTypes.default.string,
  defaultVisible: _propTypes.default.bool,
  defaultZIndex: _propTypes.default.number,
  animation: _propTypes.default.any,
  clickable: _propTypes.default.bool,
  cursor: _propTypes.default.string,
  draggable: _propTypes.default.bool,
  icon: _propTypes.default.any,
  label: _propTypes.default.any,
  opacity: _propTypes.default.number,
  position: _propTypes.default.oneOfType([LatLngPropTypes, LatLngLiteralPropTypes]).isRequired,
  shape: _propTypes.default.any,
  title: _propTypes.default.string,
  visible: _propTypes.default.bool,
  zIndex: _propTypes.default.number,
  onDblClick: _propTypes.default.func,
  onDragEnd: _propTypes.default.func,
  onDragStart: _propTypes.default.func,
  onMouseDown: _propTypes.default.func,
  onMouseOut: _propTypes.default.func,
  onMouseOver: _propTypes.default.func,
  onMouseUp: _propTypes.default.func,
  onRightClick: _propTypes.default.func,
  onAnimationChanged: _propTypes.default.func,
  onClick: _propTypes.default.func,
  onClickableChanged: _propTypes.default.func,
  onCursorChanged: _propTypes.default.func,
  onDrag: _propTypes.default.func,
  onDraggableChanged: _propTypes.default.func,
  onFlatChanged: _propTypes.default.func,
  onIconChanged: _propTypes.default.func,
  onPositionChanged: _propTypes.default.func,
  onShapeChanged: _propTypes.default.func,
  onTitleChanged: _propTypes.default.func,
  onVisibleChanged: _propTypes.default.func,
  onZindexChanged: _propTypes.default.func
};
exports.MarkerPropTypes = MarkerPropTypes;
var InfoWindowOptionsInterface = {
  content: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.node]).isRequired,
  disableAutoPan: _propTypes.default.bool.isRequired,
  maxWidth: _propTypes.default.number.isRequired,
  pixelOffset: SizePropTypes.isRequired,
  position: _propTypes.default.oneOfType([LatLngPropTypes, LatLngLiteralPropTypes]).isRequired,
  zIndex: _propTypes.default.number.isRequired
};
exports.InfoWindowOptionsInterface = InfoWindowOptionsInterface;
var InfoWindowPropTypes = {
  children: _propTypes.default.node,
  options: _propTypes.default.shape(InfoWindowOptionsInterface),
  defaultOptions: _propTypes.default.any,
  defaultPosition: _propTypes.default.any,
  defaultZIndex: _propTypes.default.number,
  position: _propTypes.default.oneOfType([LatLngPropTypes, LatLngLiteralPropTypes]).isRequired,
  zIndex: _propTypes.default.number,
  onCloseClick: _propTypes.default.func,
  onDomReady: _propTypes.default.func,
  onContentChanged: _propTypes.default.func,
  onPositionChanged: _propTypes.default.func,
  onZindexChanged: _propTypes.default.func
};
exports.InfoWindowPropTypes = InfoWindowPropTypes;
var PolylineOptionsInterface = {
  clickable: _propTypes.default.bool.isRequired,
  draggable: _propTypes.default.bool.isRequired,
  editable: _propTypes.default.bool.isRequired,
  geodesic: _propTypes.default.bool.isRequired,
  icons: _propTypes.default.arrayOf(IconSequenceInterface).isRequired,
  map: MapClassPropTypes.isRequired,
  path: PathPropTypes.isRequired,
  strokeColor: _propTypes.default.string.isRequired,
  strokeOpacity: _propTypes.default.number.isRequired,
  strokeWeight: _propTypes.default.number.isRequired,
  visible: _propTypes.default.bool.isRequired,
  zIndex: _propTypes.default.number.isRequired
};
exports.PolylineOptionsInterface = PolylineOptionsInterface;
var PolylinePropTypes = {
  options: _propTypes.default.shape(PolylineOptionsInterface),
  defaultDraggable: _propTypes.default.bool,
  defaultEditable: _propTypes.default.bool,
  defaultOptions: _propTypes.default.object,
  defaultPath: _propTypes.default.any,
  defaultVisible: _propTypes.default.bool,
  draggable: _propTypes.default.bool,
  editable: _propTypes.default.bool,
  path: PathPropTypes,
  visible: _propTypes.default.bool,
  onDblClick: _propTypes.default.func,
  onDragEnd: _propTypes.default.func,
  onDragStart: _propTypes.default.func,
  onMouseDown: _propTypes.default.func,
  onMouseMove: _propTypes.default.func,
  onMouseOut: _propTypes.default.func,
  onMouseOver: _propTypes.default.func,
  onMouseUp: _propTypes.default.func,
  onRightClick: _propTypes.default.func,
  onClick: _propTypes.default.func,
  onDrag: _propTypes.default.func
};
exports.PolylinePropTypes = PolylinePropTypes;
var PolygonOptionsInterface = {
  clickable: _propTypes.default.bool.isRequired,
  draggable: _propTypes.default.bool.isRequired,
  editable: _propTypes.default.bool.isRequired,
  fillColor: _propTypes.default.string.isRequired,
  fillOpacity: _propTypes.default.number.isRequired,
  geodesic: _propTypes.default.bool.isRequired,
  map: MapClassPropTypes.isRequired,
  paths: _propTypes.default.oneOfType([MVCArrayPropTypes, _propTypes.default.arrayOf(_propTypes.default.arrayOf(_propTypes.default.oneOfType([LatLngPropTypes, LatLngLiteralPropTypes]))), _propTypes.default.arrayOf(_propTypes.default.oneOfType([LatLngPropTypes, LatLngLiteralPropTypes]))]).isRequired,
  strokeColor: _propTypes.default.string.isRequired,
  strokeOpacity: _propTypes.default.number.isRequired,
  strokePosition: _propTypes.default.string.isRequired,
  // StrokePosition constants
  strokeWeight: _propTypes.default.number.isRequired,
  visible: _propTypes.default.bool.isRequired,
  zIndex: _propTypes.default.number.isRequired
};
exports.PolygonOptionsInterface = PolygonOptionsInterface;
var PolygonPropTypes = {
  options: _propTypes.default.shape(PolygonOptionsInterface),
  defaultDraggable: _propTypes.default.bool,
  defaultEditable: _propTypes.default.bool,
  defaultOptions: _propTypes.default.any,
  defaultPath: _propTypes.default.any,
  defaultPaths: _propTypes.default.any,
  defaultVisible: _propTypes.default.bool,
  draggable: _propTypes.default.bool,
  editable: _propTypes.default.bool,
  path: _propTypes.default.any,
  paths: _propTypes.default.any,
  visible: _propTypes.default.bool,
  onDblClick: _propTypes.default.func,
  onDragEnd: _propTypes.default.func,
  onDragStart: _propTypes.default.func,
  onMouseDown: _propTypes.default.func,
  onMouseMove: _propTypes.default.func,
  onMouseOut: _propTypes.default.func,
  onMouseOver: _propTypes.default.func,
  onMouseUp: _propTypes.default.func,
  onRightClick: _propTypes.default.func,
  onClick: _propTypes.default.func,
  onDrag: _propTypes.default.func
};
exports.PolygonPropTypes = PolygonPropTypes;
var LatLngBoundsPropTypes = {
  contains: _propTypes.default.func.isRequired,
  equals: _propTypes.default.func.isRequired,
  extend: _propTypes.default.func.isRequired,
  getCenter: _propTypes.default.func.isRequired,
  getNorthEast: _propTypes.default.func.isRequired,
  getSouthWest: _propTypes.default.func.isRequired,
  intersects: _propTypes.default.func.isRequired,
  isEmpty: _propTypes.default.func.isRequired,
  toJSON: _propTypes.default.func.isRequired,
  toSpan: _propTypes.default.func.isRequired,
  toString: _propTypes.default.func.isRequired,
  toUrlValue: _propTypes.default.func.isRequired,
  union: _propTypes.default.func.isRequired
};
exports.LatLngBoundsPropTypes = LatLngBoundsPropTypes;
var LatLngBoundsLiteralInterface = {
  east: _propTypes.default.number.isRequired,
  north: _propTypes.default.number.isRequired,
  south: _propTypes.default.number.isRequired,
  west: _propTypes.default.number.isRequired
};
exports.LatLngBoundsLiteralInterface = LatLngBoundsLiteralInterface;
var RectangleOptionsInterface = {
  bounds: _propTypes.default.oneOfType([LatLngBoundsPropTypes, _propTypes.default.shape(LatLngBoundsLiteralInterface)]).isRequired,
  clickable: _propTypes.default.bool.isRequired,
  draggable: _propTypes.default.bool.isRequired,
  editable: _propTypes.default.bool.isRequired,
  fillColor: _propTypes.default.string.isRequired,
  fillOpacity: _propTypes.default.number.isRequired,
  map: MapClassPropTypes,
  strokeColor: _propTypes.default.string.isRequired,
  strokeOpacity: _propTypes.default.number.isRequired,
  strokePosition: _propTypes.default.string.isRequired,
  // StrokePosition constants
  strokeWeight: _propTypes.default.number.isRequired,
  visible: _propTypes.default.bool.isRequired,
  zIndex: _propTypes.default.number.isRequired
};
exports.RectangleOptionsInterface = RectangleOptionsInterface;
var RectanglePropTypes = {
  options: _propTypes.default.shape(RectangleOptionsInterface),
  defaultBounds: _propTypes.default.any,
  defaultDraggable: _propTypes.default.bool,
  defaultEditable: _propTypes.default.bool,
  defaultOptions: _propTypes.default.any,
  defaultVisible: _propTypes.default.bool,
  bounds: _propTypes.default.any,
  draggable: _propTypes.default.bool,
  editable: _propTypes.default.bool,
  visible: _propTypes.default.bool,
  onDblClick: _propTypes.default.func,
  onDragEnd: _propTypes.default.func,
  onDragStart: _propTypes.default.func,
  onMouseDown: _propTypes.default.func,
  onMouseMove: _propTypes.default.func,
  onMouseOut: _propTypes.default.func,
  onMouseOver: _propTypes.default.func,
  onMouseUp: _propTypes.default.func,
  onRightClick: _propTypes.default.func,
  onBoundsChanged: _propTypes.default.func,
  onClick: _propTypes.default.func,
  onDrag: _propTypes.default.func
};
exports.RectanglePropTypes = RectanglePropTypes;
var CircleOptionsInterface = {
  center: _propTypes.default.oneOfType([LatLngPropTypes, LatLngLiteralPropTypes]).isRequired,
  clickable: _propTypes.default.bool.isRequired,
  draggable: _propTypes.default.bool.isRequired,
  editable: _propTypes.default.bool.isRequired,
  fillColor: _propTypes.default.string.isRequired,
  fillOpacity: _propTypes.default.number.isRequired,
  map: MapClassPropTypes.isRequired,
  radius: _propTypes.default.number.isRequired,
  strokeColor: _propTypes.default.string.isRequired,
  strokeOpacity: _propTypes.default.number.isRequired,
  strokePosition: _propTypes.default.string.isRequired,
  // StrokePosition constants
  strokeWeight: _propTypes.default.number.isRequired,
  visible: _propTypes.default.bool.isRequired,
  zIndex: _propTypes.default.number.isRequired
};
exports.CircleOptionsInterface = CircleOptionsInterface;
var CirclePropTypes = {
  options: _propTypes.default.shape(CircleOptionsInterface),
  defaultCenter: _propTypes.default.any,
  defaultDraggable: _propTypes.default.bool,
  defaultEditable: _propTypes.default.bool,
  defaultOptions: _propTypes.default.object,
  defaultRadius: _propTypes.default.number,
  defaultVisible: _propTypes.default.bool,
  center: _propTypes.default.oneOfType([LatLngPropTypes, LatLngLiteralPropTypes]),
  draggable: _propTypes.default.bool,
  editable: _propTypes.default.bool,
  radius: _propTypes.default.number,
  visible: _propTypes.default.bool,
  onDblClick: _propTypes.default.func,
  onDragEnd: _propTypes.default.func,
  onDragStart: _propTypes.default.func,
  onMouseDown: _propTypes.default.func,
  onMouseMove: _propTypes.default.func,
  onMouseOut: _propTypes.default.func,
  onMouseOver: _propTypes.default.func,
  onMouseUp: _propTypes.default.func,
  onRightClick: _propTypes.default.func,
  onCenterChanged: _propTypes.default.func,
  onClick: _propTypes.default.func,
  onDrag: _propTypes.default.func,
  onRadiusChanged: _propTypes.default.func
};
exports.CirclePropTypes = CirclePropTypes;
var MarkerShapeInterface = {
  coords: _propTypes.default.arrayOf(_propTypes.default.number),
  type: _propTypes.default.string
};
exports.MarkerShapeInterface = MarkerShapeInterface;
var DataStyleOptionsInterface = {
  clickable: _propTypes.default.bool.isRequired,
  cursor: _propTypes.default.string.isRequired,
  draggable: _propTypes.default.bool.isRequired,
  editable: _propTypes.default.bool.isRequired,
  fillColor: _propTypes.default.string.isRequired,
  fillOpacity: _propTypes.default.number.isRequired,
  icon: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.shape(IconInterface), _propTypes.default.shape(SymbolInterface)]).isRequired,
  shape: _propTypes.default.shape(MarkerShapeInterface).isRequired,
  strokeColor: _propTypes.default.string.isRequired,
  strokeOpacity: _propTypes.default.number.isRequired,
  strokeWeight: _propTypes.default.number.isRequired,
  title: _propTypes.default.string.isRequired,
  visible: _propTypes.default.bool.isRequired,
  zIndex: _propTypes.default.number.isRequired
};
exports.DataStyleOptionsInterface = DataStyleOptionsInterface;
var DataOptionsInterface = {
  controlPosition: _propTypes.default.object.isRequired,
  // ControlPosition constants
  controls: _propTypes.default.arrayOf(_propTypes.default.string).isRequired,
  drawingMode: _propTypes.default.string.isRequired,
  featureFactory: _propTypes.default.func.isRequired,
  map: MapClassPropTypes.isRequired,
  style: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.shape(DataStyleOptionsInterface)]).isRequired
};
exports.DataOptionsInterface = DataOptionsInterface;
var DataPropTypes = {
  options: _propTypes.default.shape(DataOptionsInterface),
  onAddFeature: _propTypes.default.func,
  onClick: _propTypes.default.func,
  onDblClick: _propTypes.default.func,
  onMouseDown: _propTypes.default.func,
  onMouseOut: _propTypes.default.func,
  onMouseOver: _propTypes.default.func,
  onMouseUp: _propTypes.default.func,
  onRemoveFeature: _propTypes.default.func,
  onRemoveProperty: _propTypes.default.func,
  onRightClick: _propTypes.default.func,
  onSetGeometry: _propTypes.default.func,
  onSetProperty: _propTypes.default.func
};
exports.DataPropTypes = DataPropTypes;
var OverlayViewPropTypes = {
  mapPaneName: _propTypes.default.string,
  children: _propTypes.default.node,
  position: _propTypes.default.object,
  bounds: _propTypes.default.object,
  getPixelPositionOffset: _propTypes.default.func
};
exports.OverlayViewPropTypes = OverlayViewPropTypes;
var KmlLayerOptionsInterface = {
  clickable: _propTypes.default.bool.isRequired,
  map: MapClassPropTypes.isRequired,
  preserveViewport: _propTypes.default.bool.isRequired,
  screenOverlays: _propTypes.default.bool.isRequired,
  suppressInfoWindows: _propTypes.default.bool.isRequired,
  url: _propTypes.default.string.isRequired,
  zIndex: _propTypes.default.number.isRequired
};
exports.KmlLayerOptionsInterface = KmlLayerOptionsInterface;
var KmlLayerPropTypes = {
  options: _propTypes.default.shape(KmlLayerOptionsInterface),
  defaultOptions: _propTypes.default.any,
  defaultUrl: _propTypes.default.string,
  defaultZIndex: _propTypes.default.number,
  url: _propTypes.default.string,
  zIndex: _propTypes.default.number,
  onDefaultViewportChanged: _propTypes.default.func,
  onClick: _propTypes.default.func,
  onStatusChanged: _propTypes.default.func
};
exports.KmlLayerPropTypes = KmlLayerPropTypes;
var FusionTablesHeatmapInterface = {
  enabled: _propTypes.default.bool.isRequired
};
exports.FusionTablesHeatmapInterface = FusionTablesHeatmapInterface;
var FusionTablesQueryInterface = {
  from: _propTypes.default.string.isRequired,
  limit: _propTypes.default.number.isRequired,
  offset: _propTypes.default.number.isRequired,
  orderBy: _propTypes.default.string.isRequired,
  select: _propTypes.default.string.isRequired,
  where: _propTypes.default.string.isRequired
};
exports.FusionTablesQueryInterface = FusionTablesQueryInterface;
var FusionTablesMarkerOptionsInterface = {
  iconName: _propTypes.default.string.isRequired
};
exports.FusionTablesMarkerOptionsInterface = FusionTablesMarkerOptionsInterface;
var FusionTablesPolygonOptionsInterface = {
  fillColor: _propTypes.default.string.isRequired,
  fillOpacity: _propTypes.default.number.isRequired,
  strokeColor: _propTypes.default.string.isRequired,
  strokeOpacity: _propTypes.default.number.isRequired,
  strokeWeight: _propTypes.default.number.isRequired
};
exports.FusionTablesPolygonOptionsInterface = FusionTablesPolygonOptionsInterface;
var FusionTablesPolylineOptionsInterface = {
  strokeColor: _propTypes.default.string.isRequired,
  strokeOpacity: _propTypes.default.number.isRequired,
  strokeWeight: _propTypes.default.number.isRequired
};
exports.FusionTablesPolylineOptionsInterface = FusionTablesPolylineOptionsInterface;
var FusionTablesStyleInterface = {
  markerOptions: _propTypes.default.shape(FusionTablesMarkerOptionsInterface).isRequired,
  polygonOptions: _propTypes.default.shape(FusionTablesPolygonOptionsInterface).isRequired,
  polylineOptions: _propTypes.default.shape(FusionTablesPolylineOptionsInterface).isRequired,
  where: _propTypes.default.string.isRequired
};
exports.FusionTablesStyleInterface = FusionTablesStyleInterface;
var FusionTablesLayerOptionsInterface = {
  clickable: _propTypes.default.bool.isRequired,
  heatmap: _propTypes.default.shape(FusionTablesHeatmapInterface).isRequired,
  map: MapClassPropTypes.isRequired,
  query: _propTypes.default.shape(FusionTablesQueryInterface).isRequired,
  styles: _propTypes.default.arrayOf(FusionTablesStyleInterface).isRequired,
  suppressInfoWindows: _propTypes.default.bool.isRequired
};
exports.FusionTablesLayerOptionsInterface = FusionTablesLayerOptionsInterface;
var FusionTablesLayerPropTypes = {
  options: _propTypes.default.shape(FusionTablesLayerOptionsInterface),
  defaultOptions: _propTypes.default.any,
  onClick: _propTypes.default.func
};
exports.FusionTablesLayerPropTypes = FusionTablesLayerPropTypes;
var ImageMapTypeOptionsInterface = {
  alt: _propTypes.default.string.isRequired,
  getTileUrl: _propTypes.default.func.isRequired,
  maxZoom: _propTypes.default.number.isRequired,
  minZoom: _propTypes.default.number.isRequired,
  name: _propTypes.default.string.isRequired,
  opacity: _propTypes.default.number.isRequired,
  tileSize: SizePropTypes.isRequired
};
exports.ImageMapTypeOptionsInterface = ImageMapTypeOptionsInterface;
var ImageMapTypePropTypes = {
  options: _propTypes.default.shape(ImageMapTypeOptionsInterface),
  onTilesLoaded: _propTypes.default.func
};
exports.ImageMapTypePropTypes = ImageMapTypePropTypes;
var GroundOverlayOptionsInterface = {
  clickable: _propTypes.default.bool.isRequired,
  map: MapClassPropTypes.isRequired,
  opacity: _propTypes.default.number.isRequired
};
exports.GroundOverlayOptionsInterface = GroundOverlayOptionsInterface;
var GroundOverlayPropTypes = {
  options: _propTypes.default.shape(GroundOverlayOptionsInterface),
  defaultUrl: _propTypes.default.string.isRequired,
  defaultBounds: _propTypes.default.object.isRequired,
  url: _propTypes.default.string,
  bounds: _propTypes.default.object,
  defaultOpacity: _propTypes.default.number,
  opacity: _propTypes.default.number,
  onDblClick: _propTypes.default.func,
  onClick: _propTypes.default.func
};
exports.GroundOverlayPropTypes = GroundOverlayPropTypes;
var HeatmapLayerOptionsInterface = {
  data: MVCArrayPropTypes.isRequired,
  dissipating: _propTypes.default.bool.isRequired,
  gradient: _propTypes.default.arrayOf(_propTypes.default.string).isRequired,
  map: MapClassPropTypes.isRequired,
  maxIntensity: _propTypes.default.number.isRequired,
  opacity: _propTypes.default.number.isRequired,
  radius: _propTypes.default.number.isRequired
};
exports.HeatmapLayerOptionsInterface = HeatmapLayerOptionsInterface;
var HeatmapLayerPropTypes = {
  options: _propTypes.default.shape(HeatmapLayerOptionsInterface),
  defaultOptions: _propTypes.default.any,
  defaultData: _propTypes.default.any,
  data: _propTypes.default.any
};
exports.HeatmapLayerPropTypes = HeatmapLayerPropTypes;
var StreetViewPanoramaPropTypes = {
  options: _propTypes.default.shape(StreetViewPanoramaOptionsInterface),
  children: _propTypes.default.node,
  defaultLinks: _propTypes.default.any,
  defaultMotionTracking: _propTypes.default.bool,
  defaultOptions: _propTypes.default.any,
  defaultPano: _propTypes.default.string,
  defaultPosition: _propTypes.default.any,
  defaultPov: _propTypes.default.any,
  defaultVisible: _propTypes.default.bool,
  defaultZoom: _propTypes.default.number,
  links: _propTypes.default.any,
  motionTracking: _propTypes.default.bool,
  pano: _propTypes.default.string,
  position: _propTypes.default.any,
  pov: _propTypes.default.any,
  visible: _propTypes.default.bool,
  zoom: _propTypes.default.number,
  onCloseClick: _propTypes.default.func,
  onPanoChanged: _propTypes.default.func,
  onPositionChanged: _propTypes.default.func,
  onPovChanged: _propTypes.default.func,
  onResize: _propTypes.default.func,
  onStatusChanged: _propTypes.default.func,
  onVisibleChanged: _propTypes.default.func,
  onZoomChanged: _propTypes.default.func
};
exports.StreetViewPanoramaPropTypes = StreetViewPanoramaPropTypes;
var ComponentRestrictionsInterface = {
  country: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.arrayOf(_propTypes.default.string)]).isRequired
};
exports.ComponentRestrictionsInterface = ComponentRestrictionsInterface;
var AutocompleteOptionsInterface = {
  bounds: _propTypes.default.oneOfType([LatLngBoundsPropTypes, LatLngBoundsLiteralInterface]).isRequired,
  componentRestrictions: _propTypes.default.shape(ComponentRestrictionsInterface).isRequired,
  fields: _propTypes.default.arrayOf(_propTypes.default.string).isRequired,
  placeIdOnly: _propTypes.default.bool.isRequired,
  strictBounds: _propTypes.default.bool.isRequired,
  types: _propTypes.default.arrayOf(_propTypes.default.string).isRequired
};
exports.AutocompleteOptionsInterface = AutocompleteOptionsInterface;
var AutocompletePropTypes = {
  inputField: _propTypes.default.node.isRequired,
  options: _propTypes.default.shape(AutocompleteOptionsInterface),
  onPlaceChanged: _propTypes.default.func
};
exports.AutocompletePropTypes = AutocompletePropTypes;
var SearchBoxOptionsInterface = {
  bounds: _propTypes.default.oneOfType([LatLngBoundsPropTypes, LatLngBoundsLiteralInterface]).isRequired
};
exports.SearchBoxOptionsInterface = SearchBoxOptionsInterface;
var SearchBoxPropTypes = {
  options: _propTypes.default.shape(SearchBoxOptionsInterface),
  children: _propTypes.default.node,
  controlPosition: _propTypes.default.number,
  defaultBounds: _propTypes.default.any,
  bounds: _propTypes.default.any,
  onPlacesChanged: _propTypes.default.func
};
exports.SearchBoxPropTypes = SearchBoxPropTypes;
var TimeInterface = {
  text: _propTypes.default.string.isRequired,
  time_zone: _propTypes.default.string.isRequired,
  value: _propTypes.default.string.isRequired
};
exports.TimeInterface = TimeInterface;
var DistanceInterface = {
  text: _propTypes.default.string.isRequired,
  value: _propTypes.default.number.isRequired
};
exports.DistanceInterface = DistanceInterface;
var DurationInterface = {
  text: _propTypes.default.string.isRequired,
  value: _propTypes.default.number.isRequired
};
exports.DurationInterface = DurationInterface;
var TransitStopInterface = {
  location: LatLngPropTypes.isRequired,
  name: _propTypes.default.string.isRequired
};
exports.TransitStopInterface = TransitStopInterface;
var TransitAgencyInterface = {
  name: _propTypes.default.string.isRequired,
  phone: _propTypes.default.string.isRequired,
  url: _propTypes.default.string.isRequired
};
exports.TransitAgencyInterface = TransitAgencyInterface;
var TransitVehicleInterface = {
  icon: _propTypes.default.string.isRequired,
  local_icon: _propTypes.default.string.isRequired,
  name: _propTypes.default.string.isRequired,
  type: _propTypes.default.string.isRequired // VehicleType constants

};
exports.TransitVehicleInterface = TransitVehicleInterface;
var TransitLineInterface = {
  agencies: _propTypes.default.arrayOf(_propTypes.default.shape(TransitAgencyInterface)).isRequired,
  color: _propTypes.default.string.isRequired,
  icon: _propTypes.default.string.isRequired,
  name: _propTypes.default.string.isRequired,
  short_name: _propTypes.default.string.isRequired,
  text_color: _propTypes.default.string.isRequired,
  url: _propTypes.default.string.isRequired,
  vehicle: _propTypes.default.shape(TransitVehicleInterface).isRequired
};
exports.TransitLineInterface = TransitLineInterface;
var TransitDetailsInterface = {
  arrival_stop: _propTypes.default.shape(TransitStopInterface).isRequired,
  arrival_time: _propTypes.default.shape(TimeInterface).isRequired,
  departure_stop: _propTypes.default.shape(TransitStopInterface).isRequired,
  departure_time: _propTypes.default.shape(TimeInterface).isRequired,
  headsign: _propTypes.default.string.isRequired,
  headway: _propTypes.default.number.isRequired,
  line: _propTypes.default.shape(TransitLineInterface).isRequired,
  num_stops: _propTypes.default.number.isRequired
};
exports.TransitDetailsInterface = TransitDetailsInterface;
var DirectionsStepInterface = {
  distance: _propTypes.default.shape(DistanceInterface).isRequired,
  duration: _propTypes.default.shape(DurationInterface).isRequired,
  end_location: LatLngPropTypes.isRequired,
  instructions: _propTypes.default.string.isRequired,
  path: _propTypes.default.arrayOf(LatLngPropTypes).isRequired,
  start_location: LatLngPropTypes.isRequired,
  steps: _propTypes.default.arrayOf(_propTypes.default.shape( // eslint-disable-next-line babel/no-invalid-this
  void 0)).isRequired,
  transit: _propTypes.default.shape(TransitDetailsInterface).isRequired,
  travel_mode: _propTypes.default.string.isRequired // TravelMode constants

};
exports.DirectionsStepInterface = DirectionsStepInterface;
var DirectionsLegInterface = {
  arrival_time: _propTypes.default.shape(TimeInterface).isRequired,
  departure_time: _propTypes.default.shape(TimeInterface).isRequired,
  distance: _propTypes.default.shape(DistanceInterface).isRequired,
  duration: _propTypes.default.shape(DurationInterface).isRequired,
  duration_in_traffic: _propTypes.default.shape(DurationInterface).isRequired,
  end_address: _propTypes.default.string.isRequired,
  end_location: LatLngPropTypes.isRequired,
  start_address: _propTypes.default.string.isRequired,
  start_location: LatLngPropTypes.isRequired,
  steps: _propTypes.default.arrayOf(_propTypes.default.shape(DirectionsStepInterface)).isRequired,
  via_waypoints: _propTypes.default.arrayOf(LatLngPropTypes).isRequired
};
exports.DirectionsLegInterface = DirectionsLegInterface;
var TransitFareInterface = {
  currency: _propTypes.default.string.isRequired,
  value: _propTypes.default.number.isRequired
};
exports.TransitFareInterface = TransitFareInterface;
var DirectionsRouteInterface = {
  bounds: LatLngBoundsPropTypes.isRequired,
  copyrights: _propTypes.default.string.isRequired,
  fare: _propTypes.default.shape(TransitFareInterface).isRequired,
  legs: _propTypes.default.arrayOf(_propTypes.default.shape(DirectionsLegInterface)).isRequired,
  overview_path: _propTypes.default.arrayOf(LatLngPropTypes).isRequired,
  overview_polyline: _propTypes.default.string.isRequired,
  warnings: _propTypes.default.arrayOf(_propTypes.default.string).isRequired,
  waypoint_order: _propTypes.default.arrayOf(_propTypes.default.number).isRequired
};
exports.DirectionsRouteInterface = DirectionsRouteInterface;
var DirectionsGeocodedWaypointInterface = {
  partial_match: _propTypes.default.bool.isRequired,
  place_id: _propTypes.default.string.isRequired,
  types: _propTypes.default.arrayOf(_propTypes.default.string).isRequired
};
exports.DirectionsGeocodedWaypointInterface = DirectionsGeocodedWaypointInterface;
var DirectionsResultInterface = {
  geocoded_waypoints: _propTypes.default.arrayOf(_propTypes.default.shape(DirectionsGeocodedWaypointInterface)).isRequired,
  routes: _propTypes.default.arrayOf(_propTypes.default.shape(DirectionsRouteInterface)).isRequired
};
exports.DirectionsResultInterface = DirectionsResultInterface;
var DirectionsRendererOptionsInterface = {
  directions: _propTypes.default.shape(DirectionsResultInterface).isRequired,
  draggable: _propTypes.default.bool.isRequired,
  hideRouteList: _propTypes.default.bool.isRequired,
  infoWindow: InfoWindowPropTypes.isRequired,
  map: MapClassPropTypes.isRequired,
  markerOptions: _propTypes.default.shape(MarkerOptionsInterface).isRequired,
  panel: _propTypes.default.node.isRequired,
  polylineOptions: _propTypes.default.shape(PolylineOptionsInterface).isRequired,
  preserveViewport: _propTypes.default.bool.isRequired,
  routeIndex: _propTypes.default.number.isRequired,
  suppressBicyclingLayer: _propTypes.default.bool.isRequired,
  suppressInfoWindows: _propTypes.default.bool.isRequired,
  suppressMarkers: _propTypes.default.bool.isRequired,
  suppressPolylines: _propTypes.default.bool.isRequired
};
exports.DirectionsRendererOptionsInterface = DirectionsRendererOptionsInterface;
var DirectionsRendererPropTypes = {
  options: _propTypes.default.shape(DirectionsRendererOptionsInterface),
  defaultDirections: _propTypes.default.any,
  defaultOptions: _propTypes.default.any,
  defaultPanel: _propTypes.default.any,
  defaultRouteIndex: _propTypes.default.number,
  directions: _propTypes.default.any,
  panel: _propTypes.default.any,
  routeIndex: _propTypes.default.number,
  onDirectionsChanged: _propTypes.default.func
};
exports.DirectionsRendererPropTypes = DirectionsRendererPropTypes;
var DrawingControlOptionsInterface = {
  drawingModes: _propTypes.default.arrayOf(_propTypes.default.string).isRequired,
  position: _propTypes.default.string.isRequired // ControlPosition constants

};
exports.DrawingControlOptionsInterface = DrawingControlOptionsInterface;
var DrawingManagerOptionsInterface = {
  circleOptions: _propTypes.default.shape(CircleOptionsInterface).isRequired,
  drawingControl: _propTypes.default.bool.isRequired,
  drawingControlOptions: _propTypes.default.shape(DrawingControlOptionsInterface).isRequired,
  drawingMode: _propTypes.default.string.isRequired,
  // OverlayType constants
  map: MapClassPropTypes.isRequired,
  markerOptions: _propTypes.default.shape(MarkerOptionsInterface).isRequired,
  polygonOptions: _propTypes.default.shape(PolygonOptionsInterface).isRequired,
  polylineOptions: _propTypes.default.shape(PolylineOptionsInterface).isRequired,
  rectangleOptions: _propTypes.default.shape(RectangleOptionsInterface).isRequired
};
exports.DrawingManagerOptionsInterface = DrawingManagerOptionsInterface;
var DrawingManagerPropTypes = {
  options: _propTypes.default.shape(DrawingManagerOptionsInterface),
  defaultDrawingMode: _propTypes.default.any,
  defaultOptions: _propTypes.default.any,
  drawingMode: _propTypes.default.any,
  onCircleComplete: _propTypes.default.func,
  onMarkerComplete: _propTypes.default.func,
  onOverlayComplete: _propTypes.default.func,
  onPolygonComplete: _propTypes.default.func,
  onPolylineComplete: _propTypes.default.func,
  onRectangleComplete: _propTypes.default.func
};
exports.DrawingManagerPropTypes = DrawingManagerPropTypes;
var InfoBoxPropTypes = {
  options: _propTypes.default.any,
  children: _propTypes.default.node,
  defaultOptions: _propTypes.default.any,
  defaultPosition: _propTypes.default.any,
  defaultVisible: _propTypes.default.bool,
  defaultZIndex: _propTypes.default.number,
  position: _propTypes.default.any,
  visible: _propTypes.default.bool,
  zIndex: _propTypes.default.number,
  onCloseClick: _propTypes.default.func,
  onDomReady: _propTypes.default.func,
  onContentChanged: _propTypes.default.func,
  onPositionChanged: _propTypes.default.func,
  onZindexChanged: _propTypes.default.func
};
exports.InfoBoxPropTypes = InfoBoxPropTypes;
var MarkerClustererPropTypes = {
  children: _propTypes.default.node,
  defaultAverageCenter: _propTypes.default.bool,
  defaultBatchSizeIE: _propTypes.default.number,
  defaultBatchSize: _propTypes.default.number,
  defaultCalculator: _propTypes.default.func,
  defaultClusterClass: _propTypes.default.string,
  defaultEnableRetinaIcons: _propTypes.default.bool,
  defaultGridSize: _propTypes.default.number,
  defaultIgnoreHidden: _propTypes.default.bool,
  defaultImageExtension: _propTypes.default.string,
  defaultImagePath: _propTypes.default.string,
  defaultImageSizes: _propTypes.default.array,
  defaultMaxZoom: _propTypes.default.number,
  defaultMinimumClusterSize: _propTypes.default.number,
  defaultStyles: _propTypes.default.array,
  defaultTitle: _propTypes.default.string,
  defaultZoomOnClick: _propTypes.default.bool,
  averageCenter: _propTypes.default.bool,
  batchSizeIE: _propTypes.default.number,
  batchSize: _propTypes.default.number,
  calculator: _propTypes.default.func,
  clusterClass: _propTypes.default.string,
  enableRetinaIcons: _propTypes.default.bool,
  gridSize: _propTypes.default.number,
  ignoreHidden: _propTypes.default.bool,
  imageExtension: _propTypes.default.string,
  imagePath: _propTypes.default.string,
  imageSizes: _propTypes.default.array,
  maxZoom: _propTypes.default.number,
  minimumClusterSize: _propTypes.default.number,
  styles: _propTypes.default.array,
  title: _propTypes.default.string,
  zoomOnClick: _propTypes.default.bool,
  onClick: _propTypes.default.func,
  onClusteringBegin: _propTypes.default.func,
  onClusteringEnd: _propTypes.default.func,
  onMouseOut: _propTypes.default.func,
  onMouseOver: _propTypes.default.func
};
exports.MarkerClustererPropTypes = MarkerClustererPropTypes;
var MarkerWithLabelPropTypes = {
  children: _propTypes.default.node,
  labelAnchor: _propTypes.default.object,
  labelClass: _propTypes.default.string,
  labelStyle: _propTypes.default.object,
  labelVisible: _propTypes.default.bool,
  noRedraw: _propTypes.default.bool,
  defaultAnimation: _propTypes.default.any,
  defaultClickable: _propTypes.default.bool,
  defaultCursor: _propTypes.default.string,
  defaultDraggable: _propTypes.default.bool,
  defaultIcon: _propTypes.default.any,
  defaultLabel: _propTypes.default.any,
  defaultOpacity: _propTypes.default.number,
  defaultOptions: _propTypes.default.any,
  defaultPlace: _propTypes.default.any,
  defaultPosition: _propTypes.default.any,
  defaultShape: _propTypes.default.any,
  defaultTitle: _propTypes.default.string,
  defaultVisible: _propTypes.default.bool,
  defaultZIndex: _propTypes.default.number,
  animation: _propTypes.default.any,
  clickable: _propTypes.default.bool,
  cursor: _propTypes.default.string,
  draggable: _propTypes.default.bool,
  icon: _propTypes.default.any,
  label: _propTypes.default.any,
  opacity: _propTypes.default.number,
  options: _propTypes.default.any,
  place: _propTypes.default.any,
  position: _propTypes.default.any,
  shape: _propTypes.default.any,
  title: _propTypes.default.string,
  visible: _propTypes.default.bool,
  zIndex: _propTypes.default.number,
  onDblClick: _propTypes.default.func,
  onDragEnd: _propTypes.default.func,
  onDragStart: _propTypes.default.func,
  onMouseDown: _propTypes.default.func,
  onMouseOut: _propTypes.default.func,
  onMouseOver: _propTypes.default.func,
  onMouseUp: _propTypes.default.func,
  onRightClick: _propTypes.default.func,
  onAnimationChanged: _propTypes.default.func,
  onClick: _propTypes.default.func,
  onClickableChanged: _propTypes.default.func,
  onCursorChanged: _propTypes.default.func,
  onDrag: _propTypes.default.func,
  onDraggableChanged: _propTypes.default.func,
  onFlatChanged: _propTypes.default.func,
  onIconChanged: _propTypes.default.func,
  onPositionChanged: _propTypes.default.func,
  onShapeChanged: _propTypes.default.func,
  onTitleChanged: _propTypes.default.func,
  onVisibleChanged: _propTypes.default.func,
  onZindexChanged: _propTypes.default.func
};
exports.MarkerWithLabelPropTypes = MarkerWithLabelPropTypes;