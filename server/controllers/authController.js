import User from "../models/User.js";
import bycrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";

//Regitser user
export const RegisterUser=async(req,res)=>{
    try{
        const {name,email,password}=req.body;
        const userExists=await User.findOne({email}) ;
    if(userExists){
        return res.status(400).json({message:
            "User already exists"});
    }

    //hashpassword
    const salt= await bycrypt.genSalt(10);
    const hashedPassword= await bycrypt.hash(password,salt);

    //create new user
    const newUser=await User.create({
        name,
        email,
        password:hashedPassword,
    });

    res.status(201).json({
        message:"User registered succesfully",
        userID:newUser._id,});
    }
        catch(error)
        {
         res.status(500).json({message:"Server error cannot register"});
        }
        
    };

export const LoginUser=async(req,res)=>{
    try{
        const {email,password}=req.body;

        //find user by email
        const user=await User.findOne({email});
        if(!user)
        {
            return res.status(400).json({message:"user not found"});
        }


        //check password
        const isMatch=await bycrypt.compare(password,user.password);
        if(!isMatch)
        {
            return res.status(400).json({message:"Invalid credentials"});
        }

        //generate token
        const token=jwt.sign({userID:user._id, name:user.name, email:user.email},process.env.JWT_SECRET,{expiresIn:"24h",});
        console.log("generated token",token);

        //send token in repsonse
        return res.json({ token, user }); // ✅ RETURN
    } catch (error) {
      console.error("Error in login:", error);
      return res.status(500).json({ message: "Server error" }); // ✅ RETURN
    }
  };

  //delete account
  export const deleteAccount = async (req, res) => {
  try {
    const user = await User.findById(req.user.userID);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    await user.deleteOne();
    res.status(200).json({ message: "Account deleted successfully." });
  } catch (error) {
    console.error("Delete account error:", error);
    res.status(500).json({ message: "Server error while deleting account." });
  }
};




