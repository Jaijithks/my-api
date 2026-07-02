import express from "express";
import { Router } from "express";
import { signUP, signIN, logOUT } from "../controllers/authControllers.js";

const authRoute = Router();

//routes in auth
//authRoute.post('/sign-up',signUP);
authRoute.post('/sign-in', signIN);
authRoute.post('/log-out', logOUT);
authRoute.get('/log-out', logOUT);

export default authRoute;
