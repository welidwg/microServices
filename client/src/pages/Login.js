import { useState } from "react";
import Input from "../components/form/Input";
import Swal from "sweetalert2";
import axios from "axios";
export default function Login(params) {
  const [authData, setAuthData] = useState({ email: "", password: "" });
  function handleChange(e) {
    setAuthData({ ...authData, [e.target.name]: e.target.value });
  }
  function handleSubmit(e) {
    e.preventDefault();
    axios
      .post("/api/login", authData)
      .then((res) => {
        window.location.href = "/";
        e.target.reset();
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          title: "Error!",
          text: err.response.data.details,
          icon: "error",
        });
      });
  }

  return (
    <section className=" my-3">
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black rounded-5">
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                      Login
                    </p>

                    <form
                      className="mx-1 mx-md-4"
                      onSubmit={(e) => handleSubmit(e)}
                    >
                      <Input
                        icon={`fas fa-at`}
                        placeholder={"Email"}
                        name={"email"}
                        required={true}
                        onChange={handleChange}
                      />
                      <Input
                        icon={`fas fa-lock`}
                        placeholder={"Password"}
                        name={"password"}
                        required={true}
                        type={"password"}
                        onChange={handleChange}
                      />

                      <div className="d-flex justify-content-start  mb-3 ">
                        <button
                          type="submit"
                          className="btn btn-primary btn-lg w-100"
                        >
                          Login
                        </button>
                      </div>
                    </form>
                  </div>
                  <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                      className="img-fluid"
                      alt="Sample image"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
