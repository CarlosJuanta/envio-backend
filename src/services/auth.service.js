import { pool } from '../config/db.js';

export const validateUserCredentials = async (email, password) => {
    const [rows] = await pool.query(
        "SELECT u.id, u.nombre, u.email, r.nombre_rol as rol FROM usuarios u JOIN roles r ON u.rol_id = r.id WHERE u.email = ? AND u.password = ?", 
        [email, password]
    );

    if (rows.length === 0) {
        return null;
    }
    return rows[0];
}; 

export const registerNewUser = async (userData) => {
    const { nombre, email, password, direccion, telefono } = userData;
    

    const rol_id = 1;

  
    const [existingUser] = await pool.query("SELECT id FROM usuarios WHERE email = ?", [email]);
    if (existingUser.length > 0) {
      
        throw new Error("El correo electrónico ya está registrado.");
    }

    const [result] = await pool.query(
        "INSERT INTO usuarios (rol_id, nombre, email, password, direccion, telefono) VALUES (?, ?, ?, ?, ?, ?)",
        [rol_id, nombre, email, password, direccion, telefono]
    );

    return { id: result.insertId };
};


