import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { editCar, getOne } from '../redux/Actions/CarsActions';

const EditCar = () => {
    const dispatch=useDispatch();
    const params=useParams();
    const navigate=useNavigate();
    const [car, setCar] = useState({
        brand: "",
        price: "",
        location: "",
        phone: "",
        description: "",
      });
    const handleChange=(e)=>{
      setCar({...car,[e.target.name]:e.target.value})
    }
    useEffect(() => {
      dispatch(getOne(params.id))
    }, [dispatch,params.id])
    const load=useSelector(state=>state.carsReducer.load);
    const carToGet=useSelector(state=>state.carsReducer.carToGet)
    const handleEdit=()=>{
      dispatch(editCar(params.id,car))
      navigate("/")
    }
  return (
    <div>
      <h3>Car Card</h3>
      {load?(<p>loaaaading</p>)
      : (<div>
        <h4>brand:{carToGet.brand}</h4>
        <h4>price:{carToGet.price}</h4>
        <h4>location:{carToGet.location}</h4>
        <h4>phone number:{carToGet.phone}</h4>
        <h4>description:{carToGet.description}</h4>
        </div>)}
      <form>
        <label htmlFor="brand">brand</label>
        <input type="text" name="brand" placeholder={`${carToGet.brand}`} onChange={handleChange}/>
        <label htmlFor="price">price</label>
        <input type="text" name="price" placeholder={`${carToGet.price}`} onChange={handleChange}/>
        <label htmlFor="location">location</label>
        <input type="text" name="location" placeholder={`${carToGet.location}`} onChange={handleChange}/>
        <label htmlFor="phone">Phone Number</label>
        <input type="text" name="phone" placeholder={`${carToGet.phone}`} onChange={handleChange}/>
        <label htmlFor="description">Description</label>
        <input type="text" name="description" placeholder={`${carToGet.description}`} onChange={handleChange}/>
        <button onClick={handleEdit}>Edit</button>
      </form>
    </div>
  )
}

export default EditCar
