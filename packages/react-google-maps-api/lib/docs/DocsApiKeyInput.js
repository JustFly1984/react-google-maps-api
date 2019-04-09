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
var react_1 = require("react");
var React = require("react");
var docs_api_key_1 = require("./docs-api-key");
var LoadScript_1 = require("../LoadScript");
var libraries = ['drawing', 'places', 'visualization'];
var inputStyle = {
    width: '400px',
    height: '40px',
    paddingLeft: '8px'
};
var buttonStyle = {
    height: '40px',
    marginLeft: '8px'
};
var DocsApiKeyInput = (function (_super) {
    __extends(DocsApiKeyInput, _super);
    function DocsApiKeyInput(props) {
        var _this = _super.call(this, props) || this;
        _this.onInputChange = function (_a) {
            var value = _a.target.value;
            function setKey() {
                return {
                    key: value
                };
            }
            _this.setState(setKey);
        };
        _this.onFormSubmit = function (event) {
            event.preventDefault();
            docs_api_key_1.setKey(_this.state.key);
            function setLoadScript() {
                return {
                    loadScript: true
                };
            }
            _this.setState(setLoadScript);
        };
        var key = docs_api_key_1.getKey();
        _this.state = key
            ? { key: key, loadScript: true }
            : { key: '', loadScript: false };
        return _this;
    }
    DocsApiKeyInput.prototype.render = function () {
        return (React.createElement(React.Fragment, null,
            React.createElement("form", { onSubmit: this.onFormSubmit },
                React.createElement("input", { type: 'text', onChange: this.onInputChange, value: this.state.key, placeholder: 'Enter Google Maps API Key', style: inputStyle }),
                React.createElement("button", { type: 'submit', style: buttonStyle }, "Set Key")),
            this.state.loadScript
                ? (React.createElement(LoadScript_1.default, { id: 'script-loader', googleMapsApiKey: this.state.key, language: 'en', region: 'EN', version: 'weekly', libraries: libraries, loadingElement: React.createElement("div", null, "Loading...") }))
                : (React.createElement(React.Fragment, null))));
    };
    return DocsApiKeyInput;
}(react_1.Component));
exports.default = DocsApiKeyInput;
