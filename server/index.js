import express from "express";
import React from "react";
import { renderToString } from "react-dom/server";
import { ServerLocation } from "@reach/router";
import fs from "fs";
import App from "../src/App";

const PORT = process.env.PORT || 3000;

// read built html as string
const html = fs.readFileSync("dist/index.html").toString();

const parts = html.split("not rendered");

const app = express();
app.use("/dist", express.static("dist"));
app.use((req, res) => {
  // use reach router to do server side rendering from request coming from browser
  const reactMarkup = (
    <ServerLocation url={req.url}>
      <App />
    </ServerLocation>
  );

  res.send(parts[0] + renderToString(reactMarkup) + parts[1]);
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
