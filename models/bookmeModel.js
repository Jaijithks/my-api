import mongoose from "mongoose";


const contactSchema = new mongoose.Schema({
    phone:{
        type:Number
    },
    email : {
        type:String
  
    },
    github : {
        type:String
  
    },
    linkedin : {
        type:String
  
    },
})

 export const contact = mongoose.model("contact",contactSchema)


const bookmeSchema = new mongoose.Schema({
    service : {
        type:String,
        required:true
    },
    Expected_time:{
        type:String,
        required:true
    },
    meeting_time:{
        type:String,
        required:true
    },
    name: {
        type:String,
        required:true,
        minLength:2,
        maxlength:[50,"name should not be greater than 50 letters"]
    },
    email: {
        type:String,
        required:true,
        lowercase: true,
         match: [
  /^\S+@\S+\.\S+$/,
  "Please enter a valid email address"
]
    }
    
},{timestamps: true})

export const booking = mongoose.model("booking", bookmeSchema);
