import { useMutation, useQuery } from "@apollo/client";
import { ProductsQuery } from "../Graphql/queries";
import { DeleteProductMutation } from "../Graphql/mutations";
import Swal from "sweetalert2";
import EditProduct from "./EditProduct";

export default function MyProducts(props) {
  const [delete_prod] = useMutation(DeleteProductMutation);
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
      <table className="table">
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
          return <EditProduct key={index} product={e} query={ProductssQuery} />;
        })
      )}
    </>
  );
}
