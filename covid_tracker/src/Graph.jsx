import {React, useEffect, useState} from 'react';
import {Line, Doughnut, Bar} from "react-chartjs-2"

function Graph() {
    const [data, setData] = useState({});
    const [lData, setLdata] = useState({
        labels: [],
        datasets:[
            {
                label:'',
                data:[],
                backgroundColor:[]
            }
        ]
    });
    useEffect(() => {
        fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=10")
        .then(res => res.json())
        .then(data => {
            const cd = data.cases.map((a,b)=>{
                return b-a;
            });
            console.log(cd);
            setLdata({
                labels:Object.keys(data.cases),
                datasets:[
                    {
                        label:'Corona cases',
                        data:Object.values(data.cases),
                        backgroundColor:[
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)'
                            
                        ]
                    }
                ]

            });
            console.log(Object.keys(data.cases));

        })
    }, [])
    return (
        <div>
            
            <Bar data={lData} />

        </div>
    )
}

export default Graph;
