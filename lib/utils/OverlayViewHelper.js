"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getOffsetOverride = getOffsetOverride;
exports.getLayoutStyles = getLayoutStyles;

/* eslint-disable filenames/match-regex */

/* global google */
function getOffsetOverride(containerElement, props) {
  var getPixelPositionOffset = props.getPixelPositionOffset;

  if (typeof getPixelPositionOffset === 'function') {
    return getPixelPositionOffset(containerElement.offsetWidth, containerElement.offsetHeight);
  } else {
    return {};
  }
}

function createLatLng(inst, Type) {
  return new Type(inst.lat, inst.lng);
}

function createLatLngBounds(inst, Type) {
  return new Type(new google.maps.LatLng(inst.ne.lat, inst.ne.lng), new google.maps.LatLng(inst.sw.lat, inst.sw.lng));
}

function ensureOfType(inst, type, factory) {
  if (inst instanceof type) {
    return inst;
  } else {
    return factory(inst, type);
  }
}

function getLayoutStylesByBounds(mapCanvasProjection, offset, bounds) {
  var ne = mapCanvasProjection.fromLatLngToDivPixel(bounds.getNorthEast());
  var sw = mapCanvasProjection.fromLatLngToDivPixel(bounds.getSouthWest());

  if (ne && sw) {
    return {
      left: "".concat(sw.x + offset.x, "px"),
      top: "".concat(ne.y + offset.y, "px"),
      width: "".concat(ne.x - sw.x - offset.x, "px"),
      height: "".concat(sw.y - ne.y - offset.y, "px")
    };
  }

  return {
    left: "-9999px",
    top: "-9999px"
  };
}

function getLayoutStylesByPosition(mapCanvasProjection, offset, position) {
  var point = mapCanvasProjection.fromLatLngToDivPixel(position);

  if (point) {
    var x = point.x,
        y = point.y;
    return {
      left: "".concat(x + offset.x, "px"),
      top: "".concat(y + offset.y, "px")
    };
  }

  return {
    left: "-9999px",
    top: "-9999px"
  };
}

function getLayoutStyles(mapCanvasProjection, offset, props) {
  if (props.bounds) {
    var bounds = ensureOfType(props.bounds, google.maps.LatLngBounds, createLatLngBounds);
    return getLayoutStylesByBounds(mapCanvasProjection, offset, bounds);
  } else {
    var position = ensureOfType(props.position, google.maps.LatLng, createLatLng);
    return getLayoutStylesByPosition(mapCanvasProjection, offset, position);
  }
}