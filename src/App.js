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
import { useContext, useEffect } from "react";
import { auth } from "./components/Firebase";
import { LoginContext } from "./Context/Context";
import { doc, getDocs, collection, getDoc } from "firebase/firestore";
import { db } from "./components/Firebase";

function App() {
  const { account, setAccount } = useContext(LoginContext);

  useEffect(() => {
    auth.onAuthStateChanged(async (authUser) => {
      console.log("The user is : ", authUser?.email);

      if (authUser) {
        // Reference to the document
        const docRef = doc(db, "Users", authUser.uid);

        // Fetch the document
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          try {
            const subcollectionRef = collection(docRef, "return");

            // Fetch documents from the subcollection
            const subcollectionDocs = await getDocs(subcollectionRef);
            const subcollectionDataArray = subcollectionDocs.docs.map(
              (subDoc) => ({
                id: subDoc.id,
                data: subDoc.data(),
              })
            );
            setAccount({
              data: docSnap.data(),
              return: subcollectionDataArray,
            });
            
          } catch (error) {
            setAccount({ data: docSnap.data() });
            console.error("Error fetching document: ", error);
          }
        } else {
          console.log("No such document!");
        }
      } else {
        setAccount("");
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
        <Route path="/users">
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
