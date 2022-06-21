import { combineReducers } from "redux";
import { userReducer } from "./UserReducer"; 
import {getcarReducer,multirolesReducer} from "./CarsReducer"


export const rootReducer=combineReducers({userReducer,getcarReducer,multirolesReducer})