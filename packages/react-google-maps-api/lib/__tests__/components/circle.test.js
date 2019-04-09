"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_testing_library_1 = require("react-testing-library");
var GoogleMap_1 = require("../../GoogleMap");
var Circle_1 = require("../../components/drawing/Circle");
var CENTER = {
    lat: 0,
    lng: 0
};
var instance;
function onCircleLoad(circle) {
    instance = circle;
}
function getCircle(props) {
    return React.createElement(GoogleMap_1.default, null,
        React.createElement(Circle_1.default, __assign({}, props)));
}
afterEach(function () {
    react_testing_library_1.cleanup();
    instance = null;
});
describe('Circle', function () {
    it('should call onLoad only once', function () {
        var onLoadMock = jest.fn();
        react_testing_library_1.render(getCircle({
            center: CENTER,
            radius: 1,
            onLoad: onLoadMock
        }));
        expect(onLoadMock).toBeCalledTimes(1);
    });
    it('should call onLoad when loading with instance', function () {
        react_testing_library_1.render(getCircle({
            center: CENTER,
            radius: 1,
            onLoad: onCircleLoad
        }));
        expect(instance).toHaveProperty("setCenter");
    });
    it('should do something', function () {
        var rerender = react_testing_library_1.render(getCircle({
            center: CENTER,
            radius: 1,
            onLoad: onCircleLoad
        })).rerender;
        rerender(getCircle({
            center: CENTER,
            radius: 2,
            onLoad: onCircleLoad
        }));
        expect(instance.setRadius).toBeCalledWith(2);
    });
});
