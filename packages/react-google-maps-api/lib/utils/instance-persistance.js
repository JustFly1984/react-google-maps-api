"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var clearChildren = function (node) {
    if (node) {
        while (node.firstChild) {
            node.removeChild(node.firstChild);
        }
    }
};
var getMapInstanceId = function (id) {
    return "google-map-" + id;
};
var getHiddenMapContainer = function (id) {
    var hiddenMapContainer = "hidden-container-" + id;
    var element = document.getElementById(hiddenMapContainer);
    if (!element) {
        element = document.createElement("div");
        element.id = hiddenMapContainer;
        element.style.display = "none";
        document.body.appendChild(element);
    }
    return element;
};
exports.restoreInstance = function (_a) {
    var id = _a.id, zoom = _a.zoom, center = _a.center, mapContainerStyle = _a.mapContainerStyle, options = _a.options;
    var map = window[getMapInstanceId(id)];
    var hiddenContainer = getHiddenMapContainer(id);
    if (map && hiddenContainer.children.length === 1) {
        if (zoom) {
            map.setZoom(zoom);
        }
        if (center) {
            map.setCenter(center);
        }
        if (options) {
            map.setOptions(options);
        }
        var mapContainer_1 = document.getElementById(id);
        if (mapContainer_1) {
            clearChildren(mapContainer_1);
            mapContainer_1.appendChild(hiddenContainer.children[0]);
            if (typeof mapContainerStyle === 'object') {
                Object.keys(mapContainerStyle).forEach(function forEachStyle(styleKey) {
                    mapContainer_1.style[styleKey] = mapContainerStyle[styleKey];
                });
            }
        }
        return map;
    }
    return false;
};
exports.saveInstance = function (id, map) {
    var hiddenContainer = getHiddenMapContainer(id);
    clearChildren(hiddenContainer);
    var mapContainer = document.getElementById(id);
    if (mapContainer && mapContainer.children && mapContainer.children[0]) {
        hiddenContainer.appendChild(mapContainer.children[0]);
    }
    window[getMapInstanceId(id)] = map;
};
