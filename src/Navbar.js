import React, { useState } from "react";
import { Link } from "@reach/router";
import { css } from "@emotion/core";
import colors from "./colors";

const Navbar = () => {
  // const [color, setColor] = useState("green");
  const [padding, setPadding] = useState(15);

  return (
    <header
      css={css`
        background-color: ${colors.primary};
        padding: ${padding}px;
      `}
    >
      <Link to="/">Adopt A Pet</Link>
      <span
        css={css`
          font-size: 60px;
          &:hover {
            text-decoration: underline;
          }
        `}
        aria-label="logo"
        role="img"
      >
        🦁
      </span>
    </header>
  );
};

export default Navbar;
