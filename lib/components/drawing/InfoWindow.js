"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.InfoWindow = void 0;

var _react = require("react");

var _reactDom = require("react-dom");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _invariant = _interopRequireDefault(require("invariant"));

var _canUseDom = _interopRequireDefault(require("can-use-dom"));

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
    var _this;

    _classCallCheck(this, InfoWindow);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(InfoWindow).call(this, props, context));
    var infoWindow = new google.maps.InfoWindow(props.options);
    (0, _MapChildHelper.construct)(_proptypes.InfoWindowPropTypes, updaterMap, _this.props, infoWindow);
    infoWindow.setMap(_this.context[_constants.MAP]);
    _this.state = _defineProperty({}, _constants.INFO_WINDOW, infoWindow);
    _this.getContent = _this.getContent.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.getPosition = _this.getPosition.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.getZIndex = _this.getZIndex.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(InfoWindow, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      if (!_canUseDom.default || this.containerElement) {
        return;
      }

      if (_react.version.match(/^16/)) {
        this.containerElement = document.createElement("div");
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      (0, _MapChildHelper.componentDidMount)(this, this.state[_constants.INFO_WINDOW], eventMap);

      if (_react.version.match(/^16/)) {
        this.state[_constants.INFO_WINDOW].setContent(this.containerElement);

        open(this.state[_constants.INFO_WINDOW], this.context[_constants.ANCHOR]);
        return;
      }

      var content = document.createElement("div");
      (0, _reactDom.unstable_renderSubtreeIntoContainer)(this, _react.Children.only(this.props.children), content);

      this.state[_constants.INFO_WINDOW].setContent(content);

      open(this.state[_constants.INFO_WINDOW], this.context[_constants.ANCHOR]);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      (0, _MapChildHelper.componentDidUpdate)(this, this.state[_constants.INFO_WINDOW], eventMap, updaterMap, prevProps);

      if (_react.version.match(/^16/)) {
        return;
      }

      if (this.props.children !== prevProps.children) {
        (0, _reactDom.unstable_renderSubtreeIntoContainer)(this, _react.Children.only(this.props.children), this.state[_constants.INFO_WINDOW].getContent());
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      (0, _MapChildHelper.componentWillUnmount)(this);
      var infoWindow = this.state[_constants.INFO_WINDOW];

      if (infoWindow) {
        if (!_react.version.match(/^16/) && infoWindow.getContent()) {
          (0, _reactDom.unmountComponentAtNode)(infoWindow.getContent());
        }

        infoWindow.setMap(null);
      }
    }
  }, {
    key: "render",
    value: function render() {
      return _react.version.match(/^16/) ? (0, _reactDom.createPortal)(_react.Children.only(this.props.children), this.containerElement) : null;
    }
  }, {
    key: "getContent",
    value: function getContent() {
      return this.state[_constants.INFO_WINDOW].getContent();
    }
  }, {
    key: "getPosition",
    value: function getPosition() {
      return this.state[_constants.INFO_WINDOW].getPosition();
    }
  }, {
    key: "getZIndex",
    value: function getZIndex() {
      return this.state[_constants.INFO_WINDOW].getZIndex();
    }
  }]);

  return InfoWindow;
}(_react.PureComponent);

exports.InfoWindow = InfoWindow;

_defineProperty(InfoWindow, "propTypes", _proptypes.InfoWindowPropTypes);

_defineProperty(InfoWindow, "contextTypes", (_defineProperty2 = {}, _defineProperty(_defineProperty2, _constants.MAP, _propTypes.default.object), _defineProperty(_defineProperty2, _constants.ANCHOR, _propTypes.default.object), _defineProperty2));

var _default = InfoWindow;
exports.default = _default;