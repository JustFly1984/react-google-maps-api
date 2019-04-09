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
var eventMap = {
    onClick: "click",
    onDefaultViewportChanged: "defaultviewport_changed",
    onStatusChanged: "status_changed"
};
var updaterMap = {
    options: function (instance, options) {
        instance.setOptions(options);
    },
    url: function (instance, url) {
        console.log({ instance: instance, url: url });
        instance.setUrl(url);
    },
    zIndex: function (instance, zIndex) {
        instance.setZIndex(zIndex);
    }
};
var KmlLayer = (function (_super) {
    __extends(KmlLayer, _super);
    function KmlLayer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.registeredEvents = [];
        _this.state = {
            kmlLayer: null
        };
        _this.setKmlLayerCallback = function () {
            if (_this.state.kmlLayer !== null && _this.props.onLoad) {
                _this.props.onLoad(_this.state.kmlLayer);
            }
        };
        return _this;
    }
    KmlLayer.prototype.componentDidMount = function () {
        var kmlLayer = new google.maps.KmlLayer(__assign({}, this.props.options, { map: this.context }));
        this.registeredEvents = helper_1.applyUpdatersToPropsAndRegisterEvents({
            updaterMap: updaterMap,
            eventMap: eventMap,
            prevProps: {},
            nextProps: this.props,
            instance: kmlLayer
        });
        function setLmlLayer() {
            return {
                kmlLayer: kmlLayer
            };
        }
        this.setState(setLmlLayer, this.setKmlLayerCallback);
    };
    KmlLayer.prototype.componentDidUpdate = function (prevProps) {
        if (this.state.kmlLayer !== null) {
            helper_1.unregisterEvents(this.registeredEvents);
            this.registeredEvents = helper_1.applyUpdatersToPropsAndRegisterEvents({
                updaterMap: updaterMap,
                eventMap: eventMap,
                prevProps: prevProps,
                nextProps: this.props,
                instance: this.state.kmlLayer
            });
        }
    };
    KmlLayer.prototype.componentWillUnmount = function () {
        if (this.state.kmlLayer !== null) {
            if (this.props.onUnmount) {
                this.props.onUnmount(this.state.kmlLayer);
            }
            helper_1.unregisterEvents(this.registeredEvents);
            this.state.kmlLayer.setMap(null);
        }
    };
    KmlLayer.prototype.render = function () {
        return null;
    };
    KmlLayer.contextType = map_context_1.default;
    return KmlLayer;
}(react_1.PureComponent));
exports.KmlLayer = KmlLayer;
exports.default = KmlLayer;
