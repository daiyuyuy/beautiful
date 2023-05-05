import { CommentRes } from "src/types/data";
import { RootAction } from "src/types/store";

type CommentState = {
  commentRes: CommentRes;
};
const initState: CommentState = {
    commentRes: {
      total_count: 0,
      last_id: "",
      end_id: "",
      results: [],
    },
};
// const initState: CommentState = {
//   commentRes: {},
// } as CommentState;

export function commentReducer(
  state: CommentState = initState,
  action: RootAction
): CommentState {
  if (action.type === "comment/set_comment_res") {
    return {
      ...state,
      commentRes: action.payload,
    };
  }
  return state;
}
