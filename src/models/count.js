import mongoose from "mongoose";

const countSchema = mongoose.Schema({
  startDate: { type: Date, default: Date.now },
  goal: { type: Number, default: 365 },
  mainText: { type: String, default: "저희 회사는 직원의 안전을 최우선으로 하고 있습니다." }
});

const Count = mongoose.model("Count", countSchema);
export default Count;
