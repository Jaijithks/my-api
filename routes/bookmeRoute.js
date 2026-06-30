import { Router } from "express";
import { bookme } from "../controllers/bookmeController.js";

const bookmeRoute = Router();

bookmeRoute.post('/bookme',bookme);

bookmeRoute.post('/contact',(req ,res) =>{
    res.send("contact me here");
})

export default bookmeRoute;