const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "aos",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to database");
});

const productProtoPath = "proto/product.proto";
const productProtoDefinition = protoLoader.loadSync(productProtoPath, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const productProto = grpc.loadPackageDefinition(productProtoDefinition).product;

const productService = {
  createProduct: (call, callback) => {
    const { title, description, price } = call.request;
    const query =
      "INSERT INTO products (title, description,price) VALUES (?,?,?)";
    connection.query(query, [title, description, price], (err, results) => {
      if (err) return callback(err);
      const prod = {
        id: results.insertId,
        title: title,
        description: description,
        price: price,
      };
      callback(null, { product: prod });
    });
  },
  getProduct: (call, callback) => {
    const { id } = call.request;
    const query = "SELECT * from products where id = ? ";

    connection.query(query, [id], (err, result) => {
      if (err) return callback(err);
      const prod = result[0];
      callback(null, { product: prod });
    });
  },
  getAllPorducts: (call, callback) => {
    const query = "SELECT * from products ";
    connection.query(query, (err, results) => {
      if (err) return callback(err);
      const prods = results.map((prod) => ({
        id: prod.id,
        title: prod.title,
        description: prod.description,
        price: prod.price,
      }));
      callback(null, { product: prods });
    });
  },
  deleteProduct: (call, callback) => {
    const { id } = call.request;
    const query = "DELETE FROM products where id = ?";
    connection.query(query, [id], (err, results) => {
      if (err) return callback(err);
      if (results.affectedRows == 0) {
        callback(null, { res: "id not found" });
      } else {
        callback(null, { res: "deleted" });
      }
    });
  },
  updateProduct: (call, callback) => {
    const { product } = call.request;
    const query =
      "UPDATE products set title = ? , description = ? , price = ? where id = ?";
    connection.query(
      query,
      [product.title, product.description, product.price, product.id],
      (err, results) => {
        if (err) return callback(err);
        if (results.affectedRows == 0) {
          callback(null, { res: "id not found" });
        } else {
          callback(null, { product: product });
        }
      }
    );
  },
  checkInCart: (call, callback) => {
    const { user_id, product_id } = call.request;
    const query = "SELECT * from carts where user_id= ? and product_id=? ";
    connection.query(query, [user_id, product_id], (err, results) => {
      if (err) return callback(new Error(err));
      if (results.length == 0) {
        return callback(null, { check: false });
      } else {
        return callback(null, { check: true });
      }
    });
  },
};

const server = new grpc.Server();
server.addService(productProto.ProductService.service, productService);
const port = 50052;
server.bindAsync(
  `0.0.0.0:${port}`,
  grpc.ServerCredentials.createInsecure(),
  (err, port) => {
    if (err) {
      console.error("Failed to bind server:", err);
      return;
    }

    console.log(`Server is running on port ${port}`);
    server.start();
  }
);
console.log(`Product microservice running on port ${port}`);
