"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.componentDidMount = componentDidMount;
exports.componentDidUpdate = componentDidUpdate;
exports.componentWillUnmount = componentWillUnmount;
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
  var iter = function iter(fn, key) {
    var nextValue = nextProps[key];

    if (nextValue !== prevProps[key]) {
      fn(instance, nextValue);
    }
  };

  (0, _foreach.forEach)(updaterMap, iter);
};

var construct = function construct(propTypes, updaterMap, prevProps, instance) {
  var _reduce = (0, _reduce2.reduce)(propTypes, rdcUncontrolledAndControlledProps, {
    nextProps: {},
    prevProps: prevProps
  }),
      nextProps = _reduce.nextProps;

  applyUpdaterToNextProps(updaterMap, {
    /* empty prevProps for construct */
  }, nextProps, instance);
};

exports.construct = construct;

function componentDidMount(component, instance, eventMap) {
  registerEvents(component, instance, eventMap);
}

function componentDidUpdate(component, instance, eventMap, updaterMap, prevProps) {
  component.unregisterAllEvents();
  applyUpdaterToNextProps(updaterMap, prevProps, component.props, instance);
  registerEvents(component, instance, eventMap);
}

function componentWillUnmount(component) {
  component.unregisterAllEvents();
}

function registerEvents(component, instance, eventMap) {
  var registeredList = (0, _reduce2.reduce)(eventMap, function (acc, googleEventName, onEventName) {
    if (typeof component.props[onEventName] === 'function') {
      acc.push(google.maps.event.addListener(instance, googleEventName, component.props[onEventName]));
    }

    return acc;
  }, []);
  component.unregisterAllEvents = _foreach.forEach.bind(null, registeredList, unregisterEvent);
}

function unregisterEvent(registered) {
  google.maps.event.removeListener(registered);
}