export default function Navbar(props) {
  return (
    <div
      className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark h-100"
      style={{ width: "340px" }}
    >
      <a className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
        <span className="fs-4">Sidebar</span>
      </a>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <a href="#" className="nav-link active" aria-current="page">
            Home
          </a>
        </li>
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
