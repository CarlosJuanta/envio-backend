import { Router } from 'express';
import { getReporteGeneral, getAllUsers, deleteUser } from '../controllers/admin.controller.js';

const router = Router();

router.get('/reporte', getReporteGeneral);
router.get('/usuarios', getAllUsers);
router.delete('/usuarios/:id', deleteUser);

export default router;