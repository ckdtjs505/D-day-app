import express from "express";
import morgan from "morgan";
import path from "path";
import "./db";

const app = express();
const port = 3000;

// pug 삽입
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// dist file 위치 지정
app.use("/dist", express.static(path.join(__dirname, "dist")));

// 로그 삽입
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
