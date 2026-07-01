import mongoose from "mongoose";

const projectSchema = await mongoose.Schema({
    name:{
        type:String,
        required:true,
        uppercase:true,
        maxLength:[25,"maximum length should be 25"],
        unique:[true,"No two projects can have same name"]
    },
    image: {
        type: String,
        required:true,
    },
    public_id:{
        type:String,
        required:true
    },
    description:{
        type: String,
        required:true,
        maxLength:[500,"maxlength is 500 words"]
    },
    live_url:{
        type: String,
        required:true,
    },
    github_url:{
        type:String,
        required:true
    }
})
const project = mongoose.model("project",projectSchema);
export default project;