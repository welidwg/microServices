import { useQuery } from "@apollo/client";
import { useState } from "react";
import { ProductsQuery } from "../Graphql/queries";

export default function Home(props) {
    const [user, setUser] = useState(null);
    
  const TestQuery = useQuery(ProductsQuery, {
    pollInterval: 10000,
    onCompleted: (res) => {},
    onError: (err) => {
      console.log("====================================");
      console.log(err.message);
      console.log("====================================");
    },
  });
  return (
    <div className="row">
      {TestQuery.loading ? (
        <span>loading</span>
      ) : TestQuery.error ? (
        TestQuery.error.message
      ) : (
        TestQuery.data.products.map((e, index) => {
          return (
            <div className="col-md-3 mb-3" key={index}>
              <div
                className="card "
                style={{ height: "450px", width: "200px" }}
              >
                <img
                  src={`https://source.unsplash.com/600x900/?${e.title}`}
                  className="card-img-top h-50 "
                  alt="Product Image"
                />
                <div className="card-body d-flex align-items-start flex-column justify-content-between">
                  <h5 className="card-title">{e.title}</h5>
                  <p className="card-text">{e.description}</p>
                  <a href="#" className="btn btn-primary">
                    <i className="fas fa-cart-plus"></i>
                  </a>
                </div>
                <div className="card-footer">
                  <small className="text-muted">Price: {e.price} TND</small>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
