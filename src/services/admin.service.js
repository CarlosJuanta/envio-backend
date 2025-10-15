import { pool } from '../config/db.js';

export const fetchReporte = async () => {
    // La consulta ha sido revisada para asegurar que los JOINS y alias son correctos.
    const [rows] = await pool.query(`
        SELECT 
            s.id, 
            c.nombre as nombre_cliente, 
            s.direccion_recoleccion, 
            s.direccion_entrega, 
            e.nombre_estado as estado, 
            s.fecha_solicitud,
            m.nombre as nombre_mensajero
        FROM solicitudes s
        INNER JOIN usuarios c ON s.cliente_id = c.id
        INNER JOIN estados_solicitud e ON s.estado_id = e.id
        LEFT JOIN usuarios m ON s.mensajero_id = m.id
        ORDER BY s.fecha_solicitud DESC
    `);
    return rows;
};

export const fetchAllUsers = async () => {
    const [rows] = await pool.query("SELECT u.id, u.nombre, u.email, r.nombre_rol as rol FROM usuarios u JOIN roles r ON u.rol_id = r.id");
    return rows;
};

export const removeUserById = async (id) => {
    const [result] = await pool.query("DELETE FROM usuarios WHERE id = ?", [id]);
    return result.affectedRows > 0;
};