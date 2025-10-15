import { pool } from '../config/db.js';

const calcularTarifa = async () => {
    const ahora = new Date();
    const horaActual = ahora.getHours();
    const diaActual = ahora.getDay();
    
    let tarifaId = 2; 

    if (diaActual !== 0 && horaActual >= 8 && horaActual < 18) {
        tarifaId = 1;
    }

    const [tarifaRows] = await pool.query("SELECT tarifa_base FROM tarifas WHERE id = ?", [tarifaId]);
    if (tarifaRows.length === 0) throw new Error("Configuración de tarifas no encontrada.");

    return tarifaRows[0].tarifa_base;
};


export const createNewSolicitud = async (solicitudData) => {
    const { cliente_id, direccion_recoleccion, direccion_entrega, descripcion_paquete } = solicitudData;
    

    const tarifaAAplicar = await calcularTarifa();

    const [result] = await pool.query(
        "INSERT INTO solicitudes (cliente_id, direccion_recoleccion, direccion_entrega, descripcion_paquete) VALUES (?, ?, ?, ?)",
        [cliente_id, direccion_recoleccion, direccion_entrega, descripcion_paquete]
    );
    
    return { 
        id: result.insertId,
        tarifa_aplicada: tarifaAAplicar 
    };
};