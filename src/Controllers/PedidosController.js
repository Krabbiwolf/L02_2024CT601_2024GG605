import * as pedidosService from '../Services/PedidosService.js';

export const getObtenerTodosLosPedidos = async (req, res) => {
    try {
        const result = await pedidosService.getAllPedidos();
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getObtenerPedidoPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pedidosService.getPedidoById(id);
        if (!result) return res.status(404).json({ message: 'Pedido no encontrado' });
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getObtenerPedidosPorCliente = async (req, res) => {
    try {
        const { usuario_id } = req.params;
        const result = await pedidosService.getPedidosByCliente(usuario_id);
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const postCrearPedido = async (req, res) => {
    try {
        const { usuario_id, estado } = req.body;
        const newPedido = await pedidosService.postCrearPedido(usuario_id, estado);
        res.status(201).json(newPedido);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const putActualizarPedido = async (req, res) => {
    try {
        const { usuario_id, estado } = req.body;
        const { id } = req.params;
        const pedido = [usuario_id, estado, id];
        const updatedPedido = await pedidosService.actualizarPedido(pedido);
        res.status(200).json(updatedPedido);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const deleteEliminarPedido = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pedidosService.eliminarPedido(id);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};