import { IStandardAction } from "./standardAction.interface";

const defaultState = "darkgreen";

export default function theme(
  state: string = defaultState,
  action: IStandardAction
) {
  if (action.type === "CHANGE_THEME") {
    return action.payload.theme;
  }

  return state;
}
