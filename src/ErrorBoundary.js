import React, { Component } from "react";
import { Link } from "@reach/router";

class ErrorBoundary extends Component {
  state = {
    hasError: false,
  };

  // https://reactjs.org/docs/react-component.html#static-getderivedstatefromerror
  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  // https://reactjs.org/docs/react-component.html#componentdidcatch
  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught an error", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <h1>
          There was an error with this listing. <Link to="/">Click here</Link>{" "}
          to go back on the homepage and wait 10 seconds.
        </h1>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
