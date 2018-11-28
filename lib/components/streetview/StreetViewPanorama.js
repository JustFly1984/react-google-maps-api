"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.StreetViewPanorama = void 0;

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

var eventMap = {
  onCloseClick: 'closeclick',
  onPanoChanged: 'pano_changed',
  onPositionChanged: 'position_changed',
  onPovChanged: 'pov_changed',
  onResize: 'resize',
  onStatusChanged: 'status_changed',
  onVisibleChanged: 'visible_changed',
  onZoomChanged: 'zoom_changed'
};
var updaterMap = {
  register: function register(instance, provider, options) {
    instance.registerPanoProvider(provider, options);
  },
  links: function links(instance, _links) {
    instance.setLinks(_links);
  },
  motionTracking: function motionTracking(instance, _motionTracking) {
    instance.setMotionTracking(_motionTracking);
  },
  options: function options(instance, _options) {
    instance.setOptions(_options);
  },
  pano: function pano(instance, _pano) {
    instance.setPano(_pano);
  },
  position: function position(instance, _position) {
    instance.setPosition(_position);
  },
  pov: function pov(instance, _pov) {
    instance.setPov(_pov);
  },
  visible: function visible(instance, _visible) {
    instance.setVisible(_visible);
  },
  zoom: function zoom(instance, _zoom) {
    instance.setZoom(_zoom);
  }
};

var StreetViewPanorama =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(StreetViewPanorama, _PureComponent);

  function StreetViewPanorama(props, context) {
    var _this;

    _classCallCheck(this, StreetViewPanorama);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(StreetViewPanorama).call(this, props, context));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getChildContext", function () {
      return _defineProperty({}, _constants.MAP, _this.context[_constants.MAP].getStreetView());
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getLinks", function () {
      return _this.context[_constants.MAP].getLinks();
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getLocation", function () {
      return _this.context[_constants.MAP].getLocation();
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getMotionTracking", function () {
      return _this.context[_constants.MAP].getMotionTracking();
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getPano", function () {
      return _this.context[_constants.MAP].getPano();
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getPhotographerPov", function () {
      return _this.context[_constants.MAP].getPhotographerPov();
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getPosition", function () {
      return _this.context[_constants.MAP].getPosition();
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getPov", function () {
      return _this.context[_constants.MAP].getPov();
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getStatus", function () {
      return _this.context[_constants.MAP].getStatus();
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getVisible", function () {
      return _this.context[_constants.MAP].getVisible();
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getZoom", function () {
      return _this.context[_constants.MAP].getZoom();
    });

    (0, _invariant.default)(!!context[_constants.MAP], 'Did you render <StreetViewPanorama> as a child of <GoogleMap> with withGoogleMap() HOC?');
    _this.state = {
      context: context,
      prevProps: (0, _MapChildHelper.construct)(_proptypes.StreetViewPanoramaPropTypes, updaterMap, props, context[_constants.MAP].getStreetView())
    };
    return _this;
  }

  _createClass(StreetViewPanorama, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      (0, _MapChildHelper.componentWillUnmount)(this);

      var streetViewPanorama = this.context[_constants.MAP].getStreetView();

      if (streetViewPanorama) {
        streetViewPanorama.setVisible(false);
      }
    }
  }, {
    key: "render",
    value: function render() {
      return _react.default.createElement("div", null, this.props.children);
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      return (0, _MapChildHelper.getDerivedStateFromProps)(props, state, state.context[_constants.MAP].getStreetView(), eventMap, updaterMap);
    }
  }]);

  return StreetViewPanorama;
}(_react.PureComponent);

exports.StreetViewPanorama = StreetViewPanorama;

_defineProperty(StreetViewPanorama, "contextTypes", _defineProperty({}, _constants.MAP, _propTypes.default.object));

_defineProperty(StreetViewPanorama, "childContextTypes", _defineProperty({}, _constants.MAP, _propTypes.default.object));

var _default = StreetViewPanorama;
exports.default = _default;