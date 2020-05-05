import { IStandardAction } from "../reducers/standardAction.interface";

export default function changeLocation(location: string): IStandardAction {
  return {
    type: "CHANGE_LOCATION",
    payload: { location },
  };
}
