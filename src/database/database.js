const { Client } = require('pg');

const connectionString = 'postgressql://postgres:214322@localhost:5432/RP2';

const client = new Client({ connectionString });

client.connect();

getDataFromTable = async (meses, infracoes) => {
    meses = JSON.parse(meses);
    infracoes = JSON.parse(infracoes);

    console.log(`SELECT * from ocorrencia WHERE id_mes IN (${meses}) AND id_infracao IN (${infracoes})`);

    return client.query(`
        SELECT * FROM ocorrencia o 
        JOIN infracao i ON o.id_infracao = i.id_infracao
        JOIN delegacia de ON de.id_delegacia = o.id_delegacia
        JOIN endereco e ON e.id_endereco = de.id_endereco
        JOIN distrito di ON di.id_distrito = e.id_distrito
        WHERE o.id_mes IN (${meses}) AND o.id_infracao IN (${infracoes})
    `)
}

getDelitoDistritoPorIdh = async (idhMin, idhMax, infracoes, meses, anos) => {
    meses = JSON.parse(meses)
    anos = JSON.parse(anos)
    infracoes = JSON.parse(infracoes)

    return await client.query(`SELECT *
    FROM delegacia
    JOIN ocorrencia
    ON delegacia.id_delegacia = ocorrencia.id_delegacia
    JOIN endereco
    ON delegacia.id_endereco = endereco.id_endereco
    JOIN distrito
    ON distrito.id_distrito = endereco.id_distrito
    JOIN infracao
    ON infracao.id_infracao = ocorrencia.id_infracao
    WHERE valor_idhm BETWEEN ${idhMin} and ${idhMax}
    AND infracao.id_infracao IN (${infracoes})
    AND id_mes IN (${meses})
    AND ano IN (${anos})`)
}

getDistritos = async () => {
    return await client.query(`SELECT *
    FROM distrito`)
}

postEntrada = async (data, infracao, regiao) => {
    var dataStamp = new Date(data);

    console.log(`INSERT INTO entradadados (id_infracao, id_distrito, data_ocorrencia) 
                VALUES ${infracao}, ${regiao}, ${dataStamp})`);

    return await client.query(`INSERT INTO entradadados (id_infracao, id_distrito, data_ocorrencia) 
    VALUES ($1, $2, $3)`, [infracao, regiao, dataStamp])
}

getCasosPorDelegacia = async (meses, anos, infracoes, distritos) =>{
    meses = JSON.parse(meses)
    anos = JSON.parse(anos)
    distritos = JSON.parse(distritos)
    infracoes = JSON.parse(infracoes)

    console.log(`SELECT *
    FROM delegacia
    JOIN ocorrencia
    ON delegacia.id_delegacia = ocorrencia.id_delegacia
    JOIN endereco
    ON delegacia.id_endereco = endereco.id_endereco
    JOIN distrito
    ON distrito.id_distrito = endereco.id_distrito
    JOIN infracao
    ON infracao.id_infracao = ocorrencia.id_infracao
    WHERE distrito.id_distrito IN (${distritos})
    AND infracao.id_infracao IN (${infracoes})
    AND id_mes IN (${meses})
    AND ano IN (${anos})`);

    return await client.query(`SELECT *
    FROM delegacia
    JOIN ocorrencia
    ON delegacia.id_delegacia = ocorrencia.id_delegacia
    JOIN endereco
    ON delegacia.id_endereco = endereco.id_endereco
    JOIN distrito
    ON distrito.id_distrito = endereco.id_distrito
    JOIN infracao
    ON infracao.id_infracao = ocorrencia.id_infracao
    WHERE distrito.id_distrito IN (${distritos})
    AND infracao.id_infracao IN (${infracoes})
    AND id_mes IN (${meses})
    AND ano IN (${anos})`)
}

module.exports = {
    client,
    getDelitoDistritoPorIdh,
    postEntrada,
    getDistritos,
    getDataFromTable,
    getCasosPorDelegacia
};
