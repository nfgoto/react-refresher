import React, { Component, ErrorInfo } from "react";
import { Link, Redirect } from "@reach/router";

class ErrorBoundary extends Component {
  public state = {
    hasError: false,
    redirect: false,
  };

  // https://reactjs.org/docs/react-component.html#static-getderivedstatefromerror
  public static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  // https://reactjs.org/docs/react-component.html#componentdidcatch
  public componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("ErrorBoundary caught an error", error, info);
  }

  public componentDidUpdate() {
    if (this.state.hasError) {
      setTimeout(() => this.setState({ redirect: true }), 5000);

      // could also use, navigate from reach router
      // setTimeout(() => navigate("/"), 5000);
    }
  }

  public render() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }

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
