import {createStore,combineReducers,applyMiddleware} from "redux";
import thunk from "redux-thunk";
import userReducer from "../views/backstageManager/user/reducer";
const store=combineReducers({
  user:userReducer
});
export default createStore(store,applyMiddleware(thunk));