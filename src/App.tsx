import React from "react";
import { Router } from "@reach/router";
import { Provider } from "react-redux";
import Navbar from "./Navbar";
import SearchParams from "./SearchParams";
import Details from "./Details";
import store from "./store";

// lazy loading Details page, placeholder components until accessed
// ReactDOMServer (used server-side) does not yet support Suspense , maybe use react-lazy-ssr
// const Details = lazy(() => import("./Details"));
// const SearchParams = lazy(() => import("./SearchParams"));

const App = () => {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <div>
          <Navbar />
          <Router>
            <SearchParams path="/" />
            <Details path="/details/:id" />
          </Router>
        </div>
      </Provider>
    </React.StrictMode>
  );
};

// at INITIAL render there should not be any reference to document, later references are OK because DOM is mounted in browser (SSR)
export default App;
