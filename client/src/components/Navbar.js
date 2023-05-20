import { NavLink } from "react-router-dom";
import { is_Auth, user } from "../constants";

export default function Navbar(props) {
  return (
    <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark h-100 ">
      <a className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
        <span className="fs-4">Sidebar</span>
      </a>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <NavLink to={"/"} className="nav-link " aria-current="page">
            Home
          </NavLink>
        </li>
        {is_Auth ?? user.role == 0 ?? (
          <li className="nav-item">
            <NavLink
              to={"/addproduct"}
              className="nav-link "
              aria-current="page"
            >
              Add Product
            </NavLink>
          </li>
        )}

        <li>
          <a href="#" className="nav-link text-white">
            <svg className="bi me-2" width="16" height="16"></svg>
            Dashboard
          </a>
        </li>
        <li>
          <a href="#" className="nav-link text-white">
            <svg className="bi me-2" width="16" height="16"></svg>
            Orders
          </a>
        </li>
        <li>
          <a href="#" className="nav-link text-white">
            <svg className="bi me-2" width="16" height="16"></svg>
            Products
          </a>
        </li>
        <li>
          <a href="#" className="nav-link text-white">
            <svg className="bi me-2" width="16" height="16"></svg>
            Customers
          </a>
        </li>
      </ul>
      <hr />
    </div>
  );
}
