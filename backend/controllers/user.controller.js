import bcrypt from "bcryptjs";
import {User} from "../models/user.model.js";
import jwt from 'jsonwebtoken'

// userRegister
export const userRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      }, // Only return necessary data
    });

  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// userlogin
export const  userLogin = async (req,res)=>{
  try {
    const {email,password} = req.body

    if(!email || !password){
      return res.status(400).json({ success: false, message: "Email and password are required" });
    }

    const user = await User.findOne({email})

    if(!user){
      return res.status(400).json({
        success:false,
        message:"User not found"
      })
    }


    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
      return res.status(400).json({ success: false, message: "Invalid Credentials" });
    }

    const token = jwt.sign({ userId: user._id},process.env.JWT_SECRET , { expiresIn: process.env.JWT_EXPIRY || '1hours' });


    res.status(200).json({ 
      success: true, 
      message: "User Login Sucessfully",
      user:{
        _id:user._id,
        email:user.email
      },
      token,
     });

  } catch (error) {
    res.status(500).json({
      message:"Server error", error:error.message
    })
  }
}

// userlogin
export const  userLogout = async (req,res)=>{
  try {
    
    const user = await User.findOne({email})

    if(!user){
      return res.status(400).json({
        success:false,
        message:"User not found"
      })
    }


    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
      return res.status(400).json({ success: false, message: "Invalid Credentials" });
    }

    const token = jwt.sign({ userId: user._id},process.env.JWT_SECRET , { expiresIn: process.env.JWT_EXPIRY || '1hours' });


    res.status(200).json({ 
      success: true, 
      message: "User Login Sucessfully",
      user:{
        _id:user._id,
        email:user.email
      },
      token,
     });

  } catch (error) {
    res.status(500).json({
      message:"Server error", error:error.message
    })
  }
}
// userProfile
export const userProfile = async (req, res) => {
  try {
    const userId = req.user.id; // Extracted from JWT middleware

    // Fetch user from the database
    const user = await User.findById(userId).select("-password"); // Exclude password field

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      message: "User profile fetched successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

