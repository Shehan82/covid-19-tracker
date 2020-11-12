import './App.css';
import { Button, FormControl, InputLabel, Input, FormHelperText, MenuItem , Select, Card, CardContent} from '@material-ui/core';
import { useState } from 'react';
import { useEffect } from 'react';
import InfoBox from './InfoBox';
import Map from './Map'

function App() {

  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('WorldWide');
  const [coronaInfo, setCoronaInfo] = useState({});

  

  useEffect(()=>{
    // send a request , wait and do
    const getCountries = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
      .then((response)=> response.json())
      .then((data)=>{
        const countries = data.map((country)=>(
          {
            name:country.country,
            value:country.countryInfo.iso2
          }
        ));
        setCountries(countries);
      })
      fetch("https://disease.sh/v3/covid-19/all")
      .then(response => response.json())
      .then((data)=>{
        
        setCoronaInfo(data);

      })
    }

    getCountries();
  }, []);

  const countryChange = async (event) =>
  {
    const countryCode = event.target.value;
    setCountry(countryCode);
    const url = 
      countryCode === "WorldWide"
      ? "https://disease.sh/v3/covid-19/all"
      : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

      await fetch(url)
      .then((response)=>response.json())
      .then((data) =>  {
        console.log(data);
        setCountry(countryCode);
        setCoronaInfo(data);
      })

  }

  return (
    <div className="app">

      <div className="app__left">
          <div className="app__header">
            <h1>Covid 19 tracker</h1>
            <FormControl className="app__dropdown">
              <Select onChange={countryChange} variant="outlined" value={country}>
                <MenuItem  value="WorldWide">Worldwide</MenuItem>
                {countries.map(x =>(
                  <MenuItem value={x.value}>{x.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
        </div>

        <div className="app__stats">
          <InfoBox title="Corona cases" cases={coronaInfo.todayCases} total={coronaInfo.cases}/>
          <InfoBox title="Corona recovery" cases={coronaInfo.todayRecovered} total={coronaInfo.recovered}/>
          <InfoBox title="Corona deaths" cases={coronaInfo.todayDeaths} total={coronaInfo.deaths}/>
          {/* small info boxes cases */}
          {/* small info boxes death */}
          {/* small info boxes recovery */}

        </div>
        

          <Map/>

          </div>

          <Card className="app__right">
            <CardContent>
                  <h3>live cases by country</h3>
                  <h3>World wide new</h3>
            </CardContent>
          </Card>
 
    
      
    </div>
  );
}

export default App;