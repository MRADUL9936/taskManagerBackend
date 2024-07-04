import {Router} from 'express'
import {getTasks,addTask,deleteTask,updateTask,getHistoryLog} from '../controllers/Task.controller.js'

const router=Router()

router.route('/').get(getTasks)
router.route('/add').post(addTask)
router.route('/delete/:id').delete(deleteTask)
router.route('/update').put(updateTask)
router.route('/gethistorylog').get(getHistoryLog)

export default router