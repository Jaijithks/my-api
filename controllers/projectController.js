import express from "express";
import project from "../models/projectModel.js";
import mongoose from "mongoose";
import cloudinary from "../config/cloudinaryConfig.js";
import multer from "../config/multer.js";
import fs from "fs/promises";

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
        await fs.unlink(req.file.path);
    const newproject = await project.create([{name,image:image.secure_url,public_id:image.public_id,description,live_url,github_url}]);
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
try {
    const {name} = req.params;

    const specificProject = await project.findOne({name});
    if(!specificProject){
        res.json({
            sucess:false,
            message:"A project with that name not found"
        })
    }
    await cloudinary.uploader.destroy(specificProject.public_id);
    
    await specificProject.deleteOne();
    res.json({
        sucess:true,
        message: "project has been successfully deleted"
    })
    
} catch (error) {
    console.error(error)
    res.json({
        sucess:false,
        message:"failed to remove the product"
    })
}
}
export const viewProject = async (req,res,next ) =>{
    try {
        const allProject =  await project.find({});
        res.json({
            success:true,
            message:"sucessfully featched the projects",
            "projects" : allProject
            
        })
    } catch (error) {
        console.error(error)
        res.json({
            success:true,
            message:"failed to load the projects"
        })
    }
    
}
