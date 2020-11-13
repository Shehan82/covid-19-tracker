import {React, useEffect, useState} from 'react';
import { Bar} from "react-chartjs-2"

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
                var dataArr = Object.values(data.timeline.cases);
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
                var labelsArr = Object.keys(data.timeline.cases);
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

           var u = data.timeline.cases;
          
            setLdata({
                labels:labels(u),
                datasets:[
                    {
                        label:'Corona cases',
                        data: diff(data.timeline.cases),
                        backgroundColor:colors(data.timeline.cases)
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
