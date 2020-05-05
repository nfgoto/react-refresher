"use strict";
exports.__esModule = true;
var redux_1 = require("redux");
var reducers_1 = require("./reducers");
var store = redux_1.createStore(reducers_1["default"], 
//   check if running in browser and redux devtools are there, use that
typeof window === "object" &&
    typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== "undefined"
    ? window.__REDUX_DEVTOOLS_EXTENSION__()
    : function (f) { return f; });
exports["default"] = store;
