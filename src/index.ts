import "reflect-metadata";
import { GraphQLServer } from "graphql-yoga";
import { createConnection } from "typeorm";
import { ResolverMap } from "./types/ResolverType";
import { User } from "./entity/User";

const typeDefs = `
 type User {
   id: Int!
   firstName: String!
   lastName: String!
   userName: String!
   password: String!
   avatar: String!
 }

  type Query {
    user(id: Int, userName: String): User!
    users: [User!]!
  }
  
  type Mutation {
    createUser(firstName: String!, lastName: String!, userName: String!, password: String!, avatar: String): Boolean!
    updateUser(id: Int, firstName: String, lastName: String, userName: String, password: String, avatar: String): Boolean!
    deleteUser(id: Int): Boolean!
  }
`

const resolvers: ResolverMap = {
  Query: {
    user: (_, { id, userName }) => User.findOne({userName: userName, id: id}),
    users: () => User.find()
  },
  Mutation: {
    createUser: async (_, args) => {
      try {
        await User.create(args).save()
        console.log('New user: @' + args.userName)
        return true;
      } catch (err) {
        console.log(err)
        return false;
      }
    },
    updateUser: async (_, {id, ...args}) => {
      try {
        await User.update(id, args);
        return true;
      } catch (err) {
        console.log(err);
        return false;
      }
    },
    deleteUser: async (_, {id}) => {
      try {
        let userToRemove = await User.findOne({id:id})
        await User.remove(userToRemove);
        return true;
      } catch (err) {
        console.log(err);
        return false;
      }
    }
  }
};

const server = new GraphQLServer({ typeDefs, resolvers })
createConnection().then(() => {
  server.start(() => console.log("Server is running on localhost:4000"));
});