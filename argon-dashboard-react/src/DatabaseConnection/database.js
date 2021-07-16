
  getDataFromTable = () => {
    console.log("iniciou");
    const {Pool, Client} = require('pg')
    const connectionString = 'postgressql://postgres:214322@localhost:5432/RP2'

    const client = new Client({
        connectionString: connectionString
    })

    client.connect()

    console.log("conectou");

    client.query('SELECT * from infracao', (err, res)=>{
        //console.log(err,res)
        var teste = res.rows;
        console.log(teste);
        client.end();
    })
  }

  getDataFromTable()

// const {Pool, Client} = require('pg')
// const connectionString = 'postgressql://postgres:214322@localhost:5432/EP_LBD_2020'

// const client = new Client({
//     connectionString: connectionString
// })

// client.connect()

// client.query('SELECT * from agenda', (err, res)=>{
//     //console.log(err,res)
//     var teste = res.rows;
//     console.log(teste)
//     client.end()
// })