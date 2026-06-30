import express from "express";
import { Router } from "express";
import { signUP,signIN } from "../controllers/authControllers.js";

const authRoute = Router();

//routes in auth
authRoute.post('/sign-up',signUP);
authRoute.post('/sign-in',signIN);
authRoute.get('/log-out',(req,res)=>{
    res.send('/logout',(req,res)=>{
        res.send("logout is working")
    })
})

export default authRoute;
