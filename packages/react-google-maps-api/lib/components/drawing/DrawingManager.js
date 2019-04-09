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
var invariant = require("invariant");
var helper_1 = require("../../utils/helper");
var map_context_1 = require("../../map-context");
var eventMap = {
    onCircleComplete: "circlecomplete",
    onMarkerComplete: "markercomplete",
    onOverlayComplete: "overlaycomplete",
    onPolygonComplete: "polygoncomplete",
    onPolylineComplete: "polylinecomplete",
    onRectangleComplete: "rectanglecomplete"
};
var updaterMap = {
    drawingMode: function (instance, drawingMode) {
        instance.setDrawingMode(drawingMode);
    },
    options: function (instance, options) {
        instance.setOptions(options);
    }
};
var DrawingManager = (function (_super) {
    __extends(DrawingManager, _super);
    function DrawingManager(props) {
        var _this = _super.call(this, props) || this;
        _this.registeredEvents = [];
        _this.state = {
            drawingManager: null
        };
        _this.setDrawingManagerCallback = function () {
            if (_this.state.drawingManager !== null && _this.props.onLoad) {
                _this.props.onLoad(_this.state.drawingManager);
            }
        };
        invariant(google.maps.drawing, 'Did you include "libraries=drawing" in the URL?');
        return _this;
    }
    DrawingManager.prototype.componentDidMount = function () {
        var drawingManager = new google.maps.drawing.DrawingManager(__assign({}, (this.props.options || {}), { map: this.context }));
        this.registeredEvents = helper_1.applyUpdatersToPropsAndRegisterEvents({
            updaterMap: updaterMap,
            eventMap: eventMap,
            prevProps: {},
            nextProps: this.props,
            instance: drawingManager
        });
        function setDrawingManager() {
            return {
                drawingManager: drawingManager
            };
        }
        this.setState(setDrawingManager, this.setDrawingManagerCallback);
    };
    DrawingManager.prototype.componentDidUpdate = function (prevProps) {
        if (this.state.drawingManager !== null) {
            helper_1.unregisterEvents(this.registeredEvents);
            this.registeredEvents = helper_1.applyUpdatersToPropsAndRegisterEvents({
                updaterMap: updaterMap,
                eventMap: eventMap,
                prevProps: prevProps,
                nextProps: this.props,
                instance: this.state.drawingManager
            });
        }
    };
    DrawingManager.prototype.componentWillUnmount = function () {
        if (this.state.drawingManager !== null) {
            if (this.props.onUnmount) {
                this.props.onUnmount(this.state.drawingManager);
            }
            helper_1.unregisterEvents(this.registeredEvents);
            this.state.drawingManager.setMap(null);
        }
    };
    DrawingManager.prototype.render = function () {
        return React.createElement(React.Fragment, null);
    };
    DrawingManager.contextType = map_context_1.default;
    return DrawingManager;
}(React.PureComponent));
exports.DrawingManager = DrawingManager;
exports.default = DrawingManager;
