const router = require('express').Router();
const model = require('../models/Usuario');

var md5 = require('md5');

router
  .post('/', async (req, res, next) => {
    const { nome, sobrenome, email, senha } = req.body;

    if(!email || !senha || !nome || !sobrenome) {
      res.sendStatus(422);
    } else {
      const usuario = {
        email, nome, sobrenome, senha: md5(senha),
      };

      try {
        const result = await model.createUsuario(usuario);

        res.status(201);
        res.send(JSON.stringify(result));
      } catch(e) {
          if(e.code === '23505') res.sendStatus(409);
          else res.sendStatus(500);
      }
    }
  });



module.exports = router;
