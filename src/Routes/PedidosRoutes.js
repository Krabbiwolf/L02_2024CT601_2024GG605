import { Router } from 'express';
import * as pedidosController from '../Controllers/PedidosController.js';

const router = Router();

router.get('/', pedidosController.getObtenerTodosLosPedidos);
router.get('/cliente/:usuario_id', pedidosController.getObtenerPedidosPorCliente);
router.get('/:id', pedidosController.getObtenerPedidoPorId);
router.post('/', pedidosController.postCrearPedido);
router.put('/:id', pedidosController.putActualizarPedido);
router.delete('/:id', pedidosController.deleteEliminarPedido);

export default router;