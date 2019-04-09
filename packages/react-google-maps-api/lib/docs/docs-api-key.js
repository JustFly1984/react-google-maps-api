"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var googleMapKey_1 = require("./googleMapKey");
var KEY_NAME = "react-google-maps-api-key";
function setKey(key) {
    window.sessionStorage.setItem(KEY_NAME, key);
}
exports.setKey = setKey;
function getKey() {
    return googleMapKey_1.default || window.sessionStorage.getItem(KEY_NAME);
}
exports.getKey = getKey;
