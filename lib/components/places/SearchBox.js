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

  function SearchBox(_props, context) {
    var _this$state;

    var _this;

    _classCallCheck(this, SearchBox);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(SearchBox).call(this, _props, context));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleInitializeSearchBox", function () {
      if (!_canUseDom.default) {
        return;
      }

      var searchBox = new google.maps.places.SearchBox(_this.state.containerElement.querySelector('input'), _this.props.options);

      _this.setState(function (state, props) {
        var _ref;

        return _ref = {}, _defineProperty(_ref, _constants.SEARCH_BOX, searchBox), _defineProperty(_ref, "prevProps", (0, _MapChildHelper.construct)(_proptypes.SearchBoxPropTypes, updaterMap, props, searchBox)), _ref;
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getBounds", function () {
      return _this.state[_constants.SEARCH_BOX].getBounds();
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getPlaces", function () {
      return _this.state[_constants.SEARCH_BOX].getPlaces();
    });

    (0, _invariant.default)(google.maps.places, 'Did you include "libraries=places" in the URL?');
    _this.state = (_this$state = {
      context: context
    }, _defineProperty(_this$state, _constants.SEARCH_BOX, null), _defineProperty(_this$state, "prevProps", {}), _defineProperty(_this$state, "mountControlIndex", -1), _defineProperty(_this$state, "containerElement", _canUseDom.default ? document.createElement('div') : {}), _this$state);
    return _this;
  }

  _createClass(SearchBox, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.handleInitializeSearchBox();
      this.setState(function (state, props) {
        SearchBox.handleUnmountAtControlPosition(props, state);
        return {
          mountControlIndex: SearchBox.handleMountAtControlPosition(props, state)
        };
      });
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      (0, _MapChildHelper.componentWillUnmount)(this);
      SearchBox.handleUnmountAtControlPosition(this.props, this.state);
    }
  }, {
    key: "render",
    value: function render() {
      return (0, _reactDom.createPortal)(_react.Children.only(this.props.children), this.state.containerElement);
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      var obj = null;

      if (props.controlPosition !== state.prevProps.controlPosition) {
        SearchBox.handleUnmountAtControlPosition(props, state);
        obj = Object.assing({
          mountControlIndex: SearchBox.handleMountAtControlPosition(props, state)
        }, obj);
      }

      return Object.assing((0, _MapChildHelper.getDerivedStateFromProps)(props, state, this.state[_constants.SEARCH_BOX], eventMap, updaterMap), obj);
    }
  }, {
    key: "handleMountAtControlPosition",
    value: function handleMountAtControlPosition(props, state) {
      if (isValidControlPosition(props.controlPosition)) {
        return -1 + state.context[_constants.MAP].controls[props.controlPosition].push(this.state.containerElement.firstChild);
      }
    }
  }, {
    key: "handleUnmountAtControlPosition",
    value: function handleUnmountAtControlPosition(props, state) {
      if (isValidControlPosition(props.controlPosition)) {
        var child = state.context[_constants.MAP].controls[props.controlPosition].removeAt(state.mountControlIndex);

        if (child !== undefined) {
          state.containerElement.appendChild(child);
        }
      }
    }
  }]);

  return SearchBox;
}(_react.PureComponent);

exports.SearchBox = SearchBox;

_defineProperty(SearchBox, "contextTypes", _defineProperty({}, _constants.MAP, _propTypes.default.object));

var _default = SearchBox;
exports.default = _default;