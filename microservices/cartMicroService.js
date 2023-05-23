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

const cartProtoPath = "proto/cart.proto";
const cartProtoDefinition = protoLoader.loadSync(cartProtoPath, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const cartProto = grpc.loadPackageDefinition(cartProtoDefinition).cart;

const CartService = {
  addToCart: (call, callback) => {
    const { user_id, product_id, price } = call.request;
    const queryCheck =
      "SELECT  * from carts where user_id = ? and product_id = ?";
    connection.query(queryCheck, [user_id, product_id], (error, res) => {
      if (res.length === 0) {
        const query =
          "INSERT INTO carts (user_id, product_id,price) VALUES (?,?,?)";
        connection.query(
          query,
          [user_id, product_id, price],
          (err, results) => {
            if (err) return callback(new Error(err));
            const cart = {
              id: results.insertId,
              user_id: user_id,
              product_id: product_id,
            };
            callback(null, { cart: cart });
          }
        );
      } else {
        const query = "DELETE FROM carts where user_id = ? and product_id = ?";
        connection.query(query, [user_id, product_id], (err, results) => {
          if (err) return callback(new Error(err));
          const cart = {
            id: results.insertId,
            user_id: user_id,
            product_id: product_id,
          };
          callback(null, { cart: cart });
        });
      }
    });
  },
  getCart: (call, callback) => {
    const user_id = call.request.user_id;
    const query =
      "SELECT * from carts LEFT JOIN products ON (carts.product_id=products.id) where carts.user_id = " +
      user_id;

    connection.query(query, (err, results) => {
      if (err) {
        return callback(new Error(err));
      }
      const cart = results.map((cart) => ({
        id: cart.cart_id,
        user_id: user_id,
        product_id: cart.product_id,
        price: cart.price,
        product: {
          id: cart.product_id,
          title: cart.title,
          description: cart.description,
          price: cart.price,
        },
      }));
      callback(null, { cart: cart });
    });
  },
  deleteFromCart: (call, callback) => {
    const id = call.request.id;
    const query = "DELETE FROM carts where cart_id = ?";

    connection.query(query, [id], (err, results) => {
      if (err) {
        return callback(new Error(err));
      }
      if (results.affectedRows == 0) {
        callback(null, { res: "id not found" });
      } else {
        callback(null, { res: "deleted" });
      }
    });
  },
};

const server = new grpc.Server();

server.addService(cartProto.CartService.service, CartService);

const port = 50053;

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
console.log(`User microservice running on port ${port}`);
