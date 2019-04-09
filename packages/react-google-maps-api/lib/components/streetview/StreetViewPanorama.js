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
    onCloseClick: "closeclick",
    onPanoChanged: "pano_changed",
    onPositionChanged: "position_changed",
    onPovChanged: "pov_changed",
    onResize: "resize",
    onStatusChanged: "status_changed",
    onVisibleChanged: "visible_changed",
    onZoomChanged: "zoom_changed"
};
var updaterMap = {
    register: function (instance, provider, options) {
        instance.registerPanoProvider(provider, options);
    },
    links: function (instance, links) {
        instance.setLinks(links);
    },
    motionTracking: function (instance, motionTracking) {
        instance.setMotionTracking(motionTracking);
    },
    options: function (instance, options) {
        instance.setOptions(options);
    },
    pano: function (instance, pano) {
        instance.setPano(pano);
    },
    position: function (instance, position) {
        instance.setPosition(position);
    },
    pov: function (instance, pov) {
        instance.setPov(pov);
    },
    visible: function (instance, visible) {
        instance.setVisible(visible);
    },
    zoom: function (instance, zoom) {
        instance.setZoom(zoom);
    }
};
var StreetViewPanorama = (function (_super) {
    __extends(StreetViewPanorama, _super);
    function StreetViewPanorama() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.registeredEvents = [];
        _this.state = {
            streetViewPanorama: null
        };
        _this.setStreetViewPanoramaCallback = function () {
            if (_this.state.streetViewPanorama !== null && _this.props.onLoad) {
                _this.props.onLoad(_this.state.streetViewPanorama);
            }
        };
        return _this;
    }
    StreetViewPanorama.prototype.componentDidMount = function () {
        var streetViewPanorama = this.context.getStreetView();
        this.registeredEvents = helper_1.applyUpdatersToPropsAndRegisterEvents({
            updaterMap: updaterMap,
            eventMap: eventMap,
            prevProps: {},
            nextProps: this.props,
            instance: streetViewPanorama
        });
        function setStreetViewPanorama() {
            return {
                streetViewPanorama: streetViewPanorama
            };
        }
        this.setState(setStreetViewPanorama, this.setStreetViewPanoramaCallback);
    };
    StreetViewPanorama.prototype.componentDidUpdate = function (prevProps) {
        if (this.state.streetViewPanorama !== null) {
            helper_1.unregisterEvents(this.registeredEvents);
            this.registeredEvents = helper_1.applyUpdatersToPropsAndRegisterEvents({
                updaterMap: updaterMap,
                eventMap: eventMap,
                prevProps: prevProps,
                nextProps: this.props,
                instance: this.state.streetViewPanorama
            });
        }
    };
    StreetViewPanorama.prototype.componentWillUnmount = function () {
        if (this.state.streetViewPanorama !== null) {
            if (this.props.onUnmount) {
                this.props.onUnmount(this.state.streetViewPanorama);
            }
            helper_1.unregisterEvents(this.registeredEvents);
            this.state.streetViewPanorama.setVisible(false);
        }
    };
    StreetViewPanorama.prototype.render = function () {
        return null;
    };
    StreetViewPanorama.contextType = map_context_1.default;
    return StreetViewPanorama;
}(React.PureComponent));
exports.StreetViewPanorama = StreetViewPanorama;
exports.default = StreetViewPanorama;
