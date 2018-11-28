"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Polyline = void 0;

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
  onRightClick: 'rightclick'
};
var updaterMap = {
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
  path: function path(instance, _path) {
    instance.setPath(_path);
  },
  visible: function visible(instance, _visible) {
    instance.setVisible(_visible);
  }
};

var Polyline =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(Polyline, _PureComponent);

  function Polyline(props, context) {
    var _this$state;

    var _this;

    _classCallCheck(this, Polyline);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Polyline).call(this, props, context));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getDraggable", function () {
      return _this.state[_constants.POLYLINE].getDraggable();
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getEditable", function () {
      return _this.state[_constants.POLYLINE].getEditable();
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getPath", function () {
      return _this.state[_constants.POLYLINE].getPath();
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getVisible", function () {
      return _this.state[_constants.POLYLINE].getVisible();
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getMap", function () {
      return _this.state[_constants.POLYLINE].getMap();
    });

    var polyline = new google.maps.Polyline(props.options);
    _this.state = (_this$state = {}, _defineProperty(_this$state, _constants.POLYLINE, polyline), _defineProperty(_this$state, "prevProps", (0, _MapChildHelper.construct)(_proptypes.PolylinePropTypes, updaterMap, _this.props, polyline)), _this$state);
    polyline.setMap(_this.context[_constants.MAP]);
    return _this;
  }

  _createClass(Polyline, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      (0, _MapChildHelper.componentWillUnmount)(this);
      var polyline = this.state[_constants.POLYLINE];

      if (polyline) {
        polyline.setMap(null);
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
      return (0, _MapChildHelper.getDerivedStateFromProps)(props, state, this.state[_constants.POLYLINE], eventMap, updaterMap);
    }
  }]);

  return Polyline;
}(_react.PureComponent);

exports.Polyline = Polyline;

_defineProperty(Polyline, "contextTypes", _defineProperty({}, _constants.MAP, _propTypes.default.object));

var _default = Polyline;
exports.default = _default;