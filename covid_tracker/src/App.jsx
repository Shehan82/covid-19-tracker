import './App.css';
import { FormControl, MenuItem , Select, Card, CardContent} from '@material-ui/core';
import { useState } from 'react';
import { useEffect } from 'react';
import InfoBox from './InfoBox';
// import Map from './Map';
import Tdata from './Tdata';
import {sortData} from './util';
import Graph from './Graph';

function App() {

  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('LK');
  const [coronaInfo, setCoronaInfo] = useState({});
  const [tableDate, setTableData] = useState([]);
  const [url, setUrl] = useState("https://disease.sh/v3/covid-19/historical/LK?lastdays=30");

  
  
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
        const sortedData = sortData(data);
        setTableData(sortedData);
        console.log(data);
      })
      fetch("https://disease.sh/v3/covid-19/countries/LK")
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
    const link =
    countryCode === "WorldWide"
      ? "https://disease.sh/v3/covid-19/historical/all?lastdays=30"
      : `https://disease.sh/v3/covid-19/historical/${countryCode}?lastdays=30`;

    // const link = `https://disease.sh/v3/covid-19/historical/${countryCode}?lastdays=30`;
    setUrl(link);
    const url = 
      countryCode === "WorldWide"
      ? "https://disease.sh/v3/covid-19/all"
      : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

      await fetch(url)
      .then((response)=>response.json())
      .then((data) =>  {
        
        setCountry(countryCode);
        setCoronaInfo(data);
       
      })

     
    

  }

 

  return (
    <div className="app">

      <div className="app__left">
          <div className="app__header">
            <h2>COVID 19 TRACKER</h2>
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
          <div className="cases"><InfoBox title="Corona cases" cases={coronaInfo.todayCases} total={coronaInfo.cases}/></div>
          <div className="recovery"><InfoBox title="Corona recovery" cases={coronaInfo.todayRecovered} total={coronaInfo.recovered}/></div>
          <div className="deaths"><InfoBox title="Corona deaths" cases={coronaInfo.todayDeaths} total={coronaInfo.deaths}/></div>
          
          {/* small info boxes cases */}
          {/* small info boxes death */}
          {/* small info boxes recovery */}

        </div>
        

          {/* <Map/> */}
          <div className="app__graph"><Card >
          <CardContent> 
          <Graph link={url}/>
          </CardContent> 
          </Card></div>
          

          </div>

          <div className="tableDiv">
            <Card className="app__right">
              <CardContent>
                    
                    <Tdata countries={tableDate} />
              </CardContent>
            </Card>
          </div>
 
    
      
    </div>
  );
}

export default App;