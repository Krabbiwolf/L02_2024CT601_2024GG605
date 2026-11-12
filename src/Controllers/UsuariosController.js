import * as usersService from "../Services/UsuariosService.js";

const getAllUsersController = async (req, res, next) => {
    try {       
        const result = await usersService.getAllUsers();   
        
        if(result.rows.length === 0){
            return res.status(404).json({ mensaje: "No se encontraron usuarios disponibles" });
        }

        return res.json(result.rows);

    } catch (error) {
        return next(error);
    }
}

const getUserByIdController = async (req, res, next) => {
    try {
        const id = req.params.id;        
        const result = await usersService.getUserById(id);

        if(result.rows.length === 0){
            return res.status(404).json({ mensaje: "No se encontró el usuario"});
        }

        return res.json(result.rows);

    } catch (error) {
        return next(error);
    }
}

const postUserController = async (req, res, next) => {
    try {
        const { nombre, apellido, correo } = req.body;     
        const result = await usersService.postUser([nombre, apellido, correo]);

        return res.json(result);

    } catch (error) {
        return next(error);
    }
}

const putUserController = async (req, res, next) => {
    try {
        const id = req.params.id;
        const { nombre, apellido, correo } = req.body;        
        const result = await usersService.putUser([nombre, apellido, correo, id]);

        if(result.rowCount === 0){
            return res.status(404).json({ mensaje: "No se encontró el usuario"});
        }

        return res.json(result.rows);

    } catch (error) {
        return next(error);
    }
}

const deleteUserController = async (req, res, next) => {
    try {
        const id = req.params.id;        
        const result = await usersService.deleteUser(id);
        
        if(result.rowCount === 0){
            return res.status(404).json({ mensaje: "No se encontró el usuario"});
        }

        return res.json(result.rows);

    } catch (error) {
        return next(error);
    }
}

export { getAllUsersController, getUserByIdController, postUserController, putUserController, deleteUserController };