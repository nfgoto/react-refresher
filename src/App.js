import React from "react";
import { render } from "react-dom";
import SearchParams from "./SearchParams";

const App = () => {
  return (
    // strict mode used to prohibit using deprecated or soon to be features
    <React.StrictMode>
      <div>
        <h1>React Refresh</h1>
        <SearchParams />
      </div>
    </React.StrictMode>
  );
};

render(<App />, document.getElementById("root"));
