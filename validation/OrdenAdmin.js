import { body, validationResult } from "express-validator";
import { readData } from '../utils/DataUtils.js';

/**
 * Reglas de validación para órdenes de pizza.
 * - Valida cliente, items, pizzaId y cantidad.
 * - Verifica que las pizzas existan en la base de datos.
 */
export const orderValidationRules = [
  // Validar campo 'cliente' (requerido y tipo string)
  body('cliente')
    .notEmpty().withMessage('El cliente es requerido')
    .isString().withMessage('El cliente debe ser una cadena de texto'),

   // Validar campo 'items' (requerido, array no vacío)
    body('items')
    .notEmpty().withMessage('Los items son requeridos')
    .isArray().withMessage('Los items deben ser un array')
    .custom(items => items.length >= 1).withMessage('Debe haber al menos un ítem en la orden'),

   // Validar cada pizzaId: debe ser entero, positivo y existir en Pizza.json
    body('items.*.pizzaId')
    .isInt({ min: 1 }).withMessage('El pizzaId debe ser un número entero válido')
    .custom((pizzaId) => {
      const pizzas = readData("./src/data/Pizza.json");
      return pizzas.some(pizza => pizza.id === pizzaId);
    }).withMessage('La pizza seleccionada no existe'),

   // Validar cantidad  máximo 10 ordenes 
   body('items.*.cantidad')
   .isInt({ min: 1 }).withMessage('La cantidad debe ser al menos 1')
   .custom(cantidad => cantidad <= 10).withMessage('La cantidad máxima por pizza es 10'),


  // Validar cantidad: entero positivo
  body('items.*.cantidad')
    .isInt({ min: 1 }).withMessage('La cantidad debe ser al menos 1')
];

/**
 * Middleware que procesa errores de validación.
 * Si hay errores, devuelve un 400 con el primer mensaje de error.
 */
export const validateOrder = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg })
  }
  next()
};