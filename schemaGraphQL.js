const typeDefs = `#graphql
  type Product {
    id: Int
    title: String!
    description: String!
    price:Float!
  }



  type Query {
    product(id: Int!): Product
    products: [Product]
    checkInCart(user_id:Int!,product_id:Int!):Boolean!
  }


  type Mutation {
    createProduct(title: String!, description:String!,price:Float!): Product! 
    deleteProduct(id:Int!): String
    updateProduct(id:Int!,title:String!,description:String!,price:Float!):Product!
    
  }
`;

module.exports = typeDefs;
