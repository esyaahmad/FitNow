const { ObjectId } = require("bson");
const { getDatabase } = require("../config/mongoConnection");

const getCoachsCollection = () => {
  const db = getDatabase();
  const coachCollection = db.collection("Coachs");

  return coachCollection;
};

const findAllCoachs = async () => {
  const agg = [
    {
      $lookup: {
        from: "Users",
        localField: "_id",
        foreignField: "CoachId",
        as: "Users",
      },
    },
  ];

  const coachs = await getCoachsCollection().aggregate(agg).toArray();

  return coachs;
};

const findCoachById = async (id) => {
  const agg = [
    {
      $lookup: {
        from: "Users",
        localField: "email",
        foreignField: "email",
        as: "usersCoach",
      },
    },
    {
      $unwind: {
        path: "$usersCoach",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $match: {
        _id: new ObjectId(id),
      },
    },
  ];

  const coachs = await getCoachsCollection().aggregate(agg).toArray();
  console.log(coachs);
  return coachs[0];
};

const AddNewCoachs = async (payload) => {
  const coachCollection = await getCoachsCollection();
  const newCoach = await coachCollection.insertOne(payload);

  const coachs = await coachCollection.findOne({
    _id: new ObjectId(newCoach.insertedId),
  });
  return coachs;
};

module.exports = {
  getCoachsCollection,
  findAllCoachs,
  AddNewCoachs,
  findCoachById,
};
