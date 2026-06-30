import { Router } from "express";
import { bookme, updateContact } from "../controllers/bookmeController.js";

const bookmeRoute = Router();

bookmeRoute.post('/bookme',bookme);

bookmeRoute.post('/contact',updateContact);

export default bookmeRoute;