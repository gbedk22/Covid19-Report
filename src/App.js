import React, { useEffect, useState } from 'react';
import './App.css';
import LineGraph from './components/LineGraph';

import CovidSummary from './components/CovidSummary';
import axios from './components/axios';


function App() {

  
  const [totalCases, setTotalCases] = useState(0);
  const [totalRecovered, setTotalRecovered] = useState(0);
  const [totalDeaths, setTotalDeaths] = useState(0);
  const [loading, setLoading] = useState(false);
  const [covidSummary, setCovidSummary] = useState({});
  const [country, setCountry] = useState('');
  const [days, setDays] = useState(7);
  const [coronaCountAr, setCoronaCountAr] = useState([]);
  const [label, setLabel] = useState([]);


    
  //componentDidMount
  useEffect (() => {
     
     setLoading(true);

     axios.get(`/summary`)
     .then(res => {
        console.log(res);

        setLoading(false);

        if (res.status === 200){
          setTotalCases(res.data.Global.TotalConfirmed);
          setTotalRecovered(res.data.Global.NewRecovered);
          setTotalDeaths(res.data.Global.TotalDeaths);
          setCovidSummary(res.data);
        }

        
     })
     .catch(error => {
        console.log(error);
     })

  }, []);




/////////////////////////////////////////////////////////



  const formatDate = (date) => {
     const d = new Date(date);

     const year = d.getFullYear();
     const month = `0${d.getMonth() + 1}`.slice(-2); 
     const _day = d.getDate();
     
     return `${year}-${month}-${_day}`;
  }
  


  const countryHandler = (e) => {
     setCountry(e.target.value);
     
     const d = new Date();
     const to = formatDate(d);
     const from = formatDate(d.setDate(d.getDate() - 7));

     getCovidReportByDateRange(e.target.value, from, to);
  }


  const getCovidReportByDateRange = (countrySlug, from, to) => {
     
    axios.get(`/country/${countrySlug}/status/confirmed?from=${from}T00:00:00Z&to=${to}T00:00:00Z`)
    .then(res => {
      console.log(res);

      const yAxisCoronaCount = res.data.map(d => d.Cases);
      const xAxisLabel = res.data.map(d => d.Date); // return an array of the dates.
     
      const covidDetails = covidSummary.Countries.find(country => country.Slug === countrySlug); // return the object whose country.Slug === countrySlug. The summary information of the chosen country
      
      setCoronaCountAr(yAxisCoronaCount);
      setTotalCases(covidDetails.TotalConfirmed);
      setTotalRecovered(covidDetails.TotalRecovered);
      setTotalDeaths(covidDetails.TotalDeaths);
      setLabel(xAxisLabel);

    })
    .catch(error => {
       console.log(error);
    })
  }



  const daysHandler = (e) => {
   setDays(e.target.value);
   const d = new Date();
   const to = formatDate(d);
   const from = formatDate(d.setDate(d.getDate() - e.target.value));

   getCovidReportByDateRange(country, from, to);
}




//////////////////////




  if(loading){
    return <p>Fetching data from api...!</p>
  }

  return (
    <div className="App">
       <CovidSummary 
           totalCases={totalCases}
           totalRecovered={totalRecovered}
           totalDeaths={totalDeaths}
           country={country}
       />

       <div>
           <select value={country} onChange={countryHandler}>
               <option value="">Select Country</option>
               {
                  covidSummary.Countries && covidSummary.Countries.map(country => 
                    <option value={country.Slug}>{country.Country}</option> 
                        
                  )
               }
           </select>

           <select value={days} onChange={daysHandler}>
           <option value="7">Last 7 Days</option>
           <option value="30">Last 30 Days</option>
           <option value="90">Last 90 Days</option>
       </select>
       </div>

       
       <LineGraph 
          yAxis={coronaCountAr}
          label={label}
       />
    </div>
  );
}

export default App;
