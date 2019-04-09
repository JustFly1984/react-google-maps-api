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
var react_1 = require("react");
var helper_1 = require("../../utils/helper");
var map_context_1 = require("../../map-context");
var eventMap = {};
var updaterMap = {
    options: function (instance, options) {
        instance.setOptions(options);
    }
};
var TrafficLayer = (function (_super) {
    __extends(TrafficLayer, _super);
    function TrafficLayer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            trafficLayer: null
        };
        _this.setTrafficLayerCallback = function () {
            if (_this.state.trafficLayer !== null) {
                if (_this.props.onLoad) {
                    _this.props.onLoad(_this.state.trafficLayer);
                }
            }
        };
        _this.registeredEvents = [];
        return _this;
    }
    TrafficLayer.prototype.componentDidMount = function () {
        var trafficLayer = new google.maps.TrafficLayer(__assign({}, (this.props.options || {}), { map: this.context }));
        this.registeredEvents = helper_1.applyUpdatersToPropsAndRegisterEvents({
            updaterMap: updaterMap,
            eventMap: eventMap,
            prevProps: {},
            nextProps: this.props,
            instance: trafficLayer
        });
        function setTrafficlayer() {
            return {
                trafficLayer: trafficLayer
            };
        }
        this.setState(setTrafficlayer, this.setTrafficLayerCallback);
    };
    TrafficLayer.prototype.componentDidUpdate = function (prevProps) {
        if (this.state.trafficLayer !== null) {
            helper_1.unregisterEvents(this.registeredEvents);
            this.registeredEvents = helper_1.applyUpdatersToPropsAndRegisterEvents({
                updaterMap: updaterMap,
                eventMap: eventMap,
                prevProps: prevProps,
                nextProps: this.props,
                instance: this.state.trafficLayer
            });
        }
    };
    TrafficLayer.prototype.componentWillUnmount = function () {
        if (this.state.trafficLayer !== null) {
            if (this.props.onUnmount) {
                this.props.onUnmount(this.state.trafficLayer);
            }
            helper_1.unregisterEvents(this.registeredEvents);
            this.state.trafficLayer.setMap(null);
        }
    };
    TrafficLayer.prototype.render = function () {
        return null;
    };
    TrafficLayer.contextType = map_context_1.default;
    return TrafficLayer;
}(react_1.PureComponent));
exports.TrafficLayer = TrafficLayer;
exports.default = TrafficLayer;
