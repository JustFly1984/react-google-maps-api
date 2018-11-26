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
    (0, _invariant.default)(!!context[_constants.MAP], "Did you render <StreetViewPanorama> as a child of <GoogleMap> with withGoogleMap() HOC?");
    (0, _MapChildHelper.construct)(_proptypes.StreetViewPanoramaPropTypes, updaterMap, props, context[_constants.MAP].getStreetView());
    _this.getLinks = _this.getLinks.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.getLocation = _this.getLocation.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.getMotionTracking = _this.getMotionTracking.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.getPano = _this.getPano.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.getPhotographerPov = _this.getPhotographerPov.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.getPosition = _this.getPosition.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.getPov = _this.getPov.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.getStatus = _this.getStatus.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.getVisible = _this.getVisible.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.getZoom = _this.getZoom.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(StreetViewPanorama, [{
    key: "getChildContext",
    value: function getChildContext() {
      return _defineProperty({}, _constants.MAP, this.context[_constants.MAP].getStreetView());
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      (0, _MapChildHelper.componentDidMount)(this, this.context[_constants.MAP].getStreetView(), eventMap);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      (0, _MapChildHelper.componentDidUpdate)(this, this.context[_constants.MAP].getStreetView(), eventMap, updaterMap, prevProps);
    }
  }, {
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
  }, {
    key: "getLinks",
    value: function getLinks() {
      return this.context[_constants.MAP].getLinks();
    }
  }, {
    key: "getLocation",
    value: function getLocation() {
      return this.context[_constants.MAP].getLocation();
    }
  }, {
    key: "getMotionTracking",
    value: function getMotionTracking() {
      return this.context[_constants.MAP].getMotionTracking();
    }
  }, {
    key: "getPano",
    value: function getPano() {
      return this.context[_constants.MAP].getPano();
    }
  }, {
    key: "getPhotographerPov",
    value: function getPhotographerPov() {
      return this.context[_constants.MAP].getPhotographerPov();
    }
  }, {
    key: "getPosition",
    value: function getPosition() {
      return this.context[_constants.MAP].getPosition();
    }
  }, {
    key: "getPov",
    value: function getPov() {
      return this.context[_constants.MAP].getPov();
    }
  }, {
    key: "getStatus",
    value: function getStatus() {
      return this.context[_constants.MAP].getStatus();
    }
  }, {
    key: "getVisible",
    value: function getVisible() {
      return this.context[_constants.MAP].getVisible();
    }
  }, {
    key: "getZoom",
    value: function getZoom() {
      return this.context[_constants.MAP].getZoom();
    }
  }]);

  return StreetViewPanorama;
}(_react.PureComponent);

exports.StreetViewPanorama = StreetViewPanorama;

_defineProperty(StreetViewPanorama, "contextTypes", _defineProperty({}, _constants.MAP, _propTypes.default.object));

_defineProperty(StreetViewPanorama, "childContextTypes", _defineProperty({}, _constants.MAP, _propTypes.default.object));

var _default = StreetViewPanorama;
exports.default = _default;