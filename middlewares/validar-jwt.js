const { response } = require("express");
const jwt = require("jsonwebtoken");

const validateJWT = (req, res = response, next) => {
  //Recibir el jwt X-TOKEN HEADERS
  const token = req.header("x-token");

  if (!token) {
    return res.status(400).json({
      ok: false,
      msg: "No hay token en la peticion",
    });
  }

  try {
    //extraer payload, saber que usuario es por su id
    const { id, name } = jwt.verify(token, process.env.SECRET_JWT);

    //al id que se extraiga
    req.id = id;
    req.name = name;
    console.log(id, name);
  } catch (error) {
    return res.status(400).json({
      ok: false,
      msg: "Token no valido",
    });
  }

  next();
};

module.exports = {
  validateJWT,
};