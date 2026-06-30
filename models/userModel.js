import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {type: String,
        required: [true, "name is required"],
        maxLength: 50,
        minLength: 2,
        trim: true
    },
    email: {type: String,
        required:[true,"email is required"],
        trim: true,
        unique: true,
        lowercase: true,
        match: [
  /^\S+@\S+\.\S+$/,
  "Please enter a valid email address"
]
    },
    password: {
        type: String,
        required: [true, "password is required"],
        trim: true,
        maxLength: [80,"password should not be greater than 12 letters"],
        minLength: [5, "password must be greater than 5 letters"]

    }
},{timestamps: true});

const user = mongoose.model('user',userSchema);
export default user;
