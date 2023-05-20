import { gql } from "@apollo/client";

export const ProductsQuery = gql`
  query ProductsQuery {
    products {
      title
      description
      price
    }
  }
`;
