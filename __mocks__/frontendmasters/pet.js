import { readFileSync } from "fs";
import path from "path";
import { acr } from "react-testing-library";

const breeds = [
  { name: "test_breed_1" },
  { name: "test_breed_2" },
  { name: "test_breed_3" },
];

const dogs = JSON.parse(
  readFileSync(path.join(__dirname, "res.json")).toString()
);
