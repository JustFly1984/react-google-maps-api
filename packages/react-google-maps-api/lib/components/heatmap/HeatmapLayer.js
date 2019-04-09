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
var eventMap = {};
var updaterMap = {
    data: function (instance, data) {
        instance.setData(data);
    },
    map: function (instance, map) {
        instance.setMap(map);
    },
    options: function (instance, options) {
        instance.setOptions(options);
    }
};
var HeatmapLayer = (function (_super) {
    __extends(HeatmapLayer, _super);
    function HeatmapLayer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.registeredEvents = [];
        _this.state = {
            heatmapLayer: null
        };
        _this.setHeatmapLayerCallback = function () {
            if (_this.state.heatmapLayer !== null && _this.props.onLoad) {
                _this.props.onLoad(_this.state.heatmapLayer);
            }
        };
        return _this;
    }
    HeatmapLayer.prototype.componentDidMount = function () {
        invariant(google.maps.visualization, 'Did you include "visualization" in the libraries array prop in <LoadScript />?');
        invariant(this.props.data, "data property is required in HeatmapLayer");
        var heatmapLayer = new google.maps.visualization.HeatmapLayer(__assign({ data: this.props.data }, (this.props.options || {}), { map: this.context }));
        this.registeredEvents = helper_1.applyUpdatersToPropsAndRegisterEvents({
            updaterMap: updaterMap,
            eventMap: eventMap,
            prevProps: {},
            nextProps: this.props,
            instance: heatmapLayer
        });
        function setHeatmapLayer() {
            return {
                heatmapLayer: heatmapLayer
            };
        }
        this.setState(setHeatmapLayer, this.setHeatmapLayerCallback);
    };
    HeatmapLayer.prototype.componentDidUpdate = function (prevProps) {
        helper_1.unregisterEvents(this.registeredEvents);
        this.registeredEvents = helper_1.applyUpdatersToPropsAndRegisterEvents({
            updaterMap: updaterMap,
            eventMap: eventMap,
            prevProps: prevProps,
            nextProps: this.props,
            instance: this.state.heatmapLayer
        });
    };
    HeatmapLayer.prototype.componentWillUnmount = function () {
        if (this.state.heatmapLayer !== null) {
            if (this.props.onUnmount) {
                this.props.onUnmount(this.state.heatmapLayer);
            }
            helper_1.unregisterEvents(this.registeredEvents);
            this.state.heatmapLayer.setMap(null);
        }
    };
    HeatmapLayer.prototype.render = function () {
        return null;
    };
    HeatmapLayer.contextType = map_context_1.default;
    return HeatmapLayer;
}(React.PureComponent));
exports.HeatmapLayer = HeatmapLayer;
exports.default = HeatmapLayer;
