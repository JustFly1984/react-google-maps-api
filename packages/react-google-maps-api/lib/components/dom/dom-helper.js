"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getOffsetOverride(containerElement, getPixelPositionOffset) {
    return typeof getPixelPositionOffset === "function"
        ? getPixelPositionOffset(containerElement.offsetWidth, containerElement.offsetHeight)
        : {};
}
exports.getOffsetOverride = getOffsetOverride;
var createLatLng = function (inst, Type) { return new Type(inst.lat, inst.lng); };
var createLatLngBounds = function (inst, Type) {
    return new Type(new google.maps.LatLng(inst.ne.lat, inst.ne.lng), new google.maps.LatLng(inst.sw.lat, inst.sw.lng));
};
var ensureOfType = function (inst, type, factory) {
    return inst instanceof type ? inst : factory(inst, type);
};
var getLayoutStylesByBounds = function (mapCanvasProjection, offset, bounds) {
    var ne = mapCanvasProjection.fromLatLngToDivPixel(bounds.getNorthEast());
    var sw = mapCanvasProjection.fromLatLngToDivPixel(bounds.getSouthWest());
    if (ne && sw) {
        return {
            left: sw.x + offset.x + "px",
            top: ne.y + offset.y + "px",
            width: ne.x - sw.x - offset.x + "px",
            height: sw.y - ne.y - offset.y + "px"
        };
    }
    return {
        left: "-9999px",
        top: "-9999px"
    };
};
var getLayoutStylesByPosition = function (mapCanvasProjection, offset, position) {
    var point = mapCanvasProjection.fromLatLngToDivPixel(position);
    if (point) {
        var x = point.x, y = point.y;
        return {
            left: x + offset.x + "px",
            top: y + offset.y + "px"
        };
    }
    return {
        left: "-9999px",
        top: "-9999px"
    };
};
exports.getLayoutStyles = function (mapCanvasProjection, offset, bounds, position) {
    return bounds !== undefined
        ? getLayoutStylesByBounds(mapCanvasProjection, offset, ensureOfType(bounds, google.maps.LatLngBounds, createLatLngBounds))
        : getLayoutStylesByPosition(mapCanvasProjection, offset, ensureOfType(position, google.maps.LatLng, createLatLng));
};
