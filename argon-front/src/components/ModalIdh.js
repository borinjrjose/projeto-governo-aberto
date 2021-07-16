
import React from "react";
import HeatMap from "react-heatmap-grid";
import DatePicker from "react-datepicker";
import Select from 'react-select';
import 'react-datepicker/dist/react-datepicker.css'
import { API_URL } from "../constants";
import { Container, Grid, Button, Typography, TextField } from "@material-ui/core";
import { TripOrigin } from "@material-ui/icons";

class ModalIdh extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      activeNav: 1,
      data: [],
      chartExample1Data: "data1",
      months: [],
      crimes: [],
      showHeatMap: false,
      startDate: undefined,
      endDate: undefined,
      startMonth: 0,
      endMonth: 0,
      lowerIdhm: 0,
      upperIdhm: 0,
      mapModal: false,
      endYear: 0,
      startYear: 0,
    };
  }

  getData = () => {
    const {endMonth, startMonth, endYear, startYear, crimes, lowerIdhm, upperIdhm} = this.state;
    var months = [];
    var years = [];
    var crimesArray = [];
    crimes.forEach(crime => {
        crimesArray.push(crime.value)
    });
    var count = startMonth;
    while(count <= endMonth){
        months.push(count.toString());
        count ++;
    }
    var yearCount = startYear;
    while(yearCount <= endYear){
        years.push(yearCount.toString());
        yearCount ++;
    }
    fetch(API_URL + "/idhdelegacia?"+ "meses="+JSON.stringify(months)+"&infracoes="+JSON.stringify(crimesArray)+"&idhMin="+lowerIdhm+"&idhMax="+upperIdhm+"&anos="+JSON.stringify(years))
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({
          data: result,
          showHeatMap: true
        });
        console.log(this.state.data);
      },
      (error) => {
        console.log(error);
      }
    )
  }

  handleChangeMonths = (selectedMonths) =>{
      this.setState({months: selectedMonths});
  }

  handleChangeCrimes = (selectedCrimes) =>{
    this.setState({crimes: selectedCrimes})
  }

  getHeatCrimeMap = () =>{
    if(this.state.data.length != 0 && this.state.showHeatMap === true){
        const {data} = this.state;
        var districts = [];
        var yLabels = [];
        data.rows.forEach(row => {
            districts.push(row.nome_distrito);
            yLabels.push(row.categoria);
        });
        const UniqueYLabels = [...new Set(yLabels)];
        const UniqueDistricts = [...new Set(districts)];
        var crimeRates = [];
        var idhmArray = [];
        UniqueYLabels.forEach(crime => {
            var crimePosition = [];
            UniqueDistricts.forEach(district =>{
                var totalNumberInTimeRange = 0;
                var idhmRegion = 0;
                data.rows.forEach(row => {
                    if(row.categoria === crime && district === row.nome_distrito){
                        totalNumberInTimeRange = totalNumberInTimeRange + row.num_ocorrencias;
                    }
                });
                var idhmCount = 0;
                var dataCount = 0;
                while(idhmCount == 0)
                {
                    if(data.rows[dataCount].nome_distrito === district)
                    {
                        idhmRegion = data.rows[dataCount].valor_idhm;
                        idhmArray.push(idhmRegion);
                        idhmCount = idhmCount + 1;
                    }
                    dataCount ++;
                }
                crimePosition.push(totalNumberInTimeRange);
            });
            crimeRates.push(crimePosition)
        });
    
        return(                
        <div style={{ fontSize: "13px" }}>
        <HeatMap
            xLabels={UniqueDistricts}
            yLabels={UniqueYLabels}
            xLabelsLocation={"bottom"}
            xLabelWidth={60}
            yLabelWidth={200}
            data={crimeRates}
            squares
            height={45}
            onClick={(x, y) => alert(`IDHM da região ${UniqueDistricts[x]} = ${idhmArray[x]}`)}
            cellStyle={(background, value, min, max, data, x, y) => ({
            // background: `rgb(0, 151, 230, ${1 - (max - value) / (max - min)})`, //AZUL
            background: `rgb(1, 150, 46, ${1 - (max - value) / (max - min)})`, //VERDE
            // background: `rgb(140, 0, 46, ${1 - (max - value) / (max - min)})`, // VERMELHO
            fontSize: "11.5px",
            color: "#444"
            })}
            cellRender={value => value && <div>{value}</div>}
        />
        </div>
        );
    }
        return;
  }

  downloadCsv = () =>{
    const {endMonth, startMonth, endYear, startYear, crimes, lowerIdhm, upperIdhm} = this.state;
    var months = [];
    var years = [];
    var crimesArray = [];
    crimes.forEach(crime => {
        crimesArray.push(crime.value)
    });
    var count = startMonth;
    while(count <= endMonth){
        months.push(count.toString());
        count ++;
    }
    var yearCount = startYear;
    while(yearCount <= endYear){
        years.push(yearCount.toString());
        yearCount ++;
    }
    fetch(API_URL + "/idhdelegacia?"+"meses="+JSON.stringify(months)+"&infracoes="+JSON.stringify(crimesArray)+"&idhMin="+lowerIdhm+"&idhMax="+upperIdhm+"&anos="+JSON.stringify(years))
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({
          data: result,
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
        },
        (error) => {
        console.log(error);
        }
    )
  }

    openMapModal = () =>{
        this.setState({
            mapModal: true
        })
    }
  handleStartDateChange = (event) =>{
      var stringDate = event.getMonth() + 1;
      var stringYear = event.getFullYear();
      this.setState({
          startDate: event,
          startMonth: stringDate,
          startYear: stringYear
      })
  }

  handleEndtDateChange = (event) =>{
    var stringDate = event.getMonth() + 1;
    var stringYear = event.getFullYear();
    this.setState({
        endDate: event,
        endMonth: stringDate,
        endYear: stringYear
    })
  }

  changeLowerIdhm = (event) =>{
      this.setState({
          lowerIdhm: event.target.value
      })
  }

  changeUpperIdhm = (event) =>{
      this.setState({
          upperIdhm: event.target.value
      })
  }

  showHeatMap = () =>{
      this.getData().then(() => {
        this.setState({showHeatMap: true})
      })
  }

  render() {
      const crimes =
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
        <Container maxWidth="sm">
            <Typography variant="h5">Consulta por IDHM</Typography>
            <Grid container spacing={3} direction="column">
                <Grid item>
                <Select
                    placeholder = "Selecione os delitos"
                    options = {crimes}
                    onChange = {this.handleChangeCrimes}
                    isMulti
                    isClearable={true}
                    isSearchable={true}
                />
                </Grid>
                <Grid item>
                    Data de  Início
                    <br />
                    <DatePicker
                        selected={ this.state.startDate }
                        onChange={ this.handleStartDateChange }
                        name="startDate"
                        dateFormat="dd/MM/yyyy"
                    />
                </Grid>
                <Grid item>
                    Data final
                    <br />
                    <DatePicker
                        selected={ this.state.endDate }
                        onChange={ this.handleEndtDateChange }
                        name="startDate"
                        dateFormat="dd/MM/yyyy"
                    />
                </Grid>
                <Grid item> 
                    <TextField variant="outlined" placeholder="Limite de IDHM inferior" onChange={this.changeLowerIdhm}></TextField>
                </Grid>
                <Grid item>
                    <TextField variant="outlined" placeholder="Limite de IDHM superior" onChange={this.changeUpperIdhm}></TextField>
                </Grid>
                <Grid item container spacing={2} justify="flex-end">
                    <Grid item>
                        <Button variant="contained" onClick = {this.downloadCsv}>Download CSV</Button>
                    </Grid>
                    <Grid item>
                        <Button variant="contained" onClick = {this.getData}>Consulte o HeatMap</Button>
                    </Grid>
                </Grid>
            </Grid>
            {this.state.showHeatMap && <h3 style={{margin: "30px"}}>Mapa de Calor:</h3>}
            {this.state.showHeatMap && this.getHeatCrimeMap()}
        </Container>
    );
  }
}

export default ModalIdh;
