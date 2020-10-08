import mongoose from "mongoose";

const countSchema = mongoose.Schema({
  startDate: { type: Date, default: Date.now },
  count: { type: Number, default: 0 }
});

const Count = mongoose.model("Count", countSchema);
export default Count;
