import { useEffect } from "react";
import Container from "./layouts/Container";
import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import AddProduct from "./pages/AddProduct";
import Login from "./pages/Login";
import { is_Auth, user } from "./constants";
import MyProducts from "./pages/MyProducts";
import Profile from "./pages/Profile";
import Cart from "./pages/Cart";
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
      {is_Auth && (
        <>
          <Profile />
          <Cart />
        </>
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        {is_Auth && user.role === 0 ? (
          <>
            <Route path="/addproduct" element={<AddProduct />} />
            <Route path="/products" element={<MyProducts />} />
          </>
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
