import { useEffect, useState } from "react";
import axios from "axios";
import Container from "./layouts/Container";
import { useQuery } from "@apollo/client";
import { ProductsQuery } from "./Graphql/queries";
import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import AddProduct from "./pages/AddProduct";
import Login from "./pages/Login";
import { is_Auth } from "./constants";
function App() {
  useEffect(() => {
    try {
      // axios
      //   .get("/api/user/11", {
      //     headers: { Authorization: `bearer ${localStorage.getItem("token")}` },
      //   })
      //   .then((res) => {
      //     // setData(res.data.message);
      //   })
      //   .catch((err) => {
      //     console.log("====================================");
      //     console.log(err);
      //     console.log("====================================");
      //   });
    } catch (error) {}
  }, []);

  return (
    <Container>
      <Routes>
        <Route path="/" element={<Home />} />
        {is_Auth ? (
          <Route path="/addproduct" element={<AddProduct />} />
        ) : (
          <>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </>
        )}
      </Routes>
    </Container>
  );
}

export default App;
