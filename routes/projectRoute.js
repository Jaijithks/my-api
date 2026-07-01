import { Router } from "express";
import { addProject } from "../controllers/projectController.js";
import upload from "../config/multer.js";

const projectRoute = Router();

projectRoute.post('/addproject',upload.single('image'),addProject)
projectRoute.get('/showProject',(req,res) =>{
    res.send("add project here")
})
projectRoute.delete('/removeProject/:id',(req,res) =>{
    res.send("delete project here")
})

export default projectRoute;