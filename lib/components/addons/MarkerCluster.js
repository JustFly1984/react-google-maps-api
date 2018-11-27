"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.MarkerClusterer = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _markerClustererPlus = _interopRequireDefault(require("marker-clusterer-plus"));

var _MapChildHelper = require("../../utils/MapChildHelper");

var _constants = require("../../constants");

var _proptypes = require("../../proptypes");

var _defineProperty3;

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
  onClick: 'click',
  onClusteringBegin: 'clusteringbegin',
  onClusteringEnd: 'clusteringend',
  onMouseOut: 'mouseout',
  onMouseOver: 'mouseover'
};
var updaterMap = {
  averageCenter: function averageCenter(instance, _averageCenter) {
    instance.setAverageCenter(_averageCenter);
  },
  batchSizeIE: function batchSizeIE(instance, _batchSizeIE) {
    instance.setBatchSizeIE(_batchSizeIE);
  },
  batchSize: function batchSize(instance, _batchSize) {
    instance.setBatchSize(_batchSize);
  },
  calculator: function calculator(instance, _calculator) {
    instance.setCalculator(_calculator);
  },
  clusterClass: function clusterClass(instance, _clusterClass) {
    instance.setClusterClass(_clusterClass);
  },
  enableRetinaIcons: function enableRetinaIcons(instance, _enableRetinaIcons) {
    instance.setEnableRetinaIcons(_enableRetinaIcons);
  },
  gridSize: function gridSize(instance, _gridSize) {
    instance.setGridSize(_gridSize);
  },
  ignoreHidden: function ignoreHidden(instance, _ignoreHidden) {
    instance.setIgnoreHidden(_ignoreHidden);
  },
  imageExtension: function imageExtension(instance, _imageExtension) {
    instance.setImageExtension(_imageExtension);
  },
  imagePath: function imagePath(instance, _imagePath) {
    instance.setImagePath(_imagePath);
  },
  imageSizes: function imageSizes(instance, _imageSizes) {
    instance.setImageSizes(_imageSizes);
  },
  maxZoom: function maxZoom(instance, _maxZoom) {
    instance.setMaxZoom(_maxZoom);
  },
  minimumClusterSize: function minimumClusterSize(instance, _minimumClusterSize) {
    instance.setMinimumClusterSize(_minimumClusterSize);
  },
  styles: function styles(instance, _styles) {
    instance.setStyles(_styles);
  },
  title: function title(instance, _title) {
    instance.setTitle(_title);
  },
  zoomOnClick: function zoomOnClick(instance, _zoomOnClick) {
    instance.setZoomOnClick(_zoomOnClick);
  }
};

var MarkerClusterer =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(MarkerClusterer, _PureComponent);

  function MarkerClusterer(props, context) {
    var _this;

    _classCallCheck(this, MarkerClusterer);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(MarkerClusterer).call(this, props, context));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getChildContext", function () {
      var _ref;

      var markerClusterer = _this.state[_constants.MARKER_CLUSTERER];
      return _ref = {}, _defineProperty(_ref, _constants.ANCHOR, markerClusterer), _defineProperty(_ref, _constants.MARKER_CLUSTERER, markerClusterer), _ref;
    });

    var _markerClusterer = new _markerClustererPlus.default();

    (0, _MapChildHelper.construct)(MarkerClusterer.propTypes, updaterMap, props, _markerClusterer);

    _markerClusterer.setMap(context[_constants.MAP]);

    _this.state = _defineProperty({}, _constants.MARKER_CLUSTERER, _markerClusterer);
    return _this;
  }

  _createClass(MarkerClusterer, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      (0, _MapChildHelper.componentWillUnmount)(this);
      var markerClusterer = this.state[_constants.MARKER_CLUSTERER];

      if (markerClusterer) {
        markerClusterer.setMap(null);
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
      var obj = (0, _MapChildHelper.getDerivedStateFromProps)(props, state, this.state[_constants.MARKER_CLUSTERER], eventMap, updaterMap);

      this.state[_constants.MARKER_CLUSTERER].repaint();

      return obj;
    }
  }]);

  return MarkerClusterer;
}(_react.PureComponent);

exports.MarkerClusterer = MarkerClusterer;

_defineProperty(MarkerClusterer, "propTypes", _proptypes.MarkerClustererPropTypes);

_defineProperty(MarkerClusterer, "contextTypes", _defineProperty({}, _constants.MAP, _propTypes.default.object));

_defineProperty(MarkerClusterer, "childContextTypes", (_defineProperty3 = {}, _defineProperty(_defineProperty3, _constants.ANCHOR, _propTypes.default.object), _defineProperty(_defineProperty3, _constants.MARKER_CLUSTERER, _propTypes.default.object), _defineProperty3));

var _default = MarkerClusterer;
exports.default = _default;