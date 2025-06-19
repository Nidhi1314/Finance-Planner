import express from 'express'
import authMiddleware from '../middlewares/authMiddleware.js'
import {deleteAccount} from "../controllers/authController.js";
const router=express.Router();

router.get("/dashboard",authMiddleware,async(req,res)=>{
    res.json({message:"welcome to your dashboard",
        userID:req.user.userID,
        name: req.user.name,
        email:req.user.email,
    });
});

router.delete("/delete", authMiddleware, deleteAccount);

export default router;
