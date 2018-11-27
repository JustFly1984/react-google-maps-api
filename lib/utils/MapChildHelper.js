"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDerivedStateFromProps = getDerivedStateFromProps;
exports.componentWillUnmount = componentWillUnmount;
exports.registerEvents = registerEvents;
exports.construct = void 0;

var _has = require("./has");

var _lowerfirst = require("./lowerfirst");

var _reduce2 = require("./reduce");

var _foreach = require("./foreach");

/* eslint-disable filenames/match-regex */

/* global google */
var rdcUncontrolledAndControlledProps = function rdcUncontrolledAndControlledProps(acc, value, key) {
  if ((0, _has.has)(acc.prevProps, key)) {
    var match = key.match(/^default(\S+)/);

    if (match) {
      var unprefixedKey = (0, _lowerfirst.lowerFirst)(match[1]);

      if (!(0, _has.has)(acc.nextProps, unprefixedKey)) {
        acc.nextProps[unprefixedKey] = acc.prevProps[key];
      }
    } else {
      acc.nextProps[key] = acc.prevProps[key];
    }
  }

  return acc;
};

var applyUpdaterToNextProps = function applyUpdaterToNextProps(updaterMap, prevProps, nextProps, instance) {
  var map = {};

  var iter = function iter(fn, key) {
    var nextValue = nextProps[key];

    if (nextValue !== prevProps[key]) {
      map[key] = nextValue;
      fn(instance, nextValue);
    }
  };

  (0, _foreach.forEach)(updaterMap, iter);
  return map;
};

var construct = function construct(propTypes, updaterMap, prevProps, instance) {
  var _reduce = (0, _reduce2.reduce)(propTypes, rdcUncontrolledAndControlledProps, {
    nextProps: {},
    prevProps: prevProps
  }),
      nextProps = _reduce.nextProps;

  return applyUpdaterToNextProps(updaterMap, {}, // empty prevProps for construct
  nextProps, instance);
};
/*
export function componentDidMount (props, instance, eventMap) {
  return registerEvents(props, instance, eventMap)
}

export function componentDidUpdate (props, instance, eventMap, updaterMap, state) {
  unregisterEvent(state.registeredList)

  applyUpdaterToNextProps(updaterMap, state.prevProps, props, instance)

  return registerEvents(props, instance, eventMap)
}
*/


exports.construct = construct;

function getDerivedStateFromProps(props, state, instance, eventMap, updaterMap) {
  unregisterEvent(state.registeredList);
  return {
    prevProps: applyUpdaterToNextProps(updaterMap, state.prevProps, props, instance),
    registeredList: registerEvents(props, instance, eventMap)
  };
}

function componentWillUnmount(component) {
  unregisterEvent(component.state.registeredList);
}

function registerEvents(props, instance, eventMap) {
  var registeredList = (0, _reduce2.reduce)(eventMap, function (acc, googleEventName, onEventName) {
    if (typeof props[onEventName] === 'function') {
      acc.push(google.maps.event.addListener(instance, googleEventName, props[onEventName]));
    }

    return acc;
  }, []);
  return registeredList;
}

function unregisterEvent(registered) {
  google.maps.event.removeListener(registered);
}