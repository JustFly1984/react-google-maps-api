"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.GoogleMapProvider = exports.LoadScript = void 0;

var _react = require("react");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _invariant = _interopRequireDefault(require("invariant"));

var _proptypes = require("./proptypes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var isInstalled = false;

var LoadScript =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(LoadScript, _PureComponent);

  function LoadScript(props) {
    var _this;

    _classCallCheck(this, LoadScript);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(LoadScript).call(this, props));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "componentDidMount", function () {
      if (!isInstalled) {
        var scriptjs = require("scriptjs");

        var _this$props = _this.props,
            googleMapsApiKey = _this$props.googleMapsApiKey,
            language = _this$props.language,
            region = _this$props.region,
            version = _this$props.version;
        scriptjs(["https://maps.googleapis.com/maps/api/js?v=".concat(version, "&key=").concat(googleMapsApiKey, "&language=").concat(language, "&region=").concat(region)], 'googlemaps');
        scriptjs.ready('googlemaps', function () {
          isInstalled = true;

          _this.props.onLoad();

          _this.setState(function () {
            return {
              loaded: true
            };
          });
        });
      }

      if (isInstalled) {
        _this.props.onLoad();

        _this.setState(function () {
          return {
            loaded: true
          };
        });
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "render", function () {
      return _this.props.render({
        loaded: _this.state.loaded
      });
    });

    _this.state = {
      loaded: false
    };
    (0, _invariant.default)(props.googleMapsApiKey, 'Required prop googleMapsApiKey is missingin <LoadScript />.');
    (0, _invariant.default)(props.language, 'Required prop language is missing in <LoadScript />.');
    (0, _invariant.default)(props.region, 'Required prop region is missing in <LoadScript />.');
    (0, _invariant.default)(props.version, 'Required prop version is missing in <LoadScript />.');
    return _this;
  }

  return LoadScript;
}(_react.PureComponent);

exports.LoadScript = LoadScript;

var GoogleMapProvider =
/*#__PURE__*/
function (_PureComponent2) {
  _inherits(GoogleMapProvider, _PureComponent2);

  function GoogleMapProvider() {
    var _getPrototypeOf2;

    var _this2;

    _classCallCheck(this, GoogleMapProvider);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this2 = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(GoogleMapProvider)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this2)), "state", {
      map: null
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this2)), "componentDidMount", function () {
      console.log("Provider id ".concat(_this2.props.id, " did mount"));
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this2)), "getRef", function (ref) {
      _this2.setState(function () {
        return {
          map: new google.maps.Map(ref)
        };
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this2)), "render", function () {
      return _this2.props.loaded ? _this2.props.render({
        map: _this2.state.map,
        mapRef: _this2.getRef
      }) : _this2.props.loadingElement;
    });

    return _this2;
  }

  _createClass(GoogleMapProvider, null, [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props) {
      (0, _invariant.default)(!!props.loadingElement, 'Required prop loadingElement is missing in <GoogleMapProvider />.');
      return null;
    }
  }]);

  return GoogleMapProvider;
}(_react.PureComponent);

exports.GoogleMapProvider = GoogleMapProvider;
var _default = GoogleMapProvider;
exports.default = _default;