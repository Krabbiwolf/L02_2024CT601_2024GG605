import { pool } from "../data/db.js";

const getAllUsers = async () => {
    try {
        const query = "SELECT * FROM usuarios";
        const result = await pool.query(query);                

        return result;

    } catch (error) {
        return { error: error.message };
    }
}

const getUserById = async id => {
    try {        
        const query="SELECT * FROM usuarios WHERE id = $1";
        const result = await pool.query(query, [id]);        

        return result;

    } catch (error) {
        return { error: error.message };
    }
}

const postUser = async datos => {
    try {    
        const query = "INSERT INTO usuarios(nombre, apellido, correo) VALUES($1,$2,$3) RETURNING *";
        const result = await pool.query(query, datos);

        return result.rows;

    } catch (error) {
        return { error: error.message };
    }
}

const putUser = async datos => {
    try {                
        const query = "UPDATE usuarios SET nombre = $1, apellido = $2, correo = $3 WHERE id = $4 RETURNING *";
        const result = await pool.query(query, datos);        

        return result;

    } catch (error) {
        return { error: error.message };
    }
}

const deleteUser = async id => {
    try {        
        const query = "DELETE FROM usuarios WHERE id = $1 RETURNING *";
        const result = await pool.query(query, [id]);        

        return result;

    } catch (error) {
        return { error: error.message };
    }
}

export { getAllUsers, getUserById, postUser, putUser, deleteUser };