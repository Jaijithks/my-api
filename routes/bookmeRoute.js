import { Router } from "express";
import { bookme, updateContact,viewContact,viewBookme } from "../controllers/bookmeController.js";
import { permission } from "../middleware/authenticationMiddleware.js";


const bookmeRoute = Router();

bookmeRoute.post('/bookme',bookme);
bookmeRoute.get('/viewbookme',permission,viewBookme);

bookmeRoute.post('/contact',permission,updateContact);
bookmeRoute.get('/viewcontact',permission,viewContact);

export default bookmeRoute;