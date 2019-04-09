"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var isbrowser_1 = require("./isbrowser");
exports.injectScript = function (_a) {
    var url = _a.url, id = _a.id;
    if (!isbrowser_1.isBrowser) {
        return Promise.reject(new Error("document is undefined"));
    }
    return new Promise(function injectScriptCallback(resolve, reject) {
        if (document.getElementById(id)) {
            return resolve(id);
        }
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = url;
        script.id = id;
        script.async = true;
        script.onload = function onload() {
            resolve(id);
        };
        script.onerror = reject;
        document.head.appendChild(script);
    })
        .catch(function (err) {
        console.error('injectScript error: ', err);
    });
};
