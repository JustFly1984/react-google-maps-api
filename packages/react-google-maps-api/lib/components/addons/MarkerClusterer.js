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
var marker_clusterer_1 = require("@react-google-maps/marker-clusterer");
var eventMap = {
    onClick: "click",
    onClusteringBegin: "clusteringbegin",
    onClusteringEnd: "clusteringend",
    onMouseOut: "mouseout",
    onMouseOver: "mouseover"
};
var updaterMap = {
    averageCenter: function (instance, averageCenter) {
        instance.setAverageCenter(averageCenter);
    },
    batchSizeIE: function (instance, batchSizeIE) {
        instance.setBatchSizeIE(batchSizeIE);
    },
    calculator: function (instance, calculator) {
        instance.setCalculator(calculator);
    },
    clusterClass: function (instance, clusterClass) {
        instance.setClusterClass(clusterClass);
    },
    enableRetinaIcons: function (instance, enableRetinaIcons) {
        instance.setEnableRetinaIcons(enableRetinaIcons);
    },
    gridSize: function (instance, gridSize) {
        instance.setGridSize(gridSize);
    },
    ignoreHidden: function (instance, ignoreHidden) {
        instance.setIgnoreHidden(ignoreHidden);
    },
    imageExtension: function (instance, imageExtension) {
        instance.setImageExtension(imageExtension);
    },
    imagePath: function (instance, imagePath) {
        instance.setImagePath(imagePath);
    },
    imageSizes: function (instance, imageSizes) {
        instance.setImageSizes(imageSizes);
    },
    maxZoom: function (instance, maxZoom) {
        instance.setMaxZoom(maxZoom);
    },
    minimumClusterSize: function (instance, minimumClusterSize) {
        instance.setMinimumClusterSize(minimumClusterSize);
    },
    styles: function (instance, styles) {
        instance.setStyles(styles);
    },
    title: function (instance, title) {
        instance.setTitle(title);
    },
    zoomOnClick: function (instance, zoomOnClick) {
        instance.setZoomOnClick(zoomOnClick);
    }
};
var ClustererComponent = (function (_super) {
    __extends(ClustererComponent, _super);
    function ClustererComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.registeredEvents = [];
        _this.state = {
            markerClusterer: null
        };
        _this.setClustererCallback = function () {
            if (_this.state.markerClusterer !== null && _this.props.onLoad) {
                _this.props.onLoad(_this.state.markerClusterer);
            }
        };
        return _this;
    }
    ClustererComponent.prototype.componentDidMount = function () {
        if (this.context) {
            var markerClusterer_1 = new marker_clusterer_1.Clusterer(this.context, [], this.props.options);
            this.registeredEvents = helper_1.applyUpdatersToPropsAndRegisterEvents({
                updaterMap: updaterMap,
                eventMap: eventMap,
                prevProps: {},
                nextProps: this.props,
                instance: markerClusterer_1
            });
            this.setState(function setClusterer() {
                return {
                    markerClusterer: markerClusterer_1
                };
            }, this.setClustererCallback);
        }
    };
    ClustererComponent.prototype.componentDidUpdate = function (prevProps) {
        if (this.state.markerClusterer) {
            helper_1.unregisterEvents(this.registeredEvents);
            this.registeredEvents = helper_1.applyUpdatersToPropsAndRegisterEvents({
                updaterMap: updaterMap,
                eventMap: eventMap,
                prevProps: prevProps,
                nextProps: this.props,
                instance: this.state.markerClusterer
            });
        }
    };
    ClustererComponent.prototype.componentWillUnmount = function () {
        if (this.state.markerClusterer !== null) {
            if (this.props.onUnmount) {
                this.props.onUnmount(this.state.markerClusterer);
            }
            helper_1.unregisterEvents(this.registeredEvents);
            this.state.markerClusterer.setMap(null);
        }
    };
    ClustererComponent.prototype.render = function () {
        return this.state.markerClusterer !== null
            ? this.props.children(this.state.markerClusterer)
            : null;
    };
    ClustererComponent.contextType = map_context_1.default;
    return ClustererComponent;
}(React.PureComponent));
exports.ClustererComponent = ClustererComponent;
exports.default = ClustererComponent;
