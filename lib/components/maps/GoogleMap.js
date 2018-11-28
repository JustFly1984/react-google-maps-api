"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.GoogleMap = void 0;

var _react = _interopRequireWildcard(require("react"));

var _invariant = _interopRequireDefault(require("invariant"));

var _proptypes = require("../../proptypes");

var _map = require("../../utils/map");

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
var defaultPropNameList = ['defaultExtraMapTypes', 'defaultCenter', 'defaultClickableIcons', 'defaultHeading', 'defaultMapTypeId', 'defaultOptions', 'defaultStreetView', 'streetView', 'defaultTilt', 'defaultZoom'];
var propNameList = ['center', 'clickableIcons', 'heading', 'mapTypeId', 'options', 'streetView', 'tilt', 'zoom'];
var defaultPropsMap = {
  defaultExtraMapTypes: 'setExtraMapTypes',
  defaultCenter: 'setCenter',
  defaultClickableIcons: 'setClickableIcons',
  defaultHeading: 'setHeading',
  defaultMapTypeId: 'setMapTypeId',
  defaultOptions: 'setOptions',
  defaultStreetView: 'setStreetView',
  defaultTilt: 'setTilt',
  defaultZoom: 'setZoom'
};
var propsMap = {
  extraMapTypes: 'setExtraMapTypes',
  center: 'setCenter',
  clickableIcons: 'setClickableIcons',
  heading: 'setHeading',
  mapTypeId: 'setMapTypeId',
  options: 'setOptions',
  streetView: 'setStreetView',
  tilt: 'setTilt',
  zoom: 'setZoom'
};
var updaterMap = {
  setExtraMapTypes: function setExtraMapTypes(map, extra) {
    extra.forEach(function (it) {
      var _map$mapTypes;

      return (_map$mapTypes = map.mapTypes).set.apply(_map$mapTypes, _toConsumableArray(it));
    });
  },
  setCenter: function setCenter(map) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    map.setCenter.apply(map, args);
  },
  setClickableIcons: function setClickableIcons(map) {
    for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }

    map.setClickableIcons.apply(map, args);
  },
  setHeading: function setHeading(map) {
    for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
      args[_key3 - 1] = arguments[_key3];
    }

    map.setHeading.apply(map, args);
  },
  setMapTypeId: function setMapTypeId(map) {
    for (var _len4 = arguments.length, args = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
      args[_key4 - 1] = arguments[_key4];
    }

    map.setMapTypeId.apply(map, args);
  },
  setOptions: function setOptions(map) {
    for (var _len5 = arguments.length, args = new Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
      args[_key5 - 1] = arguments[_key5];
    }

    map.setOptions.apply(map, args);
  },
  setStreetView: function setStreetView(map) {
    for (var _len6 = arguments.length, args = new Array(_len6 > 1 ? _len6 - 1 : 0), _key6 = 1; _key6 < _len6; _key6++) {
      args[_key6 - 1] = arguments[_key6];
    }

    map.setStreetView.apply(map, args);
  },
  setTilt: function setTilt(map) {
    for (var _len7 = arguments.length, args = new Array(_len7 > 1 ? _len7 - 1 : 0), _key7 = 1; _key7 < _len7; _key7++) {
      args[_key7 - 1] = arguments[_key7];
    }

    map.setTilt.apply(map, args);
  },
  setZoom: function setZoom(map) {
    for (var _len8 = arguments.length, args = new Array(_len8 > 1 ? _len8 - 1 : 0), _key8 = 1; _key8 < _len8; _key8++) {
      args[_key8 - 1] = arguments[_key8];
    }

    map.setZoom.apply(map, args);
  }
};

var GoogleMap =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(GoogleMap, _PureComponent);

  function GoogleMap(props) {
    var _this;

    _classCallCheck(this, GoogleMap);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(GoogleMap).call(this, props));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "componentDidMount", function () {
      console.log('GoogleMap this.props.loaded: ', _this.props.loaded);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "componentWillUnmount", function () {
      _this.state.registered.forEach(function (event) {
        google.maps.event.removeListener(event);
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getRef", function (ref) {
      _this.mapRef = ref;
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "render", function () {
      return _react.default.createElement("div", {
        ref: _this.props.mapRef,
        style: _this.props.mapContainerStyle,
        className: _this.props.mapContainerClassName
      }, _this.props.loaded && _react.Children.map(_this.props.children, function (child) {
        return child !== null ? (0, _react.cloneElement)(child, {
          map: _this.props.map,
          loaded: _this.props.loaded
        }) : child;
      }));
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "fitBounds", function () {
      var _this$props$map;

      return (_this$props$map = _this.props.map).fitBounds.apply(_this$props$map, arguments);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "panBy", function () {
      var _this$props$map2;

      return (_this$props$map2 = _this.props.map).panBy.apply(_this$props$map2, arguments);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "panTo", function () {
      var _this$props$map3;

      return (_this$props$map3 = _this.props.map).panTo.apply(_this$props$map3, arguments);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "panToBounds", function () {
      var _this$props$map4;

      return (_this$props$map4 = _this.props.map).panToBounds.apply(_this$props$map4, arguments);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getBounds", function () {
      return _this.props.map.getBounds();
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getCenter", function () {
      return _this.props.map.getCenter();
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getClickableIcons", function () {
      return _this.props.map.getClickableIcons();
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getDiv", function () {
      return _this.props.map.getDiv();
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getHeading", function () {
      return _this.props.map.getHeading();
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getMapTypeId", function () {
      return _this.props.map.getMapTypeId();
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getProjection", function () {
      return _this.props.map.getProjection();
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getStreetView", function () {
      return _this.props.map.getStreetView();
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getTilt", function () {
      return _this.props.map.getTilt();
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getZoom", function () {
      return _this.props.map.getZoom();
    });

    _this.state = {
      prevProps: {},
      registered: []
    };
    (0, _invariant.default)(typeof props.map !== 'undefined', 'Did you wrap <GoogleMap> component with <GoogleMapProvider />?');
    (0, _invariant.default)(typeof props.mapContainerClassName !== 'undefined' || typeof props.mapContainerStyle !== 'undefined', 'Did you set mapContainerClassName or mapContainerStyle props to <GoogleMap> component ? You need to set one of them, or map will be invisible.');
    return _this;
  }

  _createClass(GoogleMap, null, [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      state.registered.length > 0 && state.registered.forEach(function (event, i) {
        google.maps.event.removeListener(event);
      });

      if (props.map !== null) {
        return {
          prevProps: Object.keys(state.prevProps).length === 0 ? defaultPropNameList.reduce(function (acc, propName) {
            if (typeof props[propName] !== 'undefined') {
              var shortPropName = propName.slice(7).toLowerCase();
              updaterMap[defaultPropsMap[propName]](props.map, props[propName]);
              acc[shortPropName] = props[propName];
            }

            return acc;
          }, {}) : propNameList.reduce(function (acc, propName) {
            if (typeof props[propName] !== 'undefined') {
              if (state.prevProps[propName] === props[propName]) {
                acc[propName] = state.prevProps[propName];
                return acc;
              } else {
                updaterMap[propsMap[propName]](props.map, props[propName]);
                acc[propName] = props[propName];
                return acc;
              }
            }

            return acc;
          }),
          registered: (0, _map.map)(eventMap, function (googleEventName, onEventName) {
            typeof props[onEventName] === 'function' && google.maps.event.addListener(props.map, googleEventName, props[onEventName]);
          })
        };
      }

      return {
        prevProps: {},
        registered: []
      };
    }
  }]);

  return GoogleMap;
}(_react.PureComponent);

exports.GoogleMap = GoogleMap;
var _default = GoogleMap;
exports.default = _default;