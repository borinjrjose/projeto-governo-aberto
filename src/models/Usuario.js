const { client: db } = require('../database/database');

async function getUsuario(email) {
  const query = `SELECT * FROM usuario WHERE email='${email}'`;
  return (await db.query(query)).rows[0];
}

async function createUsuario({
  nome, sobrenome, email, senha
}) {
  const query = `
    INSERT INTO usuario (nome, sobrenome, email, senha)
    VALUES ('${nome}', '${sobrenome}', '${email}', '${senha}');
  `;
  await db.query(query);

  return {
    nome, sobrenome, email,
  };
}

module.exports = {
  getUsuario,
  createUsuario,
};
