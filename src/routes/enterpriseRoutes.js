import express from 'express'
import { addEnterpriseController, deleteEnterpriseController, getAllEnterprisesController, getEnterpriseController, updateEnterpriseController } from '../controllers/enterpriseController.js';
const router = express.Router();


// Rota para listar os empresas
router.get('/enterprises', getAllEnterprisesController);
router.get('/enterprise', getEnterpriseController)
router.post('/addEnterprise', addEnterpriseController);
router.delete('/deleteEnterprise', deleteEnterpriseController)
router.put('/updateEnterprise/:id', updateEnterpriseController)

export default router;