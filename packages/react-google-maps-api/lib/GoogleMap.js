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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var map_context_1 = require("./map-context");
var instance_persistance_1 = require("./utils/instance-persistance");
var helper_1 = require("./utils/helper");
var eventMap = {
    onDblClick: "dblclick",
    onDragEnd: "dragend",
    onDragStart: "dragstart",
    onMapTypeIdChanged: "maptypeid_changed",
    onMouseMove: "mousemove",
    onMouseOut: "mouseout",
    onMouseOver: "mouseover",
    onRightClick: "rightclick",
    onTilesLoaded: "tilesloaded",
    onBoundsChanged: "bounds_changed",
    onCenterChanged: "center_changed",
    onClick: "click",
    onDrag: "drag",
    onHeadingChanged: "heading_changed",
    onIdle: "idle",
    onProjectionChanged: "projection_changed",
    onResize: "resize",
    onTiltChanged: "tilt_changed",
    onZoomChanged: "zoom_changed"
};
var updaterMap = {
    extraMapTypes: function (map, extra) {
        extra.forEach(function forEachExtra(it, i) {
            map.mapTypes.set(String(i), it);
        });
    },
    center: function (map, center) {
        map.setCenter(center);
    },
    clickableIcons: function (map, clickable) {
        map.setClickableIcons(clickable);
    },
    heading: function (map, heading) {
        map.setHeading(heading);
    },
    mapTypeId: function (map, mapTypeId) {
        map.setMapTypeId(mapTypeId);
    },
    options: function (map, options) {
        map.setOptions(options);
    },
    streetView: function (map, streetView) {
        map.setStreetView(streetView);
    },
    tilt: function (map, tilt) {
        map.setTilt(tilt);
    },
    zoom: function (map, zoom) {
        map.setZoom(zoom);
    }
};
var GoogleMap = (function (_super) {
    __extends(GoogleMap, _super);
    function GoogleMap() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            map: null
        };
        _this.registeredEvents = [];
        _this.mapRef = null;
        _this.getInstance = function () {
            var _a = _this.props, reuseSameInstance = _a.reuseSameInstance, id = _a.id, rest = __rest(_a, ["reuseSameInstance", "id"]);
            var instance = reuseSameInstance && instance_persistance_1.restoreInstance(__assign({}, rest, { id: id || "defaultMapId" }));
            return instance
                ? instance
                : new google.maps.Map(_this.mapRef, _this.props.options);
        };
        _this.setMapCallback = function () {
            if (_this.state.map !== null) {
                if (_this.props.onLoad) {
                    _this.props.onLoad(_this.state.map);
                }
            }
        };
        _this.getRef = function (ref) {
            _this.mapRef = ref;
        };
        return _this;
    }
    GoogleMap.prototype.componentDidMount = function () {
        var map = this.getInstance();
        this.registeredEvents = helper_1.applyUpdatersToPropsAndRegisterEvents({
            updaterMap: updaterMap,
            eventMap: eventMap,
            prevProps: {},
            nextProps: this.props,
            instance: map
        });
        function setMap() {
            return {
                map: map
            };
        }
        this.setState(setMap, this.setMapCallback);
    };
    GoogleMap.prototype.componentDidUpdate = function (prevProps) {
        if (this.state.map !== null) {
            helper_1.unregisterEvents(this.registeredEvents);
            this.registeredEvents = helper_1.applyUpdatersToPropsAndRegisterEvents({
                updaterMap: updaterMap,
                eventMap: eventMap,
                prevProps: prevProps,
                nextProps: this.props,
                instance: this.state.map
            });
        }
    };
    GoogleMap.prototype.componentWillUnmount = function () {
        if (this.state.map !== null) {
            if (this.props.reuseSameInstance) {
                instance_persistance_1.saveInstance(this.props.id || "defaultMapId", this.state.map);
            }
            if (this.props.onUnmount) {
                this.props.onUnmount(this.state.map);
            }
            helper_1.unregisterEvents(this.registeredEvents);
        }
    };
    GoogleMap.prototype.render = function () {
        return (React.createElement("div", { id: this.props.id, ref: this.getRef, style: this.props.mapContainerStyle, className: this.props.mapContainerClassName },
            React.createElement(map_context_1.default.Provider, { value: this.state.map }, this.state.map !== null
                ? this.props.children
                : React.createElement(React.Fragment, null))));
    };
    return GoogleMap;
}(React.PureComponent));
exports.GoogleMap = GoogleMap;
exports.default = GoogleMap;
