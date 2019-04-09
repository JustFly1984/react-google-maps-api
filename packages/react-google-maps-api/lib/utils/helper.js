"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var reduce_1 = require("./reduce");
var foreach_1 = require("./foreach");
var applyUpdaterToNextProps = function (updaterMap, prevProps, nextProps, instance) {
    var map = {};
    var iter = function (fn, key) {
        var nextValue = nextProps[key];
        if (nextValue !== prevProps[key]) {
            map[key] = nextValue;
            fn(instance, nextValue);
        }
    };
    foreach_1.forEach(updaterMap, iter);
    return map;
};
function registerEvents(props, instance, eventMap) {
    var registeredList = reduce_1.reduce(eventMap, function reducer(acc, googleEventName, onEventName) {
        if (typeof props[onEventName] === "function") {
            acc.push(google.maps.event.addListener(instance, googleEventName, props[onEventName]));
        }
        return acc;
    }, []);
    return registeredList;
}
exports.registerEvents = registerEvents;
function unregisterEvent(registered) {
    google.maps.event.removeListener(registered);
}
function unregisterEvents(events) {
    if (events === void 0) { events = []; }
    events.map(unregisterEvent);
}
exports.unregisterEvents = unregisterEvents;
function applyUpdatersToPropsAndRegisterEvents(_a) {
    var updaterMap = _a.updaterMap, eventMap = _a.eventMap, prevProps = _a.prevProps, nextProps = _a.nextProps, instance = _a.instance;
    applyUpdaterToNextProps(updaterMap, prevProps, nextProps, instance);
    return registerEvents(nextProps, instance, eventMap);
}
exports.applyUpdatersToPropsAndRegisterEvents = applyUpdatersToPropsAndRegisterEvents;
