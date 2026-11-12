import { pool } from "../data/db.js";

const getAllProducts = async () => {
    try {
        const query = "SELECT * FROM productos";
        const result = await pool.query(query);                

        return result;

    } catch (error) {
        return { error: error.message };
    }
}

const getProductById = async id => {
    try {        
        const query="SELECT * FROM productos WHERE id = $1";
        const result = await pool.query(query, [id]);        

        return result;

    } catch (error) {
        return { error: error.message };
    }
}

const postProduct = async datos => {
    try {    
        const query = "INSERT INTO productos(nombre, descripcion, precio) VALUES($1,$2,$3) RETURNING *";
        const result = await pool.query(query, datos);

        return result.rows;

    } catch (error) {
        return { error: error.message };
    }
}

const putProduct = async datos => {
    try {                
        const query = "UPDATE productos SET nombre = $1, descripcion = $2, precio = $3 WHERE id = $4 RETURNING *";
        const result = await pool.query(query, datos);        

        return result;

    } catch (error) {
        return { error: error.message };
    }
}

const deleteProduct = async id => {
    try {        
        const query = "DELETE FROM productos WHERE id = $1 RETURNING *";
        const result = await pool.query(query, [id]);        

        return result;

    } catch (error) {
        return { error: error.message };
    }
}

export { getAllProducts, getProductById, postProduct, putProduct, deleteProduct };