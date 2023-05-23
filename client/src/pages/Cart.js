import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function Cart(props) {
  const user = JSON.parse(localStorage.getItem("user"));
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  function FetchData() {
    axios
      .get(`/api/cart/${user.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setItems(res.data);
      })
      .catch((err) => {
        console.log("====================================");
        console.log(err.response.data);
        console.log("====================================");
      });
  }
  useEffect(() => {
    FetchData();
    setInterval(() => {
      FetchData();
    }, 10000);
  }, []);
  function DeleteItem(id) {
    axios
      .delete(`/api/cart/delete/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        FetchData();
      })
      .catch((err) => {
        Swal.fire("error", err.message, "error");
      });
  }

  useEffect(() => {
    const calculateTotal = () => {
      let sum = 0;
      items.forEach((item) => {
        sum += item.price;
      });
      setTotal(sum);
    };
    calculateTotal();
  }, [items]);
  return (
    <div
      className="offcanvas offcanvas-end"
      data-bs-backdrop="static"
      tabIndex={"-1"}
      id="cartOffCanvas"
    >
      <div className="offcanvas-header">
        <h2 className="offcanvas-title" id="">
          My Cart
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
          <div
            className=" d-flex flex-column align-items-center "
            style={{
              maxHeight: "500px",
              height: "500px",
              overflowY: "auto",
              overflowX: "hidden",
            }}
          >
            {items.length == 0 ? (
              <>Your cart is Empty</>
            ) : (
              items.map((item, index) => {
                return (
                  <>
                    <div
                      class="row cart-item mb-3 d-flex justify-content-between align-items-center p-2 rounded-3 shadow-sm"
                      key={index}
                    >
                      <div class="col-md-3 ">
                        <img
                          src={`https://source.unsplash.com/600x900/?${item.product.title}`}
                          class="img-fluid w-75"
                        />
                      </div>
                      <div class="col-md-4">
                        <h4 class="product-name">{item.product.title}</h4>
                      </div>

                      <div class="col-md-5 d-flex justify-content-between align-items-center">
                        <span class="product-price">
                          {item.product.price} TND
                        </span>
                        <button
                          className="btn btn-sm btn-danger mx-2"
                          onClick={() => {
                            DeleteItem(item.id);
                          }}
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>
                    </div>
                  </>
                );
              })
            )}
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <h3>Total</h3>
          <h6>{total} TND</h6>
        </div>
      </div>
    </div>
  );
}
