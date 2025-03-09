import express from 'express'
import authMiddleware from '../middlewares/authMiddleware.js'
const router=express.Router();

router.get("/dashboard",authMiddleware,(req,res)=>{
    res.json({message:"welcome to your dashboard",
        userID:req.user.userID,
        name: req.user.name,
        email:req.user.email,
    });
});
export default router;
