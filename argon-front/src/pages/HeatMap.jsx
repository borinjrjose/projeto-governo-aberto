import React, { useEffect, useState } from 'react';

import { Container, Grid, makeStyles } from '@material-ui/core';
import { MapModal, Map } from '../components';

import sp from "../assets/São Paulo.json";

const distritosCoords = sp
  .features
  .filter(({ properties }) => properties.boundary === 'administrative' && properties.admin_level === '9')
  .map(({ geometry, properties }) => ({
      nome: properties.name,
      coords: geometry.coordinates[0].map(([lng, lat]) => ({ lat, lng }))
}))

const useStyles = makeStyles((theme) => ({

}));

function HeatMap() {
  const classes = useStyles();

  const [data, setData] = useState(null);
  const [distritos, setDistritos] = useState(null);

  useEffect(() => {

    if(data) {
      const ocorrenciasPorDistrito = data
        .reduce((acc, ocorrencia) => ({
          ...acc,
          [ocorrencia.nome_distrito]: [...acc[ocorrencia.nome_distrito], ocorrencia],
        }), distritosCoords.reduce((acc, { nome }) => ({...acc, [nome]: [] }), {}));

      const numOcorrenciasPorDistrito = Object
        .entries(ocorrenciasPorDistrito)
        .reduce((acc, [nome, ocorrencias]) => ({
          ...acc,
          [nome]: ocorrencias.map(o => o.num_ocorrencias).reduce((total, num) => (total + num), 0),
        }), {});


        setDistritos(distritosCoords.map(({ nome, coords }) => ({ 
          nome, coords, ocorrencias: numOcorrenciasPorDistrito[nome] 
        })));
    }
  }, [data]);

  return (
    <Container>
      <Grid container direction="row" spacing={3} justify="space-evenly" >
        <Grid item className={classes.form} md={6} xs={12}>
          <MapModal onSubmit={setData} />
        </Grid>
        <Grid item md={6} xs={12}>
          {distritos && <Map data={distritos} />}
        </Grid>
      </Grid>
    </Container>
  )
}

export default HeatMap;