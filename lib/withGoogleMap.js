"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withGoogleMap = withGoogleMap;
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _warning = _interopRequireDefault(require("warning"));

var _invariant = _interopRequireDefault(require("invariant"));

var _recompose = require("recompose");

var _constants = require("./constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

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

function withGoogleMap(BaseComponent) {
  var factory = (0, _react.createFactory)(BaseComponent);

  var Container =
  /*#__PURE__*/
  function (_PureComponent) {
    _inherits(Container, _PureComponent);

    function Container(props) {
      var _this;

      _classCallCheck(this, Container);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(Container).call(this, props));
      _this.handleComponentMount = _this.handleComponentMount.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this.state = {
        map: null
      };
      return _this;
    }

    _createClass(Container, [{
      key: "getChildContext",
      value: function getChildContext() {
        return _defineProperty({}, _constants.MAP, this.state.map);
      }
    }, {
      key: "componentWillMount",
      value: function componentWillMount() {
        var _this$props = this.props,
            containerElement = _this$props.containerElement,
            mapElement = _this$props.mapElement;
        (0, _invariant.default)(!!containerElement && !!mapElement, "Required props containerElement or mapElement is missing. You need to provide both of them.\n The `google.maps.Map` instance will be initialized on mapElement and it's wrapped by containerElement.\nYou need to provide both of them since Google Map requires the DOM to have height when initialized.");
      }
    }, {
      key: "handleComponentMount",
      value: function handleComponentMount(node) {
        if (this.state.map || node === null) {
          return;
        }

        (0, _warning.default)(typeof google !== 'undefined', "Make sure you've put a <script> tag in your <head> element to load Google Maps JavaScript API v3.\n If you're looking for built-in support to load it for you, use the \"async/ScriptjsLoader\" instead.\n See https://github.com/tomchentw/react-google-maps/pull/168"); // https://developers.google.com/maps/documentation/javascript/3.exp/reference#Map

        var map = new google.maps.Map(node);
        this.setState(function () {
          return {
            map: map
          };
        });
      }
    }, {
      key: "render",
      value: function render() {
        var _this$props2 = this.props,
            containerElement = _this$props2.containerElement,
            mapElement = _this$props2.mapElement,
            restProps = _objectWithoutProperties(_this$props2, ["containerElement", "mapElement"]);

        if (this.state.map) {
          return (0, _react.cloneElement)(containerElement, {}, (0, _react.cloneElement)(mapElement, {
            ref: this.handleComponentMount
          }), _react.default.createElement("div", null, factory(restProps)));
        } else {
          return (0, _react.cloneElement)(containerElement, {}, (0, _react.cloneElement)(mapElement, {
            ref: this.handleComponentMount
          }), _react.default.createElement("div", null));
        }
      }
    }]);

    return Container;
  }(_react.PureComponent);

  _defineProperty(Container, "displayName", "withGoogleMap(".concat((0, _recompose.getDisplayName)(BaseComponent), ")"));

  _defineProperty(Container, "propTypes", {
    containerElement: _propTypes.default.node.isRequired,
    mapElement: _propTypes.default.node.isRequired
  });

  _defineProperty(Container, "childContextTypes", _defineProperty({}, _constants.MAP, _propTypes.default.object));

  return Container;
}

var _default = withGoogleMap;
exports.default = _default;