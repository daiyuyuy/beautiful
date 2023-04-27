import { combineReducers, createStore,applyMiddleware } from "redux";
import { LoginReducer } from "./reducers/login";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
//组合出根Reducer
const reducer=combineReducers({
    login:LoginReducer
})
const store=createStore(reducer,composeWithDevTools(applyMiddleware(thunk)))
export default store