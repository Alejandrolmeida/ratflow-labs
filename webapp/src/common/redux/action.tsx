import { AppState } from "./reducer";

//switcher action

export const ThemeChanger = (value:AppState[]) => async (dispatch:any) => {
    dispatch({
        type: "ThemeChanger",
        payload: value
    });
  };