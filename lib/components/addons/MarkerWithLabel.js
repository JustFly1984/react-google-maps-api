"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.MarkerWithLabel = void 0;

var _react = require("react");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _markerwithlabel = _interopRequireDefault(require("markerwithlabel"));

var _reactDom = require("react-dom");

var _MapChildHelper = require("../../utils/MapChildHelper");

var _constants = require("../../constants");

var _proptypes = require("../../proptypes");

var _defineProperty2;

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
  onDragEnd: 'dragend',
  onDragStart: 'dragstart',
  onMouseDown: 'mousedown',
  onMouseOut: 'mouseout',
  onMouseOver: 'mouseover',
  onMouseUp: 'mouseup',
  onRightClick: 'rightclick',
  onAnimationChanged: 'animation_changed',
  onClick: 'click',
  onClickableChanged: 'clickable_changed',
  onCursorChanged: 'cursor_changed',
  onDrag: 'drag',
  onDraggableChanged: 'draggable_changed',
  onFlatChanged: 'flat_changed',
  onIconChanged: 'icon_changed',
  onPositionChanged: 'position_changed',
  onShapeChanged: 'shape_changed',
  onTitleChanged: 'title_changed',
  onVisibleChanged: 'visible_changed',
  onZindexChanged: 'zindex_changed'
};
var updaterMap = {
  labelAnchor: function labelAnchor(instance, _labelAnchor) {
    instance.set("labelAnchor", _labelAnchor);
  },
  labelClass: function labelClass(instance, _labelClass) {
    instance.set("labelClass", _labelClass);
  },
  labelStyle: function labelStyle(instance, _labelStyle) {
    instance.set("labelStyle", _labelStyle);
  },
  labelVisible: function labelVisible(instance, _labelVisible) {
    instance.set("labelVisible", _labelVisible);
  },
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
  opacity: function opacity(instance, _opacity) {
    instance.setOpacity(_opacity);
  },
  options: function options(instance, _options) {
    instance.setOptions(_options);
  },
  place: function place(instance, _place) {
    instance.setPlace(_place);
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

var MarkerWithLabel =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(MarkerWithLabel, _PureComponent);

  function MarkerWithLabel(props, context) {
    var _this$state;

    var _this;

    _classCallCheck(this, MarkerWithLabel);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(MarkerWithLabel).call(this, props, context));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getAnimation", function () {
      return _this.state[_constants.MARKER_WITH_LABEL].getAnimation();
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getClickable", function () {
      return _this.state[_constants.MARKER_WITH_LABEL].getClickable();
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getCursor", function () {
      return _this.state[_constants.MARKER_WITH_LABEL].getCursor();
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getDraggable", function () {
      return _this.state[_constants.MARKER_WITH_LABEL].getDraggable();
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getIcon", function () {
      return _this.state[_constants.MARKER_WITH_LABEL].getIcon();
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getLabel", function () {
      return _this.state[_constants.MARKER_WITH_LABEL].getLabel();
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getOpacity", function () {
      return _this.state[_constants.MARKER_WITH_LABEL].getOpacity();
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getPlace", function () {
      return _this.state[_constants.MARKER_WITH_LABEL].getPlace();
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getPosition", function () {
      return _this.state[_constants.MARKER_WITH_LABEL].getPosition();
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getShape", function () {
      return _this.state[_constants.MARKER_WITH_LABEL].getShape();
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getTitle", function () {
      return _this.state[_constants.MARKER_WITH_LABEL].getTitle();
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getVisible", function () {
      return _this.state[_constants.MARKER_WITH_LABEL].getVisible();
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getZIndex", function () {
      return _this.state[_constants.MARKER_WITH_LABEL].getZIndex();
    });

    var NativeMarkerWithLabel = (0, _markerwithlabel.default)(google.maps);
    var markerWithLabel = new NativeMarkerWithLabel();
    _this.state = (_this$state = {}, _defineProperty(_this$state, _constants.MARKER_WITH_LABEL, markerWithLabel), _defineProperty(_this$state, "prevProps", (0, _MapChildHelper.construct)(_proptypes.MarkerWithLabelPropTypes, updaterMap, props, markerWithLabel)), _this$state);
    var markerClusterer = _this.context[_constants.MARKER_CLUSTERER];

    if (markerClusterer) {
      markerClusterer.addMarker(markerWithLabel, !!props.noRedraw);
    } else {
      markerWithLabel.setMap(_this.context[_constants.MAP]);
    }

    _this.containerElement = document.createElement('div');

    _this.state[_constants.MARKER_WITH_LABEL].set('labelContent', _this.containerElement);

    return _this;
  }

  _createClass(MarkerWithLabel, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      (0, _MapChildHelper.componentWillUnmount)(this);
      var markerWithLabel = this.state[_constants.MARKER_WITH_LABEL];

      if (markerWithLabel) {
        var markerClusterer = this.context[_constants.MARKER_CLUSTERER];

        if (markerClusterer) {
          markerClusterer.removeMarker(markerWithLabel, !!this.props.noRedraw);
        }

        markerWithLabel.setMap(null);
      }
    }
  }, {
    key: "render",
    value: function render() {
      return (0, _reactDom.createPortal)(_react.Children.only(this.props.children), this.containerElement);
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      return (0, _MapChildHelper.getDerivedStateFromProps)(props, state, this.state[_constants.MARKER_WITH_LABEL], eventMap, updaterMap);
    }
  }]);

  return MarkerWithLabel;
}(_react.PureComponent);

exports.MarkerWithLabel = MarkerWithLabel;

_defineProperty(MarkerWithLabel, "defaultProps", {
  labelVisible: true
});

_defineProperty(MarkerWithLabel, "contextTypes", (_defineProperty2 = {}, _defineProperty(_defineProperty2, _constants.MAP, _propTypes.default.object), _defineProperty(_defineProperty2, _constants.MARKER_CLUSTERER, _propTypes.default.object), _defineProperty2));

var _default = MarkerWithLabel;
exports.default = _default;