import { Routes, Route, useNavigate } from "react-router-dom";
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
import { useContext, useEffect } from "react";
import {
  auth,
  customerArray,
  deliveryArray,
  manufacturerArray,
} from "./components/Firebase";
import { LoginContext } from "./Context/Context";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./components/Firebase";
import ManufacturerHome from "./components/ManufacturerHome";
import DeliveryHome from "./components/DeliveryHome";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import AdminReview from "./components/AdminReview";
import About from "./components/About";
import Contact from "./components/Contact";

function App() {
  const { account, setAccount } = useContext(LoginContext);
  const navigate = useNavigate();

  // get image url
  const getUrl = async (filePath) => {
    try {
      const storage = getStorage();
      const fileRef = ref(storage, filePath);
      const url = await getDownloadURL(fileRef);
      return url;
    } catch (error) {
      console.error("Error getting download URL:", error);
      throw error;
    }
  };

  const fetchData = async (documentRef, itemsArr) => {
    try {
      // getting doc data
      const doc = await getDoc(documentRef);
      const documentData = doc.data();

      // calling getUrl for downloadable url
      const path = await getUrl(documentData.product.image);
      documentData.product.image = path;

      itemsArr.push(documentData);
    } catch (error) {
      console.error(error);
    }
  };

  //finding Userdata
  const findUserData = async (authUser) => {
    let userType;
    let userArr;
    let itemsArr = [];

    //find user type based on ID
    if (customerArray.includes(authUser.uid)) {
      userType = "customer";
      userArr = "orders";
    } else if (manufacturerArray.includes(authUser.uid)) {
      userType = "manufacturer";
      userArr = "product";
    } else if (deliveryArray.includes(authUser.uid)) {
      userType = "delivery";
      userArr = "deliver";
    } else {
      userType = "admin";
    }

    // Reference to the document
    const docRef = doc(db, userType, authUser.uid);

    // Fetch the document
    const docSnap = await getDoc(docRef);

    if (docSnap.exists() && userType !== "admin") {
      try {
        const promises = Object.entries(docSnap.data()[userArr]).map(
          async ([key, value]) => {
            const documentRef = doc(db, "products", value);
            await fetchData(documentRef, itemsArr);
          }
        );

        // Wait for all promises to resolve before updating items
        await Promise.all(promises);

        setAccount({ data: docSnap.data(), item: itemsArr });
      } catch (error) {
        setAccount({ data: docSnap.data() });
        console.error("Error fetching document: ", error);
      }
    } else if (docSnap.exists() && userType === "admin") {
      setAccount({ data: docSnap.data() });
    } else {
      console.log("error");
      alert("Somewent wrong please try again");
    }
  };

  // track user auth status
  useEffect(() => {
    auth.onAuthStateChanged(async (authUser) => {
      console.log("The user is : ", authUser?.email);

      if (authUser) {
        findUserData(authUser);
      } else {
        setAccount("");
        navigate("/");
        console.log("error");
      }
    });
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />

        {/* These Routes should be displayed based on the user login */}
        <Route path="/customer">
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
            path="return/:id"
            element={
              <>
                <Header />
                <Return />
              </>
            }
          />
        </Route>

        <Route path="/manufacturer">
          <Route
            index
            element={
              <>
                <Header />
                <ManufacturerHome />
              </>
            }
          />
          <Route
            path="product"
            element={
              <>
                <Header />
                <Manufacturer />
              </>
            }
          />
        </Route>

        <Route path="/delivery">
          <Route
            index
            element={
              <>
                <Header />
                <DeliveryHome />
              </>
            }
          />
          <Route
            path="deliver"
            element={
              <>
                <Header />
                <Delivery />
              </>
            }
          />
        </Route>

        <Route path="/Admin">
          <Route
            index
            element={
              <>
                <Header />
                <Admin />
              </>
            }
          />
          <Route
            path="review/:id"
            element={
              <>
                <Header />
                <AdminReview />
              </>
            }
          />
        </Route>
        <Route
          path="/about"
          element={
            <>
              <Header />
              <About />
            </>
          }
        />
        <Route
          path="/contact"
          element={
            <>
              <Header />
              <Contact />
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
