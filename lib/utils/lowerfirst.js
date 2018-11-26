"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.lowerFirst = void 0;

var lowerFirst = function lowerFirst(str) {
  return str.charAt(0).toLowerCase() + str.slice(1);
};

exports.lowerFirst = lowerFirst;