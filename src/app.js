const express = require('express');
const cors = require('cors');
const db = require('./database/database')
const body = require('body-parser');

const ocorrenciaRouter = require('./controllers/OcorrenciaController');
const infracaoRouter = require('./controllers/InfracaoController');
const loginRouter = require('./controllers/LoginController');
const cadastroRouter = require('./controllers/CadastroController');

const app = express();

app.use(cors());
app.use(body.json());

app.use('/ocorrencias', ocorrenciaRouter);
app.use('/infracoes', infracaoRouter);
app.use('/login', loginRouter);
app.use('/cadastro', cadastroRouter);

app.get("/idhdelegacia", async (req, res, next) => {
    const {idhMin, idhMax, infracoes, meses, anos} = req.query;
    const result = await db.getDelitoDistritoPorIdh(idhMin, idhMax, infracoes, meses, anos)
    res.json(result);
});

app.get("/distritos", async (req, res, next) => {
    const result = await db.getDistritos()
    res.json(result);
});

app.post("/novaentrada", async (req, res, next) => {
    const {data, infracao, regiao} = req.query;
    const result = await db.postEntrada(data, infracao, regiao)
    res.json(result);
});

app.get("/infracao", async (req, res, next) => {
    const {meses, infracoes} = req.query;
    const result = await db.getDataFromTable(meses, infracoes)
    res.json(result);
});

app.get("/casospordelegacia", async (req, res, next) => {
    const {meses, anos, infracoes, distritos} = req.query;
    console.log(meses)
    console.log(anos)
    console.log(infracoes)
    console.log(distritos)
    const result = await db.getCasosPorDelegacia(meses, anos, infracoes, distritos)
    res.json(result);
});

app.listen(4030, () => {
    console.log("Server running on port 4030");
});
