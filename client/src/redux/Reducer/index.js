import { combineReducers } from "redux";
import { userReducer } from "./UserReducer"; 
import {getcarReducer} from "./CarsReducer"


export const rootReducer=combineReducers({userReducer,getcarReducer})