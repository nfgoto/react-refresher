import React, {
  useState,
  useEffect,
  useContext,
  FunctionComponent,
} from "react";
import { connect } from "react-redux";
import pet, { ANIMALS, Animal } from "@frontendmasters/pet"; // Parcel can install packages just with an import, no need to "npm i"
import useDropdown from "./useDropdown";
import Results from "./Results";
import { RouteComponentProps } from "@reach/router";

import changeTheme from "./action_creators/changeTheme";
import changelocation from "./action_creators/changelocation";
import { IStandardAction } from "./reducers/standardAction.interface";

interface IProps {
  theme: string;
  location: string;
  setLocation: (location: string) => any;
  setTheme: (theme: string) => any;
}

interface IState {
  theme: string;
  location: string;
}

const SearchParams: FunctionComponent<RouteComponentProps<IProps>> = (
  props
) => {
  const [breeds, setBreeds] = useState([] as string[]);
  const [animal, AnimalDropdown] = useDropdown("Animal", "Cat", ANIMALS);
  const [breed, BreedDropdown, setBreed] = useDropdown("Breed", "", breeds);
  const [pets, setPets] = useState([] as Animal[]);

  async function requestPets() {
    const { animals } = await pet.animals({
      location: props.location,
      breed,
      type: animal,
    });

    setPets(animals || []);
  }

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
      <form
        onSubmit={(e) => {
          e.preventDefault();

          requestPets();
        }}
      >
        <label htmlFor="location">
          Location
          <input
            id="location"
            value={props.location}
            placeholder="Location"
            onChange={(e) => {
              if (props.setLocation) {
                props.setLocation(e.target.value);
              }
            }}
          />
        </label>
        <div>
          <AnimalDropdown />
        </div>
        <BreedDropdown />
        <label htmlFor="theme">
          Theme
          <select
            value={props.theme}
            onChange={(e) => {
              if (props.setTheme) {
                props.setTheme(e.target.value);
              }
            }}
            onBlur={(e) => {
              if (props.setTheme) {
                props.setTheme(e.target.value);
              }
            }}
          >
            <option>Default</option>
            <option value="red">Red</option>
            <option value="yellow">Yellow</option>
            <option value="blue">Blue</option>
            <option value="darkgreen">Dark Green</option>
          </select>
        </label>
        <button style={{ backgroundColor: props.theme }}>Submit</button>
      </form>
      <Results pets={pets} />
    </div>
  );
};

const mapStateToProps = ({ theme, location }: IState) => ({
  theme,
  location,
});

const mapDispatchToProps = (dispatch: (action: IStandardAction) => void) => ({
  setTheme: (theme: string) => dispatch(changeTheme(theme)),
  setLocation: (location: string) => dispatch(changelocation(location)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchParams as any) as any;
