import mongoose from "mongoose"
import express from "express";
import { booking } from "../models/bookmeModel.js";

export const bookme = async (req,res,next)=>{
 try {
    const {service , Expected_time , meeting_time, name , email } = req.body;
    if(!service || !Expected_time || !meeting_time || !name || !email){
        res.json({
            sucess: false,
            message: "you must fill every detail to book me"
        })}

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

}