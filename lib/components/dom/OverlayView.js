"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.OverlayView = void 0;

var _react = require("react");

var _reactDom = require("react-dom");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _invariant = _interopRequireDefault(require("invariant"));

var _MapChildHelper = require("../../utils/MapChildHelper");

var _OverlayViewHelper = require("../../utils/OverlayViewHelper");

var _constants = require("../../constants");

var _proptypes = require("../../proptypes");

var _defineProperty2;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var eventMap = {};
var updaterMap = {
  map: function map(instance, _map) {
    instance.setMap(_map);
  }
};

var OverlayView =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(OverlayView, _PureComponent);

  function OverlayView(props, context) {
    var _this;

    _classCallCheck(this, OverlayView);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(OverlayView).call(this, props, context));
    var overlayView = new google.maps.OverlayView();
    _this.onAdd = _this.onAdd.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.draw = _this.draw.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.onRemove = _this.onRemove.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.onPositionElement = _this.onPositionElement.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.getPanes = _this.getPanes.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.getProjection = _this.getProjection.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    overlayView.onAdd = _this.onAdd;
    overlayView.draw = _this.draw;
    overlayView.onRemove = _this.onRemove;
    overlayView.setMap(context[_constants.MAP]);
    _this.state = _defineProperty({}, _constants.OVERLAY_VIEW, overlayView);
    return _this;
  }

  _createClass(OverlayView, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      (0, _MapChildHelper.componentDidMount)(this, this.state[_constants.OVERLAY_VIEW], eventMap);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      (0, _MapChildHelper.componentDidUpdate)(this, this.state[_constants.OVERLAY_VIEW], eventMap, updaterMap, prevProps);
      setTimeout(this.state[_constants.OVERLAY_VIEW].draw, 0);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      (0, _MapChildHelper.componentWillUnmount)(this);
      var overlayView = this.state[_constants.OVERLAY_VIEW];

      if (overlayView) {
        overlayView.setMap(null);
        overlayView.onAdd = null;
        overlayView.draw = null;
        overlayView.onRemove = null;
      }
    }
  }, {
    key: "render",
    value: function render() {
      return false;
    }
  }, {
    key: "preventMapHitsAndGesturesFrom",
    value: function preventMapHitsAndGesturesFrom(element) {
      return this.state[_constants.OVERLAY_VIEW].preventMapHitsAndGesturesFrom(element);
    }
  }, {
    key: "preventMapHitsFrom",
    value: function preventMapHitsFrom(element) {
      return this.state[_constants.OVERLAY_VIEW].preventMapHitsFrom(element);
    }
  }, {
    key: "draw",
    value: function draw() {
      var mapPaneName = this.props.mapPaneName;
      (0, _invariant.default)(!!mapPaneName, "OverlayView requires either props.mapPaneName or props.defaultMapPaneName but got %s", mapPaneName);

      var mapPanes = this.state[_constants.OVERLAY_VIEW].getPanes();

      mapPanes[mapPaneName].appendChild(this.containerElement);
      (0, _reactDom.unstable_renderSubtreeIntoContainer)(this, _react.Children.only(this.props.children), this.containerElement, this.onPositionElement);

      this.state[_constants.OVERLAY_VIEW].draw();
    }
  }, {
    key: "getMap",
    value: function getMap() {
      return this.state[_constants.OVERLAY_VIEW].getMap();
    }
  }, {
    key: "getPanes",
    value: function getPanes() {
      return this.state[_constants.OVERLAY_VIEW].getPanes();
    }
  }, {
    key: "getProjection",
    value: function getProjection() {
      return this.state[_constants.OVERLAY_VIEW].getProjection();
    }
  }, {
    key: "onAdd",
    value: function onAdd() {
      this.containerElement = document.createElement("div");
      this.containerElement.style.position = "absolute";

      this.state[_constants.OVERLAY_VIEW].onAdd();
    }
  }, {
    key: "onPositionElement",
    value: function onPositionElement() {
      var mapCanvasProjection = this.state[_constants.OVERLAY_VIEW].getProjection();

      var offset = _objectSpread({
        x: 0,
        y: 0
      }, (0, _OverlayViewHelper.getOffsetOverride)(this.containerElement, this.props));

      var layoutStyles = (0, _OverlayViewHelper.getLayoutStyles)(mapCanvasProjection, offset, this.props);
      Object.assign(this.containerElement.style, layoutStyles);
    }
  }, {
    key: "onRemove",
    value: function onRemove() {
      this.containerElement.parentNode.removeChild(this.containerElement);
      (0, _reactDom.unmountComponentAtNode)(this.containerElement);
      this.containerElement = null;

      this.state[_constants.OVERLAY_VIEW].onRemove();
    }
  }]);

  return OverlayView;
}(_react.PureComponent);

exports.OverlayView = OverlayView;

_defineProperty(OverlayView, "FLOAT_PANE", "floatPane");

_defineProperty(OverlayView, "MAP_PANE", "mapPane");

_defineProperty(OverlayView, "MARKER_LAYER", "markerLayer");

_defineProperty(OverlayView, "OVERLAY_LAYER", "overlayLayer");

_defineProperty(OverlayView, "OVERLAY_MOUSE_TARGET", "overlayMouseTarget");

_defineProperty(OverlayView, "propTypes", _proptypes.OverlayViewPropTypes);

_defineProperty(OverlayView, "contextTypes", (_defineProperty2 = {}, _defineProperty(_defineProperty2, _constants.MAP, _propTypes.default.object), _defineProperty(_defineProperty2, _constants.ANCHOR, _propTypes.default.object), _defineProperty2));

var _default = OverlayView;
exports.default = _default;