import Navbar from "../components/Navbar";

export default function Container(props) {
  return (
    <div className="container-fluid vh-100 p-0">
      <div className="row h-100">
        <div className="col-md-3">
          <Navbar />
        </div>
        <div className="col-md-9">{props.children}</div>
      </div>
    </div>
  );
}
