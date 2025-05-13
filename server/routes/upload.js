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

    try{
         const pythonresponse=await axios.post("http://localhost:5000/api/ml/predict",{
             fileUrl:fileUrl,
         });

       

        // Send the dummy response to the frontend
        res.json({
            message: "File uploaded successfully",
            fileUrl: fileUrl,
            prediction: dummyPrediction,
        });
    }
    catch(error){
        console.error("error calling ml model",error);
        res.status(500).json({message:"error processing file in ml model"});
    }
});

export default router;