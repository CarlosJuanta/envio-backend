import { fetchReporte, fetchAllUsers, removeUserById } from '../services/admin.service.js';

export const getReporteGeneral = async (req, res) => {
    try {
        const reporte = await fetchReporte();
        res.json(reporte);
    } catch (error) {
        res.status(500).json({ message: "Error del servidor", error: error.message });
    }
};

export const getAllUsers = async (req, res) => {
    try {
        const usuarios = await fetchAllUsers();
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ message: "Error del servidor", error: error.message });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const success = await removeUserById(id);
        if (success) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: "Usuario no encontrado." });
        }
    } catch (error) {
        res.status(500).json({ message: "Error del servidor", error: error.message });
    }
};