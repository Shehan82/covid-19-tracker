import './App.css';
import { Button, FormControl, InputLabel, Input, FormHelperText, MenuItem , Select} from '@material-ui/core';
import { useState } from 'react';
import { useEffect } from 'react';
import InfoBox from './InfoBox';

function App() {

  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('WorldWide');

  // useeffect runs a pieace of cose base on a given condition 

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
    }

    getCountries();
  }, []);

  const countryChange = async (event) =>
  {
    const countryCode = event.target.value;
    setCountry(countryCode);
    console.log(countryCode);
  }

  return (
    <div className="app">
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

    <div className="stats">
      <InfoBox title="Corona cases" cases={10000} total={39848903}/>
      <InfoBox title="Corona recovery" cases={340} total={39848234903}/>
      <InfoBox title="Corona deaths" cases={2342300} total={3988903}/>
      {/* small info boxes cases */}
      {/* small info boxes death */}
      {/* small info boxes recovery */}

    </div>
     
       
      {/* dropdown */}

      

      {/* Large info boxes */}

      {/* table */}

      {/* graph */}


      
    
      
    </div>
  );
}

export default App;
