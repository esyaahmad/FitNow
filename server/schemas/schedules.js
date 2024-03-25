const { findAllSchedules, AddSchedules, findScheduleBySport } = require("../models/schedules");



const typeDefs = `#graphql

type Schedule {
    _id: ID
    sport: String
    duration: Int
    decription: [String]
    Coachs: [Coach]
    Category: Category

}

type Query {
    getAllSchedules: [Schedule]
    getScheduleBySport(sport: String): [Schedule]
}

input ScheduleInput {
    sport: String
    duration: Int
    decription: [String]
}

type Mutation {
    AddSchedules(payload: ScheduleInput): Schedule
}

`;

const resolvers = {
  Query: {
    getAllSchedules: async () => {
      const schedules = await findAllSchedules();

      return schedules;
    },
    getScheduleBySport: async (_parents, args) => {
      const { sport } = args;
      const schedules = await findScheduleBySport(sport);

      return schedules;
    }
  },
  Mutation: {
    AddSchedules: async (_parents, args, contextValue) => {
      await contextValue.auth();

      const { payload } = args;
      const newSchedule = await AddSchedules(payload);

      return newSchedule;
    },
  },
};

module.exports = {
  SchdulesTypeDefs: typeDefs,
  SchdulesResolvers: resolvers,
};

