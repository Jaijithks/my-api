import { Router } from "express";
import { bookme, updateContact,viewContact,viewBookme } from "../controllers/bookmeController.js";
import { permission } from "../middleware/authenticationMiddleware.js";


const bookmeRoute = Router();

bookmeRoute.post('/bookme',bookme);
bookmeRoute.get('/viewbookme',viewBookme);

bookmeRoute.post('/contact',updateContact);
bookmeRoute.get('/viewcontact',viewContact);

export default bookmeRoute;