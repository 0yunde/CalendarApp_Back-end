const jwt = require("jsonwebtoken");

const generateJWT = (id, name) => {
  return new Promise((resolve, reject) => {
    //Generar promesa del jwt
    const payload = { id, name };

    //Generar jwt
    jwt.sign(
      payload,
      process.env.SECRET_JWT,
      {
        expiresIn: "2h",
      },
      (err, token) => {
        //en caso de que no se pueda firmar
        if (err) {
          console.log(err);
          reject("No se pudo generar token");
        }

        resolve(token);
      }
    );
  });
};

module.exports = {
  generateJWT,
};