import { createNewSolicitud } from '../services/solicitud.service.js';

export const createSolicitud = async (req, res) => {
    try {
        
        const solicitudData = req.body;
      
        
        const nuevaSolicitud = await createNewSolicitud(solicitudData);

        res.status(201).json({ 
            id: nuevaSolicitud.id, 
            message: `Solicitud creada exitosamente. La tarifa aplicada es de Q${nuevaSolicitud.tarifa_aplicada}.`
        });
    } catch (error) {
        res.status(500).json({ message: "Error del servidor", error: error.message });
    }
};