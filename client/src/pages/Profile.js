import { useEffect, useState } from "react";
import Input from "../components/form/Input";
import axios from "axios";
import Swal from "sweetalert2";
export default function Profile(props) {
  const user = JSON.parse(localStorage.getItem("user"));
  const [userData, setUserData] = useState(user);
  function handleChange(e) {
    if (e.target.name === "cin") {
      setUserData({
        ...userData,
        [e.target.name]: parseInt(e.target.value),
      });
    } else {
      setUserData({ ...userData, [e.target.name]: e.target.value });
    }
  }
  function handleSubmit(e) {
    e.preventDefault();
    axios
      .put("/api/user/update", userData, {
        headers: {
          Authorization: `bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        Swal.fire("Updated!", "Your product has been updated!", "success");
        console.log("====================================");
        console.log(res.data);
        console.log("====================================");
        localStorage.setItem("user", JSON.stringify(res.data));
      })
      .catch((err) => {
        Swal.fire("Error", err.response.data.details, "error");
        console.log("====================================");
        console.log(err.response);
        console.log("====================================");
      });
  }
  return (
    <div
      className="offcanvas offcanvas-end"
      data-bs-backdrop="static"
      tabIndex={"-1"}
      id="profileOffCanvas"
    >
      <div className="offcanvas-header">
        <h2 className="offcanvas-title" id="">
          Profile
        </h2>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div className="offcanvas-body">
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
              <span>@{user.role === 0 ? "Admin" : "Client"}</span>{" "}
              <span className="fw-bold">|</span>
              <span>{user.genre.toUpperCase()}</span>
            </div>
            <form
              onSubmit={(e) => {
                handleSubmit(e);
              }}
              className="w-100 my-2"
            >
              <Input
                icon={"fas fa-user"}
                value={user.nom}
                type={"text"}
                name={"nom"}
                onChange={handleChange}
              />
              <Input
                icon={"fas fa-user"}
                value={user.prenom}
                type={"text"}
                name={"prenom"}
                onChange={handleChange}
              />
              <Input
                icon={"fas fa-at"}
                value={user.email}
                type={"email"}
                name={"email"}
                onChange={handleChange}
              />
              <Input
                icon={"fas fa-id-card"}
                value={user.cin}
                type={"number"}
                name={"cin"}
                onChange={handleChange}
              />

              <button className="btn btn-success w-100 my-2">Save</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
