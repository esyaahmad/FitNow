const { findALlCategories, addCategory } = require("../models/categories");

const typeDefs = `#graphql

type Category {  
    _id : ID
    name: String
    logo: String
    marker: String
}

type Query {
    getAllCategory: [Category]
}

input NewCategory {
    name: String
    logo: String
}

type Mutation {
    AddNewCategory(payload: NewCategory): Category
}

`;

const resolvers = {
  Query: {
    getAllCategory: async () => {
      const categories = await findALlCategories();
      return categories;
    },
  },
  Mutation: {
    AddNewCategory: async (_parents, args) => {
      const userLogin = await contextValue.auth();
      const { payload } = args;
      const newCategory = await addCategory(payload);

      return newCategory;
    },
  },
};

module.exports = {
  CategoriesTypeDefs: typeDefs,
  categoriesResolvers: resolvers,
};
