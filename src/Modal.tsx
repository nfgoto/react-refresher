import React, { useEffect, useRef, FunctionComponent } from "react";
import { createPortal } from "react-dom";

const Modal: FunctionComponent = ({ children }) => {
  // to refer to same element across renders (instead of recreating same element each render, garbage collection)
  // useRef() hook function returns a sealed (not frozen) obkject containing a .current property
  // useRef hook method used to holding on to DOM elements, timeouts, intervals
  const elRef = useRef(document.createElement("div"));

  // when rendering for the first time
  useEffect(() => {
    const modalRoot = document.getElementById("modal");
    if (!modalRoot) {
      return;
    }

    modalRoot.appendChild(elRef.current);

    // if you return a function, it will be the cleanup gunction
    // will only run this function when the modal is closed
    return () => {
      modalRoot.removeChild(elRef.current);
    };
  }, []);

  return createPortal(<div>{children}</div>, elRef.current);
};

export default Modal;
