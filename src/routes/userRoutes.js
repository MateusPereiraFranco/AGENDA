import express from 'express'
import { getAllUsersController, addUserController, deleteUserController, updateUserController, getUserController } from '../controllers/userController.js';

const router = express.Router();

// Rota para listar os usuarios
router.get('/users', getAllUsersController);
router.post('/addUser', addUserController);
router.delete('/deleteUser', deleteUserController)
router.put('/updateUser/:id', updateUserController)
router.get('/user', getUserController)

export default router;