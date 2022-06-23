import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteCar } from "../redux/Actions/CarsActions";
import "./CarCard.css"

const CarCard = ({list}) => {
  let dispatch=useDispatch()
  return (
    <div>
      <div className="containerr">
        <div className="card">
          <div className="card-header">
            <img
              src="https://c0.wallpaperflare.com/preview/483/210/436/car-green-4x4-jeep.jpg"
              alt="rover"
            />
          </div>
          <div className="card-body">
            <span className="tag tag-teal">Brand:{list.brand}</span>
            <h3>Price:{list.price}dt</h3>
            <p>Description:{list.description}</p>
            <h4>Location{list.location}</h4>
            <h5>Phone Number:{list.phone}</h5>
            <button className='btn' onClick={()=>dispatch(deleteCar(list._id))}>Delete</button>
            <Link to={`/updatecar/${list._id}`}><button className='btnn'>Edit</button></Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
