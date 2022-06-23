import { Route, Routes } from "react-router-dom";
import "./App.css";
import CarsList from "./Components/CarsList";
import Navbr from "./Components/Navbr";
import AddCar from "./Pages/AddCar";
import Error from "./Pages/Errors";
import Home from "./Pages/Home";
import Profile from "./Pages/Profile";
import SignInUp from "./Pages/SignInUp";

function App() {
  return (
    <div className="App">
      <Navbr />
      {/* <SignInUp/> */}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/SignUpIn" element={<SignInUp />} />
        <Route path="/CarsList" element={<CarsList />} />
        <Route path="/carOwner" element={<AddCar />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
