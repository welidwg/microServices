const express = require("express");
const { expressMiddleware } = require("@apollo/server/express4");
const bodyParser = require("body-parser");
const cors = require("cors");
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const { ApolloServer } = require("@apollo/server");

const userProtoPath = "./proto/user.proto";
const cartProtoPath = "./proto/cart.proto";
const app = express();
app.use(bodyParser.json());
const resolvers = require("./resolversGraphQL");
const typeDefs = require("./schemaGraphQL");
const authentication = require("./authentication");
const server = new ApolloServer({ typeDefs, resolvers });

server.start().then(() => {
  app.use(cors(), bodyParser.json(), expressMiddleware(server));
});

const userProtoDefinition = protoLoader.loadSync(userProtoPath, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const cartProtoDefinition = protoLoader.loadSync(cartProtoPath, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const userProto = grpc.loadPackageDefinition(userProtoDefinition).user;
const cartProto = grpc.loadPackageDefinition(cartProtoDefinition).cart;

const clientUser = new userProto.UserService(
  "localhost:50051",
  grpc.credentials.createInsecure()
);
const clientCart = new cartProto.CartService(
  "localhost:50053",
  grpc.credentials.createInsecure()
);

//user
app.post("/api/user/create", (req, res) => {
  const data = req.body;
  clientUser.createUser(data, (err, response) => {
    if (err) return res.status(500).send(err);
    res.json(response.user);
  });
});
app.post("/api/login", (req, res) => {
  const data = req.body;

  clientUser.authUser(data, (err, response) => {
    if (err) return res.status(500).send(err);
    res.json(response);
  });
});
app.delete("/api/user/:id", authentication, (req, res) => {
  const id = req.params.id;

  clientUser.deleteUser({ id: id }, (err, response) => {
    if (err) return res.status(500).send(err);
    res.json(response.res);
  });
});

app.get("/api/user/:id", authentication, (req, res) => {
  const user_id = req.params.id;
  clientUser.getUser({ user_id: user_id }, (err, response) => {
    if (err) return res.status(500).send(err);
    res.json(response.user);
  });
});
app.put("/api/user/update", authentication, (req, res) => {
  const user = req.body;
  clientUser.updateUser({ user: user }, (err, response) => {
    if (err) return res.status(500).send(err);
    res.json(response.user);
  });
});

app.get("/api/users/search", (req, res) => {
  const { cin } = req.body;
  clientUser.searchUser({ cin: cin }, (err, response) => {
    if (err) return res.status(500).send(err);

    res.json(response.user);
  });
});

//carts
app.post("/api/cart/add", (req, res) => {
  const data = req.body;
  clientCart.addToCart(data, (err, response) => {
    if (err) return res.status(500).send(err);
    res.json(response.cart);
  });
});
app.get("/api/cart/:user_id", (req, res) => {
  const user_id = req.params.user_id;
  clientCart.getCart({ user_id: user_id }, (err, response) => {
    if (err) return res.status(500).send(err);
    res.json(response.cart);
  });
});
app.get("/api/test", (req, res) => {
  res.json({ message: "hello" });
});

const port = 3001;
app.listen(port, () => {
  console.log(`API Gateway running on port ${port}`);
});
