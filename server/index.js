import "dotenv/config";

import express from "express";
import cors from "cors";

import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";

import typeDefs from "./graphql/typeDefs.js";
import resolvers from "./graphql/resolvers.js";

// used for authenticating users using JWT token
import {
  authMiddleware,
} from "./utils/auth.js";

const app = express();

// adds typeDefs and resolvers to the apollo server
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// starts the server
await server.start();

app.use(
  "/graphql",
  cors(),
  express.json(),
  expressMiddleware(server, {
    context: async ({ req }) => {
      return authMiddleware({ req });
    },
  })
);

const PORT = process.env.PORT || 4000;

// sets the port to either PORT or port 4000
app.listen(PORT, () => {
  console.log(
    `Weight Tracker server running on port ${PORT}`
  );

  console.log(
    `GraphQL: http://localhost:${PORT}/graphql`
  );
});