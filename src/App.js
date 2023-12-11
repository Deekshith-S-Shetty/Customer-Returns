import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import MainPage from "./components/MainPage";
import Return from "./components/Return";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/main">
          <Route index element={<MainPage />} />
          <Route path="return" element={<Return />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
