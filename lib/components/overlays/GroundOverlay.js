"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.GroundOverlay = void 0;

var _react = require("react");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _warning = _interopRequireDefault(require("warning"));

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
  onDblClick: 'dblclick',
  onClick: 'click'
};
var updaterMap = {
  map: function map(instance, _map) {
    instance.setMap(_map);
  },
  opacity: function opacity(instance, _opacity) {
    instance.setOpacity(_opacity);
  }
};

var GroundOverlay =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(GroundOverlay, _PureComponent);

  function GroundOverlay(props, context) {
    var _this;

    _classCallCheck(this, GroundOverlay);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(GroundOverlay).call(this, props, context));
    (0, _warning.default)(!props.url || !props.bounds, "\nFor GroundOveray, url and bounds are passed in to constructor and are immutable\n after iinstantiated. This is the behavior of Google Maps JavaScript API v3 (\n See https://developers.google.com/maps/documentation/javascript/reference#GroundOverlay)\n Hence, use the corresponding two props provided by `react-google-maps`.\n They're prefixed with _default_ (defaultUrl, defaultBounds).\n\n In some cases, you'll need the GroundOverlay component to reflect the changes\n of url and bounds. You can leverage the React's key property to remount the\n component. Typically, just `key={url}` would serve your need.\n See https://github.com/tomchentw/react-google-maps/issues/655\n");
    var groundOverlay = new google.maps.GroundOverlay(props.defaultUrl || props.url, props.defaultBounds || props.bounds, props.options);
    (0, _MapChildHelper.construct)(_proptypes.GroundOverlayPropTypes, updaterMap, props, groundOverlay);
    groundOverlay.setMap(context[_constants.MAP]);
    _this.state = _defineProperty({}, _constants.GROUND_LAYER, groundOverlay);
    _this.getBounds = _this.getBounds.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.getMap = _this.getMap.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.getOpacity = _this.getOpacity.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.getUrl = _this.getUrl.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(GroundOverlay, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      (0, _MapChildHelper.componentDidMount)(this, this.state[_constants.GROUND_LAYER], eventMap);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      (0, _MapChildHelper.componentDidUpdate)(this, this.state[_constants.GROUND_LAYER], eventMap, updaterMap, prevProps);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      (0, _MapChildHelper.componentWillUnmount)(this);
      var GroundOverlay = this.state[_constants.GROUND_LAYER];

      if (GroundOverlay) {
        GroundOverlay.setMap(null);
      }
    }
  }, {
    key: "render",
    value: function render() {
      return false;
    }
  }, {
    key: "getBounds",
    value: function getBounds() {
      return this.state[_constants.GROUND_LAYER].getBounds();
    }
  }, {
    key: "getMap",
    value: function getMap() {
      return this.state[_constants.GROUND_LAYER].getMap();
    }
  }, {
    key: "getOpacity",
    value: function getOpacity() {
      return this.state[_constants.GROUND_LAYER].getOpacity();
    }
  }, {
    key: "getUrl",
    value: function getUrl() {
      return this.state[_constants.GROUND_LAYER].getUrl();
    }
  }]);

  return GroundOverlay;
}(_react.PureComponent);

exports.GroundOverlay = GroundOverlay;

_defineProperty(GroundOverlay, "contextTypes", _defineProperty({}, _constants.MAP, _propTypes.default.object));

var _default = GroundOverlay;
exports.default = _default;