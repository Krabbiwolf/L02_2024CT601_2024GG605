import * as detallePedidoService from '../Services/DetallePedidoService.js';

export const getObtenerTodosLosDetalles = async (req, res) => {
    try {
        const result = await detallePedidoService.getAllDetalles();
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getObtenerDetallePorId = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await detallePedidoService.getDetalleById(id);
        if (!result) return res.status(404).json({ message: 'Detalle de pedido no encontrado' });
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getObtenerDetallesPorPedido = async (req, res) => {
    try {
        const { pedido_id } = req.params;
        const result = await detallePedidoService.getDetallesByPedido(pedido_id);
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getObtenerDetallesPorProducto = async (req, res) => {
    try {
        const { producto_id } = req.params;
        const result = await detallePedidoService.getDetallesByProducto(producto_id);
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const postCrearDetalle = async (req, res) => {
    try {
        const { pedido_id, producto_id, cantidad, precio_unitario } = req.body;
        const newDetalle = await detallePedidoService.postCrearDetalle(pedido_id, producto_id, cantidad, precio_unitario);
        res.status(201).json(newDetalle);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const putActualizarDetalle = async (req, res) => {
    try {
        const { pedido_id, producto_id, cantidad, precio_unitario } = req.body;
        const { id } = req.params;
        const detalle = [pedido_id, producto_id, cantidad, precio_unitario, id];
        const updatedDetalle = await detallePedidoService.actualizarDetalle(detalle);
        res.status(200).json(updatedDetalle);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const deleteEliminarDetalle = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await detallePedidoService.eliminarDetalle(id);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};