import express from 'express';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../utils/cloudinary.js';
import axios from 'axios';


const router=express.Router();

//configure cloudinary storage
const storage= new CloudinaryStorage({
    cloudinary,
    params:{
        folder: "uploads",  
    resource_type: "raw",  // Allows non-media files like .xlsx, .pdf, etc.
    format: async (req, file) => "xlsx",  // Ensures correct format
    public_id: (req, file) => file.originalname,
    },
});

const upload=multer({storage});

router.post("/upload",upload.single("file"),async(req,res)=>{
    if(!req.file){
        return res.status(400).json({message:"no file uplaod"});
    }
    const fileUrl=req.file.path;
    console.log("uplaoded file url",fileUrl);
    console.log("File Object: ", req.file);


    try{
        // const response = await axios.post("http://localhost:6001/api/ml/predict", { fileUrl });
        const dummyPrediction = {
            category: "Expense category: Food & Dining",
            confidence: 0.92
        };

        res.json({
            message: "File uploaded successfully",
            fileUrl: fileUrl,
            // prediction: response.data,  // Simulated prediction
        });
    }
    catch(error){
        console.error("error calling ml model",error);
        res.status(500).json({message:"error processing file in ml model"});
    }
});

export default router;