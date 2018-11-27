"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "GoogleMapProvider", {
  enumerable: true,
  get: function get() {
    return _GoogleMapProvider.default;
  }
});
Object.defineProperty(exports, "LoadScript", {
  enumerable: true,
  get: function get() {
    return _GoogleMapProvider.LoadScript;
  }
});
Object.defineProperty(exports, "GoogleMap", {
  enumerable: true,
  get: function get() {
    return _GoogleMap.default;
  }
});
Object.defineProperty(exports, "BicyclingLayer", {
  enumerable: true,
  get: function get() {
    return _BicyclingLayer.default;
  }
});

var _GoogleMapProvider = _interopRequireWildcard(require("./GoogleMapProvider"));

var _GoogleMap = _interopRequireDefault(require("./components/maps/GoogleMap"));

var _BicyclingLayer = _interopRequireDefault(require("./components/maps/BicyclingLayer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }