"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var isRobotoStyle = function (element) {
    if (element.href &&
        element.href.indexOf("https://fonts.googleapis.com/css?family=Roboto") === 0) {
        return true;
    }
    if (element.tagName.toLowerCase() === "style" &&
        element.styleSheet &&
        element.styleSheet.cssText &&
        element.styleSheet.cssText.replace("\r\n", "").indexOf(".gm-style") === 0) {
        element.styleSheet.cssText = "";
        return true;
    }
    if (element.tagName.toLowerCase() === "style" &&
        element.innerHTML &&
        element.innerHTML.replace("\r\n", "").indexOf(".gm-style") === 0) {
        element.innerHTML = "";
        return true;
    }
    if (element.tagName.toLowerCase() === "style" &&
        !element.styleSheet &&
        !element.innerHTML) {
        return true;
    }
    return false;
};
exports.preventGoogleFonts = function () {
    console.log('preventGoogleFonts run');
    var head = document.getElementsByTagName("head")[0];
    var trueInsertBefore = head.insertBefore.bind(head);
    head.insertBefore = function insertBefore(newElement, referenceElement) {
        if (!isRobotoStyle(newElement)) {
            Reflect.apply(trueInsertBefore, head, [newElement, referenceElement]);
        }
    };
    var trueAppend = head.appendChild.bind(head);
    head.appendChild = function appendChild(textNode) {
        if (!isRobotoStyle(textNode)) {
            Reflect.apply(trueAppend, head, [textNode]);
        }
    };
};
