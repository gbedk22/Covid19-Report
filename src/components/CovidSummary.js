import React from 'react';
import Card from './Card';
import CountUp from 'react-countup';

import './Header.css';


const CovidSummary = (props) => {
    
    const {
           totalCases,
           totalRecovered,
           totalDeaths,
           country
    } = props;

    return (
        <div>
           <div>
                <h1 className="header" style={{textTransform: 'capitalize'}}>{country === '' ? 'Global Covid 19 Report' : country}</h1>

                    <div style={{ 
                    display: 'flex', 
                    justifyContent: 'center'
                    }}>
                        <Card>
                        <span className="numCases">Total Cases</span><br />
                        <span className="numCases"><CountUp 
                           start={0} 
                           end={totalCases} 
                           duration={2.5} 
                           separator="," 
                           />
                        </span>
                        </Card>

                        <Card>
                        <span className="numRecovered">Total Recovered</span><br />
                        <span className="numRecovered"><CountUp 
                           start={0} 
                           end={totalRecovered} 
                           duration={2.5} 
                           separator="," 
                           />
                        </span>
                        </Card>

                        <Card>
                        <span className="numDeaths">Total Deaths</span><br />
                        <span className="numDeaths"><CountUp 
                           start={0} 
                           end={totalDeaths} 
                           duration={2.5} 
                           separator="," 
                           />
                        </span>
                        </Card>
                    </div>
            </div>
        </div>
    );

}


export default CovidSummary;