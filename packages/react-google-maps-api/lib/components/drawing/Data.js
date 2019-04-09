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
    onAddFeature: "addfeature",
    onClick: "click",
    onDblClick: "dblclick",
    onMouseDown: "mousedown",
    onMouseOut: "mouseout",
    onMouseOver: "mouseover",
    onMouseUp: "mouseup",
    onRemoveFeature: "removefeature",
    onRemoveProperty: "removeproperty",
    onRightClick: "rightclick",
    onSetGeometry: "setgeometry",
    onSetProperty: "setproperty"
};
var updaterMap = {
    add: function (instance, features) {
        instance.add(features);
    },
    addgeojson: function (instance, geojson, options) {
        instance.addGeoJson(geojson, options);
    },
    contains: function (instance, feature) {
        instance.contains(feature);
    },
    foreach: function (instance, callback) {
        instance.forEach(callback);
    },
    loadgeojson: function (instance, url, options, callback) {
        instance.loadGeoJson(url, options, callback);
    },
    overridestyle: function (instance, feature, style) {
        instance.overrideStyle(feature, style);
    },
    remove: function (instance, feature) {
        instance.remove(feature);
    },
    revertstyle: function (instance, feature) {
        instance.revertStyle(feature);
    },
    controlposition: function (instance, controlPosition) {
        instance.setControlPosition(controlPosition);
    },
    controls: function (instance, controls) {
        instance.setControls(controls);
    },
    drawingmode: function (instance, mode) {
        instance.setDrawingMode(mode);
    },
    map: function (instance, map) {
        instance.setMap(map);
    },
    style: function (instance, style) {
        instance.setStyle(style);
    },
    togeojson: function (instance, callback) {
        instance.toGeoJson(callback);
    }
};
var Data = (function (_super) {
    __extends(Data, _super);
    function Data() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.registeredEvents = [];
        _this.state = {
            data: null
        };
        _this.setDataCallback = function () {
            if (_this.state.data !== null && _this.props.onLoad) {
                _this.props.onLoad(_this.state.data);
            }
        };
        return _this;
    }
    Data.prototype.componentDidMount = function () {
        var data = new google.maps.Data(__assign({}, (this.props.options || {}), { map: this.context }));
        this.registeredEvents = helper_1.applyUpdatersToPropsAndRegisterEvents({
            updaterMap: updaterMap,
            eventMap: eventMap,
            prevProps: {},
            nextProps: this.props,
            instance: data
        });
        function setData() {
            return {
                data: data
            };
        }
        this.setState(setData, this.setDataCallback);
    };
    Data.prototype.componentDidUpdate = function (prevProps) {
        if (this.state.data !== null) {
            helper_1.unregisterEvents(this.registeredEvents);
            this.registeredEvents = helper_1.applyUpdatersToPropsAndRegisterEvents({
                updaterMap: updaterMap,
                eventMap: eventMap,
                prevProps: prevProps,
                nextProps: this.props,
                instance: this.state.data
            });
        }
    };
    Data.prototype.componentWillUnmount = function () {
        if (this.state.data !== null) {
            if (this.props.onUnmount) {
                this.props.onUnmount(this.state.data);
            }
            helper_1.unregisterEvents(this.registeredEvents);
            if (this.state.data) {
                this.state.data.setMap(null);
            }
        }
    };
    Data.prototype.render = function () {
        return null;
    };
    Data.contextType = map_context_1.default;
    return Data;
}(React.PureComponent));
exports.Data = Data;
exports.default = Data;
