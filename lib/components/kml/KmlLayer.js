"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.KmlLayer = void 0;

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

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var eventMap = {
  onClick: 'click',
  onDefaultViewportChanged: 'defaultviewport_changed',
  onStatusChanged: 'status_changed'
};
var updaterMap = {
  map: function map(instance, _map) {
    instance.setMap(_map);
  },
  options: function options(instance, _options) {
    instance.setOptions(_options);
  },
  url: function url(instance, _url) {
    instance.setUrl(_url);
  },
  zIndex: function zIndex(instance, _zIndex) {
    instance.setZIndex(_zIndex);
  }
};

var KmlLayer =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(KmlLayer, _PureComponent);

  function KmlLayer(props, context) {
    var _this;

    _classCallCheck(this, KmlLayer);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(KmlLayer).call(this, props, context));
    var kmlLayer = new google.maps.KmlLayer(props.options);
    (0, _MapChildHelper.construct)(_proptypes.KmlLayerPropTypes, updaterMap, props, kmlLayer);
    kmlLayer.setMap(context[_constants.MAP]);
    _this.state = _defineProperty({}, _constants.KML_LAYER, kmlLayer);
    return _this;
  }

  _createClass(KmlLayer, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      (0, _MapChildHelper.componentDidMount)(this, this.state[_constants.KML_LAYER], eventMap);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      (0, _MapChildHelper.componentDidUpdate)(this, this.state[_constants.KML_LAYER], eventMap, updaterMap, prevProps);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      (0, _MapChildHelper.componentWillUnmount)(this);
      var kmlLayer = this.state[_constants.KML_LAYER];

      if (kmlLayer) {
        kmlLayer.setMap(null);
      }
    }
  }, {
    key: "render",
    value: function render() {
      return false;
    }
  }, {
    key: "getDefaultViewport",
    value: function getDefaultViewport() {
      return this.state[_constants.KML_LAYER].getDefaultViewport();
    }
  }, {
    key: "getMap",
    value: function getMap() {
      return this.state[_constants.KML_LAYER].getMap();
    }
  }, {
    key: "getMetadata",
    value: function getMetadata() {
      return this.state[_constants.KML_LAYER].getMetadata();
    }
  }, {
    key: "getStatus",
    value: function getStatus() {
      return this.state[_constants.KML_LAYER].getStatus();
    }
  }, {
    key: "getUrl",
    value: function getUrl() {
      return this.state[_constants.KML_LAYER].getUrl();
    }
  }, {
    key: "getZIndex",
    value: function getZIndex() {
      return this.state[_constants.KML_LAYER].getZIndex();
    }
  }]);

  return KmlLayer;
}(_react.PureComponent);

exports.KmlLayer = KmlLayer;

_defineProperty(KmlLayer, "contextTypes", _defineProperty({}, _constants.MAP, _propTypes.default.object));

var _default = KmlLayer;
exports.default = _default;