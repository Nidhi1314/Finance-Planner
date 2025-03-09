import "dotenv/config";
import express from 'express';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes.js';
import connectDB from './config/db.js';

const app=express();
app.use(express.json());

//connect to database
connectDB();

app.use("/api/auth",authRoutes);

const port=process.env.PORT||5000;
app.listen(port,()=>
{
    console.log(`Server is running on port ${port}`);
});