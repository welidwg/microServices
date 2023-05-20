import { NavLink } from "react-router-dom";

export default function SideBar(props) {
  return (
    <nav class="navbar navbar-expand-lg bg-light">
      <div class="container-fluid">
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            {/* <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#">
                Home
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">
                Link
              </a>
            </li> */}
          </ul>
          <div className="">
            <a className="btn  mx-2 btn-primary border-0 rounded-4   shadow-sm text-light ">
              Login
            </a>
            <NavLink
              to={"/signup"}
              className="btn  btn-primary border-0 rounded-4   shadow-sm text-light "
            >
              Sign up
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}
