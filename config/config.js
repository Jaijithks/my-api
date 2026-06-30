import { config } from "dotenv";

config({path: `.env`});

export const { PORT,MONGODB_URL,JWT_SECRET,JWT_EXPIRE } = process.env;