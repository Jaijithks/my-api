import mongoose from "mongoose";

 const aboutSchema = new  mongoose.Schema({
    headline : {type: String,
        maxLength:100,
        
    },
    status : {type:String},
    projectNo : {type:String}


})

export const about = mongoose.model("about",aboutSchema);

 const skillSchema = new  mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    skills: [{
        type: String
    }]
})

export const skill = mongoose.model("skill", skillSchema);

const profileSchema = new mongoose.Schema({
    profile_url: {
        type: String,
        required: true
    },
    public_id: {
        type: String,
        required: true
    }
});

export const profilepic = mongoose.model("profilepic", profileSchema);

 const resumeSchema = new  mongoose.Schema({

    resume_url :{type:String,
        required:[true,"the url is required"]
    },
    public_id: {type:String,
        required:true
    }
 })

export const resume = mongoose.model("resume", resumeSchema);
