"use strict";
exports.__esModule = true;
exports.defaultFilter = void 0;
/**
 * Default filter that filters the items by search in all props inside the array.
 * @param items Items to filter
 */
function defaultFilter(input, items) {
    var lc = input.toLowerCase();
    var result = items.filter(function (x) {
        for (var name in x) {
            var value = x[name];
            if (x.hasOwnProperty(name) && value.toString().toLowerCase().includes(lc)) {
                return true;
            }
            // this algorithmon wont do deep object comparison
            // only 1 level object comparison. If there is a sub prop it wont be validated
        }
        return false;
    });
    return Promise.resolve(result);
}
exports.defaultFilter = defaultFilter;
