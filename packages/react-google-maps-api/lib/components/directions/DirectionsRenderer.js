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
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var helper_1 = require("../../utils/helper");
var map_context_1 = require("../../map-context");
var eventMap = {
    onDirectionsChanged: "directions_changed"
};
var updaterMap = {
    directions: function (instance, directions) {
        instance.setDirections(directions);
    },
    map: function (instance, map) {
        instance.setMap(map);
    },
    options: function (instance, options) {
        instance.setOptions(options);
    },
    panel: function (instance, panel) {
        instance.setPanel(panel);
    },
    routeIndex: function (instance, routeIndex) {
        instance.setRouteIndex(routeIndex);
    }
};
var DirectionsRenderer = (function (_super) {
    __extends(DirectionsRenderer, _super);
    function DirectionsRenderer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.registeredEvents = [];
        _this.state = {
            directionsRenderer: null
        };
        _this.setDirectionsRendererCallback = function () {
            if (_this.state.directionsRenderer !== null) {
                _this.state.directionsRenderer.setMap(_this.context);
                if (_this.props.onLoad) {
                    _this.props.onLoad(_this.state.directionsRenderer);
                }
            }
        };
        return _this;
    }
    DirectionsRenderer.prototype.componentDidMount = function () {
        var directionsRenderer = new google.maps.DirectionsRenderer(this.props.options);
        this.registeredEvents = helper_1.applyUpdatersToPropsAndRegisterEvents({
            updaterMap: updaterMap,
            eventMap: eventMap,
            prevProps: {},
            nextProps: this.props,
            instance: directionsRenderer
        });
        this.setState(function setDirectionsRenderer() {
            return {
                directionsRenderer: directionsRenderer
            };
        }, this.setDirectionsRendererCallback);
    };
    DirectionsRenderer.prototype.componentDidUpdate = function (prevProps) {
        if (this.state.directionsRenderer !== null) {
            helper_1.unregisterEvents(this.registeredEvents);
            this.registeredEvents = helper_1.applyUpdatersToPropsAndRegisterEvents({
                updaterMap: updaterMap,
                eventMap: eventMap,
                prevProps: prevProps,
                nextProps: this.props,
                instance: this.state.directionsRenderer
            });
        }
    };
    DirectionsRenderer.prototype.componentWillUnmount = function () {
        if (this.state.directionsRenderer !== null) {
            if (this.props.onUnmount) {
                this.props.onUnmount(this.state.directionsRenderer);
            }
            helper_1.unregisterEvents(this.registeredEvents);
            if (this.state.directionsRenderer) {
                this.state.directionsRenderer.setMap(null);
            }
        }
    };
    DirectionsRenderer.prototype.render = function () {
        return React.createElement(React.Fragment, null);
    };
    DirectionsRenderer.contextType = map_context_1.default;
    return DirectionsRenderer;
}(React.PureComponent));
exports.DirectionsRenderer = DirectionsRenderer;
exports.default = DirectionsRenderer;
