import { Router } from 'express';
import { getPendingSolicitudes, getAvailableMensajeros, assign } from '../controllers/controlador.controller.js';

const router = Router();

router.get('/solicitudes-pendientes', getPendingSolicitudes);
router.get('/mensajeros', getAvailableMensajeros);
router.post('/asignar', assign);

export default router;