import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCars } from "../redux/Actions/CarsActions";
import CarCard from "./CarCard";
import "./CarsList.css"

const CarsList = () => {
  const dispatch = useDispatch();
  const load = useSelector((state) => state.getcarReducer.load);
  const list = useSelector((state) => state.getcarReducer.carslist);
  useEffect(() => {
    dispatch(getCars());
  }, [dispatch]);
  return (
    <div className="cl">
      <div className="cnt">
        <h1>Cars list</h1>
        <div className="crd">
          {load ? (
            <p>loading...</p>
          ) : (
            list?.map((el) => <CarCard list={el} />)
          )}
        </div>
      </div>
    </div>
  );
};

export default CarsList;
