"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Marker = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _MapChildHelper = require("../../utils/MapChildHelper");

var _constants = require("../../constants");

var _proptypes = require("../../proptypes");

var _defineProperty2;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

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
  onAnimationChanged: 'animation_changed',
  onClick: 'click',
  onClickableChanged: 'clickable_changed',
  onCursorChanged: 'cursor_changed',
  onDblClick: 'dblclick',
  onDrag: 'drag',
  onDragEnd: 'dragend',
  onDraggableChanged: 'draggable_changed',
  onDragStart: 'dragstart',
  onFlatChanged: 'flat_changed',
  onIconChanged: 'icon_changed',
  onMouseDown: 'mousedown',
  onMouseOut: 'mouseout',
  onMouseOver: 'mouseover',
  onMouseUp: 'mouseup',
  onPositionChanged: 'position_changed',
  onRightClick: 'rightclick',
  onShapeChanged: 'shape_changed',
  onTitleChanged: 'title_changed',
  onVisibleChanged: 'visible_changed',
  onZindexChanged: 'zindex_changed'
};
var updaterMap = {
  animation: function animation(instance, _animation) {
    instance.setAnimation(_animation);
  },
  clickable: function clickable(instance, _clickable) {
    instance.setClickable(_clickable);
  },
  cursor: function cursor(instance, _cursor) {
    instance.setCursor(_cursor);
  },
  draggable: function draggable(instance, _draggable) {
    instance.setDraggable(_draggable);
  },
  icon: function icon(instance, _icon) {
    instance.setIcon(_icon);
  },
  label: function label(instance, _label) {
    instance.setLabel(_label);
  },
  map: function map(instance, _map) {
    instance.setMap(_map);
  },
  opacity: function opacity(instance, _opacity) {
    instance.setOpacity(_opacity);
  },
  options: function options(instance, _options) {
    instance.setOptions(_options);
  },
  position: function position(instance, _position) {
    instance.setPosition(_position);
  },
  shape: function shape(instance, _shape) {
    instance.setShape(_shape);
  },
  title: function title(instance, _title) {
    instance.setTitle(_title);
  },
  visible: function visible(instance, _visible) {
    instance.setVisible(_visible);
  },
  zIndex: function zIndex(instance, _zIndex) {
    instance.setZIndex(_zIndex);
  }
};

var Marker =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(Marker, _PureComponent);

  function Marker(props, context) {
    var _this$state;

    var _this;

    _classCallCheck(this, Marker);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Marker).call(this, props, context));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getChildContext", function () {
      return _defineProperty({}, _constants.ANCHOR, _this.context[_constants.ANCHOR] || _this.state[_constants.MARKER]);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getAnimation", function () {
      return _this.state[_constants.MARKER].getAnimation();
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getClickable", function () {
      return _this.state[_constants.MARKER].getClickable();
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getCursor", function () {
      return _this.state[_constants.MARKER].getCursor();
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getDraggable", function () {
      return _this.state[_constants.MARKER].getDraggable();
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getIcon", function () {
      return _this.state[_constants.MARKER].getIcon();
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getLabel", function () {
      return _this.state[_constants.MARKER].getLabel();
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getMap", function () {
      return _this.state[_constants.MARKER].getMap();
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getOpacity", function () {
      return _this.state[_constants.MARKER].getOpacity();
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getPosition", function () {
      return _this.state[_constants.MARKER].getPosition();
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getShape", function () {
      return _this.state[_constants.MARKER].getShape();
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getTitle", function () {
      return _this.state[_constants.MARKER].getTitle();
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getVisible", function () {
      return _this.state[_constants.MARKER].getVisible();
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getZIndex", function () {
      return _this.state[_constants.MARKER].getZIndex();
    });

    var marker = new google.maps.Marker(props.options);
    _this.state = (_this$state = {}, _defineProperty(_this$state, _constants.MARKER, marker), _defineProperty(_this$state, "prevProps", (0, _MapChildHelper.construct)(_proptypes.MarkerPropTypes, updaterMap, _this.props, marker)), _this$state);
    var markerClusterer = _this.context[_constants.MARKER_CLUSTERER];

    if (markerClusterer) {
      markerClusterer.addMarker(marker, !!props.noRedraw);
    } else {
      marker.setMap(_this.context[_constants.MAP]);
    }

    return _this;
  }

  _createClass(Marker, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      (0, _MapChildHelper.componentWillUnmount)(this);
      var marker = this.state[_constants.MARKER];

      if (marker) {
        var markerClusterer = this.context[_constants.MARKER_CLUSTERER];

        if (markerClusterer) {
          markerClusterer.removeMarker(marker, !!this.props.noRedraw);
        }

        marker.setMap(null);
      }
    }
  }, {
    key: "render",
    value: function render() {
      return _react.default.createElement("div", null, this.props.children);
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      return (0, _MapChildHelper.getDerivedStateFromProps)(props, state, this.state[_constants.MARKER], eventMap, updaterMap);
    }
  }]);

  return Marker;
}(_react.PureComponent);

exports.Marker = Marker;

_defineProperty(Marker, "contextTypes", (_defineProperty2 = {}, _defineProperty(_defineProperty2, _constants.MAP, _propTypes.default.object), _defineProperty(_defineProperty2, _constants.MARKER_CLUSTERER, _propTypes.default.object), _defineProperty2));

_defineProperty(Marker, "childContextTypes", _defineProperty({}, _constants.ANCHOR, _propTypes.default.object));

var _default = Marker;
exports.default = _default;