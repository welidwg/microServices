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

const cartProtoPath = "cart.proto";
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
    const query =
      "INSERT INTO carts (user_id, product_id,price) VALUES (?,?,?)";
    connection.query(query, [user_id, product_id, price], (err, results) => {
      if (err) return callback(new Error(err));
      const cart = {
        id: results.insertId,
        user_id: user_id,
        product_id: product_id,
      };
      callback(null, { cart: cart });
    });
  },
  getCart: (call, callback) => {
    const user_id = call.request.user_id;
    const query = "SELECT * from carts where user_id = ?";
    console.log("====================================");
    console.log(user_id);
    console.log("====================================");
    connection.query(query, [user_id], (err, results) => {
      if (err) return callback(new Error(err));
      const cart = results.map((cart) => ({
        id: cart.id,
        user_id: user_id,
        product_id: cart.product_id,
        price: cart.price,
      }));
      callback(null, { cart: cart });
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
