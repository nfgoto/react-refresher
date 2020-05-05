"use strict";
exports.__esModule = true;
var defaultState = "Seattle, WA";
function location(state, action) {
    if (state === void 0) { state = defaultState; }
    if (action.type === "CHANGE_LOCATION") {
        return action.payload.location;
    }
    return state;
}
exports["default"] = location;
