import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Customer from "./components/Customer";
import Return from "./components/Return";
import Manufacturer from "./components/Manufacturer";
import Delivery from "./components/Delivery";
import Admin from "./components/Admin";
import Header from "./components/Header";
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
          <Route
            index
            element={
              <>
                <Header />
                <Customer />
              </>
            }
          />
          <Route
            path="return"
            element={
              <>
                <Header />
                <Return />
              </>
            }
          />
        </Route>

        <Route
          path="/manufacturer"
          element={
            <>
              <Header />
              <Manufacturer />
            </>
          }
        />
        <Route
          path="/Delivery"
          element={
            <>
              <Header />
              <Delivery />
            </>
          }
        />
        <Route
          path="/Admin"
          element={
            <>
              <Header />
              <Admin />
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
