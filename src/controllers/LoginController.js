const router = require('express').Router();
const model = require('../models/Usuario');

var md5 = require('md5');

router
  .post('/', async (req, res, next) => {
    const { email, senha } = req.body;

    if(!email || !senha) res.sendStatus(400);

    const usuario = await model.getUsuario(email);

    if(usuario) {
      const hash = md5(senha);

      if(hash === usuario.senha)
        res.sendStatus(200);
      else
        res.sendStatus(422);
    } else {
      res.sendStatus(404);
    }
  });

module.exports = router;
