import mongoose from "mongoose"
import JWT from "jsonwebtoken"
import bcrypt from "bcryptjs"
import user from "../models/userModel.js"
import { create } from "domain"
import { JWT_EXPIRE,JWT_SECRET } from "../config/config.js"
import { error } from "console"

export const signUP = async (req,res,next) =>{
   const session =  await mongoose.startSession();
    session.startTransaction();

 try {
   const {name , email , password} = req.body;
   const existinguser = await user.findOne({email})

   if(existinguser.length>0){
      const error = new Error('email alredy used');
      error.statusCode = 409;
      throw error;
   }
   const salt = await bcrypt.genSalt(10);
   const hasedpassword = await bcrypt.hash(password, salt);

   const newuser = await user.create([{name ,email , password: hasedpassword}],{session});
   const token = JWT.sign({userid: newuser[0]._id},JWT_SECRET,{expiresIn: "7d"})

   await session.commitTransaction();
   session.endSession();

   res.json({
      success:true,
      message: "successfully created a new user",
      data: {
         token,
         "name": newuser[0]

      }
   })


 } catch (error) {
    console.error(error);
    await session.abortTransaction();
    session.endSession();
    next(error);
 }
}
export const signIN = async (req,res,next) =>{
   try {
      const {email , password} = req.body;
      
      const excistinguser = await user.findOne({email});

      if(!excistinguser){
         console.error("user not found");
         res.json({
            sucess: false,
            message: "user is not found"
         })
         error.statusCode = 401;
         throw error;
      }
      const validatepassword = await bcrypt.compare(password ,excistinguser.password);

      if(!validatepassword){
         console.error("wrong password")
         error.statusCode = 401;
         throw error
      }
      const token = JWT.sign({userid: excistinguser._id},JWT_SECRET,{expiresIn: "7d"})
      
      res.json({
         success: true,
         message: "logged in successfully",
         data: {
            token
         }
      })
   } catch (error) {
      console.error(error);
      res.json({
         sucess: false,
         message: "loggin has failed"
      })
   }

}
export const logOUT = async (req,res,next)=>{
   try {
      
   } catch (error) {
      console.error(error);
      res.json({
         sucess: false,
         message: "log OUT failed"
      })
   }

}