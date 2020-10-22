import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import "./models/count";

mongoose.connect(process.env.MONGO_REAL, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.once("open", () => console.log(" ✔ CONNECT DB"));
db.on("error", () => console.log("❌ DB CONNECT ERROR"));
