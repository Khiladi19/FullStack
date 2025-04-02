import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js"

export const verifyToken = async (req, res, next) => {
  try {
    // Get token from headers
    const token = req.header("Auth");

    if (!token) {
      return res.status(401).json({ success: false, message: "Access denied. No token provided." });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const id = decoded.userId;
  const user = await User.findById(id);

  // console.log("user",user);
  
  if (!user) {
    res.status(401).json({
      sucess: false,
      message: "User not exits",
    });
  }

  req.user = user;

    next(); // Move to next middleware or route handler
  } catch (error) {
    res.status(403).json({ success: false, message: "Invalid or expired token" });
  }
};