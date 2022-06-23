import { ADD_CAR, DELETE_CAR, EDIT_CAR, FAIL_CAR, GET_CAR, GET_ONE_CAR, LOAD_CAR } from "../ActionTypes/ActionTypes";


const initialState={
    carslist:[],
    carToGet:{},
    load:false,
    isAuth:false,
    isAdmin:false,
    isCarOwner:false,
    error:null
}
export const getcarReducer=(state=initialState,{type,payload})=>{
    switch (type) {
        case LOAD_CAR:
            return {...state,load:true,isAuth:true};
        case GET_CAR:
            return {...state,carslist:payload.carslist,load:false,isAuth:true};
        case GET_ONE_CAR:
            return {...state,carToGet:payload.carToGet,load:false,isAuth:true};
        case ADD_CAR:
            return {...state,carslist:payload.carslist,load:false,isAuth:true,isAdmin:true,isCarOwner:true};
        case EDIT_CAR:
            return {...state,carToGet:payload.carToGet,load:false,isAuth:true,isAdmin:true,isCarOwner:true};
        case DELETE_CAR:
            return {...state,carToGet:payload.carToGet,load:false,isAuth:true,isAdmin:true,isCarOwner:false};
        case FAIL_CAR:
            return {...state,load:false,error:payload};
    
        default:
            return state;
    }
}


