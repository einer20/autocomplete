"use strict";
exports.__esModule = true;
var react_1 = require("react");
function ResultList(props) {
    /**
     * Hightlight the matching result by spliting the string
     * and adding the hightlighting to the word
     * @param x Item to get the label string from
     * @returns The react label element to render in the result
     */
    var getLabelInternal = function (x) {
        var l = props.getLabel(x);
        return l.split(new RegExp("(" + props.input + ")", "gi")).map(function (x) {
            return x.toLocaleLowerCase() === props.input.toLocaleLowerCase() ? react_1["default"].createElement("span", { className: "hightlighted" }, x) :
                react_1["default"].createElement("span", null, x);
        });
    };
    return react_1["default"].createElement("div", { className: "results", role: "dialog" },
        react_1["default"].createElement("div", { role: "listbox" },
            props.items.map(function (x) { return react_1["default"].createElement("div", { role: "listitem", tabIndex: 0, className: "item " + (x.hightlight ? 'a11y-hightlight' : ''), onKeyDown: function (e) {
                    if (e.key === "Enter")
                        props.onSelect(x);
                }, onClick: function () { return props.onSelect(x); }, key: x.key }, getLabelInternal(x)); }),
            props.items.length === 0 && react_1["default"].createElement("div", { className: "not-found" },
                react_1["default"].createElement("i", null,
                    "Results with ",
                    react_1["default"].createElement("b", null,
                        "'",
                        props.input,
                        "'"),
                    " not found")),
            props.isLoading && react_1["default"].createElement("div", { className: "loading" }, "Loading...")));
}
exports["default"] = ResultList;
