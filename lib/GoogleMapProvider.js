"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.withGoogleMapContext = exports.GoogleMapProvider = exports.GoogleMapContext = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _invariant = _interopRequireDefault(require("invariant"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var isInstalled = false;
var isLoading = false;
var GoogleMapProviderPropTypes = {
  children: _propTypes.default.node.isRequired,
  loadingElement: _propTypes.default.node.isRequired,
  googleMapsApiKey: _propTypes.default.string.isRequired,
  language: _propTypes.default.string.isRequired,
  region: _propTypes.default.string.isRequired,
  version: _propTypes.default.string.isRequired
};
var GoogleMapContext = (0, _react.createContext)('map');
exports.GoogleMapContext = GoogleMapContext;

var GoogleMapProvider =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(GoogleMapProvider, _PureComponent);

  function GoogleMapProvider(props) {
    var _this;

    _classCallCheck(this, GoogleMapProvider);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(GoogleMapProvider).call(this, props));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "componentDidMount", function () {
      console.log('provider did mount');

      if (!isInstalled && !isLoading) {
        isLoading = true;

        var scriptjs = require("scriptjs");

        var _this$props = _this.props,
            googleMapsApiKey = _this$props.googleMapsApiKey,
            language = _this$props.language,
            region = _this$props.region,
            version = _this$props.version;
        scriptjs(["https://maps.googleapis.com/maps/api/js?v=".concat(version, "&key=").concat(googleMapsApiKey, "&language=").concat(language, "&region=").concat(region)], 'googlemaps');
        scriptjs.ready('googlemaps', function () {
          isInstalled = true;
          isLoading = false;

          _this.setState(function () {
            return {
              loaded: true
            };
          });
        });
      }

      if (isInstalled && !isLoading) {
        _this.setState(function () {
          return {
            loaded: true
          };
        });
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getRef", function (ref) {
      _this.setState(function () {
        return {
          map: new google.maps.Map(ref)
        };
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "render", function () {
      var value = {
        // eslint-disable-line react-perf/jsx-no-new-object-as-prop
        map: _this.state.map,
        mapRef: _this.getRef
      };
      console.log('value: ', value);
      return _react.default.createElement(GoogleMapContext.Provider, {
        value: value
      }, isInstalled && !isLoading && _this.state.loaded ? _this.props.children : _this.props.loadingElement);
    });

    _this.state = {
      loaded: false,
      map: null
    };
    return _this;
  }

  _createClass(GoogleMapProvider, null, [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      (0, _invariant.default)(!!props.loadingElement, 'Required prop loadingElement is missing in <GoogleMapProvider />.');
      (0, _invariant.default)(props.googleMapsApiKey, 'Required prop googleMapsApiKey is missingin <GoogleMapProvider />.');
      (0, _invariant.default)(props.googleMapsApiKey, 'Required prop googleMapsApiKey is missing in <GoogleMapProvider />.');
      (0, _invariant.default)(props.language, 'Required prop language is missing in <GoogleMapProvider />.');
      (0, _invariant.default)(props.region, 'Required prop region is missing in <GoogleMapProvider />.');
      (0, _invariant.default)(props.version, 'Required prop version is missing in <GoogleMapProvider />.');

      if (isInstalled && !isLoading) {
        return {
          loaded: true
        };
      }

      return null;
    }
  }]);

  return GoogleMapProvider;
}(_react.PureComponent);

exports.GoogleMapProvider = GoogleMapProvider;

_defineProperty(GoogleMapProvider, "propTypes", GoogleMapProviderPropTypes);

var withGoogleMapContext = function withGoogleMapContext(BaseComponent) {
  console.log('withGoogleMapContext BaseComponent: ', BaseComponent);
  return (
    /*#__PURE__*/
    function (_Component) {
      _inherits(GoogleMapContextContainer, _Component);

      function GoogleMapContextContainer() {
        var _getPrototypeOf2;

        var _this2;

        _classCallCheck(this, GoogleMapContextContainer);

        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        _this2 = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(GoogleMapContextContainer)).call.apply(_getPrototypeOf2, [this].concat(args)));

        _defineProperty(_assertThisInitialized(_assertThisInitialized(_this2)), "render", function () {
          return _react.default.createElement(GoogleMapContext.Consumer, null, function (_ref) {
            var map = _ref.map,
                mapRef = _ref.mapRef;
            console.log('map: ', map, ' mapRef: ', mapRef);
            return _react.default.createElement(BaseComponent, _extends({
              map: map,
              mapRef: mapRef
            }, _this2.props));
          });
        });

        return _this2;
      }

      return GoogleMapContextContainer;
    }(_react.Component)
  );
};

exports.withGoogleMapContext = withGoogleMapContext;
var _default = GoogleMapProvider;
exports.default = _default;