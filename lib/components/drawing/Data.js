"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Data = void 0;

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
  onAddFeature: 'addfeature',
  onClick: 'click',
  onDblClick: 'dblclick',
  onMouseDown: 'mousedown',
  onMouseOut: 'mouseout',
  onMouseOver: 'mouseover',
  onMouseUp: 'mouseup',
  onRemoveFeature: 'removefeature',
  onRemoveProperty: 'removeproperty',
  onRightClick: 'rightclick',
  onSetGeometry: 'setgeometry',
  onSetProperty: 'setproperty'
};
var updaterMap = {
  add: function add(instance, features) {
    instance.add(features);
  },
  addgeojson: function addgeojson(instance, geojson, options) {
    instance.addGeoJson(geojson, options);
  },
  contains: function contains(instance, feature) {
    instance.contains(feature);
  },
  foreach: function foreach(instance, callback) {
    instance.forEach(callback);
  },
  loadgeojson: function loadgeojson(instance, url, options, callback) {
    instance.loadGeoJson(url, options, callback);
  },
  overridestyle: function overridestyle(instance, feature, style) {
    instance.overrideStyle(feature, style);
  },
  remove: function remove(instance, feature) {
    instance.remove(feature);
  },
  revertstyle: function revertstyle(instance, features) {
    instance.revertStyle(features);
  },
  controlposition: function controlposition(instance, controlPosition) {
    instance.setControlPosition(controlPosition);
  },
  controls: function controls(instance, _controls) {
    instance.setControls(_controls);
  },
  drawingmode: function drawingmode(instance, mode) {
    instance.setDrawingMode(mode);
  },
  map: function map(instance, _map) {
    instance.setMap(_map);
  },
  style: function style(instance, _style) {
    instance.setStyle(_style);
  },
  togeojson: function togeojson(instance, callback) {
    instance.toGeoJson(callback);
  }
};

var Data =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(Data, _PureComponent);

  function Data(props, context) {
    var _this;

    _classCallCheck(this, Data);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Data).call(this, props, context));
    var circle = new google.maps.Data(props.options);
    (0, _MapChildHelper.construct)(_proptypes.DataPropTypes, updaterMap, props, circle);
    circle.setMap(context[_constants.MAP]);
    _this.state = _defineProperty({}, _constants.CIRCLE, circle);
    _this.getControlPosition = _this.getControlPosition.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.getControls = _this.getControls.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.getDrawingMode = _this.getDrawingMode.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.getFeatureById = _this.getFeatureById.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.getMap = _this.getMap.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.getStyle = _this.getStyle.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(Data, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      (0, _MapChildHelper.componentDidMount)(this, this.state[_constants.CIRCLE], eventMap);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      (0, _MapChildHelper.componentDidUpdate)(this, this.state[_constants.CIRCLE], eventMap, updaterMap, prevProps);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      (0, _MapChildHelper.componentWillUnmount)(this);
      var circle = this.state[_constants.CIRCLE];

      if (circle) {
        circle.setMap(null);
      }
    }
  }, {
    key: "render",
    value: function render() {
      return false;
    }
  }, {
    key: "getControlPosition",
    value: function getControlPosition() {
      return this.state[_constants.CIRCLE].getControlPosition();
    }
  }, {
    key: "getControls",
    value: function getControls() {
      return this.state[_constants.CIRCLE].getControls();
    }
  }, {
    key: "getDrawingMode",
    value: function getDrawingMode() {
      return this.state[_constants.CIRCLE].getDrawingMode();
    }
  }, {
    key: "getFeatureById",
    value: function getFeatureById() {
      return this.state[_constants.CIRCLE].getFeatureById();
    }
  }, {
    key: "getMap",
    value: function getMap() {
      return this.state[_constants.CIRCLE].getMap();
    }
  }, {
    key: "getStyle",
    value: function getStyle() {
      return this.state[_constants.CIRCLE].getStyle();
    }
  }]);

  return Data;
}(_react.PureComponent);

exports.Data = Data;

_defineProperty(Data, "contextTypes", _defineProperty({}, _constants.MAP, _propTypes.default.object));

var _default = Data;
exports.default = _default;