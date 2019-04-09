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
var helper_1 = require("../../utils/helper");
var map_context_1 = require("../../map-context");
var invariant = require("invariant");
var eventMap = {
    onPlaceChanged: "place_changed"
};
var updaterMap = {
    bounds: function (instance, bounds) {
        instance.setBounds(bounds);
    },
    restrictions: function (instance, restrictions) {
        instance.setComponentRestrictions(restrictions);
    },
    fields: function (instance, fields) {
        instance.setFields(fields);
    },
    options: function (instance, options) {
        instance.setOptions(options);
    },
    types: function (instance, types) {
        instance.setTypes(types);
    }
};
var Autocomplete = (function (_super) {
    __extends(Autocomplete, _super);
    function Autocomplete() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.registeredEvents = [];
        _this.containerElement = React.createRef();
        _this.state = {
            autocomplete: null
        };
        _this.setAutocompleteCallback = function () {
            if (_this.state.autocomplete !== null && _this.props.onLoad) {
                _this.props.onLoad(_this.state.autocomplete);
            }
        };
        return _this;
    }
    Autocomplete.prototype.componentDidMount = function () {
        invariant(google.maps.places, 'Did you include "libraries=places" in the URL?', "sdfs");
        var input = this.containerElement.current.querySelector("input");
        if (input) {
            var autocomplete_1 = new google.maps.places.Autocomplete(input, this.props.options);
            this.registeredEvents = helper_1.applyUpdatersToPropsAndRegisterEvents({
                updaterMap: updaterMap,
                eventMap: eventMap,
                prevProps: {},
                nextProps: this.props,
                instance: autocomplete_1
            });
            this.setState(function setAutocomplete() {
                return {
                    autocomplete: autocomplete_1
                };
            }, this.setAutocompleteCallback);
        }
    };
    Autocomplete.prototype.componentDidUpdate = function (prevProps) {
        helper_1.unregisterEvents(this.registeredEvents);
        this.registeredEvents = helper_1.applyUpdatersToPropsAndRegisterEvents({
            updaterMap: updaterMap,
            eventMap: eventMap,
            prevProps: prevProps,
            nextProps: this.props,
            instance: this.state.autocomplete
        });
    };
    Autocomplete.prototype.componentWillUnmount = function () {
        if (this.state.autocomplete !== null) {
            helper_1.unregisterEvents(this.registeredEvents);
        }
    };
    Autocomplete.prototype.render = function () {
        return (React.createElement("div", { ref: this.containerElement }, React.Children.only(this.props.children)));
    };
    Autocomplete.contextType = map_context_1.default;
    return Autocomplete;
}(React.PureComponent));
exports.Autocomplete = Autocomplete;
exports.default = Autocomplete;
