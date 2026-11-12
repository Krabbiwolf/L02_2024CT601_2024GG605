import * as productsService from "../Services/ProductosService.js";

const getAllProductsController = async (req, res, next) => {
    try {       
        const result = await productsService.getAllProducts();   
        
        if(result.rows.length === 0){
            return res.status(404).json({ mensaje: "No se encontraron productos disponibles" });
        }

        return res.json(result.rows);

    } catch (error) {
        return next(error);
    }
}

const getProductByIdController = async (req, res, next) => {
    try {
        const id = req.params.id;        
        const result = await productsService.getProductById(id);

        if(result.rows.length === 0){
            return res.status(404).json({ mensaje: "No se encontró el producto"});
        }

        return res.json(result.rows);

    } catch (error) {
        return next(error);
    }
}

const postProductController = async (req, res, next) => {
    try {
        const { nombre, descripcion, precio } = req.body;     
        const result = await productsService.postProduct([nombre, descripcion, precio]);

        return res.json(result);

    } catch (error) {
        return next(error);
    }
}

const putProductController = async (req, res, next) => {
    try {
        const id = req.params.id;
        const { nombre, descripcion, precio } = req.body;        
        const result = await productsService.putProduct([nombre, descripcion, precio, id]);

        if(result.rowCount === 0){
            return res.status(404).json({ mensaje: "No se encontró el producto"});
        }

        return res.json(result.rows);

    } catch (error) {
        return next(error);
    }
}

const deleteProductController = async (req, res, next) => {
    try {
        const id = req.params.id;        
        const result = await productsService.deleteProduct(id);
        
        if(result.rowCount === 0){
            return res.status(404).json({ mensaje: "No se encontró el producto"});
        }

        return res.json(result.rows);

    } catch (error) {
        return next(error);
    }
}

export { getAllProductsController, getProductByIdController, postProductController, putProductController, deleteProductController };