import { useState } from "react";
import Input from "../components/form/Input";
import { useMutation } from "@apollo/client";
import { AddPorductMutation } from "../Graphql/mutations";
import Swal from "sweetalert2";

export default function AddProduct(props) {
  const [product, setProduct] = useState({
    title: "",
    description: "",
    price: 0,
  });
  const [create_prod] = useMutation(AddPorductMutation);

  function handleChange(e) {
    if (e.target.name == "price") {
      setProduct({
        ...product,
        [e.target.name]: parseFloat(e.target.value),
      });
    } else {
      setProduct({ ...product, [e.target.name]: e.target.value });
    }
  }
  function handleSubmit(e) {
    e.preventDefault();
    create_prod({
      variables: product,
      onCompleted: (res) => {
        Swal.fire("Success", "Successfully created ", "success");
        e.target.reset();
      },
      onError: (err) => {
        Swal.fire("Error", err.message, "error");
      },
    });
  }
  return (
    <section className=" my-3">
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black rounded-5">
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                      Add product
                    </p>

                    <form
                      className="mx-1 mx-md-4"
                      onSubmit={(e) => handleSubmit(e)}
                    >
                      <Input
                        icon={`fas fa-cube`}
                        placeholder={"Title"}
                        name={"title"}
                        required={true}
                        onChange={handleChange}
                      />
                      <Input
                        icon={`fas fa-info`}
                        placeholder={"Description"}
                        name={"description"}
                        required={true}
                        onChange={handleChange}
                      />
                      <Input
                        icon={`fas fa-money-bill`}
                        placeholder={"Price"}
                        name={"price"}
                        type={"number"}
                        required={true}
                        onChange={handleChange}
                      />

                      <div className="d-flex justify-content-start  mb-3 ">
                        <button
                          type="submit"
                          className="btn btn-primary btn-lg w-100"
                        >
                          Create
                        </button>
                      </div>
                    </form>
                  </div>
                  <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                      className="img-fluid"
                      alt="Sample image"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
