//import here
import express from "express";
import authRoute from "./routes/authRoute.js";
import projectRoute from "./routes/projectRoute.js";
import bookmeRoute from "./routes/bookmeRoute.js";
import profileRouter from "./routes/profileRoute.js";
import { PORT } from "./config/config.js";
import connectDB from "./database/mongoDb.js";
import dns from "dns"
import cors from "cors";
//constssss..
const server = express();
dns.setServers(["1.1.1.1","8.8.8.8"])
server.use(cors({
     origin: [
      "http://localhost:5173",
      "http://localhost:3000",
      "http://localhost:3001",
      "https://my-api-admin-frontend.vercel.app",
      "https://dynamicportfolio-psi.vercel.app",

    ],
}));
//database
connectDB();
//middleware
server.use(express.json());

//routes
server.get('/',(req,res) =>{
   res.send("the server is runnng without an error")
})  
server.use('/api/auth',authRoute);
server.use('/api/project',projectRoute);
server.use('/api/book',bookmeRoute);
server.use('/api/profile',profileRouter);
//start the server
server.listen(PORT, () =>{
    console.log(`server is running at :http://localhost:${PORT}`)
    
})

