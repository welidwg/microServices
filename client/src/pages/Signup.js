import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Input from "../components/form/Input";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function Signup(props) {
  const [userData, setUserData] = useState({
    nom: "",
    prenom: "",
    email: "",
    cin: 0,
    password: "",
    genre: "male",
  });
  function handleChange(e) {
    if (e.target.name == "cin") {
      setUserData({ ...userData, [e.target.name]: parseInt(e.target.value) });
    } else {
      setUserData({ ...userData, [e.target.name]: e.target.value });
    }
  }
  function handleSubmit(e) {
    e.preventDefault();
    axios
      .post("/api/user/create", userData)
      .then((res) => {
        Swal.fire({
          title: "Success!",
          text: "Account created successfully",
          icon: "success",
        });
        e.target.reset();
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
                      Sign up
                    </p>

                    <form
                      className="mx-1 mx-md-4"
                      onSubmit={(e) => handleSubmit(e)}
                    >
                      <Input
                        icon={`fas fa-user`}
                        placeholder={"Name"}
                        name={"nom"}
                        required={true}
                        onChange={handleChange}
                      />
                      <Input
                        icon={`fas fa-user`}
                        placeholder={"Last Name"}
                        name={"prenom"}
                        required={true}
                        onChange={handleChange}
                      />
                      <Input
                        icon={`fas fa-at`}
                        placeholder={"Email"}
                        name={"email"}
                        type={"email"}
                        required={true}
                        onChange={handleChange}
                      />
                      <Input
                        icon={`fas fa-id-card`}
                        placeholder={"CIN"}
                        name={"cin"}
                        type={"number"}
                        required={true}
                        onChange={handleChange}
                      />
                      <Input
                        icon={`fas fa-lock`}
                        placeholder={"password"}
                        name={"password"}
                        type={"password"}
                        onChange={handleChange}
                        required={true}
                      />
                      <div className="d-flex  justify-content-around mb-3">
                        <label> You are : </label>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="genre"
                            id="exampleRadios1"
                            value="male"
                            onChange={handleChange}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="exampleRadios1"
                          >
                            Male
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="genre"
                            id="exampleRadios2"
                            value="female"
                            onChange={handleChange}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="exampleRadios2"
                          >
                            Female
                          </label>
                        </div>
                      </div>

                      <div className="d-flex justify-content-start  mb-3 ">
                        <button
                          type="submit"
                          className="btn btn-primary btn-lg w-100"
                        >
                          Register
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
