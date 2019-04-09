"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reduce = function (obj, fn, acc) {
    return Object.keys(obj)
        .reduce(function reducer(newAcc, key) {
        return fn(newAcc, obj[key], key);
    }, acc);
};
