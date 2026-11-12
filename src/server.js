import express from 'express';
import dotenv from 'dotenv';
import pedidosRouter from './Routes/PedidosRoutes.js';
import detallePedidoRouter from './Routes/DetallePedidoRoutes.js';

import routerUsers from './Routes/UsuariosRoutes.js';
import routerProducts from './Routes/ProductosRoutes.js';

import { errorHandler } from './Middlewares/ErrorHandler.js';

dotenv.config();

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use('/pedidos', pedidosRouter);
app.use('/detalles', detallePedidoRouter);
app.use("/users", routerUsers);
app.use("/products", routerProducts);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log("Servidor corriendo en el puerto " + PORT + "!");
})
