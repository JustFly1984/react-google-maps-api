"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ClusterIcon = (function () {
    function ClusterIcon(cluster, styles) {
        this.overlayView = new google.maps.OverlayView();
        this.cluster = cluster;
        this.className = this.cluster.getClusterer().getClusterClass();
        this.styles = styles;
        this.center = undefined;
        this.div = null;
        this.sums = null;
        this.visible = false;
        this.boundsChangedListener = null;
        this.url = '';
        this.height = 0;
        this.width = 0;
        this.anchorText = [0, 0];
        this.anchorIcon = [0, 0];
        this.textColor = 'black';
        this.textSize = 11;
        this.textDecoration = 'none';
        this.fontWeight = 'bold';
        this.fontStyle = 'normal';
        this.fontFamily = 'Arial,sans-serif';
        this.backgroundPosition = '0 0';
        this.overlayView.setMap(cluster.getMap());
    }
    ClusterIcon.prototype.onAdd = function () {
        var _this = this;
        var cMouseDownInCluster;
        var cDraggingMapByCluster;
        this.div = document.createElement("div");
        this.div.className = this.className;
        if (this.visible) {
            this.show();
        }
        this.overlayView.getPanes().overlayMouseTarget.appendChild(this.div);
        this.boundsChangedListener = google.maps.event.addListener(this.overlayView.getMap(), "boundschanged", function boundsChabged() {
            cDraggingMapByCluster = cMouseDownInCluster;
        });
        google.maps.event.addDomListener(this.div, "mousedown", function onMouseDown() {
            cMouseDownInCluster = true;
            cDraggingMapByCluster = false;
        });
        google.maps.event.addDomListener(this.div, "click", function (event) {
            cMouseDownInCluster = false;
            if (!cDraggingMapByCluster) {
                var markerClusterer_1 = _this.cluster.getClusterer();
                google.maps.event.trigger(markerClusterer_1, "click", _this.cluster);
                google.maps.event.trigger(markerClusterer_1, "clusterclick", _this.cluster);
                if (markerClusterer_1.getZoomOnClick()) {
                    var maxZoom_1 = markerClusterer_1.getMaxZoom();
                    var bounds_1 = _this.cluster.getBounds();
                    markerClusterer_1.overlayView
                        .getMap()
                        .fitBounds(bounds_1);
                    setTimeout(function timeout() {
                        markerClusterer_1.overlayView
                            .getMap()
                            .fitBounds(bounds_1);
                        if (maxZoom_1 !== null && (markerClusterer_1.overlayView.getMap().getZoom() > maxZoom_1)) {
                            markerClusterer_1.overlayView.getMap().setZoom(maxZoom_1 + 1);
                        }
                    }, 100);
                }
                event.cancelBubble = true;
                if (event.stopPropagation) {
                    event.stopPropagation();
                }
            }
        });
        google.maps.event.addDomListener(this.div, "mouseover", function () {
            google.maps.event.trigger(_this.cluster.getClusterer(), "mouseover", _this.cluster);
        });
        google.maps.event.addDomListener(this.div, "mouseout", function () {
            google.maps.event.trigger(_this.cluster.getClusterer(), "mouseout", _this.cluster);
        });
    };
    ClusterIcon.prototype.onRemove = function () {
        if (this.div &&
            this.div.parentNode) {
            this.hide();
            if (this.boundsChangedListener !== null) {
                google.maps.event.removeListener(this.boundsChangedListener);
            }
            google.maps.event.clearInstanceListeners(this.div);
            this.div.parentNode.removeChild(this.div);
            this.div = null;
        }
    };
    ClusterIcon.prototype.draw = function () {
        if (this.visible && this.div !== null && this.center) {
            var _a = this.getPosFromLatLng(this.center), x = _a.x, y = _a.y;
            this.div.style.top = y + "px";
            this.div.style.left = x + "px";
        }
    };
    ClusterIcon.prototype.hide = function () {
        if (this.div) {
            this.div.style.display = "none";
        }
        this.visible = false;
    };
    ClusterIcon.prototype.show = function () {
        if (this.div && this.center) {
            var img = "";
            var bp = this.backgroundPosition.split(" ");
            var spriteH = parseInt(bp[0].replace(/^\s+|\s+$/g, ""), 10);
            var spriteV = parseInt(bp[1].replace(/^\s+|\s+$/g, ""), 10);
            var pos = this.getPosFromLatLng(this.center);
            this.div.style.cssText = this.createCss(pos);
            img = "<img src='" + this.url + "' style='position: absolute; top: " + spriteV + "px; left: " + spriteH + "px; ";
            if (!this.cluster.getClusterer().enableRetinaIcons) {
                img += "clip: rect(" + (-1 * spriteV) + "px, " + ((-1 * spriteH) + this.width) + "px, " +
                    ((-1 * spriteV) + this.height) + "px, " + (-1 * spriteH) + "px);";
            }
            img += "'>";
            this.div.innerHTML = img + "<div style='" +
                "position: absolute;" +
                "top: " + this.anchorText[0] + "px;" +
                "left: " + this.anchorText[1] + "px;" +
                "color: " + this.textColor + ";" +
                "font-size: " + this.textSize + "px;" +
                "font-family: " + this.fontFamily + ";" +
                "font-weight: " + this.fontWeight + ";" +
                "font-style: " + this.fontStyle + ";" +
                "text-decoration: " + this.textDecoration + ";" +
                "text-align: center;" +
                "width: " + this.width + "px;" +
                "line-height:" + this.height + "px;" +
                "'>" + this.sums.text + "</div>";
            if (typeof this.sums.title === "undefined" || this.sums.title === "") {
                this.div.title = this.cluster.getClusterer().getTitle();
            }
            else {
                this.div.title = this.sums.title;
            }
            this.div.style.display = "";
        }
        this.visible = true;
    };
    ClusterIcon.prototype.useStyle = function (sums) {
        this.sums = sums;
        var style = this.styles[Math.min(this.styles.length - 1, Math.max(0, sums.index - 1))];
        this.url = style.url;
        this.height = style.height;
        this.width = style.width;
        this.anchorText = style.anchorText || [0, 0];
        this.anchorIcon = style.anchorIcon || [this.height / 2, this.width / 2];
        this.textColor = style.textColor || "black";
        this.textSize = style.textSize || 11;
        this.textDecoration = style.textDecoration || "none";
        this.fontWeight = style.fontWeight || "bold";
        this.fontStyle = style.fontStyle || "normal";
        this.fontFamily = style.fontFamily || "Arial,sans-serif";
        this.backgroundPosition = style.backgroundPosition || "0 0";
    };
    ClusterIcon.prototype.setCenter = function (center) {
        this.center = center;
    };
    ClusterIcon.prototype.createCss = function (pos) {
        var style = [];
        style.push("cursor: pointer;");
        style.push("position: absolute; top: " + pos.y + "px; left: " + pos.x + "px;");
        style.push("width: " + this.width + "px; height: " + this.height + "px;");
        return style.join("");
    };
    ClusterIcon.prototype.getPosFromLatLng = function (latlng) {
        var pos = this.overlayView.getProjection().fromLatLngToDivPixel(latlng);
        pos.x -= this.anchorIcon[1];
        pos.y -= this.anchorIcon[0];
        pos.x = pos.x;
        pos.y = pos.y;
        return pos;
    };
    return ClusterIcon;
}());
exports.ClusterIcon = ClusterIcon;
