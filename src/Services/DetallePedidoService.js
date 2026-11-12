import { pool } from '../data/db.js';

export const getAllDetalles = async () => {
    const result = await pool.query('SELECT * FROM detalles_pedido ORDER BY id ASC');
    return result.rows;
};

export const getDetalleById = async (id) => {
    const result = await pool.query('SELECT * FROM detalles_pedido WHERE id = $1', [id]);
    return result.rows[0];
};

export const getDetallesByPedido = async (pedido_id) => {
    const result = await pool.query('SELECT * FROM detalles_pedido WHERE pedido_id = $1 ORDER BY id ASC', [pedido_id]);
    return result.rows;
};

export const getDetallesByProducto = async (producto_id) => {
    const result = await pool.query('SELECT * FROM detalles_pedido WHERE producto_id = $1 ORDER BY id ASC', [producto_id]);
    return result.rows;
};

export const postCrearDetalle = async (pedido_id, producto_id, cantidad, precio_unitario) => {
    const query = `INSERT INTO detalles_pedido (pedido_id, producto_id, cantidad, precio_unitario) 
                   VALUES ($1, $2, $3, $4) RETURNING *`;
    const result = await pool.query(query, [pedido_id, producto_id, cantidad, precio_unitario]);
    return result.rows[0];
};

export const actualizarDetalle = async (detalle) => {
    const query = `UPDATE detalles_pedido 
                   SET pedido_id = $1, 
                       producto_id = $2, 
                       cantidad = $3, 
                       precio_unitario = $4 
                   WHERE id = $5 
                   RETURNING *`;
    const result = await pool.query(query, detalle);
    if (result.rowCount === 0) throw new Error('Detalle de pedido no encontrado');
    return result.rows[0];
};

export const eliminarDetalle = async (id) => {
    const detalleAEliminar = await pool.query('SELECT * FROM detalles_pedido WHERE id = $1', [id]);
    if (detalleAEliminar.rowCount === 0) throw new Error('Detalle de pedido no encontrado');

    await pool.query('DELETE FROM detalles_pedido WHERE id = $1', [id]);
    return { message: 'Detalle eliminado correctamente', detalle: detalleAEliminar.rows[0] };
};