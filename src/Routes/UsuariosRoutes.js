import express from 'express';
const routerUsers = express.Router();

import { getAllUsersController, getUserByIdController, postUserController, putUserController, deleteUserController } from '../Controllers/UsuariosController.js';
import { runValidators, createUserValidators } from '../Middlewares/validators.js';

routerUsers.get("/", getAllUsersController);
routerUsers.get("/:id", getUserByIdController);
routerUsers.post("/", runValidators(createUserValidators), postUserController);
routerUsers.put("/:id", putUserController);
routerUsers.delete("/:id", deleteUserController);

export default routerUsers;