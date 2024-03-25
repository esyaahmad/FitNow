const { ObjectId } = require("mongodb");
const { getDatabase } = require("../config/mongoConnection");

const getCategoryColletion = () => {
  const db = getDatabase();
  const categoriesCollection = db.collection("Categories");

  return categoriesCollection;
};

const findALlCategories = async () => {
  const categories = await getCategoryColletion().find().toArray();

  return categories;
};

const addCategory = async (payload) => {
  const categoryCollection = await getCategoryColletion();
  const newCategory = await categoryCollection.insertOne(payload);

  const categories = await categoryCollection.findOne({
    _id: new ObjectId(newCategory.insertedId),
  });

  return categories;
};

module.exports = {
  getCategoryColletion,
  findALlCategories,
  addCategory,
};
