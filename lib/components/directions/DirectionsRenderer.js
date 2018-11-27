"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.DirectionsRenderer = void 0;

var _react = require("react");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _MapChildHelper = require("../../utils/MapChildHelper");

var _constants = require("../../constants");

var _proptypes = require("../../proptypes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
  onDirectionsChanged: 'directions_changed'
};
var updaterMap = {
  directions: function directions(instance, _directions) {
    instance.setDirections(_directions);
  },
  map: function map(instance, _map) {
    instance.setMap(_map);
  },
  options: function options(instance, _options) {
    instance.setOptions(_options);
  },
  panel: function panel(instance, _panel) {
    instance.setPanel(_panel);
  },
  routeIndex: function routeIndex(instance, _routeIndex) {
    instance.setRouteIndex(_routeIndex);
  }
};

var DirectionsRenderer =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(DirectionsRenderer, _PureComponent);

  function DirectionsRenderer(props, context) {
    var _this$state;

    var _this;

    _classCallCheck(this, DirectionsRenderer);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DirectionsRenderer).call(this, props, context));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getDirections", function () {
      return _this.state[_constants.DIRECTIONS_RENDERER].getDirections();
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getMap", function () {
      return _this.state[_constants.DIRECTIONS_RENDERER].getMap();
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getPanel", function () {
      return _this.state[_constants.DIRECTIONS_RENDERER].getPanel();
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getRouteIndex", function () {
      return _this.state[_constants.DIRECTIONS_RENDERER].getRouteIndex();
    });

    var directionsRenderer = new google.maps.DirectionsRenderer(props.options);
    directionsRenderer.setMap(context[_constants.MAP]);
    _this.state = (_this$state = {}, _defineProperty(_this$state, _constants.DIRECTIONS_RENDERER, directionsRenderer), _defineProperty(_this$state, "prevProps", (0, _MapChildHelper.construct)(_proptypes.DirectionsRendererPropTypes, updaterMap, props, directionsRenderer)), _this$state);
    return _this;
  }

  _createClass(DirectionsRenderer, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      (0, _MapChildHelper.componentWillUnmount)(this);
      var directionsRenderer = this.state[_constants.DIRECTIONS_RENDERER];

      if (directionsRenderer) {
        directionsRenderer.setMap(null);
      }
    }
  }, {
    key: "render",
    value: function render() {
      return null;
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      return (0, _MapChildHelper.getDerivedStateFromProps)(props, state, this.state[_constants.DIRECTIONS_RENDERER], eventMap, updaterMap);
    }
  }]);

  return DirectionsRenderer;
}(_react.PureComponent);

exports.DirectionsRenderer = DirectionsRenderer;

_defineProperty(DirectionsRenderer, "propTypes", _proptypes.DirectionsRendererPropTypes);

_defineProperty(DirectionsRenderer, "contextTypes", _defineProperty({}, _constants.MAP, _propTypes.default.object));

var _default = DirectionsRenderer;
exports.default = _default;