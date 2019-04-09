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
var invariant = require("invariant");
var DirectionsService = (function (_super) {
    __extends(DirectionsService, _super);
    function DirectionsService() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            directionsService: null
        };
        _this.setDirectionsServiceCallback = function () {
            if (_this.state.directionsService !== null && _this.props.onLoad) {
                _this.props.onLoad(_this.state.directionsService);
            }
        };
        return _this;
    }
    DirectionsService.prototype.componentDidMount = function () {
        invariant(!!this.props.options, "DirectionsService expected options object as parameter, but got %s", this.props.options);
        var directionsService = new google.maps.DirectionsService();
        function setDirectionsService() {
            return {
                directionsService: directionsService
            };
        }
        this.setState(setDirectionsService, this.setDirectionsServiceCallback);
    };
    DirectionsService.prototype.componentDidUpdate = function () {
        if (this.state.directionsService !== null) {
            this.state.directionsService.route(this.props.options, this.props.callback);
        }
    };
    DirectionsService.prototype.componentWillUnmount = function () {
        if (this.state.directionsService !== null) {
            if (this.props.onUnmount) {
                this.props.onUnmount(this.state.directionsService);
            }
        }
    };
    DirectionsService.prototype.render = function () {
        return React.createElement(React.Fragment, null);
    };
    return DirectionsService;
}(React.PureComponent));
exports.DirectionsService = DirectionsService;
exports.default = DirectionsService;
