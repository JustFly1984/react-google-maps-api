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
var invariant = require("invariant");
var map_context_1 = require("../../map-context");
var dom_helper_1 = require("./dom-helper");
var OverlayView = (function (_super) {
    __extends(OverlayView, _super);
    function OverlayView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            overlayView: null
        };
        _this.containerElement = null;
        _this.setOverlayViewCallback = function () {
            if (_this.state.overlayView !== null && _this.props.onLoad) {
                _this.props.onLoad(_this.state.overlayView);
            }
        };
        _this.onAdd = function () {
            _this.containerElement = document.createElement("div");
            _this.containerElement.style.position = "absolute";
        };
        _this.onPositionElement = function () {
            if (_this.state.overlayView !== null && _this.containerElement !== null) {
                var mapCanvasProjection = _this.state.overlayView.getProjection();
                var offset = __assign({ x: 0, y: 0 }, dom_helper_1.getOffsetOverride(_this.containerElement, _this.props.getPixelPositionOffset));
                var layoutStyles = dom_helper_1.getLayoutStyles(mapCanvasProjection, offset, _this.props.bounds, _this.props.position);
                Object.assign(_this.containerElement.style, layoutStyles);
            }
        };
        _this.draw = function () {
            invariant(!!_this.props.mapPaneName, "OverlayView requires props.mapPaneName but got %s", _this.props.mapPaneName);
            var overlayView = _this.state.overlayView;
            if (overlayView === null) {
                return;
            }
            var mapPanes = overlayView.getPanes();
            if (!mapPanes) {
                return;
            }
            mapPanes[_this.props.mapPaneName].appendChild(_this.containerElement);
            _this.onPositionElement();
            _this.forceUpdate();
        };
        _this.onRemove = function () {
            if (_this.containerElement !== null && _this.containerElement.parentNode) {
                _this.containerElement.parentNode.removeChild(_this.containerElement);
                delete _this.containerElement;
            }
        };
        return _this;
    }
    OverlayView.prototype.componentDidMount = function () {
        var overlayView = new google.maps.OverlayView();
        overlayView.onAdd = this.onAdd;
        overlayView.draw = this.draw;
        overlayView.onRemove = this.onRemove;
        overlayView.setMap(this.context);
        function setOverlayView() {
            return {
                overlayView: overlayView
            };
        }
        this.setState(setOverlayView, this.setOverlayViewCallback);
    };
    OverlayView.prototype.componentWillUnmount = function () {
        if (this.state.overlayView !== null) {
            if (this.props.onUnmount) {
                this.props.onUnmount(this.state.overlayView);
            }
            this.state.overlayView.setMap(null);
        }
    };
    OverlayView.prototype.render = function () {
        return this.containerElement !== null ? (react_dom_1.createPortal(React.Children.only(this.props.children), this.containerElement)) : (React.createElement(React.Fragment, null));
    };
    OverlayView.FLOAT_PANE = "floatPane";
    OverlayView.MAP_PANE = "mapPane";
    OverlayView.MARKER_LAYER = "markerLayer";
    OverlayView.OVERLAY_LAYER = "overlayLayer";
    OverlayView.OVERLAY_MOUSE_TARGET = "overlayMouseTarget";
    OverlayView.contextType = map_context_1.default;
    return OverlayView;
}(React.PureComponent));
exports.OverlayView = OverlayView;
exports.default = OverlayView;
