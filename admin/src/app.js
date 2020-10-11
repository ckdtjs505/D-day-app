import express from "express";
import morgan from "morgan";
import path from "path";
// import bodyParser from "body-parser";
import "./db";
import Count from "./models/count";
import schedule from "node-schedule";

const app = express();
const port = 3000;

// pug 삽입
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// dist file 위치 지정
app.use("/dist", express.static(path.join(__dirname, "dist")));

// 로그 삽입
app.use(morgan("dev"));

// 스케줄려 추가 정각에 실행
schedule.scheduleJob({ hour: 0, minute: 0, second: 0 }, async () => {
  const countValue = await Count.find({});

  // 값이 없으면 종료
  if (countValue.length === 0) return false;

  // 값 증가 시키기
  await Count.findByIdAndUpdate(countValue[0]._id, {
    count: countValue[0].count + 1
  });
});

app.get("/", async (req, res) => {
  try {
    const countValue = await Count.find({});
    res.render("index", { countValue });
  } catch (error) {
    console.log(error);
  }
});

app.post("/reset/:id", async (req, res) => {
  const {
    params: { id }
  } = req;

  try {
    await Count.deleteOne({ _id: id });
  } catch (err) {
    res.status(400);
  } finally {
    res.end();
  }
});

app.post("/start/:goalDate", async (req, res) => {
  const {
    params: { goalDate }
  } = req;

  try {
    await Count.create({ goal: goalDate });
  } catch (err) {
    res.status(400);
  } finally {
    res.end();
  }
});

app.get("/app", async (req, res) => {
  try {
    const countValue = await Count.find({});
    res.json(countValue);
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
