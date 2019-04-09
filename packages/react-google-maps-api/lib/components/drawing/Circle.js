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
    onCenterChanged: "center_changed",
    onClick: "click",
    onDblClick: "dblclick",
    onDrag: "drag",
    onDragEnd: "dragend",
    onDragStart: "dragstart",
    onMouseDown: "mousedown",
    onMouseMove: "mousemove",
    onMouseOut: "mouseout",
    onMouseOver: "mouseover",
    onMouseUp: "mouseup",
    onRadiusChanged: "radius_changed",
    onRightClick: "rightclick"
};
var updaterMap = {
    center: function (instance, center) {
        instance.setCenter(center);
    },
    draggable: function (instance, draggable) {
        instance.setDraggable(draggable);
    },
    editable: function (instance, editable) {
        instance.setEditable(editable);
    },
    map: function (instance, map) {
        instance.setMap(map);
    },
    options: function (instance, options) {
        instance.setOptions(options);
    },
    radius: function (instance, radius) {
        instance.setRadius(radius);
    },
    visible: function (instance, visible) {
        instance.setVisible(visible);
    }
};
var Circle = (function (_super) {
    __extends(Circle, _super);
    function Circle() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.registeredEvents = [];
        _this.state = {
            circle: null
        };
        _this.setCircleCallback = function () {
            if (_this.state.circle !== null && _this.props.onLoad) {
                _this.props.onLoad(_this.state.circle);
            }
        };
        return _this;
    }
    Circle.prototype.componentDidMount = function () {
        var circle = new google.maps.Circle(__assign({}, (this.props.options || {}), { map: this.context }));
        this.registeredEvents = helper_1.applyUpdatersToPropsAndRegisterEvents({
            updaterMap: updaterMap,
            eventMap: eventMap,
            prevProps: {},
            nextProps: this.props,
            instance: circle
        });
        function setCircle() {
            return {
                circle: circle
            };
        }
        this.setState(setCircle, this.setCircleCallback);
    };
    Circle.prototype.componentDidUpdate = function (prevProps) {
        if (this.state.circle !== null) {
            helper_1.unregisterEvents(this.registeredEvents);
            this.registeredEvents = helper_1.applyUpdatersToPropsAndRegisterEvents({
                updaterMap: updaterMap,
                eventMap: eventMap,
                prevProps: prevProps,
                nextProps: this.props,
                instance: this.state.circle
            });
        }
    };
    Circle.prototype.componentWillUnmount = function () {
        if (this.state.circle !== null) {
            if (this.props.onUnmount) {
                this.props.onUnmount(this.state.circle);
            }
            helper_1.unregisterEvents(this.registeredEvents);
            this.state.circle && this.state.circle.setMap(null);
        }
    };
    Circle.prototype.render = function () {
        return React.createElement(React.Fragment, null);
    };
    Circle.contextType = map_context_1.default;
    return Circle;
}(React.PureComponent));
exports.Circle = Circle;
exports.default = Circle;
