import { createContext } from "react";

// you can pass anything to context, jere will pass a hook
const ThemeContext = createContext([
  "green",
  () => {}, // placeholder in case no updater fn
]);

export default ThemeContext;
