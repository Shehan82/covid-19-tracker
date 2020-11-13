import React from 'react';
import './table1.css';
 
function Tdata(props) {
    return (
        <div className="table">
           <div className="table1">
            <table className="table ">
            <thead className="thead-dark">
                <tr>
                    <th>Country</th>
                    <th>Total cases</th>
                </tr>
            </thead>
            <tbody>
                {props.countries.map(country => (
               <tr>
                   <td>{country.country}</td>
                   <td>{country.cases}</td>
               </tr>
           ))}
           </tbody>
            </table>
          
            </div>
        </div>
    )
}

export default Tdata;
