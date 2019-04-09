"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var helper_1 = require("../../utils/helper");
var map_context_1 = require("../../map-context");
var eventMap = {
    onAnimationChanged: "animation_changed",
    onClick: "click",
    onClickableChanged: "clickable_changed",
    onCursorChanged: "cursor_changed",
    onDblClick: "dblclick",
    onDrag: "drag",
    onDragEnd: "dragend",
    onDraggableChanged: "draggable_changed",
    onDragStart: "dragstart",
    onFlatChanged: "flat_changed",
    onIconChanged: "icon_changed",
    onMouseDown: "mousedown",
    onMouseOut: "mouseout",
    onMouseOver: "mouseover",
    onMouseUp: "mouseup",
    onPositionChanged: "position_changed",
    onRightClick: "rightclick",
    onShapeChanged: "shape_changed",
    onTitleChanged: "title_changed",
    onVisibleChanged: "visible_changed",
    onZindexChanged: "zindex_changed"
};
var updaterMap = {
    animation: function (instance, animation) {
        instance.setAnimation(animation);
    },
    clickable: function (instance, clickable) {
        instance.setClickable(clickable);
    },
    cursor: function (instance, cursor) {
        instance.setCursor(cursor);
    },
    draggable: function (instance, draggable) {
        instance.setDraggable(draggable);
    },
    icon: function (instance, icon) {
        instance.setIcon(icon);
    },
    label: function (instance, label) {
        instance.setLabel(label);
    },
    map: function (instance, map) {
        instance.setMap(map);
    },
    opacity: function (instance, opacity) {
        instance.setOpacity(opacity);
    },
    options: function (instance, options) {
        instance.setOptions(options);
    },
    position: function (instance, position) {
        instance.setPosition(position);
    },
    shape: function (instance, shape) {
        instance.setShape(shape);
    },
    title: function (instance, title) {
        instance.setTitle(title);
    },
    visible: function (instance, visible) {
        instance.setVisible(visible);
    },
    zIndex: function (instance, zIndex) {
        instance.setZIndex(zIndex);
    }
};
var Marker = (function (_super) {
    __extends(Marker, _super);
    function Marker() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.registeredEvents = [];
        _this.state = {
            marker: null
        };
        _this.setMarkerCallback = function () {
            if (_this.state.marker !== null && _this.props.onLoad) {
                _this.props.onLoad(_this.state.marker);
            }
        };
        return _this;
    }
    Marker.prototype.componentDidMount = function () {
        var markerOptions = __assign({}, (this.props.options || {}), (this.props.clusterer ? {} : { map: this.context }), { position: this.props.position });
        var marker = new google.maps.Marker(markerOptions);
        if (this.props.clusterer) {
            this.props.clusterer.addMarker(marker, !!this.props.noClustererRedraw);
        }
        else {
            marker.setMap(this.context);
        }
        this.registeredEvents = helper_1.applyUpdatersToPropsAndRegisterEvents({
            updaterMap: updaterMap,
            eventMap: eventMap,
            prevProps: {},
            nextProps: this.props,
            instance: marker
        });
        function setMarker() {
            return {
                marker: marker
            };
        }
        this.setState(setMarker, this.setMarkerCallback);
    };
    Marker.prototype.componentDidUpdate = function (prevProps) {
        if (this.state.marker !== null) {
            helper_1.unregisterEvents(this.registeredEvents);
            this.registeredEvents = helper_1.applyUpdatersToPropsAndRegisterEvents({
                updaterMap: updaterMap,
                eventMap: eventMap,
                prevProps: prevProps,
                nextProps: this.props,
                instance: this.state.marker
            });
        }
    };
    Marker.prototype.componentWillUnmount = function () {
        if (this.state.marker !== null) {
            if (this.props.onUnmount) {
                this.props.onUnmount(this.state.marker);
            }
            helper_1.unregisterEvents(this.registeredEvents);
            if (this.props.clusterer) {
                this.props.clusterer.removeMarker(this.state.marker, !!this.props.noClustererRedraw);
            }
            else {
                this.state.marker && this.state.marker.setMap(null);
            }
        }
    };
    Marker.prototype.render = function () {
        return this.props.children || null;
    };
    Marker.contextType = map_context_1.default;
    return Marker;
}(React.PureComponent));
exports.Marker = Marker;
exports.default = Marker;
