const fs = require('fs');
const path = require('path');
const { ApolloServer } = require('apollo-server');
const { PrismaClient } = require('@prisma/client');

// Resolves various HTTP requests
const resolvers = {
  Query: {
    info: () => `This is the API of Hackernews. As in the real Hackernews.`,
    feed: (parent, args, context) => {
      return context.prisma.link.findMany();
    }
  },
  
  Mutation: {
    post: (parent, args, context) => {
      const newLink = context.prisma.link.create({
        data: {
          url: args.url,
          description: args.description
        }
      });
    
      return newLink;
    }
  }

  // Can be removed - graph ql will resolve these fields automatically
  // Link: {
  //   id: (parent) => parent.id,
  //   description: (parent) => parent.id,
  //   url: (parent) => parent.url
  // }
}

const prisma = new PrismaClient();

const server = new ApolloServer({
  typeDefs: fs.readFileSync(
    path.join(__dirname, 'schema.graphql'),
    'utf8'
  ),
  resolvers,
  context: { prisma }
});

server
  .listen()
  .then(({ url }) => {
    console.log(`your server is running on port: ${url}`);
  });
