"use strict";
exports.__esModule = true;
var react_1 = require("react");
var router_1 = require("@reach/router");
var react_redux_1 = require("react-redux");
var Navbar_1 = require("./Navbar");
var SearchParams_1 = require("./SearchParams");
var Details_1 = require("./Details");
var store_1 = require("./store");
// lazy loading Details page, placeholder components until accessed
// ReactDOMServer (used server-side) does not yet support Suspense , maybe use react-lazy-ssr
// const Details = lazy(() => import("./Details"));
// const SearchParams = lazy(() => import("./SearchParams"));
var App = function () {
    return (<react_1["default"].StrictMode>
      <react_redux_1.Provider store={store_1["default"]}>
        <div>
          <Navbar_1["default"] />
          <router_1.Router>
            <SearchParams_1["default"] path="/"/>
            <Details_1["default"] path="/details/:id"/>
          </router_1.Router>
        </div>
      </react_redux_1.Provider>
    </react_1["default"].StrictMode>);
};
// at INITIAL render there should not be any reference to document, later references are OK because DOM is mounted in browser (SSR)
exports["default"] = App;
