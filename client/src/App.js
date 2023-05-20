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
import { is_Auth, user } from "./constants";
import MyProducts from "./pages/MyProducts";
import Input from "./components/form/Input";
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
        <div
          class="offcanvas offcanvas-start"
          tabindex="-1"
          id="profileOffCanvas"
          aria-labelledby="offcanvasExampleLabel"
        >
          <div class="offcanvas-header">
            <h2 class="offcanvas-title" id="offcanvasExampleLabel">
              Profile
            </h2>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div class="offcanvas-body">
            <div className=" d-flex flex-column align-items-center">
              <div className=" d-flex flex-column align-items-center ">
                <img
                  src="https://source.unsplash.com/150x150/?avatar"
                  alt=""
                  className="img-fluid rounded-circle"
                  style={{ width: "150px" }}
                />
                <h5 className="fw-bold my-2">
                  {user.nom} {user.prenom}
                </h5>
                <div className="d-flex w-100 justify-content-around align-items-center mb-3">
                  <span>@{user.role == 0 ? "Admin" : "Client"}</span>{" "}
                  <span className="fw-bold">|</span>
                  <span>{user.genre.toUpperCase()}</span>
                </div>

                <div class="  row d-flex mb-2 justify-content-start align-self-start align-items-center">
                  <div class="col-sm-1">
                    <p class="mb-0">
                      <i className="fas fa-at"></i>
                    </p>
                  </div>
                  <div class="col-sm-9">
                    <p class="text-muted mb-0">{user.email}</p>
                  </div>
                </div>
                <div class="  row d-flex  mb-2 justify-content-start align-self-start align-items-center">
                  <div class="col-sm-1">
                    <p class="mb-0">
                      <i className="fas fa-id-card"></i>
                    </p>
                  </div>
                  <div class="col-sm-9">
                    <p class="text-muted mb-0">{user.cin}</p>
                  </div>
                </div>
              </div>
              <div></div>
            </div>
          </div>
        </div>
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        {is_Auth && user.role == 0 ? (
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
