import React from "react";
import { useSelector } from "react-redux";
import "./Profile.css"


const Profile = () => {
  const load = useSelector((state) => state.userReducer.load);
  const isAuth = useSelector((state) => state.userReducer.isAuth);
  const user = useSelector((state) => state.userReducer.user);

  return (
    <div className="prfl">
      {load ? (<p>Loading...</p>) : isAuth ? (<h1>{user.name}</h1>) : (<p></p>)}
    </div>
  );
};

export default Profile;