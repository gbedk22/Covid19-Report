import React from 'react';
import Card from './Card';
import NumberFormat from 'react-number-format';


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
                <h1 style={{textTransform: 'capitalize'}}>{country === '' ? 'Global Covid 19 Report' : country}</h1>
                    <div style={{ 
                    display: 'flex', 
                    justifyContent: 'center'
                    }}>
                        <Card>
                        <span>Total Cases</span><br />
                        <span>{
                                 <NumberFormat 
                                 value={totalCases}   
                                 displayType={'text'}
                                 thousandSeparator={true}
                                />
                              }
                        </span>
                        </Card>

                        <Card>
                        <span>Total Recovered</span><br />
                        <span>{
                                 <NumberFormat 
                                 value={totalRecovered}   
                                 displayType={'text'}
                                 thousandSeparator={true}
                                />
                              }
                        </span>
                        </Card>

                        <Card>
                        <span>Total Deaths</span><br />
                        <span>{
                                 <NumberFormat 
                                 value={totalDeaths}   
                                 displayType={'text'}
                                 thousandSeparator={true}
                                />
                              }
                        </span>
                        </Card>
                    </div>
            </div>
        </div>
    );

}


export default CovidSummary;