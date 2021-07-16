
import { Button, Container, FormControl, Grid, InputLabel, MenuItem, Select, Typography, withStyles } from "@material-ui/core";
import React from "react";
import { API_URL } from "../constants";
import { InfoMessageContext } from "../context";
import DatePicker from "./DatePicker";

const styles = (theme) => ({
  form: {
    width: '100%',
  },
  formControl: {
    minWidth: 120,
    width: '100%',
  },
});

class ModalUserInput extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      activeNav: 1,
      data: [],
      crime: '',
      startDate: undefined,
      date: "",
      endMonth: 0,
      district: '',
      districts:[],
    };
  }

  handleChangeCrimes = (event) => {
    this.setState({ crime: event.target.value })
  }

  handleChangeDistrict = (event) =>{
    this.setState({ district: event.target.value })
  }

  handleStartDateChange = (event) => {
      var stringDay = event.getDate();
      var stringMonth = event.getMonth() + 1;
      var stringYear = event.getFullYear();
      var stringDate = stringYear+'/'+stringMonth+'/'+stringDay;
      this.setState({
          startDate: event,
          date: stringDate,
      })
  }

  showHeatMap = () =>{
      this.getData().then(() => {
        this.setState({showHeatMap: true})
      })
  }

  getDistricts = () =>{
    fetch(API_URL + "/distritos")
    .then(res => res.json())
    .then(
      (result) => {
          var allDistricts = [];
          result.rows.forEach(row => {
              allDistricts.push({value: row.id_distrito, label: row.nome_distrito})
          });
        this.setState({
          districts: allDistricts,
        });
      },
      (error) => {
        console.log(error);
      }
    )
  }

  sendEvent = async () => {
    const { date, crime, district } = this.state;
    this.setState({ date: undefined, crime: '', district: '' });

    try {
      const res = await fetch(API_URL + "/novaentrada?"+"data="+date+"&infracao="+crime+"&regiao="+district,{method: 'POST'});
      const result = await res.json();
    } catch(e) {
      console.log(e);
    } finally {
    }
  }

  componentDidMount() {
    this.getDistricts();
  }

  render() {
      const { districts } = this.state;

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
  
      const crime =
      [{ value: '1', label: 'HOMICIDIO DOLOSO' },
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

    return (
      <InfoMessageContext.Consumer>
        {({ setInfoMessage }) => (
          <Container maxWidth="sm">
            <form onSubmit={(e) => {
              e.preventDefault();
              this.sendEvent();
              setInfoMessage('Sua ocorrência foi enviada para análise.');
            }}>
              <Typography variant="h5">
                Informar Ocorrência
              </Typography>
              <Grid container direction="column" spacing={3}>
                <Grid item>
                  <FormControl className={classes.formControl}>
                    <InputLabel id="select-label">Selecione o delito</InputLabel>
                    <Select
                      onChange={this.handleChangeCrimes}
                      fullWidth
                      value={this.state.crime}
                      MenuProps={MenuProps}
                      required
                    >
                      {crime.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item>
                  <FormControl className={classes.formControl}>
                    <InputLabel id="select-label">Selecione a região da ocorrência</InputLabel>
                    <Select
                      onChange={this.handleChangeDistrict}
                      fullWidth
                      value={this.state.district}
                      MenuProps={MenuProps}
                      required
                    >
                      {districts.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item>
                  <DatePicker
                    value={this.state.startDate}
                    onChange={this.handleStartDateChange}
                    id="occurence-date"
                    label="Data da ocorrência"
                  />
                </Grid>             
              </Grid>
              <Grid item container spacing={5} justify="flex-end">
                <Grid item>
                  <Button variant="contained" type="submit">Enviar Ocorrência</Button>
                </Grid>
              </Grid>
            </form>
          </Container>
        )}
      </InfoMessageContext.Consumer>
    );
  }
}

export default withStyles(styles)(ModalUserInput);
