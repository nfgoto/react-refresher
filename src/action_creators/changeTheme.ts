import { IStandardAction } from "../reducers/standardAction.interface";

export default function changeTheme(theme: string): IStandardAction {
  return {
    type: "CHANGE_THEME",
    payload: { theme },
  };
}
