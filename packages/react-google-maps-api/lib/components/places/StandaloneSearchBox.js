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
var helper_1 = require("../../utils/helper");
var map_context_1 = require("../../map-context");
var eventMap = {
    onPlacesChanged: "places_changed"
};
var updaterMap = {
    bounds: function (instance, bounds) {
        instance.setBounds(bounds);
    }
};
var StandaloneSearchBox = (function (_super) {
    __extends(StandaloneSearchBox, _super);
    function StandaloneSearchBox() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.registeredEvents = [];
        _this.containerElement = React.createRef();
        _this.state = {
            searchBox: null
        };
        _this.setSearchBoxCallback = function () {
            if (_this.state.searchBox !== null && _this.props.onLoad) {
                _this.props.onLoad(_this.state.searchBox);
            }
        };
        return _this;
    }
    StandaloneSearchBox.prototype.componentDidMount = function () {
        invariant(google.maps.places, 'Did you include "libraries=places" in the URL?');
        if (this.containerElement !== null &&
            this.containerElement.current !== null) {
            var input = this.containerElement.current.querySelector("input");
            if (input) {
                var searchBox_1 = new google.maps.places.SearchBox(input, this.props.options);
                this.registeredEvents = helper_1.applyUpdatersToPropsAndRegisterEvents({
                    updaterMap: updaterMap,
                    eventMap: eventMap,
                    prevProps: {},
                    nextProps: this.props,
                    instance: searchBox_1
                });
                this.setState(function setSearchBox() {
                    return {
                        searchBox: searchBox_1
                    };
                }, this.setSearchBoxCallback);
            }
        }
    };
    StandaloneSearchBox.prototype.componentDidUpdate = function (prevProps) {
        if (this.state.searchBox !== null) {
            helper_1.unregisterEvents(this.registeredEvents);
            this.registeredEvents = helper_1.applyUpdatersToPropsAndRegisterEvents({
                updaterMap: updaterMap,
                eventMap: eventMap,
                prevProps: prevProps,
                nextProps: this.props,
                instance: this.state.searchBox
            });
        }
    };
    StandaloneSearchBox.prototype.componentWillUnmount = function () {
        if (this.state.searchBox !== null) {
            if (this.props.onUnmount) {
                this.props.onUnmount(this.state.searchBox);
            }
            helper_1.unregisterEvents(this.registeredEvents);
        }
    };
    StandaloneSearchBox.prototype.render = function () {
        return (React.createElement("div", { ref: this.containerElement }, React.Children.only(this.props.children)));
    };
    StandaloneSearchBox.contextType = map_context_1.default;
    return StandaloneSearchBox;
}(React.PureComponent));
exports.default = StandaloneSearchBox;
