import User from "../models/User.js";
import bycrypt from "bcryptjs";

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
            return res.status(400).json({message:"Invalid credentials"});
        }


        //check password
        const isMatch=await bycrypt.compare(password,user.password);
        if(!isMatch)
        {
            return res.status(400).json({message:"Invalid credentials"});
        }

        res.status(200).json({message:"Login successfully",userID:user._id});
    }catch(error){
        res.status(500).json({message:"server error"});
    }
    };





