import { Router } from "express";
import { permission } from "../middleware/authenticationMiddleware.js";
import upload from "../config/multer.js";
import {
    createOrUpdateAbout,
    getAbout,
    createSkill,
    getSkills,
    removeSkills,
    uploadProfilePicture,
    getProfilePicture,
    uploadResume,
    viewResume
} from "../controllers/profileController.js";

const profileRouter = Router();

profileRouter.post('/about', permission, createOrUpdateAbout);
profileRouter.get('/about',  getAbout);
profileRouter.post('/skill', permission, createSkill);
profileRouter.get('/skill', getSkills);
profileRouter.delete('/skill/:title', permission, removeSkills);
profileRouter.post('/profilepic', permission, upload.single('image'), uploadProfilePicture);
profileRouter.get('/profilepic', getProfilePicture);
profileRouter.post('/resume', permission,upload.single('pdf'),uploadResume );
profileRouter.get('/resume', viewResume);
export default profileRouter;