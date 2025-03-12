import "dotenv/config";
import express from 'express';
import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';
import connectDB from './config/db.js';
import cors from 'cors';
import uploadRoute from './routes/upload.js';

const app=express();
app.use(express.json());

//connect to database
connectDB();

app.use(cors());
app.use("/api/auth",authRoutes);
app.use("/api/users",userRoutes);
app.use("/api",uploadRoute);

const port=process.env.PORT||5000;
app.listen(port,()=>
{
    console.log(`Server is running on port ${port}`);
});