"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.map = void 0;

var map = function map(obj, fn) {
  return Object.keys(obj).map(function (key, index) {
    return fn(obj[key], key, index);
  });
};

exports.map = map;