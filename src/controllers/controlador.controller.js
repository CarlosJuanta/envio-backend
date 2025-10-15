import { fetchPendingSolicitudes, fetchAvailableMensajeros, assignSolicitud } from '../services/controlador.service.js';

export const getPendingSolicitudes = async (req, res) => {
    try {
        const solicitudes = await fetchPendingSolicitudes();
        res.json(solicitudes);
    } catch (error) {
        res.status(500).json({ message: "Error del servidor", error: error.message });
    }
};

export const getAvailableMensajeros = async (req, res) => {
    try {
        const mensajeros = await fetchAvailableMensajeros();
        res.json(mensajeros);
    } catch (error) {
        res.status(500).json({ message: "Error del servidor", error: error.message });
    }
};

export const assign = async (req, res) => {
    try {
        const { solicitudId, mensajeroId } = req.body;
        const success = await assignSolicitud(solicitudId, mensajeroId);
        if (success) {
            res.json({ message: `Solicitud ${solicitudId} asignada al mensajero ${mensajeroId}.` });
        } else {
            res.status(404).json({ message: "Solicitud no encontrada o ya ha sido asignada." });
        }
    } catch (error) {
        res.status(500).json({ message: "Error del servidor", error: error.message });
    }
};