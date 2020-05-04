import { createContext } from "react";

// you can pass anything to context, here will pass a hook placeholder
// createContext() returns an object with two components = Provider and a Consumer
const ThemeContext = createContext<[string, (theme: string) => void]>([
  "red",
  () => {
    return;
  },
]);

export default ThemeContext;
