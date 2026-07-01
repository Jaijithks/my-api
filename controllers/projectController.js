import express from "express";
import project from "../models/projectModel.js";
import mongoose from "mongoose";
import cloudinary from "../config/cloudinaryConfig.js";
import multer from "../config/multer.js";

export const addProject = async (req,res,next) =>{
try {
    const {name , description, live_url, github_url} = req.body;
    const image = await cloudinary.uploader.upload(req.file.path, { folder: "uploads" });
    if(!name || !image  || !description || !live_url || !github_url){
        res.json({
            sucess:false,
            message: "all field must be filled"
        })
        }
    const newproject = await project.create([{name,image:image.secure_url,description,live_url,github_url}]);
    res.json({
        sucess:true,
        message:"new project has been added",
        data:{
            "projectdetail": newproject[0]
        }
    })
    
    

} catch (err) {
    console.log(err)
    res.json({
        success:false,
        message:"adding new project failed"
    })
}
}
export const removeProject = async (req,res,next) =>{

}
export const viewProject = async (req,res,next ) =>{
    
}
