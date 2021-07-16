const router = require('express').Router();
const model = require('../models/Ocorrencia');

router
  .get('/', async (req, res, next) => {
    const { meses, infracoes } = req.query;

    let result;

    if(!infracoes) res.sendStatus(400);
    else if(meses) {
      result = await model.getOcorrenciasByMeses(infracoes, meses);
    } else {
      result = await model.getOcorrencias(infracoes);
    }

    res.json(result);
  });



module.exports = router;
