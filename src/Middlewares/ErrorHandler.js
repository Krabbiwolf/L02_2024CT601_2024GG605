const errorHandler = (err, req, res, next) => {
    console.error(err);

    const statusCode = err.statusCode || 500;

    const message = err.message || "Error interno del servidor";

    res.statusCode(statusCode).json({ status: "error", message });
}

export { errorHandler };