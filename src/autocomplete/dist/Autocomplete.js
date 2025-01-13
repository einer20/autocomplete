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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var react_1 = require("react");
var react_2 = require("react");
var ResultList_1 = require("./ResultList");
require("./autocomplete.css");
var defaults_1 = require("./defaults");
var ClickAway_1 = require("./ClickAway");
function Autocomplete(props) {
    var _this = this;
    var defaultItems = props.items, filter = props.filter, onChange = props.onChange, isError = props.isError, getLabel = props.getLabel, label = props.label, closeOnNavigationSelection = props.closeOnNavigationSelection, clearOnScape = props.clearOnScape, defaultIsLoading = props.isLoading;
    var _a = react_2.useState([]), items = _a[0], setItems = _a[1];
    var _b = react_2.useState(""), userInput = _b[0], setUserInput = _b[1];
    var _c = react_2.useState(), selectedItem = _c[0], setSelectedItem = _c[1];
    var _d = react_2.useState(), isLoading = _d[0], setIsLoading = _d[1];
    var _e = react_2.useState(false), isOpen = _e[0], setIsOpen = _e[1];
    var MAX_ITEMS_TO_SHOW = 100;
    react_2.useEffect(function () {
        setItems(defaultItems.slice(0, MAX_ITEMS_TO_SHOW));
    }, [defaultItems]);
    react_2.useEffect(function () {
        if (selectedItem)
            setUserInput(getLabel(selectedItem));
        if (onChange && selectedItem !== undefined)
            onChange(selectedItem);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedItem]);
    react_2.useEffect(function () {
        setIsLoading(defaultIsLoading);
    }, [defaultIsLoading]);
    var onInputChange = function (e) { return __awaiter(_this, void 0, void 0, function () {
        var value, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    value = e.target.value;
                    setUserInput(value);
                    setIsOpen(true);
                    if (!filter) return [3 /*break*/, 2];
                    return [4 /*yield*/, filter(value, defaultItems)];
                case 1:
                    _a = _b.sent();
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, defaults_1.defaultFilter(value, defaultItems)];
                case 3:
                    _a = _b.sent();
                    _b.label = 4;
                case 4:
                    result = _a;
                    setItems(result.slice(0, MAX_ITEMS_TO_SHOW));
                    return [2 /*return*/];
            }
        });
    }); };
    var onNavigationKeysPressed = function (e) {
        var highlightedIndex = items.findIndex(function (x) { return x.hightlight; });
        var newHightlightedIndex = -1;
        if (e.key === "ArrowDown") {
            newHightlightedIndex = highlightedIndex + 1;
        }
        else if (e.key === "ArrowUp" && highlightedIndex < items.length) {
            newHightlightedIndex = highlightedIndex - 1;
        }
        else if (e.key === "Enter" && highlightedIndex > -1) {
            setSelectedItem(items.at(highlightedIndex));
            if (closeOnNavigationSelection)
                setIsOpen(false);
        }
        else if (e.key === "Escape") {
            newHightlightedIndex = -1;
            items.at(highlightedIndex).hightlight = false;
            if (clearOnScape)
                setUserInput("");
        }
        if (typeof items[newHightlightedIndex] !== "undefined") {
            items.at(highlightedIndex).hightlight = false;
            items.at(newHightlightedIndex).hightlight = true;
        }
        setItems(__spreadArrays(items));
    };
    var onInputClick = function (e) {
        if (e.target.value.length > 0)
            setIsOpen(true);
    };
    var onSelect = function (item) {
        if (closeOnNavigationSelection)
            setIsOpen(false);
        setSelectedItem(item);
    };
    var getExtraClasses = function () { return [
        isError ? 'error' : '',
        isLoading ? 'loading' : ''
    ].join(''); };
    return react_1["default"].createElement(ClickAway_1["default"], { onClickAway: function () { return setIsOpen(false); } },
        react_1["default"].createElement("div", { className: "autocomplete " + getExtraClasses() },
            react_1["default"].createElement("label", null, label),
            react_1["default"].createElement("div", { className: "input" },
                react_1["default"].createElement("input", { type: "text", onClick: onInputClick, onChange: onInputChange, onKeyDown: onNavigationKeysPressed, value: userInput })),
            isOpen &&
                react_1["default"].createElement(ResultList_1["default"], __assign({}, props, { items: items, input: userInput, onSelect: onSelect }))));
}
exports["default"] = Autocomplete;
