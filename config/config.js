import { config } from "dotenv";

config({path: `.env`});

export const { PORT,MONGODB_URL,JWT_SECRET,JWT_EXPIRE,CLOUDINARY_API,CLOUDINARY_API_SECRET,CLOUDINARY_NAME } = process.env;