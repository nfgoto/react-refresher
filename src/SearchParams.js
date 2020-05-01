import React, { useState, useEffect } from "react";
import pet, { ANIMALS } from "@frontendmasters/pet"; // Parcel can install packages just with an import, no need to "npm i"
import useDropdown from "./useDropdown";

const SearchParams = () => {
  // this is a HOOK (all hooks start with "useXYZ")
  //   "Seattle, WA" is the default state
  //   when creating a hook, useXYZ(), you get back an array of thwo things = the current state + the updater function (arbitrary name)
  //   hooks never go inside of for loops or if statements, because React keeps track of them in the lexical order of declaration
  //      hooks must be called in the same order each render
  const [location, setLocation] = useState("Seattle, WA");
  const [breeds, setBreeds] = useState([]);
  const [animal, AnimalDropdown] = useDropdown("Animal", "Cat", ANIMALS);
  const [breed, BreedDropdown, setBreed] = useDropdown("Breed", "", breeds);

  // useEffect hook replaces #componentDidMount, #componentWillMount, #componentDidUpdate
  //  useEffect is disconnected from when the renders happen
  // schedules the callback AFTER EVERY render happens (a lot of time....)
  useEffect(
    // runs after the first rendering
    () => {
      // clear state of breed input and breeds options
      setBreeds([]);
      setBreed("");

      pet
        .breeds(animal)
        .then(({ breeds: apiBreed }) => {
          const breedStrings = apiBreed.map(({ name }) => name.trim());
          setBreeds(breedStrings);
        })
        .catch(console.error);
    },
    // to avoid making as many requests as renderings, declare the dependences to look for change to execute the effect
    [animal, setBreeds, setBreed]
    // [], empty array to execute the effect ONLY after the first rendering
    // omit dependencies array to execute the effect will all renderings (infinite loops danger)
  );

  return (
    <div className="search-params">
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
        <div>
          <AnimalDropdown />
        </div>
        <BreedDropdown />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default SearchParams;
