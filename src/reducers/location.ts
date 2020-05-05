import { IStandardAction } from "./standardAction.interface";

const defaultState = "Seattle, WA";

export default function location(
  state: string = defaultState,
  action: IStandardAction
) {
  if (action.type === "CHANGE_LOCATION") {
    return action.payload.location;
  }

  return state;
}
