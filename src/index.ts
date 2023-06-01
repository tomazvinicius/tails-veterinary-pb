import express from "express";
import TutorRoutes from "./routes/TutorRoutes";

const app = express()


app.use(express.json())

app.use(TutorRoutes)

app.listen(3000, () => console.log("Server listening on port: " + 3000));