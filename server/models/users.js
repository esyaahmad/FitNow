const { ObjectId } = require("bson");
const { getDatabase } = require("../config/mongoConnection");
const { hashPassword } = require("../utils/bcrypt");

const getCollection = () => {
  const db = getDatabase();
  const userCollection = db.collection("Users");

  return userCollection;
};

const findAllUser = async () => {
  const users = await getCollection().find().toArray();

  return users;
};

const addUser = async (payload) => {
  payload.password = hashPassword(payload.password);
  payload.role = "Trainee";
  // payload.imageUrl =
  //   "https://static.vecteezy.com/system/resources/thumbnails/020/911/740/small/user-profile-icon-profile-avatar-user-icon-male-icon-face-icon-profile-icon-free-png.png";

  const userCollection = await getCollection();
  const newUsers = await userCollection.insertOne(payload);
  const users = await userCollection.findOne(
    {
      _id: newUsers.insertedId,
    },
    {
      projection: {
        password: 0,
      },
    }
  );

  return users;
};

const addCoach = async (payload) => {
  payload.password = hashPassword(payload.password);
  payload.role = "Coach";
  payload.imageUrl =
    "https://static.vecteezy.com/system/resources/thumbnails/020/911/740/small/user-profile-icon-profile-avatar-user-icon-male-icon-face-icon-profile-icon-free-png.png";

  const userCollection = await getCollection();
  const newUsers = await userCollection.insertOne(payload);
  const users = await userCollection.findOne(
    {
      _id: newUsers.insertedId,
    },
    {
      projection: {
        password: 0,
      },
    }
  );

  return users;
};

const searchUserByEmail = async (email) => {
  const users = await getCollection().findOne(
    {
      email,
    },
    {
      projection: {
        password: 0,
      },
    }
  );

  return users;
};

const getOneUserById = async (userId) => {
  const agg = [
    {
      $match: {
        _id: new ObjectId(userId),
      },
    },
    {
      $lookup: {
        from: "UserSchedules",
        localField: "_id",
        foreignField: "UserId",
        as: "UserSchedules",
      },
    },
    {
      $unwind: {
        path: "$Coach",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: "Coachs",
        localField: "UserSchedules.CoachId",
        foreignField: "_id",
        as: "Coach",
      },
    },
    {
      $lookup: {
        from: "Users",
        localField: "Coach.email",
        foreignField: "email",
        as: "UsersCoach",
      },
    },
    {
      $lookup: {
        from: "Schedules",
        localField: "UserSchedules.ScheduleId",
        foreignField: "_id",
        as: "Schedules",
      },
    },
  ];

  const users = await getCollection().aggregate(agg).toArray();
  console.log(users[0].Coach);
  return users[0];
};

const findAllUserCoach = async () => {
  const users = await getCollection()
    .find({
      role: "Coach",
    })
    .toArray();

  return users;
};

const getProfileOneCoach = async (id) => {
  console.log(id);
  agg = [
    {
      '$match': {
        'role': 'Coach'
      }
    }, {
      '$lookup': {
        'from': 'Coachs', 
        'localField': 'email', 
        'foreignField': 'email', 
        'as': 'coachUser'
      }
    }, {
      '$unwind': {
        'path': '$coachUser', 
        'preserveNullAndEmptyArrays': true
      }
    }, {
      '$lookup': {
        'from': 'UserSchedules', 
        'localField': 'coachUser._id', 
        'foreignField': 'CoachId', 
        'as': 'UserSchedules'
      }
    }, {
      '$lookup': {
        'from': 'Users', 
        'localField': 'UserSchedules.UserId', 
        'foreignField': '_id', 
        'as': 'UsersJoin'
      }
    }, {
      $match :  {
        '_id': new ObjectId(id)
      }
    }
  ]
  
  const users = await getCollection().aggregate(agg).toArray();
  console.log(users);
  return users[0]
};

module.exports = {
  findAllUser,
  addUser,
  getCollection,
  searchUserByEmail,
  getProfileOneCoach,
  getOneUserById,
  addCoach,
  findAllUserCoach,
};
