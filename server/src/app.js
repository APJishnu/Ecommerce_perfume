import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import Routes from "./modules/user/routes/routes.js";
import dotenv from "dotenv";
import connectDB from './config/database.js'
dotenv.config();
const app = express();
import seedAdmin from "./seed.js";
import path from 'path'
import { fileURLToPath } from 'url';

// Middleware setup
app.use(bodyParser.json());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); 

app.use(
  cors({
    origin: "http://localhost:3000", // Include 'https://' and full domain
    methods: "GET,POST,PUT,DELETE",
    credentials: true, // Allow cookies
  })
);





// Create an instance of express
// Get the current directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.set("trust proxy", 1); // Trust first proxy for secure cookies

connectDB();
// Routes

app.use("/api/", Routes); // Add the new movie routes

const PORT = process.env.PORT || 5000;
const hostname = process.env.HOST_NAME || "localhost";
app.listen(PORT, hostname,async () => {
    
    // await seedAdmin();
    console.log(`Server is running on port ${PORT}`);
});


