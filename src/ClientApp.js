/**
 * JS code running in browser
 */

import React from "react";
import { hydrate } from "react-dom";
import App from "./App";

// other browser-side code

// take over the server side rendered react markup
// render() would ignore the pre-rendered markup (defeats the purpose of SSR)
hydrate(<App />, document.getElementById("root"));
