import { NavLink } from "react-router-dom";
import { is_Auth, user } from "../constants";

export default function SideBar(props) {
  function Logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  }
  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {/* <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Link
              </a>
            </li> */}
          </ul>
          {!is_Auth ? (
            <div className="">
              <NavLink
                to={"/login"}
                className="btn  mx-2 btn-primary border-0 rounded-4   shadow-sm text-light "
              >
                Login
              </NavLink>
              <NavLink
                to={"/signup"}
                className="btn  btn-primary border-0 rounded-4   shadow-sm text-light "
              >
                Sign up
              </NavLink>
            </div>
          ) : (
            <div className=" d-flex align-items-center justify-content-around">
              <button
                className="mx-2 fw-bold btn  rounded-3 shadow"
                data-bs-toggle="offcanvas"
                href="#profileOffCanvas"
              >
                {user.nom} {user.prenom} {user.role == 0 ? " | Admin" : ""}
              </button>
              <button
                className="mx-2 fw-bold btn  rounded-3 shadow"
                data-bs-toggle="offcanvas"
                href="#cartOffCanvas"
              >
                <i class="fal fa-shopping-cart"></i>
              </button>
              <button
                onClick={Logout}
                className="btn  btn-primary border-0 rounded-4   shadow-sm text-light "
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
