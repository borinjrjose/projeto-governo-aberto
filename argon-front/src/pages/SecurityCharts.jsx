import React from "react";
import "../../node_modules/react-vis/dist/style.css";
import { XYPlot, YAxis, XAxis, VerticalBarSeries, LabelSeries, ChartLabel } from 'react-vis';

import { API_URL } from '../constants';
import { Button, Select, Chip, Container, FormControl, Grid, InputLabel, MenuItem, Typography, withStyles } from "@material-ui/core";
import DatePicker from "../components/DatePicker";

const now = new Date();

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

class SecurityCharts extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          data: [],
          crime: '',
          districts:[],
          selectedDistricts:[],
          showChart: false,
          startDate: now,
          endDate: now,
          startMonth: now.getMonth(),
          endMonth: now.getMonth(),
          endYear: now.getFullYear(),
          districtSelectOpen: false,
          startYear: now.getFullYear(),
        };
    }

    handleStartDateChange = (date) => {
        var stringDate = date.getMonth() + 1;
        var stringYear = date.getFullYear();
        this.setState({
            startDate: date,
            startMonth: stringDate,
            startYear: stringYear
        })
    }

    handleEndDateChange = (date) => {
        var stringDate = date.getMonth() + 1;
        var stringYear = date.getFullYear();
        this.setState({
            endDate: date,
            endMonth: stringDate,
            endYear: stringYear
        })
    }

    handleChangeCrime = (event) =>{
        this.setState({ crime: event.target.value })
    }

    handleChangeDistricts = (event) => {
        this.setState({ districtSelectOpen: false });
        this.setState({ selectedDistricts: [ ...event.target.value] });
    }

    getChart = () => {
        const {endMonth, startMonth, endYear, startYear, crime, selectedDistricts} = this.state;

        console.log(this.state);

        var months = [];
        var years = [];
        var count = startMonth;
        var crimesArray = [];
        crimesArray.push(crime)
        var districtValues = [];
        selectedDistricts.forEach(district => {
            districtValues.push(district.value)
        });
        while(count <= endMonth){
            months.push(count.toString());
            count ++;
        }
        var yearCount = startYear;
        while(yearCount <= endYear){
            years.push(yearCount.toString());
            yearCount++;
        }
        fetch(API_URL + "/casospordelegacia?"+"meses="+JSON.stringify(months)+"&infracoes="+JSON.stringify(crimesArray)+"&anos="+JSON.stringify(years)+"&distritos="+JSON.stringify(districtValues))
        .then(res => res.json())
        .then(
        (result) => {
            this.setState({
                showChart: true,
                data: result
            });
        },
        (error) => {
            console.log(error);
        });
    }

    showChart = () =>{
        if(this.state.data.rowCount != 0 && this.state.showChart === true){
            const {data} = this.state;
            var districts = [];
            var labels = [];
            var highestValue = 200;
            data.rows.forEach(row => {
                districts.push(row.nome_distrito);
            });
            const UniqueDistricts = [...new Set(districts)];
            UniqueDistricts.forEach(district => {
                var totalNumberInTimeRange = 0;
                data.rows.forEach(row => {
                    if(row.nome_distrito === district ){
                        totalNumberInTimeRange = totalNumberInTimeRange + row.num_ocorrencias;
                    }
                });
                labels.push({y: totalNumberInTimeRange, x: district});
                if(totalNumberInTimeRange > highestValue){
                    highestValue = totalNumberInTimeRange;
                }
            });

            const chartWidth = 400;
            const chartHeight = highestValue;
            const chartDomain = [0, chartHeight];

            return( 
                <div style={{marginLeft: '50px'}}>
                <XYPlot 
                xType="ordinal" 
                width={chartWidth} 
                height={chartHeight} 
                yDomain={chartDomain}
                >
                <XAxis />
                <YAxis />
                <ChartLabel
                text="Nº de Casos"
                className="alt-y-label"
                includeMargin={true}
                xPercent={0.06}
                yPercent={0.06}
                style={{
                transform: 'rotate(-90)',
                textAnchor: 'end'
                }}
                />
                <VerticalBarSeries data={labels} />
                <LabelSeries
                    data={labels.map(obj => {
                        return { ...obj, label: obj.y.toString() }
                    })}
                    labelAnchorX="middle"
                    labelAnchorY="text-after-edge"
                />
                </XYPlot>
                </div>
            );
        }
        return;
    }
    
    getDistricts = () => {
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

    componentDidMount() {
        this.getDistricts();
    }

  render() {
    const { districts } = this.state;
    const { classes } = this.props;

    const data = [
        {x: 0, y: 8},
        {x: 1, y: 5},
        {x: 2, y: 4},
        {x: 3, y: 9},
        {x: 4, y: 1},
        {x: 5, y: 7},
        {x: 6, y: 6},
        {x: 7, y: 3},
        {x: 8, y: 2},
        {x: 9, y: 0}
      ];

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
            <form className={classes.form} onSubmit={this.getData}>
                <Typography variant="h5">
                    Consultar Gráfico de Linha
                </Typography>
                <Grid container direction="column" spacing={3}>
                    <Grid item>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="select-crime-label">Selecione o delito</InputLabel>
                            <Select
                                onChange={this.handleChangeCrime}
                                fullWidth
                                value={this.state.crime}
                                required
                            >
                            {crimes.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                            </Select>
                        </FormControl>
                        {/* Selecione o Delito:
                        <Select
                            placeholder = "Selecione o delito"
                            options = {crimes}
                            onChange = {this.handleChangeCrimes}
                            isClearable={true}
                            isSearchable={true}
                        /> */}
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
                    <Grid item>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="select-label">Selecione a região da ocorrência</InputLabel>
                            <Select
                                onChange={this.handleChangeDistricts}
                                value={this.state.selectedDistricts}
                                multiple
                                renderValue={(selected) => (
                                <div className={classes.chips}>
                                    {selected.map((value) => (
                                    <Chip key={value.value} label={value.label} className={classes.chip} />
                                    ))}
                                </div>
                                )}
                                fullWidth
                                required
                                open={this.state.districtSelectOpen}
                                onOpen={() => this.setState({ districtSelectOpen: true })}
                                onClose={() => this.setState({ districtSelectOpen: false })}
                            >
                                {districts.map((option) => (
                                    <MenuItem key={option.value} value={option}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item container justify="flex-end">
                        <Button variant="contained" onClick={this.getChart}>Visualizar Gráfico</Button>                    
                    </Grid>
                </Grid>
                {this.state.showChart && <h3 style={{margin: "30px"}}>Gráfico de Linha:</h3>}
                {this.state.showChart && this.showChart()}
            </form>
        </Container>
    );
  }
}

export default withStyles(styles)(SecurityCharts);
