import express from "express";
import TutorRoutes from "./routes/TutorRoutes";
import PetRoutes from "./routes/PetRoutes";
const app = express();


app.use(express.json());

app.use(TutorRoutes);
app.use(PetRoutes);

app.listen(3000, () => console.log("Server listening on port: " + 3000));