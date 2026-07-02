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

   if(existinguser){
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
            success: false,
            message: "user is not found"
         })
         const error = new Error("User not found");
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
         token 
         
      })
   } catch (error) {
      console.error(error);
      res.json({
         success: false,
         message: "loggin has failed"
      })
   }

}
export const logOUT = async (req, res, next) => {
   try {
      const authHeader = req.headers.authorization || req.headers.token;
      const token = authHeader?.startsWith("Bearer ")
         ? authHeader.split(" ")[1]
         : authHeader;

      res.status(200).json({
         success: true,
         message: "logged out successfully",
         data: {
            tokenReceived: Boolean(token),
            note: "Token cleanup can be added here later for server-side revocation."
         }
      });
   } catch (error) {
      console.error(error);
      res.status(500).json({
         success: false,
         message: "log out failed"
      });
   }
};