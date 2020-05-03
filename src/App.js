import React, { useState, lazy, Suspense } from "react";
import { Router } from "@reach/router";
import ThemeContext from "./ThemeContext";
import Navbar from "./Navbar";

// lazy loading Details page
// Details is now a placeholder component
const Details = lazy(() => import("./Details"));
const SearchParams = lazy(() => import("./SearchParams"));

const App = () => {
  const themeHook = useState("peru");

  return (
    // strict mode used to prohibit using deprecated or soon to be features
    <React.StrictMode>
      <ThemeContext.Provider value={themeHook}>
        <div>
          <Navbar />
          <Suspense fallback={<h1>Loading route...</h1>}>
            <Router>
              <SearchParams path="/" />
              <Details path="/details/:id" />
            </Router>
          </Suspense>
        </div>
      </ThemeContext.Provider>
    </React.StrictMode>
  );
};

// at INITIAL render there should not be any reference to document, later references are OK because DOM is mounted in browser (SSR)
export default App;
