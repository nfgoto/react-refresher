import { createStore } from "redux";
import reducer from "./reducers";

const store = createStore(
  reducer,
  //   check if running in browser and redux devtools are there, use that
  typeof window === "object" &&
    typeof (window as any).__REDUX_DEVTOOLS_EXTENSION__ !== "undefined"
    ? (window as any).__REDUX_DEVTOOLS_EXTENSION__()
    : (f) => f
);

export default store;
