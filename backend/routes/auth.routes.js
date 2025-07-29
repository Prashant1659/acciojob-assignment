import express from 'express';
import { User } from '../models/user.models.js';
import { ApiError } from '../utils/ApiError.js';
import jwt from 'jsonwebtoken';
const router = express.Router();


router.post('/signup',async (req,res) => {
    try {
        console.log('req.body',req.body);
        let {email,password } = req.body;
    
        if(!email || !password) 
            throw new ApiError(400,"All fields are needed")
    
        const user = await User.findOne({email});
    
        if(user) 
            throw new ApiError(409,"User already exists")
    
        const newUser = new User({
            email,
            password
        });
    
        const savedUser = await newUser.save();
    
        res.status(201).json({savedUser});
    } catch (error) {
        res.json({"msg":error.message});
    }
})

router.post('/login',async (req,res) => {
    try {
        let {email,password} = req.body;
        if(!email || !password) throw new ApiError(400,"All fields are required");
    
        const user = await User.findOne({email});
        if(!user) throw new ApiError(404,"User not found! Use correct credentials and retry");
    
        const checkPassword = await user.isPasswordCorrect(password);
        if(!checkPassword) throw new ApiError(401,"Password incorrect");
    
        const loggedInUser = await User.findById(user._id).select("-password");
        
        const token = jwt.sign(
            {email},process.env.JWTSECRET
        );
        res.json({token});
    } catch (error) {
        res.json({"msg":error.message});
    }
})



export default router;