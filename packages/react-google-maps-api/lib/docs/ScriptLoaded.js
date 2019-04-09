"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
function SpanIntro() {
    return (React.createElement("span", null,
        React.createElement("a", { href: '#introduction' }, "Enter API Key"),
        " to see examples"));
}
var ScriptLoaded = (function (_super) {
    __extends(ScriptLoaded, _super);
    function ScriptLoaded(props) {
        var _this = _super.call(this, props) || this;
        _this.setScriptLoadedCallback = function () {
            if (_this.state.scriptLoaded) {
                window.clearInterval(_this.interval);
            }
        };
        _this.checkIfScriptLoaded = function () {
            function serScriptLoaded() {
                return {
                    scriptLoaded: true
                };
            }
            if (window.google) {
                _this.setState(serScriptLoaded, _this.setScriptLoadedCallback);
            }
        };
        _this.state = {
            scriptLoaded: !!window.google
        };
        _this.interval = window.setInterval(_this.checkIfScriptLoaded, 200);
        return _this;
    }
    ScriptLoaded.prototype.componentWillUnmount = function () {
        window.clearInterval(this.interval);
    };
    ScriptLoaded.prototype.render = function () {
        if (!this.state.scriptLoaded) {
            return React.createElement(SpanIntro, null);
        }
        return (this.props.children instanceof Function) ? this.props.children() : this.props.children;
    };
    return ScriptLoaded;
}(React.Component));
exports.default = ScriptLoaded;
