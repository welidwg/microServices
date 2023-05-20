import { gql } from "@apollo/client";

export const AddPorductMutation = gql`
  mutation AddProduct($title: String!, $description: String!, $price: Float!) {
    createProduct(title: $title, description: $description, price: $price) {
      title
    }
  }
`;
