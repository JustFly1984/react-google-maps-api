"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.has = void 0;

var has = function has(object, key) {
  return object != null && hasOwnProperty.call(object, key);
};

exports.has = has;