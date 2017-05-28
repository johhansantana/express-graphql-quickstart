import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} from 'graphql';
import db from '../db';

const userType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: {
      type: GraphQLInt
    },
    name: {
      type: GraphQLString
    },
    lastName: {
      type: GraphQLString

    },
    email: {
      type: GraphQLString
    },
    password: {
      type: GraphQLString,
      resolve: () => null
    },
    createdAt: {
      type: GraphQLString
    }
  }
});

const query = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    users: {
      type: new GraphQLList(userType),
      args: {
        id: {
          type: GraphQLInt
        },
        name: {
          type: GraphQLString
        },
        lastName: {
          type: GraphQLString
        },
        email: {
          type: GraphQLString
        },
      },
      resolve: (_, args) => {
        return db.models.user.findAll({ where: args });
      }
    }
  }
});

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Mutate stuff',
  fields: {
    addUser: {
      type: userType,
      args: {
        name: {
          type: new GraphQLNonNull(GraphQLString)
        },
        lastName: {
          type: new GraphQLNonNull(GraphQLString)
        },
        email: {
          type: new GraphQLNonNull(GraphQLString)
        },
        password: {
          type: new GraphQLNonNull(GraphQLString)
        }
      },
      resolve: (source, args) => {
        return db.models.user.create({
          name: args.name,
          lastName: args.lastName,
          email: args.email,
          password: args.password
        });
      }
    }
  }
});

const schema = new GraphQLSchema({
  query,
  mutation
});

export default schema;
