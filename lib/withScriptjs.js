"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withScriptjs = withScriptjs;
exports.default = void 0;

var _react = require("react");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _canUseDom = _interopRequireDefault(require("can-use-dom"));

var _invariant = _interopRequireDefault(require("invariant"));

var _recompose = require("recompose");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var LOADING_STATE_NONE = "NONE";
var LOADING_STATE_BEGIN = "BEGIN";
var LOADING_STATE_LOADED = "LOADED";
var isInstalled = false;

function withScriptjs(BaseComponent) {
  var factory = (0, _react.createFactory)(BaseComponent);

  var Container =
  /*#__PURE__*/
  function (_PureComponent) {
    _inherits(Container, _PureComponent);

    function Container(props) {
      var _this;

      _classCallCheck(this, Container);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(Container).call(this, props));
      _this.handleLoaded = _this.handleLoaded.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this.state = {
        loadingState: LOADING_STATE_NONE
      };
      _this.isUnmounted = false;
      return _this;
    }

    _createClass(Container, [{
      key: "handleLoaded",
      value: function handleLoaded() {
        if (this.isUnmounted) {
          return;
        }

        this.setState(function () {
          return {
            loadingState: LOADING_STATE_LOADED
          };
        });
      }
    }, {
      key: "componentWillMount",
      value: function componentWillMount() {
        (0, _invariant.default)(!!this.props.loadingElement && !!this.props.googleMapURL, "Required props loadingElement or googleMapURL is missing. You need to provide both of them.");
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        if (this.state.loadingState !== LOADING_STATE_NONE || !_canUseDom.default) {
          return;
        }

        this.setState(function () {
          return {
            loadingState: LOADING_STATE_BEGIN
          };
        }); // Don't load scriptjs as a dependency since we do not want this module be used on server side.
        // eslint-disable-next-line global-require

        var scriptjs = require("scriptjs");

        if (!isInstalled) {
          scriptjs(this.props.googleMapURL, this.handleLoaded);
          scriptjs.ready(function () {
            isInstalled = true;
          });
        }
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        this.isUnmounted = true;
      }
    }, {
      key: "render",
      value: function render() {
        var _this$props = this.props,
            loadingElement = _this$props.loadingElement,
            googleMapURL = _this$props.googleMapURL,
            restProps = _objectWithoutProperties(_this$props, ["loadingElement", "googleMapURL"]);

        if (this.state.loadingState === LOADING_STATE_LOADED) {
          return factory(restProps);
        } else {
          return loadingElement;
        }
      }
    }]);

    return Container;
  }(_react.PureComponent);

  _defineProperty(Container, "displayName", "withScriptjs(".concat((0, _recompose.getDisplayName)(BaseComponent), ")"));

  _defineProperty(Container, "propTypes", {
    loadingElement: _propTypes.default.node.isRequired,
    googleMapURL: _propTypes.default.string.isRequired
  });

  return Container;
}

var _default = withScriptjs;
exports.default = _default;