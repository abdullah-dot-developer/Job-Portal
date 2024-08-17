import cookieParser from "cookie-parser";
import express, { urlencoded } from "express";
import cors from "cors";
import dotenv from "dotenv"
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js"
import companyRoute from "./routes/company.route.js"
import jobRoute from "./routes/job.route.js"
import applicationRoute from "./routes/application.route.js"

const app = express();
dotenv.config({})


//Middleware for passing json as response
app.use(express.json())
//Middelware for recieving cookie and token from frontend
app.use(cookieParser())
//Middleware for sending data as tabels from postman
app.use(urlencoded({ extended: true }))
//Middleware for sharing data between frontend and backend servers
app.use(cors({
    origin: "https://job-portal-frontend-hy4k.onrender.com",
    credentials: true
}))

//Api
app.use("/api/v1/user", userRoute)
app.use("/api/v1/company", companyRoute)
app.use("/api/v1/job", jobRoute)
app.use("/api/v1/application", applicationRoute)



const PORT = process.env.PORT || 8000;

app.listen(PORT, (req, res) => {
    connectDB()
    console.log(`App is listening on port ${PORT}`)
})