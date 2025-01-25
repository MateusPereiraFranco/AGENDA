import express from 'express'
import { addScheduleController, deleteScheduleController, getAllSchedulesController, getScheduleController, updateScheduleController } from '../controllers/scheduleController.js';

const router = express.Router();


// Rota para listar os agendas
router.get('/schedules', getAllSchedulesController);
router.get('/schedule', getScheduleController)
router.post('/addSchedule', addScheduleController);
router.delete('/deleteSchedule', deleteScheduleController)
router.put('/updateSchedule/:id', updateScheduleController)

export default router;