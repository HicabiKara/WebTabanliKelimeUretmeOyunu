import { applyMiddleware,combineReducers,createStore} from "redux";
import {composeWithDevTools} from '@redux-devtools/extension'
import {thunk} from 'redux-thunk'
import authReducer from "./reducers/auth";
import gameReducer from "./reducers/game";
import modalReducer from "./reducers/modal"

const reducers=combineReducers({
    auth:authReducer,
    game:gameReducer,
    modal:modalReducer
})
const store=createStore(reducers,composeWithDevTools(applyMiddleware(thunk)));
export default store;