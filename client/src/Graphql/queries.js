import { gql } from "@apollo/client";

export const ProductsQuery = gql`
  query Products {
    products {
      id
      title
      description
      price
    }
  }
`;
