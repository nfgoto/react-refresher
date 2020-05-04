import React, { useState } from "react";
import { Router } from "@reach/router";
import ThemeContext from "./ThemeContext";
import Navbar from "./Navbar";
import SearchParams from "./SearchParams";
import Details from "./Details";

// lazy loading Details page, placeholder components until accessed
// ReactDOMServer (used server-side) does not yet support Suspense , maybe use react-lazy-ssr
// const Details = lazy(() => import("./Details"));
// const SearchParams = lazy(() => import("./SearchParams"));

const App = () => {
  const themeHook = useState("peru");

  return (
    // strict mode used to prohibit using deprecated or soon to be features
    <React.StrictMode>
      <ThemeContext.Provider value={themeHook}>
        <div>
          <Navbar />
          <Router>
            <SearchParams path="/" />
            <Details path="/details/:id" />
          </Router>
        </div>
      </ThemeContext.Provider>
    </React.StrictMode>
  );
};

// at INITIAL render there should not be any reference to document, later references are OK because DOM is mounted in browser (SSR)
export default App;
