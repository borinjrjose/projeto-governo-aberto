const db = require('../database/database');

async function getOcorrencias (infracaoIds) {
    //meses = JSON.parse(meses)
    //infracoes = JSON.parse(infracoes)
    const query = `SELECT * from ocorrencia WHERE id_infracao IN (${infracaoIds})`;
    return (await db.query(query)).rows;
}

async function getOcorrenciasByMeses (infracaoIds, mesIds) {
    //meses = JSON.parse(meses)
    //infracoes = JSON.parse(infracoes)
    const query = `SELECT * from ocorrencia WHERE id_mes IN (${mesIds}) AND id_infracao IN (${infracaoIds})`;
    return (await db.query(query)).rows;
}

module.exports = {
  getOcorrencias,
  getOcorrenciasByMeses,
};
