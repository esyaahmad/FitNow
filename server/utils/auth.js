const { GraphQLError } = require("graphql");
const { verifyToken } = require("./jwt");
const { getOneUserById } = require("../models/users");

const authentication = async (req) => {
  const authorization = req.headers.authorization;

  if (!authorization) {
    throw new GraphQLError("Invalid Token", {
      extensions: {
        code: "Unauthorized",
        http: { status: 401 },
      },
    });
  }

  const token = authorization.split(" ")[1];

  if (!token) {
    throw new GraphQLError("Invalid Token", {
      extensions: {
        code: "Unauthorized",
        http: { status: 401 },
      },
    });
  }

  const decodedToken = verifyToken(token);

  const user = await getOneUserById(decodedToken.id);

  if (!user) {
    throw new GraphQLError("Invalid Token", {
      extensions: {
        code: "Unauthorized",
        http: { status: 401 },
      },
    });
  }

  return {
    userId: user._id,
    name: user.name,
    userEmail: user.email,
    status: user.status,
    role: user.role,
  };
};

module.exports = authentication;
