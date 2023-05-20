import { useMutation, useQuery } from "@apollo/client";
import axios from "axios";
import { useEffect, useState } from "react";
import { ProductsQuery } from "../Graphql/queries";
import { DeleteProductMutation } from "../Graphql/mutations";
import Swal from "sweetalert2";
import Input from "../components/form/Input";

export default function MyProducts(props) {
  const [data, setData] = useState(null);
  const [delete_prod] = useMutation(DeleteProductMutation);
  const [updated, setUpdatedData] = useState(null);
  const ProductssQuery = useQuery(ProductsQuery, {
    pollInterval: 10000,
    onCompleted: (res) => {},
    onError: (err) => {
      console.log("====================================");
      console.log(err.message);
      console.log("====================================");
    },
  });
  function DeleteProductHandler(id) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        delete_prod({
          variables: { id: id },
          onCompleted: (res) => {
            Swal.fire("Deleted!", "Your product has been deleted!", "success");
            ProductssQuery.refetch();
          },
          onError: (err) => {
            Swal.fire("Error", err.message, "error");
          },
        });
      }
    });
  }

  return (
    <>
      <h3 className="p-3">Porducts list</h3>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Title</th>
            <th scope="col">Description</th>
            <th scope="col">Price</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {ProductssQuery.loading ? (
            <tr>
              <td>loading</td>
            </tr>
          ) : (
            ProductssQuery.data.products.map((e, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{e.id}</th>
                  <td>{e.title}</td>
                  <td>{e.description}</td>
                  <td>{e.price}</td>
                  <td className="d-flex align-items-center justify-content-start">
                    <button
                      className="btn"
                      data-bs-toggle="offcanvas"
                      href={`#productOffCanvas${e.id}`}
                    >
                      {" "}
                      <i className="fas fa-edit text-primary"></i>
                    </button>
                    <button
                      className="btn"
                      onClick={() => {
                        DeleteProductHandler(e.id);
                      }}
                    >
                      <i className="fas fa-trash text-danger"></i>
                    </button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
      {ProductssQuery.loading ? (
        <></>
      ) : (
        ProductssQuery.data.products.map((e, index) => {
          return (
            <div
              class="offcanvas offcanvas-start"
              tabindex="-1"
              id={`productOffCanvas${e.id}`}
              aria-labelledby="offcanvasExampleLabel"
            >
              <div class="offcanvas-header">
                <h2 class="offcanvas-title" id="">
                  Edit product
                </h2>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                ></button>
              </div>
              <div class="offcanvas-body">
                <form>
                  <Input
                    type={"text"}
                    name={"title"}
                    icon={"fas fa-cube"}
                    value={e.title}
                  />
                  <Input
                    type={"text"}
                    name={"description"}
                    icon={"fas fa-info"}
                    value={e.description}
                  />
                  <Input
                    type={"number"}
                    name={"price"}
                    icon={"fas fa-money-bill-alt"}
                    value={e.price}
                  />
                  <button className="btn btn-success">Save</button>
                </form>
              </div>
            </div>
          );
        })
      )}
    </>
  );
}
