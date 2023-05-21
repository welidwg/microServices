import { useEffect, useState } from "react";
import Input from "../components/form/Input";
import { useMutation } from "@apollo/client";
import { UpdateProductMutation } from "../Graphql/mutations";
import Swal from "sweetalert2";

export default function EditProduct({ product,query }) {
  const [update_prod] = useMutation(UpdateProductMutation);
  const [updatedData, setUpdatedData] = useState({
    id: product.id,
    title: product.title,
    description: product.description,
    price: product.price,
  });
  function handleChange(e) {
    if (e.target.name === "price") {
      setUpdatedData({
        ...updatedData,
        [e.target.name]: parseFloat(e.target.value),
      });
    } else {
      setUpdatedData({ ...updatedData, [e.target.name]: e.target.value });
    }
  }
  function handleSubmit(e) {
    e.preventDefault();
    update_prod({
      variables: updatedData,
      onCompleted: (res) => {
          Swal.fire("Updated!", "Your product has been updated!", "success");
          query.refetch();
      },
      onError: (err) => {
        Swal.fire("Error", err.message, "error");
      },
    });
  }

  return (
    <div
      className="offcanvas offcanvas-end"
      tabIndex="-1"
      id={`productOffCanvas${product.id}`}
      aria-labelledby="offcanvasExampleLabel"
      data-bs-backdrop="static"
    >
      <div className="offcanvas-header">
        <h2 className="offcanvas-title" id="">
          Edit product
        </h2>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div className="offcanvas-body">
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <Input
            type={"text"}
            name={"title"}
            icon={"fas fa-cube"}
            value={product.title}
            onChange={handleChange}
          />
          <Input
            type={"text"}
            name={"description"}
            icon={"fas fa-info"}
            value={product.description}
            onChange={handleChange}
          />
          <Input
            type={"number"}
            name={"price"}
            icon={"fas fa-money-bill-alt"}
            value={product.price}
            onChange={handleChange}
          />
          <button type="submit" className="btn btn-success w-100">
            Save
          </button>
        </form>
      </div>
    </div>
  );
}
