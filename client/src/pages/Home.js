import { useState } from "react";
import { useQuery } from "@apollo/client";
import { ProductsQuery, checkInCartQuery } from "../Graphql/queries";
import axios from "axios";
import { is_Auth } from "../constants";
import Swal from "sweetalert2";
import ProductCard from "../components/ProductCard";

export default function Home(props) {
  const user = JSON.parse(localStorage.getItem("user"));
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
          return <ProductCard e={e} />;
        })
      )}
    </div>
  );
}
