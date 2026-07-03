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
profileRouter.get('/about', permission, getAbout);
profileRouter.post('/skill', permission, createSkill);
profileRouter.get('/skill', permission, getSkills);
profileRouter.delete('/skill/:title', permission, removeSkills);
profileRouter.post('/profilepic', permission, upload.single('image'), uploadProfilePicture);
profileRouter.get('/profilepic', permission, getProfilePicture);
profileRouter.post('/resume', permission,upload.single('pdf'),uploadResume );
profileRouter.get('/resume', permission, viewResume);
export default profileRouter;