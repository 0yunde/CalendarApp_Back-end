/* 
    Rutas de usuarios / auth
    host + /api/auth
*/

const { Router } = require("express");
const { check } = require("express-validator");
const { validateField } = require("../middlewares/field-validate");
const {
  createUser,
  loginUser,
  revalidateToken,
} = require("../controllers/auth");
const { validateJWT } = require("../middlewares/validar-jwt");

const router = Router();

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