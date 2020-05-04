import React, { FunctionComponent } from "react";
import Pet from "./Pet";
import { Animal } from "@frontendmasters/pet";

interface IProps {
  pets: Animal[];
}

const Results: FunctionComponent<IProps> = ({ pets }) => {
  return (
    <div className="search-result">
      {pets.length === 0 ? (
        <h2>Nothing found yet</h2>
      ) : (
        pets.map((pet) => (
          <Pet
            key={pet.id}
            animal={pet.type}
            name={pet.name}
            breed={pet.breeds?.primary}
            media={pet.photos}
            location={`${pet.contact.address.city}, ${pet.contact.address.state}`}
            id={pet.id}
          />
        ))
      )}
    </div>
  );
};

export default Results;
