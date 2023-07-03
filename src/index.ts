require('dotenv').config()

import connectDB from "./db/connect";
import express from "express";
import TutorRoutes from "./routes/TutorRoutes";
import PetRoutes from "./routes/PetRoutes";

const app = express();

app.use(express.json());
app.use(TutorRoutes);
app.use(PetRoutes);

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL)
        app.listen(3000, () => console.log("Server listening on port: " + 3000));
    } catch (error) {
        console.log(error)
    }
}
start()