import './App.css';
import { Button, FormControl, InputLabel, Input, FormHelperText, MenuItem , Select} from '@material-ui/core';
import { useState } from 'react';
import { useEffect } from 'react';

function App() {

  const [countries, setCountries] = useState([
      "Sri lanka",
      "USA",
      "India",
      "Japan",
      "China"
  ]);

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
      })
    }
  }, []);

  return (
    <div className="app">
      <div className="app__header">
        <h1>Covid 19 tracker</h1>
        <FormControl className="app__dropdown">
          <Select value="worldWide">
            {countries.map(x =>(
              <MenuItem>{x}</MenuItem>
            ))}
          </Select>
        </FormControl>
    </div>
     
       
      {/* dropdown */}

      {/* small info boxes */}
      {/* small info boxes */}
      {/* small info boxes */}

      {/* Large info boxes */}

      {/* table */}

      {/* graph */}


      
    
      
    </div>
  );
}

export default App;
