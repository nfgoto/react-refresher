import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const Modal = ({ children }) => {
  // to refer to same element across renders (instead of recreating same element each render, garbage collection)
  const elRef = useRef(null);

  // create a div only once and keep ref to it
  if (!elRef.current) {
    const div = document.createElement("div");
    elRef.current = div;
  }

  // when rendering for the first time
  useEffect(() => {
    const modalRoot = document.getElementById("modal");
    modalRoot.appendChild(elRef.current);

    // if you return a function, it will be the cleanup gunction
    // will only run this function when the modal is closed
    return () => modalRoot.removeChild(elRef.current);
  }, []);

  return createPortal(<div>{children}</div>, elRef.current);
};

export default Modal;
