/* 
    Rutas de usuarios / Auth
    host + /api/auth
*/

const { Router } = require("express");
const router = Router();

const { check } = require("express-validator");
const { validateField } = require("../validator/field-validate");

const {
  createUser,
  loginUser,
  revalidateToken,
} = require("../controllers/auth");

const { validateJWT } = require("../validator/validar-jwt");

router.post(
  "/register",
  [
    //middlewares
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    check(
      "password",
      "El password es obligatorio, debe ser de 6 carateres"
    ).isLength({ min: 6 }),
    validateField,
  ],
  createUser
);

router.post(
  "/",
  [
    check("email", "El email es obligatorio").isEmail(),
    check(
      "password",
      "El password es obligatorio, debe ser de 6 carateres"
    ).isLength({ min: 6 }),
    validateField,
  ],
  loginUser
);

router.post("/renew", validateJWT, revalidateToken);

module.exports = router;