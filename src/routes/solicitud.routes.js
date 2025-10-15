import { Router } from 'express';
import { createSolicitud } from '../controllers/solicitud.controller.js';

const router = Router();

router.post('/solicitudes', createSolicitud);

export default router;