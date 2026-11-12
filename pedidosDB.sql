DROP DATABASE IF EXISTS "pedidosDB" WITH (FORCE);
CREATE DATABASE "pedidosDB";
\c "pedidosDB"

CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    correo VARCHAR(150) NOT NULL,
    fecha_registro TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE UNIQUE INDEX uq_usuarios_correo ON usuarios (LOWER(correo));

CREATE TABLE productos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    descripcion TEXT,
    precio NUMERIC(10,2) NOT NULL CHECK (precio >= 0)
);

CREATE TABLE pedidos (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER NOT NULL REFERENCES usuarios(id) ON DELETE RESTRICT,
    fecha_pedido TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    estado VARCHAR(20) NOT NULL DEFAULT 'pendiente' CHECK (estado IN ('pendiente', 'enviado', 'entregado', 'cancelado'))
);

CREATE TABLE detalles_pedido (
    id SERIAL PRIMARY KEY,
    pedido_id INTEGER NOT NULL REFERENCES pedidos(id) ON DELETE CASCADE,
    producto_id INTEGER NOT NULL REFERENCES productos(id) ON DELETE RESTRICT,
    cantidad INTEGER NOT NULL CHECK (cantidad > 0),
    precio_unitario NUMERIC(10,2) NOT NULL CHECK (precio_unitario >= 0)
);

CREATE INDEX idx_pedidos_usuario ON pedidos (usuario_id);
CREATE INDEX idx_detalles_pedido ON detalles_pedido (pedido_id);
CREATE INDEX idx_detalles_producto ON detalles_pedido (producto_id);

INSERT INTO usuarios (nombre, apellido, correo) VALUES
('Carlos', 'Martinez', 'carlos.martinez@correo.com'),
('Ana', 'Lopez', 'ana.lopez@correo.com'),
('Jose', 'Hernandez', 'jose.hernandez@correo.com'),
('Maria', 'Garcia', 'maria.garcia@correo.com'),
('Luis', 'Ramirez', 'luis.ramirez@correo.com'),
('Sofia', 'Lopez', 'sofia.lopez@correo.com'),
('Ana', 'Ramirez', 'ana.ramirez@correo.com');

INSERT INTO productos (nombre, descripcion, precio) VALUES
('Laptop Lenovo IdeaPad 3', 'Laptop 15.6 pulgadas, 8GB RAM, 512GB SSD', 549.99),
('Mouse Logitech M185', 'Mouse inalambrico', 19.99),
('Teclado Redragon Kumara', 'Teclado mecanico', 45.50),
('Monitor Samsung 24', 'Monitor Full HD 24 pulgadas', 159.00),
('Audifonos Sony WH-CH520', 'Audifonos inalambricos', 59.90),
('Memoria USB Kingston 64GB', 'USB 3.2', 8.75);

INSERT INTO pedidos (usuario_id, fecha_pedido, estado) VALUES
(1, '2026-10-01 10:15:00', 'entregado'),
(2, '2026-10-03 14:30:00', 'entregado'),
(1, '2026-10-10 09:00:00', 'enviado'),
(3, '2026-10-15 16:45:00', 'pendiente'),
(4, '2026-10-20 11:20:00', 'entregado'),
(2, '2026-11-02 18:05:00', 'pendiente'),
(5, '2026-11-05 12:00:00', 'enviado');

INSERT INTO detalles_pedido (pedido_id, producto_id, cantidad, precio_unitario) VALUES
(1, 1, 1, 549.99),
(1, 2, 2, 19.99),
(2, 3, 1, 45.50),
(2, 2, 1, 19.99),
(2, 6, 5, 8.75),
(3, 4, 2, 159.00),
(3, 5, 1, 59.90),
(4, 2, 3, 19.99),
(4, 6, 10, 8.75),
(5, 1, 1, 549.99),
(5, 5, 2, 59.90),
(6, 3, 2, 45.50),
(6, 6, 4, 8.75),
(7, 2, 1, 19.99),
(7, 4, 1, 159.00);
