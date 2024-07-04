import mongoose from "mongoose";

const taskSchema=new mongoose.Schema({
   title :{type:String,required:true},
   description:{type:String,required:true},
   due_date:{type:Date,required:true},
   priority_level:{type:String,enum :["low","medium","high"],required:true},
   status:{type:String,enum:["todo","in-progress","completed"],required:true},
   editable:{type:Boolean,default:false}

},{
    timestamps:true
})

export const Task=mongoose.model("Task",taskSchema)