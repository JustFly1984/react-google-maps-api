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
    onDblClick: "dblclick",
    onClick: "click"
};
var updaterMap = {
    opacity: function (instance, opacity) {
        instance.setOpacity(opacity);
    }
};
var GroundOverlay = (function (_super) {
    __extends(GroundOverlay, _super);
    function GroundOverlay() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.registeredEvents = [];
        _this.state = {
            groundOverlay: null
        };
        _this.setGroundOverlayCallback = function () {
            if (_this.state.groundOverlay !== null && _this.props.onLoad) {
                _this.props.onLoad(_this.state.groundOverlay);
            }
        };
        return _this;
    }
    GroundOverlay.prototype.componentDidMount = function () {
        console.log('this.props.url: ', this.props.url);
        console.log('this.props.bounds: ', this.props.bounds);
        invariant(!!this.props.url || !!this.props.bounds, "For GroundOveray, url and bounds are passed in to constructor and are immutable after instantiated. This is the behavior of Google Maps JavaScript API v3 ( See https://developers.google.com/maps/documentation/javascript/reference#GroundOverlay) Hence, use the corresponding two props provided by `react-google-maps-api`, url and bounds. In some cases, you'll need the GroundOverlay component to reflect the changes of url and bounds. You can leverage the React's key property to remount the component. Typically, just `key={url}` would serve your need. See https://github.com/tomchentw/react-google-maps/issues/655");
        var groundOverlay = new google.maps.GroundOverlay(this.props.url, this.props.bounds, __assign({}, this.props.options, { map: this.context }));
        this.registeredEvents = helper_1.applyUpdatersToPropsAndRegisterEvents({
            updaterMap: updaterMap,
            eventMap: eventMap,
            prevProps: {},
            nextProps: this.props,
            instance: groundOverlay
        });
        function setGroundOverlay() {
            return {
                groundOverlay: groundOverlay
            };
        }
        this.setState(setGroundOverlay, this.setGroundOverlayCallback);
    };
    GroundOverlay.prototype.componentDidUpdate = function (prevProps) {
        if (this.state.groundOverlay !== null) {
            helper_1.unregisterEvents(this.registeredEvents);
            this.registeredEvents = helper_1.applyUpdatersToPropsAndRegisterEvents({
                updaterMap: updaterMap,
                eventMap: eventMap,
                prevProps: prevProps,
                nextProps: this.props,
                instance: this.state.groundOverlay
            });
        }
    };
    GroundOverlay.prototype.componentWillUnmount = function () {
        if (this.state.groundOverlay) {
            if (this.props.onUnmount) {
                this.props.onUnmount(this.state.groundOverlay);
            }
            this.state.groundOverlay.setMap(null);
        }
    };
    GroundOverlay.prototype.render = function () {
        return null;
    };
    GroundOverlay.defaultProps = {
        onLoad: function () { }
    };
    GroundOverlay.contextType = map_context_1.default;
    return GroundOverlay;
}(React.PureComponent));
exports.GroundOverlay = GroundOverlay;
exports.default = GroundOverlay;
