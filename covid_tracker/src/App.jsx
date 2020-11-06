import './App.css';
import { Button, FormControl, InputLabel, Input, FormHelperText, MenuItem , Select} from '@material-ui/core';
import { useState } from 'react';

function App() {

  const [countries, setCountries] = useState([
      "Sri lanka",
      "USA",
      "India",
      "Japan",
      "China"
  ])

  return (
    <div className="app">
      <div className="app__header">
        <h1>Covid 19 tracker</h1>
        <FormControl className="app__dropdown">
          <Select>
            
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
