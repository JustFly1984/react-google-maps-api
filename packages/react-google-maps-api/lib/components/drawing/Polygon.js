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
    path: function (instance, path) {
        instance.setPath(path);
    },
    paths: function (instance, paths) {
        instance.setPaths(paths);
    },
    visible: function (instance, visible) {
        instance.setVisible(visible);
    }
};
var Polygon = (function (_super) {
    __extends(Polygon, _super);
    function Polygon() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.registeredEvents = [];
        _this.state = {
            polygon: null
        };
        _this.setPolygonCallback = function () {
            if (_this.state.polygon !== null && _this.props.onLoad) {
                _this.props.onLoad(_this.state.polygon);
            }
        };
        _this.render = function () { return null; };
        return _this;
    }
    Polygon.prototype.componentDidMount = function () {
        var polygon = new google.maps.Polygon(__assign({}, (this.props.options || {}), { map: this.context }));
        this.registeredEvents = helper_1.applyUpdatersToPropsAndRegisterEvents({
            updaterMap: updaterMap,
            eventMap: eventMap,
            prevProps: {},
            nextProps: this.props,
            instance: polygon
        });
        function setPolygon() {
            return {
                polygon: polygon
            };
        }
        this.setState(setPolygon, this.setPolygonCallback);
    };
    Polygon.prototype.componentDidUpdate = function (prevProps) {
        if (this.state.polygon !== null) {
            helper_1.unregisterEvents(this.registeredEvents);
            this.registeredEvents = helper_1.applyUpdatersToPropsAndRegisterEvents({
                updaterMap: updaterMap,
                eventMap: eventMap,
                prevProps: prevProps,
                nextProps: this.props,
                instance: this.state.polygon
            });
        }
    };
    Polygon.prototype.componentWillUnmount = function () {
        if (this.state.polygon !== null) {
            if (this.props.onUnmount) {
                this.props.onUnmount(this.state.polygon);
            }
            helper_1.unregisterEvents(this.registeredEvents);
            this.state.polygon && this.state.polygon.setMap(null);
        }
    };
    Polygon.contextType = map_context_1.default;
    return Polygon;
}(React.PureComponent));
exports.Polygon = Polygon;
exports.default = Polygon;
