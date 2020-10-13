import mongoose from "mongoose";

const countSchema = mongoose.Schema({
  startDate: { type: Date, default: Date.now },
  goal: { type: Number, default: 365 }
});

const Count = mongoose.model("Count", countSchema);
export default Count;
