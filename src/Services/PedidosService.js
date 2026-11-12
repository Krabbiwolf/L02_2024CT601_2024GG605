import { pool } from '../data/db.js';

export const getAllPedidos = async () => {
    const result = await pool.query('SELECT * FROM pedidos ORDER BY id ASC');
    return result.rows;
};

export const getPedidoById = async (id) => {
    const result = await pool.query('SELECT * FROM pedidos WHERE id = $1', [id]);
    return result.rows[0];
};

export const getPedidosByCliente = async (usuario_id) => {
    const result = await pool.query('SELECT * FROM pedidos WHERE usuario_id = $1 ORDER BY id ASC', [usuario_id]);
    return result.rows;
};

export const postCrearPedido = async (usuario_id, estado = 'pendiente') => {
    const query = `INSERT INTO pedidos (usuario_id, estado) 
                   VALUES ($1, $2) RETURNING *`;
    const result = await pool.query(query, [usuario_id, estado]);
    return result.rows[0];
};

export const actualizarPedido = async (pedido) => {
    const query = `UPDATE pedidos 
                   SET usuario_id = $1, 
                       estado = $2 
                   WHERE id = $3 
                   RETURNING *`;
    const result = await pool.query(query, pedido);
    if (result.rowCount === 0) throw new Error('Pedido no encontrado');
    return result.rows[0];
};

export const eliminarPedido = async (id) => {
    const pedidoAEliminar = await pool.query('SELECT * FROM pedidos WHERE id = $1', [id]);
    if (pedidoAEliminar.rowCount === 0) throw new Error('Pedido no encontrado');

    await pool.query('DELETE FROM pedidos WHERE id = $1', [id]);
    return { message: 'Pedido eliminado correctamente', pedido: pedidoAEliminar.rows[0] };
};