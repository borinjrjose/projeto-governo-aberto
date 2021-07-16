const db = require('../database/database');

async function getAllInfracoes() {
  const query = `SELECT * FROM infracao`;
  return (await db.query(query)).rows;
}

async function getInfracaoById(id) {
  const query = `SELECT * FROM infracao where id_infracao=${id}`;
  return (await db.query(query)).rows;
}

module.exports = {
  getAllInfracoes,
  getInfracaoById,
};
