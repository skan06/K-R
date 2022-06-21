import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbr from './Components/Navbr';
import Home from './Pages/Home';
import Profile from './Pages/Profile';
import SignInUp from './Pages/SignInUp'

function App() {
  return (
    <div className="App">
    <Navbr/>
    <SignInUp/>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/Profile" element={<Profile/>} />
      <Route path="/SignUpIn" element={<SignInUp/>} />
      
    </Routes>

    </div>
  );
}

export default App;
