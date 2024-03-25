const { ObjectId } = require("mongodb");
const { findAllCoachs, AddNewCoachs, findCoachById } = require("../models/coachs");

const typeDefs = `#graphql

type Coach {
    _id : ID
    name: String
    sport: String
    Users: [User]
    locationId: ID
    email: String
    imageUrl: String
    usersCoach: User
}

input AddNewCoach {
    name: String
    sport: String
    email: String
    locationId: ID
    imageUrl: String
}
type Coach {
    _id : ID
    name: String
    sport: String
    locationId: ID
    email: String
    imageUrl: String
    Users: [User]
    Schedule: [Schedule]
}

type Query {
    getAllCoachs: [Coach]
    getCoachById(coachId: String): Coach
}

type Mutation{
    AddCoachs(payload: AddNewCoach):Coach
}

`;

const resolvers = {
  Query: {
    getAllCoachs: async () => {
      const coachs = await findAllCoachs();

    //   console.log(coachs, "ini coachs");
      return coachs;
    },
    getCoachById: async (_parents, args, contextValue) => {
      const { userEmail } = await contextValue.auth();

      const coachs = await findCoachById(args.coachId);
      console.log(coachs, 'ini coachs');
      return coachs;
    },
  },
  Mutation: {
    AddCoachs: async (_parents, args, contextValue) => {
      const userLogin = await contextValue.auth();
      const { payload } = args;

      payload.locationId = new ObjectId(payload.locationId)

      const posts = await AddNewCoachs(payload);
      return posts;
    },
  },
};

module.exports = {
  coachTypeDefs: typeDefs,
  coachResolvers: resolvers,
};
