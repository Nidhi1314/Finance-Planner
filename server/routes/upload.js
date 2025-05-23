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
    
   try {
    if (!req.file) {
      console.log("No file received");
      return res.status(400).json({ message: "No file uploaded" });
    }

    const fileUrl = req.file.path;
    console.log("Uploaded file URL:", fileUrl);
    return res.status(200).json({ fileUrl });

  } catch (error) {
    console.error("Server upload error:", error);
    return res.status(500).json({ message: "Upload failed on server." });
  }
});

export default router;