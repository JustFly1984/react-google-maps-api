"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function forEach(obj, fn) {
    Object.keys(obj).forEach(function iterator(key) {
        return fn(obj[key], key);
    });
}
exports.forEach = forEach;
