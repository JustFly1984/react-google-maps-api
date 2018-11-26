"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.DrawingManager = void 0;

var _react = require("react");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _invariant = _interopRequireDefault(require("invariant"));

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
  onCircleComplete: 'circlecomplete',
  onMarkerComplete: 'markercomplete',
  onOverlayComplete: 'overlaycomplete',
  onPolygonComplete: 'polygoncomplete',
  onPolylineComplete: 'polylinecomplete',
  onRectangleComplete: 'rectanglecomplete'
};
var updaterMap = {
  drawingMode: function drawingMode(instance, _drawingMode) {
    instance.setDrawingMode(_drawingMode);
  },
  map: function map(instance, _map) {
    instance.setMap(_map);
  },
  options: function options(instance, _options) {
    instance.setOptions(_options);
  }
};

var DrawingManager =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(DrawingManager, _PureComponent);

  function DrawingManager(props, context) {
    var _this;

    _classCallCheck(this, DrawingManager);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DrawingManager).call(this, props, context));
    (0, _invariant.default)(google.maps.drawing, "Did you include \"libraries=drawing\" in the URL?");
    var drawingManager = new google.maps.drawing.DrawingManager(props.options);
    _this.getDrawingMode = _this.getDrawingMode.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.getMap = _this.getMap.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    (0, _MapChildHelper.construct)(_proptypes.DrawingManagerPropTypes, updaterMap, props, drawingManager);
    drawingManager.setMap(context[_constants.MAP]);
    _this.state = _defineProperty({}, _constants.DRAWING_MANAGER, drawingManager);
    return _this;
  }

  _createClass(DrawingManager, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      (0, _MapChildHelper.componentDidMount)(this, this.state[_constants.DRAWING_MANAGER], eventMap);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      (0, _MapChildHelper.componentDidUpdate)(this, this.state[_constants.DRAWING_MANAGER], eventMap, updaterMap, prevProps);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      (0, _MapChildHelper.componentWillUnmount)(this);
      var drawingManager = this.state[_constants.DRAWING_MANAGER];

      if (drawingManager) {
        drawingManager.setMap(null);
      }
    }
  }, {
    key: "render",
    value: function render() {
      return false;
    }
  }, {
    key: "getDrawingMode",
    value: function getDrawingMode() {
      return this.state[_constants.DRAWING_MANAGER].getDrawingMode();
    }
  }, {
    key: "getMap",
    value: function getMap() {
      return this.state[_constants.DRAWING_MANAGER].getMap();
    }
  }]);

  return DrawingManager;
}(_react.PureComponent);

exports.DrawingManager = DrawingManager;

_defineProperty(DrawingManager, "contextTypes", _defineProperty({}, _constants.MAP, _propTypes.default.object));

var _default = DrawingManager;
exports.default = _default;