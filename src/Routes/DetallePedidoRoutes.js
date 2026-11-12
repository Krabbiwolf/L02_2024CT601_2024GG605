import { Router } from 'express';
import * as detallePedidoController from '../Controllers/DetallePedidoController.js';

const router = Router();

router.get('/', detallePedidoController.getObtenerTodosLosDetalles);
router.get('/pedido/:pedido_id', detallePedidoController.getObtenerDetallesPorPedido);
router.get('/producto/:producto_id', detallePedidoController.getObtenerDetallesPorProducto);
router.get('/:id', detallePedidoController.getObtenerDetallePorId);
router.post('/', detallePedidoController.postCrearDetalle);
router.put('/:id', detallePedidoController.putActualizarDetalle);
router.delete('/:id', detallePedidoController.deleteEliminarDetalle);

export default router;