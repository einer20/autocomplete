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
var useGetQuery_1 = require("./api/useGetQuery");
var Autocomplete_1 = require("./autocomplete/Autocomplete");
function ApiExample() {
    var _a = useGetQuery_1["default"](), get = _a.get, albums = _a.result, isLoading = _a.isLoading, isError = _a.isError;
    react_1.useEffect(function () {
        get("https://jsonplaceholder.typicode.com/albums");
    }, []);
    var data = albums === null || albums === void 0 ? void 0 : albums.map(function (x) { return (__assign(__assign({}, x), { key: x.id.toString() })); });
    return react_1["default"].createElement("div", { className: "section" },
        react_1["default"].createElement("h3", null, "Api example"),
        react_1["default"].createElement("label", null,
            react_1["default"].createElement("i", null,
                "You could also ",
                react_1["default"].createElement("a", { href: "https://developer.chrome.com/docs/devtools/settings/throttling" }, "throttle"),
                " the request with the devtools on chrome")),
        react_1["default"].createElement(Autocomplete_1["default"], { items: data || [], label: 'Albums', isLoading: isLoading, isError: isError, clearOnScape: true, closeOnNavigationSelection: true, getLabel: function (x) { return x.title; } }));
}
exports["default"] = ApiExample;
