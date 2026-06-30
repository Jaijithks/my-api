import { Router } from "express";

const bookmeRoute = Router();

bookmeRoute.post('/bookme',(req ,res) =>{
    res.send("book me here");
})

bookmeRoute.post('/contact',(req ,res) =>{
    res.send("contact me here");
})

export default bookmeRoute;