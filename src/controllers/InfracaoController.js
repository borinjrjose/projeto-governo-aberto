const router = require('express').Router();
const model = require('../models/Infracao');

router
  .get('/', async (req, res) => {
    const result = await model.getAllInfracoes();

    res.json(result);
  })
  .get('/:id', async (req, res) => {
    const { id } = req.params;
    const result = await model.getInfracaoById(id);

    if(result.length === 0) res.sendStatus(404);
    else res.json(result);
  });

module.exports = router;
