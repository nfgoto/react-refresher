"use strict";
exports.__esModule = true;
var defaultState = "darkgreen";
function theme(state, action) {
    if (state === void 0) { state = defaultState; }
    if (action.type === "CHANGE_THEME") {
        return action.payload.theme;
    }
    return state;
}
exports["default"] = theme;
