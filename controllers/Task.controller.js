import {Task} from "../models/Task.model.js"
import {HistoryLog} from "../models/Historylog.model.js"


export const addTask = async (req, res) => {
    try{ 
  const{ title,
    description,
    due_date,
    priority_level,
    status,
  }=req.body

  if (!title || !description || !due_date || 
    !["low", "medium", "high"].includes(priority_level) || 
    !["todo", "in-progress", "completed"].includes(status)) {
    return res.status(400).json({ message: "Please fill all the fields correctly" });
}

   
           const newTask=new Task({
            title,
            description,
            due_date,
            priority_level,
            status ,
            editable: (status==="completed")? false :true
           })

          

        const createdTask=await newTask.save();

        //log the history when task created
        const log = new HistoryLog({
            taskId: createdTask._id,
            action: 'Created',
            details: `Task "${createdTask.title}" created.`
          });
          await log.save();
      
        res.status(201).json({task:createdTask})
    }catch(err){
        console.log("Error creating task",err.message)
        res.status(500).json({message:"Internal Server error"})
    }

}

export const getTasks=async(req,res)=>{

    try{
        const tasks=await Task.find({})
        res.status(200).json({tasks})
    
    }catch(err){
          res.status(500).json({message:"Internal Server error"})
          console.log("Error getting tasks",err.message)
    }

}

export const deleteTask=async(req,res)=>{

  
    try{
        const id=req.params.id
       const task=await Task.findById(id)

    
       if(!task){
           return res.status(404).json({message:"Task not found"})
       }    
      const deletedTask=  await Task.deleteOne({_id:id})

      //log the history when deleted
      const log = new HistoryLog({
        taskId: deletedTask._id,
        action: 'Deleted',
        details: `Task with ID "${deletedTask._id}" deleted.`
      });
      await log.save();
          
            res.status(200).json({message:"Task deleted"})


    }catch(err){
        console.log("Error deleting task",err.message)
        res.status(500).json({message:"Internal Server error"})
    
    }

}

export const updateTask=async(req,res)=>{    

    const{ title,
        description,
        due_date,
        priority_level,
        status,
        _id
      }=req.body

    try{
            const updateTask=await Task.findById(_id)

            if(!updateTask){
                return res.status(404).json({message:"Task not found"})
            }
            
            updateTask.title=title
            updateTask.description=description
            updateTask.due_date=due_date
            updateTask.priority_level=priority_level
            updateTask.status=status
            updateTask.editable=(status==="completed")? false :true

        

           const updatedTask= await updateTask.save()

//log the history when updated
           const log = new HistoryLog({
            taskId: updateTask._id,
            action: 'Updated',
            details: `Task "${updatedTask.title}" updated.`
          });
          await log.save();

            res.status(200).json({updatedTask})

    }catch(err){
        console.log("Error updating task",err.message)
        res.status(500).json({message:"Internal Server error"})
    }

}

export const getHistoryLog = async (req, res) => {
    try {

        // Check if the ID is a valid MongoDB ObjectId
       

        const history = await HistoryLog.find();

        if (!history) {
            return res.status(404).json({ message: "History log not found" });
        }

        res.status(200).json({ history });
    } catch (err) {
        console.error("Error getting history:", err.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};