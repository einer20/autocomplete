"use strict";
exports.__esModule = true;
var react_1 = require("react");
/**
 * Notify when the user click away from the wrapped container
 * @param props Event and children props
 * @returns
 */
function ClickAway(props) {
    var containerRef = react_1.useRef(null);
    react_1.useEffect(function () {
        function onClick(e) {
            var clickInside = containerRef.current && containerRef.current.contains(e.target);
            if (!clickInside)
                props.onClickAway();
        }
        window.addEventListener("click", onClick);
    }, []);
    return react_1["default"].createElement("div", { ref: containerRef }, props.children);
}
exports["default"] = ClickAway;
