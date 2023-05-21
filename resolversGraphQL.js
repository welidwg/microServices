const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const { response } = require("express");
const productProtoPath = "proto/product.proto";
const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "aos",
});

const productProtoDefinition = protoLoader.loadSync(productProtoPath, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const productProto = grpc.loadPackageDefinition(productProtoDefinition).product;
const client = new productProto.ProductService(
  "localhost:50052",
  grpc.credentials.createInsecure()
);

const resolvers = {
  Query: {
    product: (_, { id }) => {
      return new Promise((resolve, reject) => {
        client.getProduct({ id: id }, (err, response) => {
          if (err) {
            reject(err);
          } else {
            resolve(response.product);
          }
        });
      });
    },
    products: () => {
      return new Promise((resolve, reject) => {
        client.getAllPorducts({}, (err, response) => {
          if (err) {
            reject(err);
          } else {
            resolve(response.product);
          }
        });
      });
    },
  },
  Mutation: {
    createProduct: (_, { title, description, price }) => {
      return new Promise((resolve, reject) => {
        client.createProduct(
          { title: title, description: description, price: price },
          (err, response) => {
            if (err) {
              reject(err);
            } else {
              resolve(response.product);
            }
          }
        );
      });
    },
    deleteProduct: (_, { id }) => {
      return new Promise((resolve, reject) => {
        client.deleteProduct({ id }, (err, response) => {
          if (err) reject(err);
          else resolve(response.res);
        });
      });
    },
    updateProduct: (_, { id, title, description, price }) => {
      const product = {
        id: id,
        title: title,
        description: description,
        price: price,
      };
      return new Promise((resolve, reject) => {
        client.updateProduct({ product: product }, (err, response) => {
          if (err) reject(err);
          else resolve(response.product);
        });
      });
    },
  },
};
module.exports = resolvers;
