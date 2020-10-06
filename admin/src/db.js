import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017", { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.once("open", () => console.log(" ✔ CONNECT DB"));
db.on("error", () => console.log("❌ DB CONNECT ERROR"));
