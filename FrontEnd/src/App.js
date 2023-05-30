import React from 'react';
import './assets/css/App.css';
import BasePage from './components/BasePage';

function App() {

  return (
    <div className="App">
      
      <BasePage/>   

    </div>
    
  );
}

export default App;



/*
  extra de Ale
  const getData = async(url) => {
    const newData = await fetch(url, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Accept': 'application/json'
      }
      })
      .then(res => res.json());
      console.log(newData);
  }

  getData('/api');
*/
