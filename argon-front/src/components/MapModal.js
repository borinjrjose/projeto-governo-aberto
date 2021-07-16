import React from "react";
import { API_URL } from '../constants';
import { Typography, Select, FormControl, InputLabel, Chip, Button, MenuItem, Grid, TextField } from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
import DatePicker from "./DatePicker";

const styles = (theme) => ({
  form: {
    width: '100%',
  },
  formControl: {
    minWidth: 120,
    width: '100%',
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
});

const now = new Date();

class MapModal extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      activeNav: 1,
      data: [],
      chartExample1Data: "data1",
      months: [],
      crimes: [],
      showHeatMap: false,
      startDate: now,
      endDate: now,
      startMonth: now.getMonth(),
      endMonth: now.getMonth(),
      mapModal: false,
      selectOpen: false,
    };
  }

  getData = (e) => {
    e.preventDefault();

    const { endMonth, startMonth, crimes } = this.state;
    var months = [];
    const crimesArray = crimes.map(({ value }) => value);

    const { onSubmit } = this.props;

    var count = startMonth;
    while(count <= endMonth){
      months.push(count.toString());
      count++;
    }

    fetch(API_URL + "/infracao?"+"meses="+JSON.stringify(months)+"&infracoes="+JSON.stringify(crimesArray))
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({
          data: result,
        });

        onSubmit(result.rows);
      },
      (error) => {
        console.log(error);
      }
    )
  }

  handleChangeCrimes = (event) => {
    this.setState({ selectOpen: false });
    this.setState({ crimes: [ ...event.target.value] });
  }

  downloadCsv = () => {
    const { endMonth, startMonth, crimes } = this.state;
    var months = [];
    var crimesArray = [];
    crimes.forEach(crime => {
      crimesArray.push(crime.value)
    });
    var count = startMonth;
    while(count <= endMonth){
        months.push(count.toString());
        count++;
    }

    fetch(API_URL + "/infracao?"+"meses="+JSON.stringify(months)+"&infracoes="+JSON.stringify(crimesArray))
    .then(res => res.json())
    .then((result) => {
      this.setState({
          data: result,
          showHeatMap: true
      });
      const {data} = this.state;
      const replacer = (key, value) => value === null ? '' : value // specify how you want to handle null values here
      const header = Object.keys(data.rows[0])
      let csv = data.rows.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','))
      csv.unshift(header.join(','))
      csv = csv.join('\r\n')
  
      var downloadLink = document.createElement("a");
      var blob = new Blob(["\ufeff", csv]);
      var url = URL.createObjectURL(blob);
      downloadLink.href = url;
      downloadLink.download = "data.csv";
  
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    },(error) => {
      console.log(error);
    })
  }

  handleStartDateChange = (value) => {
    this.setState({
      startDate: value,
      startMonth: value.getMonth() + 1,
    });
  }

  handleEndDateChange = (value) => {
    this.setState({
      endDate: value,
      endMonth: value.getMonth() + 1,
    })
  }

  crimes = [
    { value: '1', label: 'HOMICIDIO DOLOSO' },
    { value: '3', label: 'HOMICIDIO DOLOSO POR ACIDENTE DE TRANSITO' },
    { value: '5', label: 'HOMICIDIO CULPOSO POR ACIDENTE DE TRANSITO' },
    { value: '6', label: 'HOMICIDIO CULPOSO OUTROS' },
    { value: '7', label: 'TENTATIVA DE HOMICIDIO' },
    { value: '8', label: 'LESAO CORPORAL SEGUIDA DE MORTE' },
    { value: '9', label: 'LESAO CORPORAL DOLOSA' },
    { value: '10', label: 'LESAO CORPORAL CULPOSA POR ACIDENTE DE TRANSITO' },
    { value: '11', label: 'LESAO CORPORAL CULPOSA - OUTRAS' },
    { value: '12', label: 'LATROCINIO' },
    { value: '15', label: 'ESTUPRO' },
    { value: '16', label: 'ESTUPRO DE VULNERAVEL' },
    { value: '18', label: 'ROUBO - OUTROS' },
    { value: '19', label: 'ROUBO DE VEICULO' },
    { value: '20', label: 'ROUBO A BANCO' },
    { value: '21', label: 'ROUBO DE CARGA' },
    { value: '22', label: 'FURTO - OUTROS' },
    { value: '23', label: 'FURTO DE VEICULO' },
    { value: '24', label: 'HOMICIDIO DOLOSO (exclui FEMINICIDIO)' },
    { value: '25', label: 'FEMINICIDIO' },
    { value: '27', label: 'HOMICIDIO CULPOSO' },
    { value: '28', label: 'TENTATIVA DE HOMICIDIO' },
    { value: '29', label: 'LESAO CORPORAL DOLOSA' },
    { value: '30', label: 'MAUS TRATOS' },
    { value: '31', label: 'CALUNIA - DIFAMACAO - INJURIA' },
    { value: '32', label: 'CONSTRANGIMENTO ILEGAL' },
    { value: '33', label: 'AMEACA' },
    { value: '34', label: 'INVASAO DE DOMICILIO' },
    { value: '35', label: 'DANO' },
    { value: '36', label: 'ESTUPRO CONSUMADO' },
    { value: '37', label: 'ESTUPRO TENTADO' },
    { value: '38', label: 'ESTUPRO DE VULNERAVEL CONSUMADO' },
    { value: '39', label: 'ESTUPRO DE VULNERAVEL TENTADO' },
    { value: '40', label: 'OUTROS C/C/ DIGNIDADE SEXUAL' }
  ];

  render() {
    const { classes } = this.props;

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;

    const MenuProps = {
      PaperProps: {
        style: {
          maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
          width: 250,
        },
      },
    };

    return (
      <form className={classes.form} onSubmit={this.getData}>
        <Typography variant="h5">
          Consulta de crimes por período
        </Typography>
        <Grid container direction="column" spacing={3}>
          <Grid item>
            <FormControl className={classes.formControl}>
              <InputLabel id="select-label">Selecione os delitos</InputLabel>
              <Select
                onChange={this.handleChangeCrimes}
                value={this.state.crimes}
                multiple
                renderValue={(selected) => (
                  <div className={classes.chips}>
                    {selected.map((value) => (
                      <Chip key={value.value} label={value.label} className={classes.chip} />
                    ))}
                  </div>
                )}
                fullWidth
                MenuProps={MenuProps}
                required
                open={this.state.selectOpen}
                onOpen={() => this.setState({ selectOpen: true })}
                onClose={() => this.setState({ selectOpen: false })}
              >
                {this.crimes.map((option) => (
                  <MenuItem key={option.value} value={option}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
            <DatePicker
              id="date-picker-start-date"
              label="Data de ínicio"
              value={this.state.startDate}
              onChange={this.handleStartDateChange}
              name="startDate"
            />
          </Grid>
          <Grid item>
            <DatePicker
              id="date-picker-end-date"
              label="Data de fim"
              value={this.state.endDate}
              onChange={this.handleEndDateChange}
              name="endDate"
            />
          </Grid>
          <Grid item container spacing={2} justify="flex-end">
            <Grid item>
              <Button variant="contained" onClick={this.downloadCsv}>Download CSV</Button>
            </Grid>
            <Grid item>
              <Button type="submit" variant="contained" >Consultar mapa de calor</Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    );
  }
}

export default withStyles(styles)(MapModal);
