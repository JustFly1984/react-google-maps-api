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
var react_dom_1 = require("react-dom");
var helper_1 = require("../../utils/helper");
var map_context_1 = require("../../map-context");
var invariant_1 = require("invariant");
var eventMap = {
    onCloseClick: "closeclick",
    onContentChanged: "content_changed",
    onDomReady: "domready",
    onPositionChanged: "position_changed",
    onZindexChanged: "zindex_changed"
};
var updaterMap = {
    options: function (instance, options) {
        instance.setOptions(options);
    },
    position: function (instance, position) {
        instance.setPosition(position);
    },
    zIndex: function (instance, zIndex) {
        instance.setZIndex(zIndex);
    }
};
var InfoWindow = (function (_super) {
    __extends(InfoWindow, _super);
    function InfoWindow() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.registeredEvents = [];
        _this.containerElement = null;
        _this.state = {
            infoWindow: null
        };
        _this.open = function (infoWindow, anchor) {
            if (anchor) {
                infoWindow.open(_this.context, anchor);
            }
            else if (infoWindow.getPosition()) {
                infoWindow.open(_this.context);
            }
            else {
                invariant_1.default(false, "You must provide either an anchor (typically render it inside a <Marker>) or a position props for <InfoWindow>.");
            }
        };
        _this.setInfowindowCallback = function () {
            if (_this.state.infoWindow !== null &&
                _this.containerElement !== null &&
                _this.props.anchor !== null) {
                _this.state.infoWindow.setContent(_this.containerElement);
                _this.open(_this.state.infoWindow, _this.props.anchor);
                if (_this.props.onLoad) {
                    _this.props.onLoad(_this.state.infoWindow);
                }
            }
        };
        return _this;
    }
    InfoWindow.prototype.componentDidMount = function () {
        var infoWindow = new google.maps.InfoWindow(__assign({}, (this.props.options || {})));
        this.containerElement = document.createElement("div");
        this.registeredEvents = helper_1.applyUpdatersToPropsAndRegisterEvents({
            updaterMap: updaterMap,
            eventMap: eventMap,
            prevProps: {},
            nextProps: this.props,
            instance: infoWindow
        });
        function setInfoWindow() {
            return {
                infoWindow: infoWindow
            };
        }
        this.setState(setInfoWindow, this.setInfowindowCallback);
    };
    InfoWindow.prototype.componentDidUpdate = function (prevProps) {
        if (this.state.infoWindow !== null) {
            helper_1.unregisterEvents(this.registeredEvents);
            this.registeredEvents = helper_1.applyUpdatersToPropsAndRegisterEvents({
                updaterMap: updaterMap,
                eventMap: eventMap,
                prevProps: prevProps,
                nextProps: this.props,
                instance: this.state.infoWindow
            });
        }
    };
    InfoWindow.prototype.componentWillUnmount = function () {
        if (this.state.infoWindow !== null) {
            helper_1.unregisterEvents(this.registeredEvents);
            this.state.infoWindow.close();
        }
    };
    InfoWindow.prototype.render = function () {
        return this.containerElement
            ? (react_dom_1.createPortal(React.Children.only(this.props.children), this.containerElement)) : (React.createElement(React.Fragment, null));
    };
    InfoWindow.contextType = map_context_1.default;
    return InfoWindow;
}(React.PureComponent));
exports.InfoWindow = InfoWindow;
exports.default = InfoWindow;
