"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Circle = void 0;

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
  onCenterChanged: 'center_changed',
  onClick: 'click',
  onDblClick: 'dblclick',
  onDrag: 'drag',
  onDragEnd: 'dragend',
  onDragStart: 'dragstart',
  onMouseDown: 'mousedown',
  onMouseMove: 'mousemove',
  onMouseOut: 'mouseout',
  onMouseOver: 'mouseover',
  onMouseUp: 'mouseup',
  onRadiusChanged: 'radius_changed',
  onRightClick: 'rightclick'
};
var updaterMap = {
  center: function center(instance, _center) {
    instance.setCenter(_center);
  },
  draggable: function draggable(instance, _draggable) {
    instance.setDraggable(_draggable);
  },
  editable: function editable(instance, _editable) {
    instance.setEditable(_editable);
  },
  map: function map(instance, _map) {
    instance.setMap(_map);
  },
  options: function options(instance, _options) {
    instance.setOptions(_options);
  },
  radius: function radius(instance, _radius) {
    instance.setRadius(_radius);
  },
  visible: function visible(instance, _visible) {
    instance.setVisible(_visible);
  }
};

var Circle =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(Circle, _PureComponent);

  function Circle(props, context) {
    var _this;

    _classCallCheck(this, Circle);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Circle).call(this, props, context));
    var circle = new google.maps.Circle(props.options);
    (0, _MapChildHelper.construct)(_proptypes.CirclePropTypes, updaterMap, props, circle);
    circle.setMap(context[_constants.MAP]);
    _this.state = _defineProperty({}, _constants.CIRCLE, circle);
    _this.getBounds = _this.getBounds.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.getCenter = _this.getCenter.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.getDraggable = _this.getDraggable.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.getEditable = _this.getEditable.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.getMap = _this.getMap.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.getRadius = _this.getRadius.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.getVisible = _this.getVisible.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(Circle, [{
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
    key: "getBounds",
    value: function getBounds() {
      return this.state[_constants.CIRCLE].getBounds();
    }
  }, {
    key: "getCenter",
    value: function getCenter() {
      return this.state[_constants.CIRCLE].getCenter();
    }
  }, {
    key: "getDraggable",
    value: function getDraggable() {
      return this.state[_constants.CIRCLE].getDraggable();
    }
  }, {
    key: "getEditable",
    value: function getEditable() {
      return this.state[_constants.CIRCLE].getEditable();
    }
  }, {
    key: "getMap",
    value: function getMap() {
      return this.state[_constants.CIRCLE].getMap();
    }
  }, {
    key: "getRadius",
    value: function getRadius() {
      return this.state[_constants.CIRCLE].getRadius();
    }
  }, {
    key: "getVisible",
    value: function getVisible() {
      return this.state[_constants.CIRCLE].getVisible();
    }
  }]);

  return Circle;
}(_react.PureComponent);

exports.Circle = Circle;

_defineProperty(Circle, "propTypes", _proptypes.CirclePropTypes);

_defineProperty(Circle, "contextTypes", _defineProperty({}, _constants.MAP, _propTypes.default.object));

var _default = Circle;
exports.default = _default;