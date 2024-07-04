import mongoose from "mongoose";

const historyLogSchema = new mongoose.Schema({
    taskId: { type: mongoose.Schema.Types.ObjectId, ref: 'Task' },
    action: String,
    details: String
  },{timestamps:true});
  
 export const HistoryLog = mongoose.model('HistoryLog', historyLogSchema);
 