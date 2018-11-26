"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.SearchBox = void 0;

var _react = require("react");

var _reactDom = require("react-dom");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _invariant = _interopRequireDefault(require("invariant"));

var _canUseDom = _interopRequireDefault(require("can-use-dom"));

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

var isValidControlPosition = function isValidControlPosition(value) {
  return typeof value === 'number';
};

var eventMap = {
  onPlacesChanged: 'places_changed'
};
var updaterMap = {
  bounds: function bounds(instance, _bounds) {
    instance.setBounds(_bounds);
  }
};

var SearchBox =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(SearchBox, _PureComponent);

  function SearchBox(props, context) {
    var _this;

    _classCallCheck(this, SearchBox);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(SearchBox).call(this, props, context));
    _this.state = _defineProperty({}, _constants.SEARCH_BOX, null);
    _this.handleInitializeSearchBox = _this.handleInitializeSearchBox.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleRenderChildToContainerElement = _this.handleRenderChildToContainerElement.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleMountAtControlPosition = _this.handleMountAtControlPosition.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleUnmountAtControlPosition = _this.handleUnmountAtControlPosition.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.getBounds = _this.getBounds.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.getPlaces = _this.getPlaces.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(SearchBox, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      if (!_canUseDom.default || this.containerElement) {
        return;
      }

      (0, _invariant.default)(google.maps.places, "Did you include \"libraries=places\" in the URL?");
      this.containerElement = document.createElement("div");
      this.handleRenderChildToContainerElement();

      if (_react.version.match(/^16/)) {
        return;
      }

      this.handleInitializeSearchBox();
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var searchBox = this.state[_constants.SEARCH_BOX];

      if (_react.version.match(/^16/)) {
        searchBox = this.handleInitializeSearchBox();
      }

      (0, _MapChildHelper.componentDidMount)(this, searchBox, eventMap);
      this.handleMountAtControlPosition();
    }
  }, {
    key: "componentWillUpdate",
    value: function componentWillUpdate(nextProp) {
      if (this.props.controlPosition !== nextProp.controlPosition) {
        this.handleUnmountAtControlPosition();
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      (0, _MapChildHelper.componentDidUpdate)(this, this.state[_constants.SEARCH_BOX], eventMap, updaterMap, prevProps);

      if (this.props.children !== prevProps.children) {
        this.handleRenderChildToContainerElement();
      }

      if (this.props.controlPosition !== prevProps.controlPosition) {
        this.handleMountAtControlPosition();
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      (0, _MapChildHelper.componentWillUnmount)(this);
      this.handleUnmountAtControlPosition();

      if (_react.version.match(/^16/)) {
        return;
      }

      if (this.containerElement) {
        (0, _reactDom.unmountComponentAtNode)(this.containerElement);
        this.containerElement = null;
      }
    }
  }, {
    key: "render",
    value: function render() {
      if (_react.version.match(/^16/)) {
        return (0, _reactDom.createPortal)(_react.Children.only(this.props.children), this.containerElement);
      }

      return false;
    }
  }, {
    key: "handleInitializeSearchBox",
    value: function handleInitializeSearchBox() {
      var searchBox = new google.maps.places.SearchBox(this.containerElement.querySelector('input'), this.props.options);
      (0, _MapChildHelper.construct)(_proptypes.SearchBoxPropTypes, updaterMap, this.pprops, searchBox);
      this.setState(function () {
        return _defineProperty({}, _constants.SEARCH_BOX, searchBox);
      });
      return searchBox;
    }
  }, {
    key: "handleRenderChildToContainerElement",
    value: function handleRenderChildToContainerElement() {
      if (_react.version.match(/^16/)) {
        return;
      }

      (0, _reactDom.unstable_renderSubtreeIntoContainer)(this, _react.Children.only(this.props.children), this.containerElement);
    }
  }, {
    key: "handleMountAtControlPosition",
    value: function handleMountAtControlPosition() {
      if (isValidControlPosition(this.props.controlPosition)) {
        this.mountControlIndex = -1 + this.context[_constants.MAP].controls[this.props.controlPosition].push(this.containerElement.firstChild);
      }
    }
  }, {
    key: "handleUnmountAtControlPosition",
    value: function handleUnmountAtControlPosition() {
      if (isValidControlPosition(this.props.controlPosition)) {
        var child = this.context[_constants.MAP].controls[this.props.controlPosition].removeAt(this.mountControlIndex);

        if (child !== undefined) {
          this.containerElement.appendChild(child);
        }
      }
    }
  }, {
    key: "getBounds",
    value: function getBounds() {
      return this.state[_constants.SEARCH_BOX].getBounds();
    }
  }, {
    key: "getPlaces",
    value: function getPlaces() {
      return this.state[_constants.SEARCH_BOX].getPlaces();
    }
  }]);

  return SearchBox;
}(_react.PureComponent);

exports.SearchBox = SearchBox;

_defineProperty(SearchBox, "propTypes", _proptypes.SearchBoxPropTypes);

_defineProperty(SearchBox, "contextTypes", _defineProperty({}, _constants.MAP, _propTypes.default.object));

var _default = SearchBox;
exports.default = _default;