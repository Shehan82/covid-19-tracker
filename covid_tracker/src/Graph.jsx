import {React, useEffect, useState} from 'react';
import {Line, Doughnut} from "react-chartjs-2"

function Graph() {
    const [data, setData] = useState({});
    useEffect(() => {
        fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=100")
        .then(res => res.json())
        .then(data => {
            setData(data);
            console.log(data);

        })
    }, [])
    return (
        <div>
            <Doughnut
             data={data}
            
            />

        </div>
    )
}

export default Graph;
