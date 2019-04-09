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
var BicyclingLayer = (function (_super) {
    __extends(BicyclingLayer, _super);
    function BicyclingLayer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            bicyclingLayer: null
        };
        _this.setBicyclingLayerCallback = function () {
            if (_this.state.bicyclingLayer !== null) {
                _this.state.bicyclingLayer.setMap(_this.context);
                if (_this.props.onLoad) {
                    _this.props.onLoad(_this.state.bicyclingLayer);
                }
            }
        };
        return _this;
    }
    BicyclingLayer.prototype.componentDidMount = function () {
        var bicyclingLayer = new google.maps.BicyclingLayer();
        function setBicyclingLayer() {
            return {
                bicyclingLayer: bicyclingLayer
            };
        }
        this.setState(setBicyclingLayer, this.setBicyclingLayerCallback);
    };
    BicyclingLayer.prototype.componentWillUnmount = function () {
        if (this.state.bicyclingLayer !== null) {
            if (this.props.onUnmount) {
                this.props.onUnmount(this.state.bicyclingLayer);
            }
            this.state.bicyclingLayer.setMap(null);
        }
    };
    BicyclingLayer.prototype.render = function () {
        return null;
    };
    BicyclingLayer.contextType = map_context_1.default;
    return BicyclingLayer;
}(React.PureComponent));
exports.BicyclingLayer = BicyclingLayer;
exports.default = BicyclingLayer;
