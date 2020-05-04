import express from "express";
import React from "react";
import { renderToNodeStream } from "react-dom/server";
import { ServerLocation } from "@reach/router";
import fs from "fs";
import App from "../src/App.tsx";

const PORT = process.env.PORT || 3000;

// read built html as string
const html = fs.readFileSync("dist/index.html").toString();

const parts = html.split("not rendered");

const app = express();

app.use("/dist", express.static("dist"));

app.use((req, res) => {
  //  instead of sending a big payload once (with renderToString) send streaming data
  res.write(parts[0]);

  // use ServerLocation to redirect requests from browser in React app running on server
  const reactMarkup = (
    <ServerLocation url={req.url}>
      <App />
    </ServerLocation>
  );

  //   will progressively render the React app
  const stream = renderToNodeStream(reactMarkup);

  stream.pipe(res, { end: false });

  stream.on("end", () => {
    res.write(parts[1]);
    res.end();
  });
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
