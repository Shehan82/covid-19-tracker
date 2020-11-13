import {React, useEffect, useState} from 'react';
import { Bar, Line, Pie} from "react-chartjs-2"

function Graph(props) {
    const url = props.link;
    console.log(props.link + " ksjd");
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
       
        fetch(url)
        .then(res => res.json())
        .then(data => {
            const diff = (cases)=>{
                var dataArr = Object.values(cases);
                var newArr = [];
                for(var i=0; i<dataArr.length-1;i++)
                {
                    var difference = dataArr[i+1] - dataArr[i];
                    newArr.push(difference);
                    
                }

                console.log(newArr);
                return newArr;
                
            }

            const labels = (cases)=>{
                var labelsArr = Object.keys(cases);
                var newLabelsArr = [];
                for(var i=1; i<labelsArr.length;i++)
                {
                    var lb = labelsArr[i];
                    newLabelsArr.push(lb);
                    
                }

               
                return newLabelsArr;
                
            }

            
            const colors = (num) => {
                var colorsArr = [];
                for(var i=0; i<Object.values(num).length-1; i++)
                {
                    colorsArr.push('rgba(255, 99, 132, 0.7)');
                }
                 return colorsArr;
            }
            var u = "";
            if(url === "https://disease.sh/v3/covid-19/historical/all?lastdays=30")
            {
                u = data.cases;
            }
            else
            {
                u = data.timeline.cases;
            }
           
          
            setLdata({
                labels:labels(u),
                datasets:[
                    {
                        label:'Daily new cases',
                        data: diff(u),
                        backgroundColor:colors(u)
                    }
                ]

            });
         

        })
    }, [url])
    return (
        <div className="graph__bar">
          
            <Bar data={lData} />

        </div>
    )
}

export default Graph;
