"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ClusterIcon_1 = require("./ClusterIcon");
var Cluster = (function () {
    function Cluster(markerClusterer) {
        this.markerClusterer = markerClusterer;
        this.map = this.markerClusterer.overlayView.getMap();
        this.gridSize = this.markerClusterer.getGridSize();
        this.minClusterSize = this.markerClusterer.getMinimumClusterSize();
        this.averageCenter = this.markerClusterer.getAverageCenter();
        this.markers = [];
        this.center = undefined;
        this.bounds = null;
        this.clusterIcon = new ClusterIcon_1.ClusterIcon(this, this.markerClusterer.getStyles());
    }
    Cluster.prototype.getSize = function () {
        return this.markers.length;
    };
    Cluster.prototype.getMarkers = function () {
        return this.markers;
    };
    Cluster.prototype.getCenter = function () {
        return this.center;
    };
    Cluster.prototype.getMap = function () {
        return this.map;
    };
    Cluster.prototype.getClusterer = function () {
        return this.markerClusterer;
    };
    Cluster.prototype.getBounds = function () {
        var bounds = new google.maps.LatLngBounds(this.center, this.center);
        var markers = this.getMarkers();
        for (var i = 0; i < markers.length; i++) {
            bounds.extend(markers[i].getPosition());
        }
        return bounds;
    };
    Cluster.prototype.remove = function () {
        this.clusterIcon.overlayView.setMap(null);
        this.markers = [];
        delete this.markers;
    };
    Cluster.prototype.addMarker = function (marker) {
        if (this.isMarkerAlreadyAdded(marker)) {
            return false;
        }
        if (!this.center) {
            this.center = marker.getPosition();
            this.calculateBounds();
        }
        else {
            if (this.averageCenter) {
                var length_1 = this.markers.length + 1;
                this.center = new google.maps.LatLng((this.center.lat() * (length_1 - 1) + marker.getPosition().lat()) / length_1, (this.center.lng() * (length_1 - 1) + marker.getPosition().lng()) / length_1);
                this.calculateBounds();
            }
        }
        marker.isAdded = true;
        this.markers.push(marker);
        var mCount = this.markers.length;
        var maxZoom = this.markerClusterer.getMaxZoom();
        if (maxZoom !== null && this.map.getZoom() > maxZoom) {
            if (marker.getMap() !== this.map) {
                marker.setMap(this.map);
            }
        }
        else if (mCount < this.minClusterSize) {
            if (marker.getMap() !== this.map) {
                marker.setMap(this.map);
            }
        }
        else if (mCount === this.minClusterSize) {
            for (var i = 0; i < mCount; i++) {
                this.markers[i].setMap(null);
            }
        }
        else {
            marker.setMap(null);
        }
        this.updateIcon();
        return true;
    };
    Cluster.prototype.isMarkerInClusterBounds = function (marker) {
        if (this.bounds !== null) {
            return this.bounds.contains(marker.getPosition());
        }
        return false;
    };
    Cluster.prototype.calculateBounds = function () {
        this.bounds = this.markerClusterer.getExtendedBounds(new google.maps.LatLngBounds(this.center, this.center));
    };
    Cluster.prototype.updateIcon = function () {
        var mCount = this.markers.length;
        var maxZoom = this.markerClusterer.getMaxZoom();
        if (maxZoom !== null && this.map.getZoom() > maxZoom) {
            this.clusterIcon.hide();
            return;
        }
        if (mCount < this.minClusterSize) {
            this.clusterIcon.hide();
            return;
        }
        if (this.center) {
            this.clusterIcon.setCenter(this.center);
        }
        this.clusterIcon.useStyle(this.markerClusterer.getCalculator()(this.markers, this.markerClusterer.getStyles().length));
        this.clusterIcon.show();
    };
    Cluster.prototype.isMarkerAlreadyAdded = function (marker) {
        if (this.markers.indexOf) {
            return this.markers.includes(marker);
        }
        else {
            for (var i = 0; i < this.markers.length; i++) {
                if (marker === this.markers[i]) {
                    return true;
                }
            }
        }
        return false;
    };
    return Cluster;
}());
exports.Cluster = Cluster;
