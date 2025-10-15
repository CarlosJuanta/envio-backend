import { pool } from '../config/db.js';

export const fetchPendingSolicitudes = async () => {
    const [rows] = await pool.query(`
        SELECT s.id, u.nombre as cliente, s.direccion_recoleccion, s.descripcion_paquete
        FROM solicitudes s
        JOIN usuarios u ON s.cliente_id = u.id
        WHERE s.mensajero_id IS NULL AND s.estado_id = 1
    `);
    return rows;
};

export const fetchAvailableMensajeros = async () => {
    const [rows] = await pool.query(
        "SELECT id, nombre FROM usuarios WHERE rol_id = (SELECT id FROM roles WHERE nombre_rol = 'Mensajero')"
    );
    return rows;
};

export const assignSolicitud = async (solicitudId, mensajeroId) => {
    const [result] = await pool.query(
        "UPDATE solicitudes SET mensajero_id = ?, estado_id = 2 WHERE id = ? AND mensajero_id IS NULL",
        [mensajeroId, solicitudId]
    );
    return result.affectedRows > 0;
};