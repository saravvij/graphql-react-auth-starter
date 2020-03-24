const graphql = require("graphql");
const UserType = require("./types/user_type");
const AuthService = require("../services/auth");

const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLString
} = graphql;

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    singup: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(parantValue, { email, password }, req) {
        return AuthService.signup({ email, password, req });
      }
    },
    logout: {
      type: UserType,
      resolve(parantValue, args, req) {
        const { user } = req;
        req.logout();
        return user;
      }
    },
    login: {
      type: UserType,
      args: {
        email: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLNonNull(GraphQLString) }
      },
      resolve(parentValue, { email, password }, req) {
        return AuthService.login({ email, password, req });
      }
    }
  }
});

module.exports = mutation;
