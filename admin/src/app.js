import express from "express";
import morgan from "morgan";
import path from "path";
import bodyParser from "body-parser";
import "./db";
import Count from "./models/count";

const app = express();
const port = 3000;

// pug 삽입
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// dist file 위치 지정
app.use("/dist", express.static(path.join(__dirname, "dist")));

// 로그 삽입
app.use(morgan("dev"));

app.get("/", async (req, res) => {
  const countValue = await Count.find({});
  res.render("index", { countValue });
});

app.post("/reset", (req, res) => {
  console.log(req.body);
  console.log(req.params);

  try {
    res.render("index", { countValue: 0 });
  } catch (err) {
    res.status(400);
  } finally {
    res.end();
  }
});

app.post("/start", async (req, res) => {
  try {
    await Count.create({});
  } catch (err) {
    res.status(400);
  } finally {
    res.end();
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
