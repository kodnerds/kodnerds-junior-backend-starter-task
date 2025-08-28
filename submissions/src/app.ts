import express from "express";
import dataRoutes from "./routes/datumRoutes"
import dotenv from 'dotenv';
import morgan from 'morgan'

dotenv.config()

const app = express();
app.use(express.json());
app.use(morgan("dev"))
app.use("/kodnerds",dataRoutes)

export default app;