"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.GoogleMap = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _invariant = _interopRequireDefault(require("invariant"));

var _MapChildHelper = require("../../utils/MapChildHelper");

var _constants = require("../../constants");

var _proptypes = require("../../proptypes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var eventMap = {
  onDblClick: 'dblclick',
  onDragEnd: 'dragend',
  onDragStart: 'dragstart',
  onMapTypeIdChanged: 'maptypeid_changed',
  onMouseMove: 'mousemove',
  onMouseOut: 'mouseout',
  onMouseOver: 'mouseover',
  onRightClick: 'rightclick',
  onTilesLoaded: 'tilesloaded',
  onBoundsChanged: 'bounds_changed',
  onCenterChanged: 'center_changed',
  onClick: 'click',
  onDrag: 'drag',
  onHeadingChanged: 'heading_changed',
  onIdle: 'idle',
  onProjectionChanged: 'projection_changed',
  onResize: 'resize',
  onTiltChanged: 'tilt_changed',
  onZoomChanged: 'zoom_changed'
};
var updaterMap = {
  extraMapTypes: function extraMapTypes(instance, extra) {
    extra.forEach(function (it) {
      var _instance$mapTypes;

      return (_instance$mapTypes = instance.mapTypes).set.apply(_instance$mapTypes, _toConsumableArray(it));
    });
  },
  center: function center(instance, _center) {
    instance.setCenter(_center);
  },
  clickableIcons: function clickableIcons(instance, _clickableIcons) {
    instance.setClickableIcons(_clickableIcons);
  },
  heading: function heading(instance, _heading) {
    instance.setHeading(_heading);
  },
  mapTypeId: function mapTypeId(instance, _mapTypeId) {
    instance.setMapTypeId(_mapTypeId);
  },
  options: function options(instance, _options) {
    instance.setOptions(_options);
  },
  streetView: function streetView(instance, _streetView) {
    instance.setStreetView(_streetView);
  },
  tilt: function tilt(instance, _tilt) {
    instance.setTilt(_tilt);
  },
  zoom: function zoom(instance, _zoom) {
    instance.setZoom(_zoom);
  }
};

var GoogleMap =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(GoogleMap, _PureComponent);

  function GoogleMap(props, context) {
    var _this;

    _classCallCheck(this, GoogleMap);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(GoogleMap).call(this, props, context));
    (0, _invariant.default)(!!context[_constants.MAP], "Did you wrap <GoogleMap> component with withGoogleMap() HOC?");
    (0, _MapChildHelper.construct)(_proptypes.GoogleMapPropTypes, updaterMap, props, context[_constants.MAP]);
    _this.fitBounds = _this.fitBounds.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.getBounds = _this.getBounds.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.getCenter = _this.getCenter.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.getClickableIcons = _this.getClickableIcons.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.getDiv = _this.getDiv.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.getHeading = _this.getHeading.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.getMapTypeId = _this.getMapTypeId.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.getProjection = _this.getProjection.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.getStreetView = _this.getStreetView.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.getTilt = _this.getTilt.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.getZoom = _this.getZoom.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.panBy = _this.panBy.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.panTo = _this.panTo.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.panToBounds = _this.panToBounds.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(GoogleMap, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      (0, _MapChildHelper.componentDidMount)(this, this.context[_constants.MAP], eventMap);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      (0, _MapChildHelper.componentDidUpdate)(this, this.context[_constants.MAP], eventMap, updaterMap, prevProps);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      (0, _MapChildHelper.componentWillUnmount)(this);
    }
  }, {
    key: "render",
    value: function render() {
      return _react.default.createElement("div", null, this.props.children);
    }
  }, {
    key: "fitBounds",
    value: function fitBounds() {
      var _this$context$MAP;

      return (_this$context$MAP = this.context[_constants.MAP]).fitBounds.apply(_this$context$MAP, arguments);
    }
  }, {
    key: "panBy",
    value: function panBy() {
      var _this$context$MAP2;

      return (_this$context$MAP2 = this.context[_constants.MAP]).panBy.apply(_this$context$MAP2, arguments);
    }
  }, {
    key: "panTo",
    value: function panTo() {
      var _this$context$MAP3;

      return (_this$context$MAP3 = this.context[_constants.MAP]).panTo.apply(_this$context$MAP3, arguments);
    }
  }, {
    key: "panToBounds",
    value: function panToBounds() {
      var _this$context$MAP4;

      return (_this$context$MAP4 = this.context[_constants.MAP]).panToBounds.apply(_this$context$MAP4, arguments);
    }
  }, {
    key: "getBounds",
    value: function getBounds() {
      return this.context[_constants.MAP].getBounds();
    }
  }, {
    key: "getCenter",
    value: function getCenter() {
      return this.context[_constants.MAP].getCenter();
    }
  }, {
    key: "getClickableIcons",
    value: function getClickableIcons() {
      return this.context[_constants.MAP].getClickableIcons();
    }
  }, {
    key: "getDiv",
    value: function getDiv() {
      return this.context[_constants.MAP].getDiv();
    }
  }, {
    key: "getHeading",
    value: function getHeading() {
      return this.context[_constants.MAP].getHeading();
    }
  }, {
    key: "getMapTypeId",
    value: function getMapTypeId() {
      return this.context[_constants.MAP].getMapTypeId();
    }
  }, {
    key: "getProjection",
    value: function getProjection() {
      return this.context[_constants.MAP].getProjection();
    }
  }, {
    key: "getStreetView",
    value: function getStreetView() {
      return this.context[_constants.MAP].getStreetView();
    }
  }, {
    key: "getTilt",
    value: function getTilt() {
      return this.context[_constants.MAP].getTilt();
    }
  }, {
    key: "getZoom",
    value: function getZoom() {
      return this.context[_constants.MAP].getZoom();
    }
  }]);

  return GoogleMap;
}(_react.PureComponent);

exports.GoogleMap = GoogleMap;

_defineProperty(GoogleMap, "propTypes", _proptypes.GoogleMapPropTypes);

_defineProperty(GoogleMap, "contextTypes", _defineProperty({}, _constants.MAP, _propTypes.default.object));

var _default = GoogleMap;
exports.default = _default;