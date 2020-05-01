import React from "react";
import { render } from "react-dom";
import Pet from "./Pet";

const App = () => {
  // return React.createElement("div", {}, [
  //   React.createElement("h1", {}, "Karibu Dunya!!!!"),
  //   React.createElement(Pet, { name: "Juma", animal: "Cat", breed: "Kenyan" }),
  //   React.createElement(Pet, {
  //     name: "Tatu",
  //     animal: "Dog",
  //     breed: "Congolese",
  //   }),
  // ]);

  return (
    <div>
      <h1>Animals</h1>
      <Pet name="Tatut" animal="Eagle" breed="Kenyan" />
      <Pet name="Juma" animal="Lion" breed="Congolese" />
      <Pet name="Maki" animal="Turtle" breed="Zanzibarese" />
    </div>
  );
};

render(<App />, document.getElementById("root"));
