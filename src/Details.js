import React from "react";
import pet from "@frontendmasters/pet";

/**
 * Hooks are reserved for functional components
 * In stategul components, you use lifecycle methods (#componentDidMount, etc.)
 *
 */
class Details extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
    };
  }
  // similar to useEffect hook in functional component with empty dependencies array
  // useful for network requests
  componentDidMount() {
    pet
      .animal(+this.props.id)
      .then(({ animal }) => {
        this.setState({
          name: animal.name,
          animal: animal.type,
          location: `${animal.contact.address.city}, ${animal.contact.address.state}`,
          description: animal.description,
          media: animal.photos,
          breed: animal.breeds.primary,
          loading: false,
        });
      })
      .catch(console.error);
  }
  render() {
    if (this.state.loading) {
      return <h1>Loading...</h1>;
    }

    const { name, animal, location, description, breed } = this.state;

    return (
      <div className="details">
        <h1>{name}</h1>
        <h2>{`${animal} - ${breed} - ${location} - `}</h2>
        <button>Adopt {name}</button>
        <p>{description}</p>
      </div>
    );
  }
}

export default Details;
