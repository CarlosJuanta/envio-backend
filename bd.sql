CREATE DATABASE envios_garantizados_final_db;

USE envios_garantizados_final_db;

CREATE TABLE roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre_rol VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    rol_id INT NOT NULL,
    nombre VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    direccion TEXT,
    telefono VARCHAR(20),
    FOREIGN KEY (rol_id) REFERENCES roles(id)
);

CREATE TABLE estados_solicitud (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre_estado VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE solicitudes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cliente_id INT NOT NULL,
    estado_id INT NOT NULL DEFAULT 1,
    mensajero_id INT NULL,
    direccion_recoleccion VARCHAR(255) NOT NULL,
    direccion_entrega VARCHAR(255) NOT NULL,
    descripcion_paquete TEXT,
    fecha_solicitud TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (cliente_id) REFERENCES usuarios(id),
    FOREIGN KEY (estado_id) REFERENCES estados_solicitud(id),
    FOREIGN KEY (mensajero_id) REFERENCES usuarios(id)
);

CREATE TABLE tarifas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    descripcion VARCHAR(100),
    tarifa_base DECIMAL(10, 2)
);

INSERT INTO roles (nombre_rol) VALUES ('Cliente'), ('Administrador'), ('Controlador'), ('Mensajero');

INSERT INTO estados_solicitud (nombre_estado) VALUES ('Recibida'), ('Asignada'), ('En Tránsito'), ('Entregada');

INSERT INTO usuarios (rol_id, nombre, email, password, direccion, telefono) VALUES
(2, 'Admin User', 'admin@envios.com', 'admin123', 'Oficina Central', '1111-1111'),
(1, 'Cliente User', 'cliente@envios.com', 'cliente123', 'Calle Falsa 123', '2222-2222'),
(3, 'Controlador User', 'controlador@envios.com', 'control123', 'Centro de Mando', '3333-3333'),
(4, 'Mensajero Uno', 'mensajero1@envios.com', 'mensajero123', 'N/A', '4444-4444');


INSERT INTO solicitudes (cliente_id, estado_id, mensajero_id, direccion_recoleccion, direccion_entrega, descripcion_paquete) VALUES
(2, 1, NULL, 'Zona 1, Ciudad', 'Zona 10, Ciudad', 'Caja de libros'),
(2, 3, 4, 'Zona 5, Ciudad', 'Zona 15, Ciudad', 'Documentos urgentes');

INSERT INTO tarifas (descripcion, tarifa_base) VALUES 
('Tarifa Horario Normal', 50.00), 
('Tarifa Horario Extendido', 100.00);
