"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reduce = void 0;

var reduce = function reduce(obj, fn, acc) {
  return Object.keys(obj).reduce(function (newAcc, key, keys) {
    return fn(newAcc, obj[key], key);
  }, acc);
};

exports.reduce = reduce;