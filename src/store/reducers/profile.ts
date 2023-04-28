import { UserInterInfo, UserBasicInfo } from "src/types/data";
import { RootAction } from "src/types/store";

type ProfileState = {
  userBasicInfo: UserBasicInfo;
  userInterInfo:UserInterInfo;
};

const initState: ProfileState = {
  userBasicInfo: {} as UserBasicInfo,
  userInterInfo: {} as UserInterInfo,
};
export function profileReducer(
  state: ProfileState = initState,
  action: RootAction
): ProfileState {
  if (action.type === "profile/set_user_basic") {
    return {
      ...state,
      userBasicInfo: action.payload,
    };
  }
  if (action.type === "profile/set_user_detail") {
    return {
      ...state,
      userInterInfo: action.payload,
    };
  }

  return state;
}
