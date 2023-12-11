import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import MainPage from "./components/MainPage";
import Return from "./components/Return";
import Manufacturer from "./components/Manufacturer";
import Delievery from "./components/Delievery";
import Admin from "./components/Admin";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />

        {/* These Routes should be displayed based on the user login */}
        <Route path="/main">
          <Route index element={<MainPage />} />
          <Route path="return" element={<Return />} />
        </Route>

        <Route path="/manufacturer" element={<Manufacturer />} />
        <Route path="/Delievery" element={<Delievery />} />
        <Route path="/Admin" element={<Admin />} />
      </Routes>
    </div>
  );
}

export default App;
