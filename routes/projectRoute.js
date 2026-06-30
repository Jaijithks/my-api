import { Router } from "express";

const projectRoute = Router();

projectRoute.post('/addproject',(req,res) =>{
    res.send("add project here")
})
projectRoute.get('/showProject',(req,res) =>{
    res.send("add project here")
})
projectRoute.delete('/removeProject',(req,res) =>{
    res.send("delete project here")
})

export default projectRoute;