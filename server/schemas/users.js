const { GraphQLError } = require("graphql");
const {
  findAllUser,
  addUser,
  getCollection,
  getOneUserById,
  addCoach,
  findAllUserCoach,
  searchUserByEmail,
  getProfileOneCoach,
} = require("../models/users");
const { generateToken } = require("../utils/jwt");
const { comparePassword } = require("../utils/bcrypt");

const typeDefs = `#graphql

type User {
    _id : ID
    name: String!
    imageUrl: String
    email: String!
    status: String
    password: String
    role: String
    Coach: [Coach]
    Schedules: [Schedule]
}

type UserCoach {
    _id : ID
    name: String!
    imageUrl: String
    email: String!
    password: String
    role: String
    Description: Coach
}

type ProfileCoach {
  _id: ID
  name: String
  imageUrl: String
  email: String!
  password: String
  role: String
  coachUser: User
  UserSchedules: [Schedule]
  UsersJoin: [User]
}


input RegisterInput {
  name: String!
  email: String!
  password: String!
  imageUrl: String
  status: String
}

type LoginOutput {
  token: String
  userId: ID
  role: String
}

type Query {
  getAllUsers: [User]
  getUserById:User
  getUserByIdArgs(userId: String):User
  getAllUserCoach: [UserCoach]
  getUserByEmail(email: String): User
  getProfileCoach: ProfileCoach
}

type Mutation {
  Register(payload: RegisterInput ): User
  RegisterCoach(payload: RegisterInput ): UserCoach
  Login(email: String!, password: String!): LoginOutput
}


`;

const resolvers = {
  Query: {
    getAllUsers: async () => {
      const users = await findAllUser();

      return users;
    },

    getUserById: async (_parents, _args, contextValue) => {
      const { userId } = await contextValue.auth();
      const users = await getOneUserById(userId);

      return users;
    },
    getUserByIdArgs: async (_parents, args, contextValue) => {
      await contextValue.auth();
      if (!args.userId) return null;
      const users = await getOneUserById(args.userId);

      return users;
    },

    getAllUserCoach: async () => {
      const userCoach = await findAllUserCoach();

      return userCoach;
    },

    getUserByEmail: async (_parents, args) => {
      const users = await searchUserByEmail(args.email);

      return users;
    },

    getProfileCoach: async(_parents, _args, contextValue) => {
      const {role, userId} = await contextValue.auth();
      console.log(userId);
      const user = await getProfileOneCoach(userId);
      console.log(user);
      return user
    }
  },

  Mutation: {
    Register: async (_parents, args) => {
      const { payload } = args;
      const { name, email, password, imageUrl } = payload;

      if (!name) {
        throw new GraphQLError("Name is required", {
          extensions: {
            code: "Bad Request",
            http: { status: 400 },
          },
        });
      }

      if (!email) {
        throw new GraphQLError("Email is required", {
          extensions: {
            code: "Bad Request",
            http: { status: 400 },
          },
        });
      }

      const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/.test(
        email
      );

      if (regex === false) {
        throw new GraphQLError("Email address is not valid", {
          extensions: {
            code: "Bad Request",
            http: { status: 400 },
          },
        });
      }

      if (!password) {
        throw new GraphQLError("Password is required", {
          extensions: {
            code: "Bad Request",
            http: { status: 400 },
          },
        });
      } else if (password.length < 5) {
        throw new GraphQLError("Password must contanit at least 5 character", {
          extensions: {
            code: "Bad Request",
            http: { status: 400 },
          },
        });
      }

      const duplicateMail = await getCollection().findOne({ email });
      if (duplicateMail) {
        throw new GraphQLError("Email has been taken", {
          extensions: {
            code: "Bad Request",
            http: { status: 400 },
          },
        });
      }

      const newUser = await addUser(payload);

      return newUser;
    },

    RegisterCoach: async (_parents, args) => {
      const { payload } = args;
      const { name, email, password, imageUrl } = payload;

      if (!name) {
        throw new GraphQLError("Name is required", {
          extensions: {
            code: "Bad Request",
            http: { status: 400 },
          },
        });
      }

      if (!email) {
        throw new GraphQLError("Email is required", {
          extensions: {
            code: "Bad Request",
            http: { status: 400 },
          },
        });
      }

      const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/.test(
        email
      );

      if (regex === false) {
        throw new GraphQLError("Email address is not valid", {
          extensions: {
            code: "Bad Request",
            http: { status: 400 },
          },
        });
      }

      if (!password) {
        throw new GraphQLError("Password is required", {
          extensions: {
            code: "Bad Request",
            http: { status: 400 },
          },
        });
      } else if (password.length < 5) {
        throw new GraphQLError("Password must contanit at least 5 character", {
          extensions: {
            code: "Bad Request",
            http: { status: 400 },
          },
        });
      }

      const duplicateMail = await getCollection().findOne({ email });
      if (duplicateMail) {
        throw new GraphQLError("Email has been taken", {
          extensions: {
            code: "Bad Request",
            http: { status: 400 },
          },
        });
      }

      const newUser = await addCoach(payload);

      return newUser;
    },

    Login: async (_parents, args) => {
      const { email, password } = args;

      const users = await getCollection().findOne({ email });

      if (!users) {
        throw new GraphQLError("Invalid email/password", {
          extensions: {
            code: "Unauthorized",
            http: { status: 401 },
          },
        });
      }

      const isValidPassword = comparePassword(password, users.password);

      if (!isValidPassword) {
        throw new GraphQLError("Invalid usernmae/password", {
          extensions: {
            code: "Unauthorized",
            http: { status: 401 },
          },
        });
      }

      const payload = {
        id: users._id,
        email: users.email,
      };

      const token = generateToken(payload);

      return { userId: users._id, role: users.role, token };
    },
  },
};

module.exports = {
  userTypeDefs: typeDefs,
  userResolvers: resolvers,
};
