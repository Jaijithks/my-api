import { Router } from "express";
import { bookme, updateContact } from "../controllers/bookmeController.js";
import { permission } from "../middleware/authenticationMiddleware.js";

const bookmeRoute = Router();

bookmeRoute.post('/bookme',bookme);

bookmeRoute.post('/contact',permission,updateContact);

export default bookmeRoute;