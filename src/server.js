import express from 'express';
import dotenv from 'dotenv';
import pedidosRouter from './Routes/PedidosRoutes.js';
import detallePedidoRouter from './Routes/DetallePedidoRoutes.js';

dotenv.config();

const app = express();

app.use(express.json());

app.use('/pedidos', pedidosRouter);
app.use('/detalles', detallePedidoRouter);

app.listen(process.env.PORT || 3000, () => {
    console.log(`Servidor corriendo en http://localhost:${process.env.PORT || 3000}`);
});