const { ObjectId } = require("mongodb");

const { getDatabase } = require("../config/mongoConnection");

const getLocationCollection = () => {
  const db = getDatabase();
  const locationCollection = db.collection("Locations");

  return locationCollection;
};

const findAllLocations = async () => {
  const agg = [
    {
      $lookup: {
        from: "Coachs",
        localField: "_id",
        foreignField: "locationId",
        as: "Coachs",
      },
    },
    {
      $lookup: {
        from: "Categories",
        localField: "CategoryId",
        foreignField: "_id",
        as: "Category",
      },
    },
    {
      $unwind: {
        path: "$Category",
        preserveNullAndEmptyArrays: true,
      },
    },
  ];

  const locations = await getLocationCollection().aggregate(agg).toArray();

  return locations;
};

const addLocation = async (payload) => {
  payload.CategoryId = new ObjectId(payload.CategoryId);

  const locationCollection = await getLocationCollection();
  const newLocation = await locationCollection.insertOne(payload);

  const locations = await locationCollection.findOne({
    _id: new ObjectId(newLocation.insertedId),
  });

  return locations[0];
};

const findLocationByCategory = async (CategoryId) => {
  const agg = [
    {
      $match: {
        CategoryId: new ObjectId(CategoryId),
      },
    },
    {
      $lookup: {
        from: "Coachs",
        localField: "_id",
        foreignField: "locationId",
        as: "Coachs",
      },
    },
    {
      $lookup: {
        from: "Categories",
        localField: "CategoryId",
        foreignField: "_id",
        as: "Category",
      },
    },
    {
      $unwind: {
        path: "$Category",
        preserveNullAndEmptyArrays: true,
      },
    },
  ];

  const locations = await getLocationCollection().aggregate(agg).toArray();

  return locations;
};

module.exports = {
  getLocationCollection,
  findAllLocations,
  addLocation,
  findLocationByCategory,
};
