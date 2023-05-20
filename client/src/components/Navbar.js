import { NavLink } from "react-router-dom";
import { is_Auth, user } from "../constants";
import { useEffect } from "react";

export default function Navbar(props) {
  useEffect(() => {
    // console.log("====================================");
    // console.log(user.role);
    // console.log("====================================");
  }, []);
  return (
    <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark h-100 ">
      <a className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
        <span className="fs-4">E-commerce</span>
      </a>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <NavLink
            to={"/"}
            className="nav-link btn text-start text-light"
            aria-current="page"
          >
            Home
          </NavLink>
        </li>
        {is_Auth && user.role == 0 ? (
          <>
            <li className="nav-item ">
              <NavLink
                to={"/products"}
                className="nav-link btn text-start text-light "
                aria-current="page"
              >
               Products list
              </NavLink>
            </li>
            <li className="nav-item ">
              <NavLink
                to={"/addproduct"}
                className="nav-link btn text-start text-light "
                aria-current="page"
              >
                Add Product
              </NavLink>
            </li>
          </>
        ) : (
          ""
        )}
      </ul>
      <hr />
    </div>
  );
}
