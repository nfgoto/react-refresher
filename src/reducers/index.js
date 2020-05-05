"use strict";
exports.__esModule = true;
var redux_1 = require("redux");
var location_1 = require("./location");
var theme_1 = require("./theme");
exports["default"] = redux_1.combineReducers({
    location: location_1["default"],
    theme: theme_1["default"]
});
