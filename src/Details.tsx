import React, { lazy, Suspense } from "react";
import pet, { Photo } from "@frontendmasters/pet";
import { navigate, RouteComponentProps } from "@reach/router";
import { connect } from "react-redux";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";
import Modal from "./Modal";

// ReactDOMServer (used server-side) does not yet support Suspense , maybe use react-lazy-ssr
// const Modal = lazy(() => import("./Modal"));

type Props = RouteComponentProps<{ id: string; theme: string }>;
interface IState {
  theme: string;
}

/**
 * Hooks are reserved for functional components
 * In stategul components, you use lifecycle methods (#componentDidMount, etc.)
 *
 */
class Details extends React.Component<Props> {
  public state = {
    loading: true,
    showModal: false,
    url: "",
    name: "",
    animal: "",
    location: "",
    description: "",
    media: [] as Photo[],
    breed: "",
  };

  // similar to useEffect hook in functional component with empty dependencies array
  // useful for network requests
  public componentDidMount() {
    if (!this.props.id) {
      navigate("/");
      return;
    }

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
      .catch((err: Error) => this.setState({ error: err }));
  }

  public toggleModal = () =>
    this.setState({ showModal: !this.state.showModal });

  public adopt = () => navigate(this.state.url);

  public render() {
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
        // that callback automatically receives the hook array
        <button
          style={{ backgroundColor: this.props.theme as string }}
          onClick={this.toggleModal}
        >
          Adopt {name}
        </button>
        )<p>{description}</p>
        {showModal ? (
          <Modal>
            <div>
              <h1>Would you like to adopt {name} ?</h1>
              <div className="buttons">
                <button onClick={this.adopt}>Yes</button>
                <button onClick={this.toggleModal}>No</button>
              </div>
            </div>
          </Modal>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = ({ theme }: IState) => ({ theme });

const WrappedDetails = connect(mapStateToProps)(Details);

export default function DetailsWithErrorBoundary(props: Props) {
  // the ErrorBoundary boundary must be used as a higher order component to catch errors in children components
  //    meaning = pass only ONE child to the ErrorBoundary (without nested children - that's why you can't use it in the render method)
  //   <Details {...props} />  ==  <Details id={props.id} name={props.name} />
  return (
    <ErrorBoundary>
      <WrappedDetails {...props} />
    </ErrorBoundary>
  );
}
