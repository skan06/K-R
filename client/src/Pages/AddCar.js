import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addCar } from "../redux/Actions/CarsActions";
import "./AddCar.css";

const AddCar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [car, setCar] = useState({});
  const [fileName, setFileName] = useState()

  const handleChange = (e) => {
    setCar({ ...car, [e.target.name]: e.target.value });
  };

  const handleChangeImage=(e)=>{
    setFileName(e.target.files[0])
  }
  const handleAdd = () => {
    let formData=new FormData()
    formData.append("images",fileName)
    formData.append("brand",car.brand)
    formData.append("price",car.price)
    formData.append("location",car.location)
    formData.append("phone",car.phone)
    formData.append("description",car.description)
    dispatch(addCar(formData));
    navigate("/CarList");
  };

  return (
    <div>
      <form className="frm">
        <label htmlFor="name">Brand</label>
        <input
          type="text"
          name="brand"
          placeholder="write the brand"
          onChange={handleChange}
        />
        <label htmlFor="price">Price</label>
        <input
          type="text"
          name="price"
          placeholder="Write the price"
          onChange={handleChange}
        />
        <label htmlFor="location">Location</label>
        <input
          type="text"
          id="location"
          name="location"
          placeholder="Write your location"
          onChange={handleChange}
        />
        <label htmlFor="phone">Phone Number</label>
        <input
          type="number"
          id="phone"
          name="phone"
          placeholder="Write your phone number"
          onChange={handleChange}
        />
        <label htmlFor="description">Description</label>
        <input
          type="text"
          id="description"
          name="description"
          placeholder="Write a short description"
          onChange={handleChange}
        />
        <label htmlFor="images">Car image</label>
        <input
          type="file"
          id="images"
          name="images"
          className="fileimg"
          encType="multipart/form-data"
          onChange={handleChangeImage}
        />
        <button type="submit" value="Submit" onClick={handleAdd}>
          Add
        </button>
      </form>
    </div>
  );
};

export default AddCar;
