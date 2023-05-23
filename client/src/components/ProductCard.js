import { useQuery } from "@apollo/client";
import { checkInCartQuery } from "../Graphql/queries";
import { is_Auth } from "../constants";
import axios from "axios";
import Swal from "sweetalert2";

export default function ProductCard({ e }) {
  const user = JSON.parse(localStorage.getItem("user"));

  const checkInCartQ = useQuery(checkInCartQuery, {
    variables: {
      userId: is_Auth ? user.id : 0,
      productId: e.id,
    },
    pollInterval: 10000,
    onError: (err) => {
      console.log("====================================");
      console.log(err.graphQLErrors);
      console.log("====================================");
    },
  });
  function AddToCart(product_id, price) {
    if (is_Auth) {
      axios
        .post(
          "/api/cart/add",
          {
            user_id: user.id,
            product_id: product_id,
            price: price,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          checkInCartQ.refetch();
          //   Swal.fire("Done", "Product Added to cart", "success");
        })
        .catch((err) => {
          Swal.fire("Error", err.message, "error");
        });
    } else {
      Swal.fire("Not logged in ! ", "You need to log in first", "warning");
    }
  }
  return (
    <div className="col-md-3 mb-3" key={e.id}>
      <div className="card " style={{ height: "450px", width: "200px" }}>
        <img
          src={`https://source.unsplash.com/600x900/?${e.title}`}
          className="card-img-top h-50 "
          alt="Product Image"
        />
        <div className="card-body d-flex align-items-start flex-column justify-content-between">
          <h5 className="card-title">{e.title}</h5>
          <p className="card-text">{e.description}</p>
          <a
            href="#"
            className="btn btn-primary"
            onClick={() => {
              AddToCart(e.id, e.price);
            }}
          >
            {checkInCartQ.loading ? (
              <></>
            ) : checkInCartQ.error ? (
              checkInCartQ.error.message
            ) : checkInCartQ.data.checkInCart ? (
              <i className="fas fa-times"></i>
            ) : (
              <i className="fas fa-cart-plus"></i>
            )}
          </a>
        </div>
        <div className="card-footer">
          <small className="text-muted">Price: {e.price} TND</small>
        </div>
      </div>
    </div>
  );
}
