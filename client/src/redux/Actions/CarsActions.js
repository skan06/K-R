import axios from "axios"
import { ADD_CAR, DELETE_CAR, EDIT_CAR, FAIL_CAR, GET_CAR, GET_ONE_CAR, LOAD_CAR } from "../ActionTypes/ActionTypes";

//get all cars
export const getCars=()=> async (dispatch)=>{
    dispatch({type:LOAD_CAR});
    try {
        let result= await axios.get("/api/cars/getallcars")
        dispatch({
            type:GET_CAR,
            payload:result.data
        })
    } catch (error) {
        dispatch({
            type:FAIL_CAR,
            payload:error.response
        })
    }
}
//get 1 car
export const getOne=(id)=> async (dispatch)=>{
    dispatch({type:LOAD_CAR});
    try {
        let result= await axios.get(`/api/cars/getonecar/${id}`)
        dispatch({
            type:GET_ONE_CAR,
            payload:result.data
        })
    } catch (error) {
        dispatch({
            type:FAIL_CAR,
            payload:error.response
        })
    }
}
//add car (admin & carowner)
export const addCar=(newCar)=>async (dispatch)=>{
    try {
        await axios.post("/api/cars/addcar",newCar)
        dispatch({
            type:ADD_CAR,
            payload:result.data,
        },getCars())
    } catch (error) {
        dispatch({
            type:FAIL_CAR,
            payload:error.response
        })
    }
}
//edit car (admin & carowner)
export const editCar=(id,newCar)=>async(dispatch)=>{
    try {
        await axios.put(`/api/cars/updatecar/${id}`,newCar)
        dispatch(getOne(id),
        {
        type:EDIT_CAR,
        payload:result.data
        })
    } catch (error) {
        dispatch({
            type:FAIL_CAR,
            payload:error.response
        })
    }
}
//delete car (admin)
export const deleteCar=(id)=> async (dispatch)=>{
    try {
        await axios.delete(`/api/cars/deletecar/${id}`)
        dispatch(getContacts(),
        {
            type:DELETE_CAR,
            payload:result.data
        })
    } catch (error) {
        dispatch({
            type:FAIL_CONTACT,
            payload:error.response
        })
    }
}