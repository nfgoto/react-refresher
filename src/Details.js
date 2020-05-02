import React from "react";
import pet from "@frontendmasters/pet";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";
import ThemeContext from "./ThemeContext";

/**
 * Hooks are reserved for functional components
 * In stategul components, you use lifecycle methods (#componentDidMount, etc.)
 *
 */
class Details extends React.Component {
  state = {
    loading: true,
  };
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

    const { name, animal, location, description, breed, media } = this.state;

    return (
      <div className="details">
        <Carousel media={media} />
        <h1>{name}</h1>
        <h2>{`${animal} - ${breed} - ${location} - `}</h2>
        <ThemeContext.Consumer>
          {
            // that callback automatically receives the hook array
            ([theme]) => (
              <button style={{ backgroundColor: theme }}>Adopt {name}</button>
            )
          }
        </ThemeContext.Consumer>

        <p>{description}</p>
      </div>
    );
  }
}

export default function DetailsWithErrorBoundary(props) {
  // the ErrorBoundary boundary must be used as a higher order component to catch errors in children components
  //    meaning = pass only ONE child to the ErrorBoundary (without nested children - that's why you can't use it in the render method)
  //   <Details {...props} />  ==  <Details id={props.id} name={props.name} />
  return (
    <ErrorBoundary>
      <Details {...props} />
    </ErrorBoundary>
  );
}
