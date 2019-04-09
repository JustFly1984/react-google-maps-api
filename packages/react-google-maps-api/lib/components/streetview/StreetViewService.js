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
var map_context_1 = require("../../map-context");
var StreetViewService = (function (_super) {
    __extends(StreetViewService, _super);
    function StreetViewService() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            streetViewService: null
        };
        _this.setStreetViewServiceCallback = function () {
            if (_this.state.streetViewService !== null && _this.props.onLoad) {
                _this.props.onLoad(_this.state.streetViewService);
            }
        };
        return _this;
    }
    StreetViewService.prototype.componentDidMount = function () {
        var streetViewService = new google.maps.StreetViewService();
        function setStreetViewService() {
            return {
                streetViewService: streetViewService
            };
        }
        this.setState(setStreetViewService);
    };
    StreetViewService.prototype.componentWillUnmount = function () {
        if (this.state.streetViewService !== null) {
            if (this.props.onUnmount) {
                this.props.onUnmount(this.state.streetViewService);
            }
        }
    };
    StreetViewService.prototype.render = function () {
        return null;
    };
    StreetViewService.contextType = map_context_1.default;
    return StreetViewService;
}(React.PureComponent));
exports.StreetViewService = StreetViewService;
exports.default = StreetViewService;
