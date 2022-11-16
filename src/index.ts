const express = require("express");
import { ApolloServer, gql, ApolloError } from "apollo-server-express";

import { getDogById, getDogs, getPeople, getPersonById } from "./api/index.js";
import { Resolvers, Dog, Person, Breed } from "./generated/graphql";

import { getDogLoader } from "./dataloaders/dog";
import { getpersonLoader } from "./dataloaders/person";
import http from "http";
// The GraphQL schema
const typeDefs = gql`
  enum Breed {
    LABRADOR
    POODLE
  }

  type Person {
    id: ID!
    firstName: String!
    lastName: String!
    dogId: ID
    dog: Dog
  }

  type Dog {
    id: ID!
    name: String!
    breed: Breed!
    ownerId: ID!
    owner: Person!
  }

  type Query {
    people: [Person!]!
    person(id: ID!): Person
    dogs: [Dog!]!
    dog(id: ID!): Dog
  }
`;

const dogLoader = getDogLoader();
const personLoader = getpersonLoader();

const setUp = async () => {
  const resolvers: Resolvers = {
    Query: {
      people: async () => await getPeople(),
      person: async (parent, args, ctx, info) =>
        await getPersonById({ id: args.id }),
      dogs: async () => await getDogs(),
      dog: async (parent, args, ctx, info) => await getDogById({ id: args.id }),
    },
    Person: {
      dog: async (parent) => {
        if (!parent.dogId) return;
        return await getDogById({ id: parent.dogId });
      },
    },
    Dog: {
      owner: async (parent) => {
        if (!parent.ownerId) {
          throw new ApolloError("Dog does not have an owner id");
        }
        const owner = await getPersonById({ id: parent.ownerId });

        if (!owner) {
          throw new ApolloError("Owner not found");
        }

        return owner;
      },
    },
  };

  const app = express();

  app.use((req, res, next) => {
    setTimeout(next, 500);
  });
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    debug: false,
    
  });
  await server.start();
  server.applyMiddleware({ app });
  const httpServer = http.createServer(app);

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, () => resolve())
  );
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
};

setUp();
