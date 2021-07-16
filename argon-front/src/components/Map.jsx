import React, { useEffect, useState } from 'react';

import { GoogleMap, LoadScript, Polygon } from '@react-google-maps/api';
import { Card, CardContent, CardHeader, Grid, makeStyles, Typography, useMediaQuery, useTheme } from '@material-ui/core';

import gradient from 'gradient-color';

const center = { lat: -23.68, lng: -46.733308 }

const polygonOptions = (color) => ({
  strokeColor: 'black',
  fillColor: color,
  fillOpacity: 0.85,
  strokeOpacity: 0,
  strokeWeight: 2,
  clickable: true,
  draggable: false,
  editable: false,
  geodesic: false,
  zIndex: 1
});

const useStyles = makeStyles((theme) => ({
  legend: {
    position: 'relative',
    top:`calc(100vh - ${theme.spacing(35)}px)`,
    left: theme.spacing(2),
    width: '30%',
    maxWidth: theme.breakpoints.values.sm,
  },
  legendColor: {
    height: theme.spacing(2),
    width: theme.spacing(3),
    backgroundColor: ({ color }) => color,
  },
  cardHeader: {
    paddingBottom: 0,
  }
}));

const stepNumber = 7;
const step = 50;

const colors = gradient([
  '#79f257',
  '#f5f127',
  '#ff7e33',
  '#f74519',
], stepNumber).map((color, index) => ({
  color,
  range: `${index * step} - ${(index + 1) * step}`,
}))

colors[colors.length-1].range = `> ${step * (stepNumber - 1)}`

const getStep = num => num > (step * (stepNumber - 1)) ? (stepNumber - 1) : Math.trunc(num / step);

function MapPolygon ({ nome, coords, color, ocorrencias }) {
  const [open, setOpen] = useState(false);

  return (
    <Polygon
      onMouseOver={() => setOpen(true)}
      onMouseOut={() => setOpen(false)}
      key={nome}
      paths={coords}
      options={polygonOptions(color)}
      onClick={() => console.log(nome, ocorrencias, color)}
    />
  );
}

function LegendColor({ text, color }) {
  const classes = useStyles({ color });

  return (
    <Grid item container spacing={2} alignItems="center">
      <Grid item>
        <div className={classes.legendColor} />
      </Grid>
      <Grid item>
        <Typography variant="caption">
          {text}
        </Typography>
      </Grid>
    </Grid>
  );
}

function Map({ data }) {
  const classes = useStyles();

  const theme = useTheme();
  const large = useMediaQuery(theme.breakpoints.up('md'));

  const mapContainerStyle = {
    height: `calc(100vh - ${theme.spacing(5)}px)`,
    width: large ? `${theme.breakpoints.values.sm}px` : '100%'
  };

  const [polygons, setPolygons] = useState([]);

  useEffect(() => {
    setPolygons(data
      .map(({ coords, nome, ocorrencias }) => ({
        key: nome,
        nome,
        coords,
        ocorrencias,
        color: colors[getStep(ocorrencias)].color,
    })));
  }, [data])

  return (
    <div className={classes.mapContainer}>
      <LoadScript googleMapsApiKey='AIzaSyCrKxub3Dw0Zrj2DZiuDJxsRCmKTNL4Zww'>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={large ? 10 : 9}
          center={center}
        >
          {polygons.map((polygon) => <MapPolygon {...polygon} /> )}

          <Card className={classes.legend}>
            <CardHeader 
              title="Legenda" 
              titleTypographyProps={{
                variant: 'subtitle1'
              }}
              className={classes.cardHeader}
            />
            <CardContent>
              <Grid container className={classes.legendContent}>
                {colors.map(color => (
                  <LegendColor key={color.color} color={color.color} text={color.range} />
                ))}
              </Grid>
            </CardContent>
          </Card>
        </GoogleMap>
      </LoadScript>
    </div>
  );
}

export default Map;
