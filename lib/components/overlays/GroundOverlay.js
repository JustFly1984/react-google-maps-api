"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.GroundOverlay = void 0;

var _react = require("react");

var _warning = _interopRequireDefault(require("warning"));

var _proptypes = require("../../proptypes");

var _map = require("../../utils/map");

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
  onDblClick: 'dblclick',
  onClick: 'click'
};
var defaultPropNameList = ['defaultOpacity'];
var propNameList = ['opacity', 'map'];
var defaultPropsMap = {
  defaultOpacity: 'setOpacity'
};
var propsMap = {
  map: 'setMap',
  opacity: 'setOpacity'
};
var updaterMap = {
  setMap: function setMap(instance, map) {
    instance.setMap(map);
  },
  setOpacity: function setOpacity(instance, opacity) {
    instance.setOpacity(opacity);
  }
};

var GroundOverlay =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(GroundOverlay, _PureComponent);

  function GroundOverlay(props) {
    var _this;

    _classCallCheck(this, GroundOverlay);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(GroundOverlay).call(this, props));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "componentWillUnmount", function () {
      if (_this.state.groundOverlay) {
        _this.state.groundOverlay.setMap(null);
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "render", function () {
      return null;
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getBounds", function () {
      return _this.state.groundOverlay.getBounds();
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getMap", function () {
      return _this.state.groundOverlay.getMap();
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getOpacity", function () {
      return _this.state.groundOverlay.getOpacity();
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getUrl", function () {
      return _this.state.groundOverlay.getUrl();
    });

    (0, _warning.default)(!(props.url || props.defaultUrl) || !(props.bounds || props.defaultBounds), "For GroundOveray, url and bounds are passed in to constructor and are immutable after iinstantiated. This is the behavior of Google Maps JavaScript API v3 ( See https://developers.google.com/maps/documentation/javascript/reference#GroundOverlay) Hence, use the corresponding two props provided by `react-google-maps`. They're prefixed with _default_ (defaultUrl, defaultBounds). In some cases, you'll need the GroundOverlay component to reflect the changes of url and bounds. You can leverage the React's key property to remount the component. Typically, just `key={url}` would serve your need. See https://github.com/tomchentw/react-google-maps/issues/655");
    var groundOverlay = new google.maps.GroundOverlay(props.url || props.defaultUrl, props.bounds || props.defaultBounds, props.options || props.defaultOptions);
    _this.state = {
      groundOverlay: groundOverlay,
      prevProps: {},
      registered: []
    };
    groundOverlay.setMap(props.map);
    return _this;
  }

  _createClass(GroundOverlay, null, [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      state.registered.length > 0 && state.registered.forEach(function (event, i) {
        google.maps.event.removeListener(event);
      });

      if (props.map !== null) {
        return {
          groundOverlay: state.groundOverlay,
          prevProps: Object.keys(state.prevProps).length === 0 ? defaultPropNameList.reduce(function (acc, propName) {
            if (typeof props[propName] !== 'undefined') {
              var shortPropName = propName.slice(7).toLowerCase();
              updaterMap[defaultPropsMap[propName]](props.map, props[propName]);
              acc[shortPropName] = props[propName];
            }

            return acc;
          }, {}) : propNameList.reduce(function (acc, propName) {
            if (typeof props[propName] !== 'undefined') {
              if (state.prevProps[propName] === props[propName]) {
                acc[propName] = state.prevProps[propName];
                return acc;
              } else {
                updaterMap[propsMap[propName]](props.map, props[propName]);
                acc[propName] = props[propName];
                return acc;
              }
            }

            return acc;
          }),
          registered: (0, _map.map)(eventMap, function (googleEventName, onEventName) {
            typeof props[onEventName] === 'function' && google.maps.event.addListener(props.map, googleEventName, props[onEventName]);
          })
        };
      }

      return {
        groundOverlay: state.groundOverlay,
        prevProps: state.prevProps,
        registered: state.registered
      };
    }
  }]);

  return GroundOverlay;
}(_react.PureComponent);

exports.GroundOverlay = GroundOverlay;

_defineProperty(GroundOverlay, "propTypes", _proptypes.GroundOverlayPropTypes);

var _default = GroundOverlay;
exports.default = _default;