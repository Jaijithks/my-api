import mongoose from "mongoose"
import express from "express";
import { booking, contact } from "../models/bookmeModel.js";

export const bookme = async (req,res,next)=>{
 try {
    const {service , Expected_time , meeting_time, name , email } = req.body;
    if(!service || !Expected_time || !meeting_time || !name || !email){
        res.json({
            sucess: false,
            message: "you must fill every detail to book me"
        })}
        const requestsPerEmail = await booking.countDocuments({email});
        if(requestsPerEmail>=2){
            res.json({
                sucess:false,
                message: "A person can atmost have 2 requests"
            })
        }

        const newbooking = await booking.create([{service,Expected_time,meeting_time,name,email}])

        res.json({
            sucess:true,
            message:"Your booking has been registered",
            data:{
                "booked" : newbooking[0]

            }
        })
    
 } catch (error) {
    console.error(error);
    next(error)
 }
}
export const updateContact = async (req,res,next) =>{
try {
    const {phone , email , github , linkedin} =  req.body;
    const excistingContact = await contact.findOne();
   if(excistingContact){
    await contact.findByIdAndUpdate(excistingContact._id,{
            phone,
            email,
            github,
            linkedin
        }
    );
    res.json({
        sucess:true,
        message:"contact credentials updated sucessfully"
    })
   }
    else{ 
    const newContact = await contact.create([{phone,email,github,linkedin}])
    res.json({
        sucess:true,
        message:"created a new contact info"
    })
}
} catch (error) {
    console.error(error)
    res.json({
        sucess:false,
        message:"updateing contact credentials failed"
    })
}
}