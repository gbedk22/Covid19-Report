import React from 'react';
import { Line } from 'react-chartjs-2';


const LineGraph = (props) => {
     console.log(props.label);
    const data = {
        labels: props.label.map(l => l.substr(0, 10)),
        datasets: [
          {
            label: 'Cases per Country',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgb(57, 57, 245)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgb(57, 57, 245)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgb(57, 57, 245)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: props.yAxis
          }
        ]
      };




    return(
        <div 
           style={{
               width: '600px',
               height: '600px',
               margin: '50px auto'
           }}
        
        >
           <Line data={data}/>
        </div>
    );
}

export default LineGraph;