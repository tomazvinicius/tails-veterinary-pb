require('dotenv').config()

import connectDB from "./db/connect";
import express from "express";

import authRoutes from "./routes/authRoutes";
import TutorRoutes from "./routes/TutorRoutes";
import PetRoutes from "./routes/PetRoutes";

import swaggerUi from "swagger-ui-express";
import swaggerDocs from "./swagger.json";

import notFoundMiddleware from "./middleware/not-found";
import errorHandlerMiddleware from "./middleware/error-handler";

const app = express();

app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(authRoutes);
app.use(TutorRoutes);
app.use(PetRoutes);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL)
        app.listen(3000, () => console.log("Server listening on port: " + 3000));
    } catch (error) {
        console.log(error)
    }
}
start()