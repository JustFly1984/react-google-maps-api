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
    var _this;

    _classCallCheck(this, Marker);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Marker).call(this, props, context));
    var marker = new google.maps.Marker(props.options);
    (0, _MapChildHelper.construct)(_proptypes.MarkerPropTypes, updaterMap, _this.props, marker);
    var markerClusterer = _this.context[_constants.MARKER_CLUSTERER];

    if (markerClusterer) {
      markerClusterer.addMarker(marker, !!props.noRedraw);
    } else {
      marker.setMap(_this.context[_constants.MAP]);
    }

    _this.state = _defineProperty({}, _constants.MARKER, marker);
    _this.getAnimation = _this.getAnimation.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.getClickable = _this.getClickable.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.getCursor = _this.getCursor.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.getDraggable = _this.getDraggable.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.getIcon = _this.getIcon.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.getLabel = _this.getLabel.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.getMap = _this.getMap(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.getOpacity = _this.getOpacity.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.getPosition = _this.getPosition.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.getShape = _this.getShape.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.getTitle = _this.getTitle.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.getVisible = _this.getVisible.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.getZIndex = _this.getZIndex.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(Marker, [{
    key: "getChildContext",
    value: function getChildContext() {
      return _defineProperty({}, _constants.ANCHOR, this.context[_constants.ANCHOR] || this.state[_constants.MARKER]);
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      (0, _MapChildHelper.componentDidMount)(this, this.state[_constants.MARKER], eventMap);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      (0, _MapChildHelper.componentDidUpdate)(this, this.state[_constants.MARKER], eventMap, updaterMap, prevProps);
    }
  }, {
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
  }, {
    key: "getAnimation",
    value: function getAnimation() {
      return this.state[_constants.MARKER].getAnimation();
    }
  }, {
    key: "getClickable",
    value: function getClickable() {
      return this.state[_constants.MARKER].getClickable();
    }
  }, {
    key: "getCursor",
    value: function getCursor() {
      return this.state[_constants.MARKER].getCursor();
    }
  }, {
    key: "getDraggable",
    value: function getDraggable() {
      return this.state[_constants.MARKER].getDraggable();
    }
  }, {
    key: "getIcon",
    value: function getIcon() {
      return this.state[_constants.MARKER].getIcon();
    }
  }, {
    key: "getLabel",
    value: function getLabel() {
      return this.state[_constants.MARKER].getLabel();
    }
  }, {
    key: "getMap",
    value: function getMap() {
      return this.state[_constants.MARKER].getMap();
    }
  }, {
    key: "getOpacity",
    value: function getOpacity() {
      return this.state[_constants.MARKER].getOpacity();
    }
  }, {
    key: "getPosition",
    value: function getPosition() {
      return this.state[_constants.MARKER].getPosition();
    }
  }, {
    key: "getShape",
    value: function getShape() {
      return this.state[_constants.MARKER].getShape();
    }
  }, {
    key: "getTitle",
    value: function getTitle() {
      return this.state[_constants.MARKER].getTitle();
    }
  }, {
    key: "getVisible",
    value: function getVisible() {
      return this.state[_constants.MARKER].getVisible();
    }
  }, {
    key: "getZIndex",
    value: function getZIndex() {
      return this.state[_constants.MARKER].getZIndex();
    }
  }]);

  return Marker;
}(_react.PureComponent);

exports.Marker = Marker;

_defineProperty(Marker, "propTypes", _proptypes.MarkerPropTypes);

_defineProperty(Marker, "contextTypes", (_defineProperty2 = {}, _defineProperty(_defineProperty2, _constants.MAP, _propTypes.default.object), _defineProperty(_defineProperty2, _constants.MARKER_CLUSTERER, _propTypes.default.object), _defineProperty2));

_defineProperty(Marker, "childContextTypes", _defineProperty({}, _constants.ANCHOR, _propTypes.default.object));

var _default = Marker;
exports.default = _default;