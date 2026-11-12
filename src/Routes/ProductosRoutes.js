import express from 'express';
const routerProducts = express.Router();

import { getAllProductsController, getProductByIdController, postProductController, putProductController, deleteProductController } from '../Controllers/ProductosController.js';
import { runValidators, createProductValidators } from '../Middlewares/validators.js';

routerProducts.get("/", getAllProductsController);
routerProducts.get("/:id", getProductByIdController);
routerProducts.post("/", runValidators(createProductValidators), postProductController);
routerProducts.put("/:id", putProductController);
routerProducts.delete("/:id", deleteProductController);

export default routerProducts;