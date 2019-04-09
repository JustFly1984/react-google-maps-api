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
    onBoundsChanged: "bounds_changed",
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
    onRightClick: "rightclick"
};
var updaterMap = {
    bounds: function (instance, bounds) {
        instance.setBounds(bounds);
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
    visible: function (instance, visible) {
        instance.setVisible(visible);
    }
};
var Rectangle = (function (_super) {
    __extends(Rectangle, _super);
    function Rectangle() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.registeredEvents = [];
        _this.state = {
            rectangle: null
        };
        _this.setRectangleCallback = function () {
            if (_this.state.rectangle !== null && _this.props.onLoad) {
                _this.props.onLoad(_this.state.rectangle);
            }
        };
        return _this;
    }
    Rectangle.prototype.componentDidMount = function () {
        var rectangle = new google.maps.Rectangle(__assign({}, (this.props.options || {}), { map: this.context }));
        this.registeredEvents = helper_1.applyUpdatersToPropsAndRegisterEvents({
            updaterMap: updaterMap,
            eventMap: eventMap,
            prevProps: {},
            nextProps: this.props,
            instance: rectangle
        });
        function setRectangle() {
            return {
                rectangle: rectangle
            };
        }
        this.setState(setRectangle, this.setRectangleCallback);
    };
    Rectangle.prototype.componentDidUpdate = function (prevProps) {
        if (this.state.rectangle !== null) {
            helper_1.unregisterEvents(this.registeredEvents);
            this.registeredEvents = helper_1.applyUpdatersToPropsAndRegisterEvents({
                updaterMap: updaterMap,
                eventMap: eventMap,
                prevProps: prevProps,
                nextProps: this.props,
                instance: this.state.rectangle
            });
        }
    };
    Rectangle.prototype.componentWillUnmount = function () {
        if (this.state.rectangle !== null) {
            if (this.props.onUnmount) {
                this.props.onUnmount(this.state.rectangle);
            }
            helper_1.unregisterEvents(this.registeredEvents);
            this.state.rectangle.setMap(null);
        }
    };
    Rectangle.prototype.render = function () {
        return React.createElement(React.Fragment, null);
    };
    Rectangle.contextType = map_context_1.default;
    return Rectangle;
}(React.PureComponent));
exports.Rectangle = Rectangle;
exports.default = Rectangle;
