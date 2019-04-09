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
    visible: function (instance, visible) {
        instance.setVisible(visible);
    }
};
var Polyline = (function (_super) {
    __extends(Polyline, _super);
    function Polyline() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.registeredEvents = [];
        _this.state = {
            polyline: null
        };
        _this.setPolylineCallback = function () {
            if (_this.state.polyline !== null && _this.props.onLoad) {
                _this.props.onLoad(_this.state.polyline);
            }
        };
        return _this;
    }
    Polyline.prototype.componentDidMount = function () {
        var polyline = new google.maps.Polyline(__assign({}, (this.props.options || {}), { map: this.context }));
        this.registeredEvents = helper_1.applyUpdatersToPropsAndRegisterEvents({
            updaterMap: updaterMap,
            eventMap: eventMap,
            prevProps: {},
            nextProps: this.props,
            instance: polyline
        });
        function setPolyline() {
            return {
                polyline: polyline
            };
        }
        this.setState(setPolyline, this.setPolylineCallback);
    };
    Polyline.prototype.componentDidUpdate = function (prevProps) {
        if (this.state.polyline !== null) {
            helper_1.unregisterEvents(this.registeredEvents);
            this.registeredEvents = helper_1.applyUpdatersToPropsAndRegisterEvents({
                updaterMap: updaterMap,
                eventMap: eventMap,
                prevProps: prevProps,
                nextProps: this.props,
                instance: this.state.polyline
            });
        }
    };
    Polyline.prototype.componentWillUnmount = function () {
        if (this.state.polyline !== null) {
            if (this.props.onUnmount) {
                this.props.onUnmount(this.state.polyline);
            }
            helper_1.unregisterEvents(this.registeredEvents);
            this.state.polyline.setMap(null);
        }
    };
    Polyline.prototype.render = function () {
        return React.createElement(React.Fragment, null);
    };
    Polyline.contextType = map_context_1.default;
    return Polyline;
}(React.PureComponent));
exports.Polyline = Polyline;
exports.default = Polyline;
