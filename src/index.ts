// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();

import express, { Application } from "express";
import cookieParser from "cookie-parser";
import { ApolloServer } from "apollo-server-express";
import { connectDatabase } from "./database";
import { typeDefs, resolvers } from './graphql';

const mount = async (app: Application) => {
  const db = await connectDatabase();

  app.use(cookieParser(process.env.SECRET));

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req, res }) => ({ db, req, res })
  });
  server.applyMiddleware({ app, path: "/api" });

  app.listen(process.env.PORT);

  console.log(`[app]: http://localhost:${process.env.PORT}`);

  //----------------------
  // Remove before production. This just verifies that listings are being read from db
  // const listings = await db.listings.find({}).toArray();
  // console.log(listings);
  //----------------------


};

mount(express());