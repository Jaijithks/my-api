import { Router } from "express";
import { addProject, removeProject,viewProject } from "../controllers/projectController.js";
import upload from "../config/multer.js";
import { permission } from "../middleware/authenticationMiddleware.js";

const projectRoute = Router();

projectRoute.post('/addproject',upload.single('image'),permission,addProject)
projectRoute.get('/showProject',viewProject)
projectRoute.delete('/removeProject/:name',permission,removeProject)

export default projectRoute;