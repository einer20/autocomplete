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
exports.__esModule = true;
var react_1 = require("react");
var Autocomplete_1 = require("./autocomplete/Autocomplete");
require("./app.css");
var countries_1 = require("./data/countries");
var ApiExample_1 = require("./ApiExample");
function App() {
    var _a = react_1.useState({
        closeResultsOnSelection: false,
        clearOnScape: false
    }), options = _a[0], setOptions = _a[1];
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement("div", { className: 'section' },
            react_1["default"].createElement("h3", null, "General configuration"),
            react_1["default"].createElement("label", null, "Setup the general configuration for all components showcasing all its features"),
            react_1["default"].createElement("div", { className: "options" },
                react_1["default"].createElement("label", null,
                    react_1["default"].createElement("input", { type: "checkbox", onChange: function (x) { return setOptions(__assign(__assign({}, options), { closeResultsOnSelection: x.target.checked })); } }),
                    " Auto close the dialog when the user selects an item with the Enter key"),
                react_1["default"].createElement("label", null,
                    react_1["default"].createElement("input", { type: "checkbox", onChange: function (x) { return setOptions(__assign(__assign({}, options), { clearOnScape: x.target.checked })); } }),
                    " Clear the input when the user press the Escape on the input"))),
        react_1["default"].createElement("div", { className: "section" },
            react_1["default"].createElement("h3", null, "Simple example"),
            react_1["default"].createElement(Autocomplete_1["default"], { items: countries_1.countries, label: 'Countries', clearOnScape: options.clearOnScape, closeOnNavigationSelection: options.closeResultsOnSelection, getLabel: function (x) { return x.name; } })),
        react_1["default"].createElement("div", { className: "section" },
            react_1["default"].createElement("h3", null, "Simple with onChange event"),
            react_1["default"].createElement(Autocomplete_1["default"], { items: countries_1.countries, label: 'Countries', clearOnScape: options.clearOnScape, closeOnNavigationSelection: options.closeResultsOnSelection, onChange: function (x) {
                    alert("selected item " + JSON.stringify(x));
                }, getLabel: function (x) { return x.name; } })),
        react_1["default"].createElement(ApiExample_1["default"], null)));
}
exports["default"] = App;
