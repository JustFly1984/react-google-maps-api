"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.InfoWindow = void 0;

var _react = require("react");

var _reactDom = require("react-dom");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _invariant = _interopRequireDefault(require("invariant"));

var _MapChildHelper = require("../../utils/MapChildHelper");

var _constants = require("../../constants");

var _proptypes = require("../../proptypes");

var _defineProperty2;

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

var open = function open(infoWindow, anchor) {
  if (anchor) {
    infoWindow.open(infoWindow.getMap(), anchor);
  } else if (infoWindow.getPosition()) {
    infoWindow.open(infoWindow.getMap());
  } else {
    (0, _invariant.default)(false, "You must provide either an anchor (typically render it inside a <Marker>) or a position props for <InfoWindow>.");
  }
};

var eventMap = {
  onCloseClick: 'closeclick',
  onContentChanged: 'content_changed',
  onDomReady: 'domready',
  onPositionChanged: 'position_changed',
  onZindexChanged: 'zindex_changed'
};
var updaterMap = {
  open: function open(instance, options) {
    instance.open(options);
  },
  close: function close(instance) {
    instance.close();
  },
  options: function options(instance, _options) {
    instance.setOptions(_options);
  },
  position: function position(instance, _position) {
    instance.setPosition(_position);
  },
  zIndex: function zIndex(instance, _zIndex) {
    instance.setZIndex(_zIndex);
  }
};

var InfoWindow =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(InfoWindow, _PureComponent);

  function InfoWindow(props, context) {
    var _this$state;

    var _this;

    _classCallCheck(this, InfoWindow);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(InfoWindow).call(this, props, context));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getContent", function () {
      return _this.state[_constants.INFO_WINDOW].getContent();
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getPosition", function () {
      return _this.state[_constants.INFO_WINDOW].getPosition();
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getZIndex", function () {
      return _this.state[_constants.INFO_WINDOW].getZIndex();
    });

    var infoWindow = new google.maps.InfoWindow(props.options);
    _this.state = (_this$state = {}, _defineProperty(_this$state, _constants.INFO_WINDOW, infoWindow), _defineProperty(_this$state, "prevProps", (0, _MapChildHelper.construct)(_proptypes.InfoWindowPropTypes, updaterMap, _this.props, infoWindow)), _this$state);
    infoWindow.setMap(_this.context[_constants.MAP]);
    _this.containerElement = document.createElement('div');

    _this.state[_constants.INFO_WINDOW].setContent(_this.containerElement);

    open(_this.state[_constants.INFO_WINDOW], _this.context[_constants.ANCHOR]);
    return _this;
  }

  _createClass(InfoWindow, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      (0, _MapChildHelper.componentWillUnmount)(this);
      var infoWindow = this.state[_constants.INFO_WINDOW];

      if (infoWindow) {
        infoWindow.setMap(null);
      }
    }
  }, {
    key: "render",
    value: function render() {
      return (0, _reactDom.createPortal)(_react.Children.only(this.props.children), this.containerElement);
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      return (0, _MapChildHelper.getDerivedStateFromProps)(props, state, this.state[_constants.INFO_WINDOW], eventMap, updaterMap);
    }
  }]);

  return InfoWindow;
}(_react.PureComponent);

exports.InfoWindow = InfoWindow;

_defineProperty(InfoWindow, "contextTypes", (_defineProperty2 = {}, _defineProperty(_defineProperty2, _constants.MAP, _propTypes.default.object), _defineProperty(_defineProperty2, _constants.ANCHOR, _propTypes.default.object), _defineProperty2));

var _default = InfoWindow;
exports.default = _default;