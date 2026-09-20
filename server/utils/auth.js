import jwt from "jsonwebtoken";

// Generates a JWT token for the given user ID, including the user's ID and a logged-in status in the payload,
// and signs it with a secret key from the environment variables. The token expires in 2 hours.
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

// Middleware function that checks for a valid JWT token in the request headers 
// and returns the current user ID and logged-in status.
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