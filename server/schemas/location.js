const { findAllLocations, addLocation, findLocationByCategory } = require("../models/locations");


const typeDefs = `#graphql

type Location {
    _id : ID
    name: String
    Coachs: [Coach]
    CategoryId: ID
    Category: Category
    imageUrl: [String]
    longitude: Float
    latitude: Float
    address: String
}

input AddNewLocation{
  name: String
  CategoryId: ID
  imageUrl: [String]
  longitude: Float
  latitude: Float
  address: String

}

type Query {
    getAllLocation: [Location]
    getLocationByCategory(CategoryId: ID): [Location]
}

type Mutation {
  addLocation(payload: AddNewLocation): Location
}



`;

const resolvers = {
  Query: {
    getAllLocation: async () => {
      const locations = await findAllLocations();

      return locations;
    },
    getLocationByCategory: async (_parents, args) => {
      const { CategoryId } = args;
      const locations = await findLocationByCategory(CategoryId);

      return locations;
    }
  },
  Mutation: {
    addLocation: async (_parents, args, contextValue) => {
      const userLogin = await contextValue.auth();

      const { payload } = args;
      const locations = await addLocation(payload);

      return locations;
    },
  },

};

module.exports = {
  locationTypeDefs: typeDefs,
  locationResolvers: resolvers,
};
