"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.BicyclingLayer = void 0;

var _react = require("react");

var _proptypes = require("../../proptypes");

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

var propsMap = {
  map: 'setMap'
};
var propNameList = ['map'];
var updaterMap = {
  setMap: function setMap(instance, map) {
    instance.setMap(map);
  }
};

var BicyclingLayer =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(BicyclingLayer, _PureComponent);

  function BicyclingLayer(props) {
    var _this;

    _classCallCheck(this, BicyclingLayer);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(BicyclingLayer).call(this, props));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "componentDidMount", function () {
      console.log('BicyclingLayer didMount');
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getMap", function () {
      return _this.state.bicyclingLayer.getMap();
    });

    _this.state = {
      bicyclingLayer: null,
      prevProps: {}
    };
    return _this;
  }

  _createClass(BicyclingLayer, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.state.bicyclingLayer !== null) {
        this.state.bicyclingLayer.setMap(null);
      }
    }
  }, {
    key: "render",
    value: function render() {
      return null;
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      console.log('BicyclingLayer getDerivedStateFromProps map: ', props.map);
      console.log('BicyclingLayer getDerivedStateFromProps loaded: ', props.loaded);

      if (props.loaded && props.map !== null) {
        var bicyclingLayer = state.bicyclingLayer === null ? new google.maps.BicyclingLayer() : state.bicyclingLayer;

        if (state.bicyclingLayer === null) {
          console.log('BicyclingLayer componentDidMount map: ', props.map);
          bicyclingLayer.setMap(props.map);
        }

        return {
          bicyclingLayer: bicyclingLayer,
          prevProps: propNameList.reduce(function (acc, propName) {
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
          })
        };
      }

      return {
        bicyclingLayer: state.bicyclingLayer,
        prevProps: state.prevProps
      };
    }
  }]);

  return BicyclingLayer;
}(_react.PureComponent);

exports.BicyclingLayer = BicyclingLayer;

_defineProperty(BicyclingLayer, "propTypes", _proptypes.BicyclingLayerPropTypes);

var _default = BicyclingLayer;
exports.default = _default;