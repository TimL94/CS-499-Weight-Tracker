import jwt from "jsonwebtoken";

export const signToken = (currentUserId) => {
  return jwt.sign(
    {
      currentUserId,
      loggedIn: true,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "2h",
    }
  );
};

export const authMiddleware = ({ req }) => {
  let token = req.headers.authorization || "";

  if (token.startsWith("Bearer ")) {
    token = token.slice(7);
  }

  if (!token) {
    return {
      currentUserId: null,
      loggedIn: false,
    };
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    return {
      currentUserId: decoded.currentUserId,
      loggedIn: decoded.loggedIn,
    };
  } catch (error) {
    return {
      currentUserId: null,
      loggedIn: false,
    };
  }
};