import React, { useState } from "react";
import { ANIMALS } from "@frontendmasters/pet"; // Parcel can install packages just with an import, no need to "npm i"

const SearchParams = () => {
  // this is a HOOK (all hooks start with "useXYZ")
  //   "Seattle, WA" is the default state
  //   when creating a hook, useXYZ(), you get back an array of thwo things = the current state + the updater function (arbitrary name)
  //   hooks never go inside of for loops or if statements, because React keeps track of them in the lexical order of declaration
  //      hooks must be called in the same order each render
  const [location, setLocation] = useState("Seattle, WA");
  const [animal, setAnimal] = useState("Cat");
  const [breed, setBreed] = useState("African");
  const [breeds, setBreeds] = useState([]);

  return (
    <div className="search-params">
      <h1>{location}</h1>
      <form>
        <label htmlFor="location">
          Location
          <input
            id="location"
            value={location}
            placeholder="Location"
            onChange={(e) => {
              setLocation(e.target.value);
            }}
          />
        </label>
        <label htmlFor="animal">
          Animal
          <select
            id="animal"
            value={animal}
            onChange={(e) => {
              setAnimal(e.target.value);
            }}
            onBlur={(e) => {
              setAnimal(e.target.value);
            }}
          >
            <option>All</option>
            {ANIMALS.map((ANIMAL) => (
              <option key={ANIMAL} value={ANIMAL}>
                {ANIMAL}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="breed">
          Breed
          <select
            id="breed"
            value={breed}
            onChange={(e) => {
              setBreed(e.target.value);
            }}
            onBlur={(e) => {
              setBreed(e.target.value);
            }}
            disabled={breeds.length === 0}
          >
            <option>All</option>
            {breeds.map((breedStr) => (
              <option key={breedStr} value={breedStr}>
                {breedStr}
              </option>
            ))}
          </select>
        </label>
        <button>Submit</button>
      </form>
    </div>
  );
};

export default SearchParams;
