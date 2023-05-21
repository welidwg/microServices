import { gql } from "@apollo/client";

export const AddPorductMutation = gql`
  mutation AddProduct($title: String!, $description: String!, $price: Float!) {
    createProduct(title: $title, description: $description, price: $price) {
      title
    }
  }
`;
export const DeleteProductMutation = gql`
  mutation DeleteProduct($id: Int!) {
    deleteProduct(id: $id)
  }
`;
export const UpdateProductMutation = gql`
  mutation UpdateProduct(
    $id: Int!
    $title: String!
    $description: String!
    $price: Float!
  ) {
    updateProduct(
      id: $id
      title: $title
      description: $description
      price: $price
    ){title}
  }
`;