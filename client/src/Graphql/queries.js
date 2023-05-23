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
export const checkInCartQuery = gql`
  query checkInCart($userId: Int!, $productId: Int!) {
    checkInCart(user_id: $userId, product_id: $productId)
  }
`;
