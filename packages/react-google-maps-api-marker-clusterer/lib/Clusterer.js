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
var Cluster_1 = require("./Cluster");
var CALCULATOR = function CALCULATOR(markers, numStyles) {
    var index = 0;
    var title = "";
    var count = markers.length.toString();
    var dv = count;
    while (dv !== 0) {
        dv = parseInt(dv, 10) / 10;
        index++;
    }
    index = Math.min(index, numStyles);
    return {
        text: count,
        index: index,
        title: title
    };
};
var BATCH_SIZE = 2000;
var BATCH_SIZE_IE = 500;
var IMAGE_PATH = "https://raw.githubusercontent.com/googlemaps/v3-utility-library/master/Clustererplus/images/m";
var IMAGE_EXTENSION = "png";
var IMAGE_SIZES = [53, 56, 66, 78, 90];
var CLUSTERER_CLASS = "cluster";
var Clusterer = (function (_super) {
    __extends(Clusterer, _super);
    function Clusterer(map, optMarkers, optOptions) {
        if (optMarkers === void 0) { optMarkers = []; }
        if (optOptions === void 0) { optOptions = {}; }
        var _this = _super.call(this) || this;
        _this.markers = [];
        _this.clusters = [];
        _this.listeners = [];
        _this.activeMap = null;
        _this.ready = false;
        _this.gridSize = optOptions.gridSize || 60;
        _this.minClusterSize = optOptions.minimumClusterSize || 2;
        _this.maxZoom = optOptions.maxZoom || null;
        _this.styles = optOptions.styles || [];
        _this.title = optOptions.title || "";
        _this.zoomOnClick = true;
        if (optOptions.zoomOnClick !== undefined) {
            _this.zoomOnClick = optOptions.zoomOnClick;
        }
        _this.averageCenter = false;
        if (optOptions.averageCenter !== undefined) {
            _this.averageCenter = optOptions.averageCenter;
        }
        _this.ignoreHidden = false;
        if (optOptions.ignoreHidden !== undefined) {
            _this.ignoreHidden = optOptions.ignoreHidden;
        }
        _this.enableRetinaIcons = false;
        if (optOptions.enableRetinaIcons !== undefined) {
            _this.enableRetinaIcons = optOptions.enableRetinaIcons;
        }
        _this.imagePath = optOptions.imagePath || IMAGE_PATH;
        _this.imageExtension = optOptions.imageExtension || IMAGE_EXTENSION;
        _this.imageSizes = optOptions.imageSizes || IMAGE_SIZES;
        _this.calculator = optOptions.calculator || CALCULATOR;
        _this.batchSize = optOptions.batchSize || BATCH_SIZE;
        _this.batchSizeIE = optOptions.batchSizeIE || BATCH_SIZE_IE;
        _this.clusterClass = optOptions.clusterClass || CLUSTERER_CLASS;
        if (navigator.userAgent.toLowerCase().indexOf("msie") !== -1) {
            _this.batchSize = _this.batchSizeIE;
        }
        _this.timerRefStatic = null;
        _this.setupStyles();
        _this.addMarkers(optMarkers, true);
        _this.setMap(map);
        return _this;
    }
    Clusterer.prototype.onAdd = function () {
        var _this = this;
        this.activeMap = this.getMap();
        this.ready = true;
        this.repaint();
        this.listeners = [
            google.maps.event.addListener(this.getMap(), "zoom_changed", function () {
                _this.resetViewport(false);
                if (_this.getMap().getZoom() === (_this.get("minZoom") || 0) || _this.getMap().getZoom() === _this.get("maxZoom")) {
                    google.maps.event.trigger(_this, "idle");
                }
            }),
            google.maps.event.addListener(this.getMap(), "idle", function () {
                _this.redraw();
            })
        ];
    };
    Clusterer.prototype.onRemove = function () {
        for (var i = 0; i < this.markers.length; i++) {
            if (this.markers[i].getMap() !== this.activeMap) {
                this.markers[i].setMap(this.activeMap);
            }
        }
        for (var i = 0; i < this.clusters.length; i++) {
            this.clusters[i].remove();
        }
        this.clusters = [];
        for (var i = 0; i < this.listeners.length; i++) {
            google.maps.event.removeListener(this.listeners[i]);
        }
        this.listeners = [];
        this.activeMap = null;
        this.ready = false;
    };
    Clusterer.prototype.draw = function () { };
    Clusterer.prototype.setupStyles = function () {
        if (this.styles.length > 0) {
            return;
        }
        for (var i = 0; i < this.imageSizes.length; i++) {
            this.styles.push({
                url: this.imagePath + (i + 1) + "." + this.imageExtension,
                height: this.imageSizes[i],
                width: this.imageSizes[i]
            });
        }
    };
    Clusterer.prototype.fitMapToMarkers = function () {
        var markers = this.getMarkers();
        var bounds = new google.maps.LatLngBounds();
        for (var i = 0; i < markers.length; i++) {
            bounds.extend(markers[i].getPosition());
        }
        this
            .getMap()
            .fitBounds(bounds);
    };
    Clusterer.prototype.getGridSize = function () {
        return this.gridSize;
    };
    Clusterer.prototype.setGridSize = function (gridSize) {
        this.gridSize = gridSize;
    };
    Clusterer.prototype.getMinimumClusterSize = function () {
        return this.minClusterSize;
    };
    Clusterer.prototype.setMinimumClusterSize = function (minimumClusterSize) {
        this.minClusterSize = minimumClusterSize;
    };
    Clusterer.prototype.getMaxZoom = function () {
        return this.maxZoom;
    };
    Clusterer.prototype.setMaxZoom = function (maxZoom) {
        this.maxZoom = maxZoom;
    };
    Clusterer.prototype.getStyles = function () {
        return this.styles;
    };
    Clusterer.prototype.setStyles = function (styles) {
        this.styles = styles;
    };
    Clusterer.prototype.getTitle = function () {
        return this.title;
    };
    Clusterer.prototype.setTitle = function (title) {
        this.title = title;
    };
    Clusterer.prototype.getZoomOnClick = function () {
        return this.zoomOnClick;
    };
    Clusterer.prototype.setZoomOnClick = function (zoomOnClick) {
        this.zoomOnClick = zoomOnClick;
    };
    Clusterer.prototype.getAverageCenter = function () {
        return this.averageCenter;
    };
    Clusterer.prototype.setAverageCenter = function (averageCenter) {
        this.averageCenter = averageCenter;
    };
    Clusterer.prototype.getIgnoreHidden = function () {
        return this.ignoreHidden;
    };
    Clusterer.prototype.setIgnoreHidden = function (ignoreHidden) {
        this.ignoreHidden = ignoreHidden;
    };
    Clusterer.prototype.getEnableRetinaIcons = function () {
        return this.enableRetinaIcons;
    };
    Clusterer.prototype.setEnableRetinaIcons = function (enableRetinaIcons) {
        this.enableRetinaIcons = enableRetinaIcons;
    };
    Clusterer.prototype.getImageExtension = function () {
        return this.imageExtension;
    };
    Clusterer.prototype.setImageExtension = function (imageExtension) {
        this.imageExtension = imageExtension;
    };
    Clusterer.prototype.getImagePath = function () {
        return this.imagePath;
    };
    Clusterer.prototype.setImagePath = function (imagePath) {
        this.imagePath = imagePath;
    };
    Clusterer.prototype.getImageSizes = function () {
        return this.imageSizes;
    };
    Clusterer.prototype.setImageSizes = function (imageSizes) {
        this.imageSizes = imageSizes;
    };
    Clusterer.prototype.getCalculator = function () {
        return this.calculator;
    };
    Clusterer.prototype.setCalculator = function (calculator) {
        this.calculator = calculator;
    };
    Clusterer.prototype.getBatchSizeIE = function () {
        return this.batchSizeIE;
    };
    Clusterer.prototype.setBatchSizeIE = function (batchSizeIE) {
        this.batchSizeIE = batchSizeIE;
    };
    Clusterer.prototype.getClusterClass = function () {
        return this.clusterClass;
    };
    Clusterer.prototype.setClusterClass = function (clusterClass) {
        this.clusterClass = clusterClass;
    };
    Clusterer.prototype.getMarkers = function () {
        return this.markers;
    };
    Clusterer.prototype.getTotalMarkers = function () {
        return this.markers.length;
    };
    Clusterer.prototype.getClusters = function () {
        return this.clusters;
    };
    Clusterer.prototype.getTotalClusters = function () {
        return this.clusters.length;
    };
    Clusterer.prototype.addMarker = function (marker, optNoDraw) {
        this.pushMarkerTo(marker);
        if (!optNoDraw) {
            this.redraw();
        }
    };
    Clusterer.prototype.addMarkers = function (markers, optNoDraw) {
        for (var key in markers) {
            if (markers.hasOwnProperty(key)) {
                this.pushMarkerTo(markers[key]);
            }
        }
        if (!optNoDraw) {
            this.redraw();
        }
    };
    Clusterer.prototype.pushMarkerTo = function (marker) {
        var _this = this;
        if (marker.getDraggable()) {
            google.maps.event.addListener(marker, "dragend", function () {
                if (_this.ready) {
                    marker.isAdded = false;
                    _this.repaint();
                }
            });
        }
        marker.isAdded = false;
        this.markers.push(marker);
    };
    Clusterer.prototype.removeMarker_ = function (marker) {
        var index = -1;
        if (this.markers.indexOf) {
            index = this.markers.indexOf(marker);
        }
        else {
            for (var i = 0; i < this.markers.length; i++) {
                if (marker === this.markers[i]) {
                    index = i;
                    break;
                }
            }
        }
        if (index === -1) {
            return false;
        }
        marker.setMap(null);
        this.markers.splice(index, 1);
        return true;
    };
    Clusterer.prototype.removeMarker = function (marker, optNoDraw) {
        var removed = this.removeMarker_(marker);
        if (!optNoDraw && removed) {
            this.repaint();
        }
        return removed;
    };
    Clusterer.prototype.removeMarkers = function (markers, optNoDraw) {
        var removed = false;
        for (var i = 0; i < markers.length; i++) {
            removed = removed || this.removeMarker_(markers[i]);
        }
        if (!optNoDraw && removed) {
            this.repaint();
        }
        return removed;
    };
    Clusterer.prototype.clearMarkers = function () {
        this.resetViewport(true);
        this.markers = [];
    };
    Clusterer.prototype.repaint = function () {
        var oldClusters = this.clusters.slice();
        this.clusters = [];
        this.resetViewport(false);
        this.redraw();
        setTimeout(function timeout() {
            for (var i = 0; i < oldClusters.length; i++) {
                oldClusters[i].remove();
            }
        }, 0);
    };
    Clusterer.prototype.getExtendedBounds = function (bounds) {
        var projection = this.getProjection();
        var trPix = projection.fromLatLngToDivPixel(new google.maps.LatLng(bounds.getNorthEast().lat(), bounds.getNorthEast().lng()));
        trPix.x += this.gridSize;
        trPix.y -= this.gridSize;
        var blPix = projection.fromLatLngToDivPixel(new google.maps.LatLng(bounds.getSouthWest().lat(), bounds.getSouthWest().lng()));
        blPix.x -= this.gridSize;
        blPix.y += this.gridSize;
        bounds.extend(projection.fromDivPixelToLatLng(trPix));
        bounds.extend(projection.fromDivPixelToLatLng(blPix));
        return bounds;
    };
    Clusterer.prototype.redraw = function () {
        this.createClusters(0);
    };
    Clusterer.prototype.resetViewport = function (optHide) {
        for (var i = 0; i < this.clusters.length; i++) {
            this.clusters[i].remove();
        }
        this.clusters = [];
        for (var i = 0; i < this.markers.length; i++) {
            var marker = this.markers[i];
            marker.isAdded = false;
            if (optHide) {
                marker.setMap(null);
            }
        }
    };
    Clusterer.prototype.distanceBetweenPoints = function (p1, p2) {
        var R = 6371;
        var dLat = (p2.lat() - p1.lat()) * Math.PI / 180;
        var dLon = (p2.lng() - p1.lng()) * Math.PI / 180;
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(p1.lat() * Math.PI / 180) * Math.cos(p2.lat() * Math.PI / 180) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2);
        return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
    };
    Clusterer.prototype.isMarkerInBounds = function (marker, bounds) {
        return bounds.contains(marker.getPosition());
    };
    Clusterer.prototype.addToClosestCluster = function (marker) {
        var cluster;
        var distance = 40000;
        var clusterToAddTo = null;
        for (var i = 0; i < this.clusters.length; i++) {
            cluster = this.clusters[i];
            var center = cluster.getCenter();
            if (center) {
                var d = this.distanceBetweenPoints(center, marker.getPosition());
                if (d < distance) {
                    distance = d;
                    clusterToAddTo = cluster;
                }
            }
        }
        if (clusterToAddTo &&
            clusterToAddTo.isMarkerInClusterBounds(marker)) {
            clusterToAddTo.addMarker(marker);
        }
        else {
            cluster = new Cluster_1.Cluster(this);
            cluster.addMarker(marker);
            this.clusters.push(cluster);
        }
    };
    Clusterer.prototype.createClusters = function (iFirst) {
        var _this = this;
        if (!this.ready) {
            return;
        }
        if (iFirst === 0) {
            google.maps.event.trigger(this, "clusteringbegin", this);
            if (this.timerRefStatic !== null) {
                clearTimeout(this.timerRefStatic);
                delete this.timerRefStatic;
            }
        }
        var mapBounds = this.getMap().getZoom() > 3
            ? new google.maps.LatLngBounds(this
                .getMap()
                .getBounds()
                .getSouthWest(), this
                .getMap()
                .getBounds()
                .getNorthEast())
            : new google.maps.LatLngBounds(new google.maps.LatLng(85.02070771743472, -178.48388434375), new google.maps.LatLng(-85.08136444384544, 178.00048865625));
        var bounds = this.getExtendedBounds(mapBounds);
        var iLast = Math.min(iFirst + this.batchSize, this.markers.length);
        for (var i = iFirst; i < iLast; i++) {
            var marker = this.markers[i];
            if (!marker.isAdded && this.isMarkerInBounds(marker, bounds)) {
                if (!this.ignoreHidden ||
                    (this.ignoreHidden &&
                        marker.getVisible())) {
                    this.addToClosestCluster(marker);
                }
            }
        }
        if (iLast < this.markers.length) {
            this.timerRefStatic = setTimeout(function () {
                _this.createClusters(iLast);
            }, 0);
        }
        else {
            this.timerRefStatic = null;
            google.maps.event.trigger(this, "clusteringend", this);
        }
    };
    return Clusterer;
}(google.maps.OverlayView));
exports.Clusterer = Clusterer;
