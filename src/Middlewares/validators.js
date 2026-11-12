import { body, validationResult } from "express-validator";

const runValidators = validations => {
    return async (req, res, next) => {
        for (const validation of validations){
            await validation.run(req);
        }

        const errors = validationResult(req);

        if(errors.isEmpty()){
            return next();
        }

        return res.status(400).json({ status: "error", errors: errors.array() });
    }
}

const createUserValidators = [
    body("nombre")
        .trim()
        .notEmpty()
        .withMessage("El nombre es obligatorio"),

    body("apellido")
        .trim()
        .notEmpty()
        .withMessage("El apellido es obligatorio"),

    body("correo")
        .trim()
        .notEmpty()
        .isEmail()
        .withMessage("El correo es inválido"),
]

const createProductValidators = [
    body("nombre")
        .trim()
        .notEmpty()
        .withMessage("El nombre es obligatorio"),

    body("precio")
        .trim()
        .notEmpty()
        .isNumeric()
        .withMessage("El precio es obligatorio"),
]

export { runValidators, createUserValidators, createProductValidators };