import express from 'express';
import dotenv from 'dotenv';

import routerUsers from './Routes/UsuariosRoutes.js';
import routerProducts from './Routes/ProductosRoutes.js';

import { errorHandler } from './Middlewares/ErrorHandler.js';

dotenv.config();
const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.json({ mensaje: "Bievenido!" });
})

app.use("/users", routerUsers);
app.use("/products", routerProducts);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log("Servidor corriendo en el puerto " + PORT + "!");
})