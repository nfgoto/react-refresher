import React from "react";

class Carousel extends React.Component {
  state = {
    photos: [],
    active: 0,
  };

  //   must be static
  //   https://reactjs.org/docs/react-component.html#static-getderivedstatefromprops
  //   used to merge some props with state
  static getDerivedStateFromProps({ media }) {
    let photos = ["http://placecorgi.com/600/600"];

    if (media.length) {
      photos = media.map(({ large }) => large);
    }
    //  merge with state
    return { photos };
  }

  //   need to use arrow fn to keep 'this' pointing to Carousel instance
  //  rule of thumb = use arrows fb for event listeners or when passing fn in children
  handleIndexClick = (event) => {
    this.setState({
      // event.target.dataset allows to get data-* attributes
      // anything retrieved from DOM as strings
      active: +event.target.dataset.index,
    });
  };

  render() {
    const { photos, active } = this.state;
    return (
      <div className="carousel">
        <img src={photos[active]} alt="animal" />
        <div className="carousel-smaller">
          {photos.map((photo, index) => (
            // eslint-disable-next-line
            <img
              key={photo}
              onClick={this.handleIndexClick}
              data-index={index}
              src={photo}
              className={index === active ? "active" : ""}
              alt="animal-thumbnail"
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Carousel;
