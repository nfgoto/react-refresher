import React, { lazy, Suspense } from "react";
import pet from "@frontendmasters/pet";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";
import ThemeContext from "./ThemeContext";
import { navigate } from "@reach/router";

const Modal = lazy(() => import("./Modal"));

/**
 * Hooks are reserved for functional components
 * In stategul components, you use lifecycle methods (#componentDidMount, etc.)
 *
 */
class Details extends React.Component {
  state = {
    loading: true,
    showModal: false,
  };
  // similar to useEffect hook in functional component with empty dependencies array
  // useful for network requests
  componentDidMount() {
    pet
      .animal(+this.props.id)
      .then(({ animal }) => {
        console.log(animal);

        this.setState({
          url: animal?.url,
          name: animal?.name,
          animal: animal?.type,
          location: `${animal?.contact?.address?.city}, ${animal?.contact?.address?.state}`,
          description: animal?.description,
          media: animal?.photos,
          breed: animal?.breeds?.primary,
          loading: false,
        });
      })
      .catch(console.error);
  }

  toggleModal = () => this.setState({ showModal: !this.state.showModal });

  adopt = () => navigate(this.state.url);

  render() {
    if (this.state.loading) {
      return <h1>Loading...</h1>;
    }

    const {
      name,
      animal,
      location,
      description,
      breed,
      media,
      showModal,
    } = this.state;

    return (
      <div className="details">
        <Carousel media={media} />
        <h1>{name}</h1>
        <h2>{`${animal} - ${breed} - ${location} - `}</h2>
        <ThemeContext.Consumer>
          {
            // that callback automatically receives the hook array
            ([theme]) => (
              <button
                style={{ backgroundColor: theme }}
                onClick={this.toggleModal}
              >
                Adopt {name}
              </button>
            )
          }
        </ThemeContext.Consumer>

        <p>{description}</p>
        {showModal ? (
          <Suspense>
            <Modal>
              <div>
                <h1>Would you like to adopt {name} ?</h1>
                <div className="buttons">
                  <button onClick={this.adopt}>Yes</button>
                  <button onClick={this.toggleModal}>No</button>
                </div>
              </div>
            </Modal>
          </Suspense>
        ) : null}
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
