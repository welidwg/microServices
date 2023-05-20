import Navbar from "../components/Navbar";
import SideBar from "../components/SideBar";

export default function Container(props) {
  return (
    <div className="container-fluid vh-100 p-0 bg-light">
      <div className="row vh-100">
        <div className="col-md-3">
          <Navbar />
        </div>
        <div className="col-md-9 p-2 bg-light">
          <SideBar />
          <div className="p-3"> {props.children}</div>
        </div>
      </div>
    </div>
  );
}
