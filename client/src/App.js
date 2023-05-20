import { useEffect, useState } from "react";
import axios from "axios";
import Container from "./layouts/Container";
import { useQuery } from "@apollo/client";
import { ProductsQuery } from "./Graphql/queries";
import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import AddProduct from "./pages/AddProduct";
function App() {
  // useEffect(() => {
  //   try {
  //     axios
  //       .get("/api/user/11")
  //       .then((res) => {
  //         // setData(res.data.message);
  //         const user = res.data;
  //         setUser(user);
  //       })
  //       .catch((err) => {
  //         console.log("====================================");
  //         console.log(err);
  //         console.log("====================================");
  //       });
  //   } catch (error) {}
  // }, []);

  return (
    <Container>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/addproduct" element={<AddProduct />} />
      </Routes>
    </Container>
  );
}

export default App;
