"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = require("react");

var _reactDom = require("react-dom");

var _invariant = _interopRequireDefault(require("invariant"));

var _MapChildHelper = require("../../utils/MapChildHelper");

var _constants = require("../../constants");

var _proptypes = require("../../proptypes");

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
  onPlacesChanged: 'places_changed'
};
var updaterMap = {
  bounds: function bounds(instance, _bounds) {
    instance.setBounds(_bounds);
  }
};

var StandaloneSearchBox =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(StandaloneSearchBox, _PureComponent);

  function StandaloneSearchBox(props) {
    var _this;

    _classCallCheck(this, StandaloneSearchBox);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(StandaloneSearchBox).call(this, props));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", _defineProperty({}, _constants.STANDALONE_SEARCH_BOX, null));

    _this.getBounds = _this.getBounds.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.getPlaces = _this.getPlaces.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(StandaloneSearchBox, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      (0, _invariant.default)(google.maps.places, "Did you include \"libraries=places\" in the URL?"); // TODO: get rid of findDOMNode
      // eslint-disable-next-line react/no-find-dom-node

      var element = (0, _reactDom.findDOMNode)(this);
      var searchBox = new google.maps.places.SearchBox(element.querySelector('input') || element, this.props.options);
      (0, _MapChildHelper.construct)(_proptypes.SearchBoxPropTypes, updaterMap, this.props, searchBox);
      (0, _MapChildHelper.componentDidMount)(this, searchBox, eventMap);
      this.setState(function () {
        return _defineProperty({}, _constants.STANDALONE_SEARCH_BOX, searchBox);
      });
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      (0, _MapChildHelper.componentDidUpdate)(this, this.state[_constants.STANDALONE_SEARCH_BOX], eventMap, updaterMap, prevProps);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      (0, _MapChildHelper.componentWillUnmount)(this);
    }
  }, {
    key: "render",
    value: function render() {
      return _react.Children.only(this.props.children);
    }
  }, {
    key: "getBounds",
    value: function getBounds() {
      return this.state[_constants.STANDALONE_SEARCH_BOX].getBounds();
    }
  }, {
    key: "getPlaces",
    value: function getPlaces() {
      return this.state[_constants.STANDALONE_SEARCH_BOX].getPlaces();
    }
  }]);

  return StandaloneSearchBox;
}(_react.PureComponent);

_defineProperty(StandaloneSearchBox, "propTypes", _proptypes.SearchBoxPropTypes);

var _default = StandaloneSearchBox;
exports.default = _default;